(function(global){

  global.util = global.util || {};

  var __waiters = {
    IMG: function (image, onLoaded, onError) {
      //this remains the same, it is not at html5 element. 
      //what would progress for an image look like?
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


    VIDEO: function(video, onProgress, onLoaded, onError) { 
                var path = $(video).children('source').attr('src');
                console.log(path)

                var timer = 0; 
                
                video.addEventListener('progress', function checkProgress(e) {
                  // console.log("checking progressxxx"); 
                  var percent = null; 
                  if (video && video.buffered && video.buffered.length >0 && video.duration) {
                    percent = video.buffered.end(0) / video.duration;
                       // console.log("1 video download:" + percent); 
                  }
                  //browser configuration??never goes in there? 
                  else if (video && video.bytesTotal != undefined && video.bytesTotal > 0 && video.bufferedBytes != undefined) {
                  percent = video.bufferedBytes / video.bytesTotal; 
                     // console.log("2 video download:" + percent); 
                     //onLoaded.call(video,e); 
                }
                if (percent !== null) {
                  //makes sure it is never less than zero or more than a 100. 
                    percent = parseInt(100 * Math.min(1, Math.max(0, percent)));
                    onProgress(video,percent); 
                    //video.removeEventListener('progress', progressCompleted, false);
                    //console.log("video download:" + percent); 
                     if (percent == 100) {
                      console.log("done " + path);
                      video.removeEventListener('progress', checkProgress, false); 
                      onLoaded.call(video,e); 
                      // video.removeEventListener('progress', checkProgress, false); 
                     }
          
                    // video.removeEventListener('progress,')
                    //maybe push these somewhere?to an array?
                    // ... do something with var percent here (e.g. update the progress bar)
                   }
                 }, false);
                  video.addEventListener('error', function internalOnError (e) {
                    video.removeEventListener('error', internalOnError, false);
                    onError.call(video, e);
                  }, false);

                              /************

                The 'canplaythrough' event should be used to track whether asset has loaded, 
                'progress' event may not be called, e.g. if asset is already cached
                As the loader being used does not indicate progress (i.e. percent complete) can
                comment out the progress event listener.

                ************/

                  // video.addEventListener('canplaythrough', function canPlayThrough(e) {
                  //   video.removeEventListener('canplaythrough', canPlayThrough, false);
                  //   onLoaded.call(video,e);
                  // }, false);

                  // video.addEventListener('error', function internalOnError (e) {
                  //   video.removeEventListener('error', internalOnError, false);
                  //   onError.call(video, e);
                  // }, false);
                },
  
    AUDIO: function (audio, onProgress, onLoaded, onError) {
      var path = $(audio).children('source').attr('src');
      console.log(path)
        audio.addEventListener('progress', function checkProgress(e) {
            //I think the reason why we are getting two sources i because it is an html5 version. cause it is only getting
            //the mp3s
            var percent = null;

            //Asset not completed, saving percentages
            // if (audio && audio.buffered && audio.buffered.length > 0 && audio.buffered.end && audio.duration) {
            if (audio && audio.buffered && audio.buffered.length > 0 && audio.duration) {
                  percent = audio.buffered.end(0) / audio.duration;
            }

            //Asset not completed, saving percentes ( browser specific)
            else if (audio && audio.bytesTotal != undefined && audio.bytesTotal > 0 && audio.bufferedBytes != undefined) {
                percent = audio.bufferedBytes / audio.bytesTotal; 
                // console.log("audio download:" + percent); 
                //onLoaded.call(video,e); 
            }

          if (percent !== null) {
            percent = parseInt(100 * Math.min(1, Math.max(0, percent)));
            //console.log('this is percent', percent);
            onProgress(audio, percent);
            if (percent == 100) {

                console.log("done " + path);
              // console.log("done audio"); 
                 audio.removeEventListener('progress', checkProgress, false); 
                 onLoaded.call(audio,e);
            }
           }
         }, false);
          
          audio.addEventListener('error', function internalOnError (e) {
            audio.removeEventListener('error', internalOnError, false);
            onError.call(audio, e);
          }, false);
      
          /************

          The 'canplaythrough' event should be used to track whether asset has loaded, 
          'progress' event may not be called, e.g. if asset is already cached
          As the loader being used does not indicate progress (i.e. percent complete) can
          comment out the progress event listener.

          ************/
          
          // audio.addEventListener('canplaythrough', function canPlayThrough(e) {
          //   audio.removeEventListener('canplaythrough', canPlayThrough, false);
          //   onLoaded.call(audio,e);
          // }, false);

          // audio.addEventListener('error', function internalOnError (e) {
          //   audio.removeEventListener('error', internalOnError, false);
          //   onError.call(audio, e);
          // }, false);
        }, 
      }; //end of waiters 

  var __loader = {
    //the finished callback is where the init stuff is being called inside
    //of the js stuff 
    //do i need to add another funciton for the errorcallback in the constructor?
    ensureLoaded: function (assets, progressCallback, finishedCallback) {
      var totalPercent = 0;
      if (Number(assets.length) !== assets.length) {
          console.log("first conditional"); 
        __loader.ensureLoaded([assets], function () {
          finishedCallback(assets);
        });
        return;
      }

      var itemsFinished = 0;
      var totalPercent = 0;

      function checkItems () {
        //i ti snever incresing the numebr of items in here. 

        if (itemsFinished === assets.length) {
          finishedCallback(assets);
          //callback(assets); 
          console.log("finished items"); 
          //or send it somewhere. 
        }
        // else {
        //   itemProgressCallback(100);
        // }
      }

      function itemProgressCallback(audio, percent){
      console.log("progress calbback"); 
       
      }

      function itemErrorCallback () {
        console.log('error');
        ++itemsFinished;
        checkItems();
      }

      function itemLoadedCallback () {
        console.log('item finished');
        ++itemsFinished;
         checkItems();
        //finishedCallback(assets); 
      }

      assets.forEach(function (asset) {
        if (__waiters[asset.nodeName]) {
          __waiters[asset.nodeName](asset, itemProgressCallback, itemLoadedCallback, itemErrorCallback); 
          // __waiters[asset.nodeName](asset, itemLoadedCallback, itemErrorCallback); //report on the progress?
        }
      });
    }
  };

  global.util.loader = __loader;

}(window));


