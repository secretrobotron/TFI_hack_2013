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
                // console.log("invideowaitevan" + video); 

                video.addEventListener('progress', function checkProgress(e) {
                  // console.log("checking progressxxx"); 
                  var percent = null; 
                  if (video && video.buffered && video.buffered.length >0 && video.buffered.end && video.duration) {
                    percent = video.buffered.end(0) / video.duration;
                       // console.log("1 video download:" + percent); 
                  }
                  //browser configuration??never goes in there? 
                  else if (video && video.bytesTotal != undefined && video.bytesTotal > 0 && video.bufferedBytes != undefined) {
                  percent = video.bufferedBytes / video.bytesTotal; 
                     console.log("2 video download:" + percent); 
                     //onLoaded.call(video,e); 
                }
                if (percent !== null) {
                  //makes sure it is never less than zero or more than a 100. 
                    percent = 100 * Math.min(1, Math.max(0, percent));
                    //video.removeEventListener('progress', progressCompleted, false);
                    console.log("3 video download:" + percent); 
                     if (percent == 100) {
                      console.log("you're done"); 
                      onLoaded.call(video,e); 
                      video.removeEventListener('progress', checkProgress, false); 
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
        },
                        
                      // //is it ready to play? 
                      // if (video.readyState) {
                          // var buffered = video.buffered.end(0);
                          // console.log("buffered: " + buffered +"\n"); 
                          // var percent = 100 * buffered / video.duration;
                          // console.log("percent" + percent+"\n"); 

                          //if it is loaded 
              //             if (percent >= 100) {
              //             // if (buffered >= video.duration) {
              //                     console.log("im done"); 
              //                     video.removeEventListener('progress', checkProgress, false);
              //                     // clearInterval(watchBuffer); 
              //                     onLoaded.call(video, e);
              //             }
              //         // }
              //     // var watchBuffer = setInterval(checkProgress, 500);
              //   }, false); 
              //   console.log("videoeventlistener for progress added");
              //     video.addEventListener('error', function internalOnError (e) {
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


  var __loader = {
    //the finished callback is where the init stuff is being called inside
    //of the js stuff 
    //do i need to add another funciton for the errorcallback in the constructor?
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
        console.log("itemProgressCallback"); 

      }


      function itemErrorCallback () {
        ++itemsFinished;
        checkItems();
      }

      function itemLoadedCallback () {
        ++itemsFinished;
        console.log("loadedcallback" + this); 
        // checkItems();
        finishedCallback(assets); 
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


