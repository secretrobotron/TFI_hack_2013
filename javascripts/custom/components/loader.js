(function(global){
  var MAX_CONCURRENT_ITEMS = 3;

  global.util = global.util || {};

  var __waiters = {
    XHR: function (xhr, onProgress, onLoaded, onError) {
      xhr.onload = function (e) {
        var url = (window.webkitURL ? webkitURL : URL).createObjectURL(this.response);
        xhr._asset.src = url;
        onLoaded.call(xhr._asset, e);
      };

      xhr.onerror = function (e) {
        onError.call(xhr._asset, e);
      }
    },
    IMG: function (image, onProgress, onLoaded, onError) {
      if (!image.complete) {
        image.addEventListener('load', function internalOnLoaded (e) {
          image.removeEventListener('load', internalOnLoaded, false);
          onLoaded.call(image, e);
        }, false);
        image.addEventListener('error', function internalOnError (e) {
          image.removeEventListener('error', internalOnError, false);
          onError.call(image, e);
        }, false);
      }
      else {
        setTimeout(onLoaded(), 0);
      }
    },

    HTML5MEDIA: function (media, onProgress, onLoaded, onError) {
      function checkProgress(e) {
        var percent = null;

        if (media && media.buffered && media.buffered.length > 0 && media.duration) {
          percent = media.buffered.end(0) / media.duration;
        }
        else if (media && media.bytesTotal != undefined && media.bytesTotal > 0 && media.bufferedBytes != undefined) {
          percent = media.bufferedBytes / media.bytesTotal;
        }

        if (percent !== null) {
          //makes sure it is never less than zero or more than a 100.
          percent = parseInt(100 * Math.min(1, Math.max(0, percent)));

          onProgress(media, percent);
        }
      }

      media.addEventListener('progress', checkProgress, false);
      media.addEventListener('canplaythrough', function canPlayThrough(e) {
        media.removeEventListener('progress', checkProgress, false);
        media.removeEventListener('canplaythrough', canPlayThrough, false);
        onLoaded.call(media,e);
      });

      media.addEventListener('error', function internalOnError (e) {
        media.removeEventListener('error', internalOnError, false);
        onError.call(media, e);
      }, false);

      // It's already done somehow :)
      if (media.readyState === 4) {
        media.removeEventListener('progress', checkProgress, false);
        media.removeEventListener('canplaythrough', canPlayThrough, false);
        setTimeout(function () {
          onLoaded.call(media);
        });
      }
    },

    VIDEO: function(video, onProgress, onLoaded, onError) {
      __waiters.HTML5MEDIA(video, onProgress, onLoaded, onError);
    },

    AUDIO: function (audio, onProgress, onLoaded, onError) {
      __waiters.HTML5MEDIA(audio, onProgress, onLoaded, onError);
    }
  }; //end of waiters

  var __loader = {
    ensureLoaded: function (assets, progressCallback, finishedCallback) {
      if (Number(assets.length) !== assets.length) {
        // console.log("first conditional");
        __loader.ensureLoaded([assets], function () {
          finishedCallback(assets);
        });
        return;
      }

      var itemsFinished = 0;

      function checkItems () {
        // console.log('[LOADER] Loaded', itemsFinished, 'of', assets.length);
        progressCallback(itemsFinished / assets.length);
        if (itemsFinished === assets.length) {
          finishedCallback(assets);
        }
      }

      function itemProgressCallback(asset, percent) {}

      function itemErrorCallback () {
        ++itemsFinished;
        checkItems();
      }

      function itemLoadedCallback () {
        ++itemsFinished;
        checkItems();
      }

      // console.log('[LOADER] Loading ', assets.length);
      assets.forEach(function (asset) {
        if (__waiters[asset.nodeName]) {
          __waiters[asset.nodeName](asset, itemProgressCallback, itemLoadedCallback, itemErrorCallback);
        }
        else if (asset instanceof XMLHttpRequest) {
          __waiters['XHR'](asset, itemProgressCallback, itemLoadedCallback, itemErrorCallback);
        }
      });
    },

    // Utility function for loading a limited number of assets at any one time in "chunks". Buckets are
    // loaded sequentially. Relies on MAX_CONCURRENT_ITEMS for chunk size.
    // For example, with MAX_CONCURRENT_ITEMS = 3, assets in [v, v, v, a, a] are split into two chunks,
    // [v, v, v], and [a, a]. One chunk is loaded entirely before the other :).
    loadBatch: function (assets, progressCallback, finishedCallback) {
      var chunks = [];

      // Split things into chunks
      for (var i = 0; i < assets.length; i += MAX_CONCURRENT_ITEMS) {
        chunks.push(assets.slice(i, i + MAX_CONCURRENT_ITEMS));
      }

      var currentProgress = 0;

      function loadNextChunk () {
        // No more chunks? Done!
        if (chunks.length === 0) {
          finishedCallback();
          return;
        }

        // Take one of the chunks.
        var chunk = chunks.pop();

        // Tell all of its assets to load.
        chunk.forEach(function (asset) {
          asset.load && asset.load();
        });

        // Ensure that chunk loads.
        __loader.ensureLoaded(chunk, function (p) {
          progressCallback((currentProgress + p) / assets.length);
        }, function () {
          // When a chunk is done, record progress and move onto the next.
          currentProgress += chunk.length;
          loadNextChunk();
        });
      }

      // Start loading!
      loadNextChunk();
    },

    // Same as loadBatch, but uses XHR to be sneaky :).
    loadXHRBatch: function (assets, progressCallback, finishedCallback) {
      var chunks = [];

      // Split things into chunks
      for (var i = 0; i < assets.length; i += MAX_CONCURRENT_ITEMS) {
        chunks.push(assets.slice(i, i + MAX_CONCURRENT_ITEMS));
      }

      var currentProgress = 0;

      function loadNextChunk () {
        // No more chunks? Done!
        if (chunks.length === 0) {
          finishedCallback();
          return;
        }

        // Take one of the chunks.
        var chunk = chunks.pop();

        // Tell all of its assets to load.
        chunk.forEach(function (asset, index) {
          if (['VIDEO', 'AUDIO'].indexOf(asset.nodeName) > -1) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', asset.currentSrc, true);
            xhr.responseType = 'blob';
            xhr._asset = asset;
            xhr.send();
            chunk[index] = xhr;
          }
        });


        // Ensure that chunk loads.
        __loader.ensureLoaded(chunk, function (p) {
          progressCallback((currentProgress + p) / assets.length);
        }, function () {
          // When a chunk is done, record progress and move onto the next.
          currentProgress += chunk.length;
          loadNextChunk();
        });
      }

      // Start loading!
      loadNextChunk();
    }
  };

  global.util.loader = __loader;

}(window));
