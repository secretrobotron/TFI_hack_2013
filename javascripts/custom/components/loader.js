(function(global){

  global.util = global.util || {};

  var __waiters = {
    IMG: function (image, onProgress, onLoaded, onError) {
      //this remains the same, it is not at html5 element. 
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

  //   VIDEO: function (video, onLoaded, onError) {
  //     //when you can play the whole thing 
  //     video.addEventListener('canplaythrough', function internalOnCanPlayThrough (e) {
  //       video.removeEventListener('canplaythrough', internalOnCanPlayThrough, false);
  //       onLoaded.call(video, e);
  //     }, false);
  //     video.addEventListener('error', function internalOnError (e) {
  //       video.removeEventListener('error', internalOnError, false);
  //       onError.call(video, e);
  //     }, false);
  //   },
  //   AUDIO: function (audio, onLoaded, onError) {
  //     audio.addEventListener('canplaythrough', function internalOnCanPlayThrough (e) {
  //       audio.removeEventListener('canplaythrough', internalOnCanPlayThrough, false);
  //       onLoaded.call(audio, e);
  //     }, false);
  //     audio.addEventListener('error', function internalOnError (e) {
  //       audio.removeEventListener('error', internalOnError, false);
  //       onError.call(audio, e);
  //     }, false);
  //   }
  // };


    VIDEO: function(video, onProgress, onLoaded, onError) {
                console.log("invideowait" + video); 

                video.addEventListener('progress', function updateProgress(e) {
                  console.log('lol');
                  // video.removeEventListener('progress', updateProgressBar, false);
                  onProgress.call(video, e);
                  // var percent = null; 
                  // console.log("this is the percent" + percent); 

                  //it doesn't enter the if statement, so it never atually loads the videos, which is clearly a problem. 
                      if (video.attr('readyState')) {
                          var buffered = video.buffered.end(0);
                          var percent = 100 * buffered / video.duration;

                          //Your code here
                          console.log("percent" + percent); 


                          //If finished buffering buffering quit calling it
                            if (buffered >= video.duration) {
                                    video.removeEventListener('progress', updateProgress, false);
                                    onLoaded.call(video,e); 
                            }
                      }
                }, false); 

                console.log("never entered the if statement"); 
                video.addEventListener('error', function internalOnError (e) {
                  video.removeEventListener('error', internalOnError, false);
                  onError.call(video, e);
                }, false);
              },  





               //    if (video && video.buffered && video.buffered.length > 0 && video.buffered.end && video.duration) {
               //      percent = video.buffered.end(0) / video.duration;
               //         console.log("video download:" + percent); 
               //         // onLoad.call(video,e); 
               //    }
               //    else if (video && video.bytesTotal != undefined && video.bytesTotal > 0 && video.bufferedBytes != undefined) {
               //    percent = video.bufferedBytes / video.bytesTotal; 
               //       console.log("video download:" + percent); 
               //  }

               //  if (percent !== null) {
               //    percent = 100 * Math.min(1, Math.max(0, percent));
               //   //video.removeEventListener('progress', progressCompleted, false);
               //    console.log("video download:" + percent); 
               //    onLoaded.call(video,e); 
               //    //maybe push these somewhere?to an array?
               //    // ... do something with var percent here (e.g. update the progress bar)
               //   }
               // }, false);
              //   console.log("never entered the if statement"); 
              //   video.addEventListener('error', function internalOnError (e) {
              //     video.removeEventListener('error', internalOnError, false);
              //     onError.call(video, e);
              //   }, false);
              // }, 

    AUDIO: function (audio, onProgress, onLoaded, onError) {
                  audio.addEventListener('progress', function progressCompleted(e) {
                  var percent = null; 
                  if (audio && audio.buffered && audio.buffered.length >0 && audio.buffered.end && audio.duration) {
                    percent = audio.buffered.end(0) / audio.duration;
                       console.log("audio download:" + percent); 
                  }
                  else if (audio && audio.bytesTotal != undefined && audio.bytesTotal > 0 && audio.bufferedBytes != undefined) {
                  percent = audio.bufferedBytes / audio.bytesTotal; 
                     console.log("audio download:" + percent); 
                     //onLoaded.call(video,e); 
                }

                if (percent !== null) {
                  percent = 100 * Math.min(1, Math.max(0, percent));
                  //video.removeEventListener('progress', progressCompleted, false);
                  console.log("audio download:" + percent); 
                  onLoaded.call(audio,e); 
                  //maybe push these somewhere?to an array?
                  // ... do something with var percent here (e.g. update the progress bar)
                 }
               }, false);
                audio.addEventListener('error', function internalOnError (e) {
                  audio.removeEventListener('error', internalOnError, false);
                  onError.call(audio, e);
                }, false);
      }, 
    }; //end of waiters 

  var __loader = {
    ensureLoaded: function (assets, progressCallback, finishedCallback) {
      if (Number(assets.length) !== assets.length) {
        __loader.ensureLoaded([assets], function () {
          finishedCallback(assets);
        });
        return;
      }

      var itemsFinished = 0;

      function checkItems () {
        if (itemsFinished === assets.length) {
          finishedCallback(assets);
          console.log("check items"); 
          //or send it somewhere. 
        }
      }

      function itemProgressCallback() {
        console.log("i am checking the asset progress"); 
        progressCallback(itemsFinished);
      }

      function itemErrorCallback () {
        ++itemsFinished;
        checkItems();
      }

      function itemLoadedCallback () {
        ++itemsFinished;
        console.log("loadedcallback"); 
        checkItems();
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