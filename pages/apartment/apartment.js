(function() {
      window.parent.hideNav();
      window.parent.disableRightLeft(); 
 

  window.top.disableKeyLeft(); 

  var VIDEO_TRANSITION_DURATION = 1000;
  var BUTTON_SHOW_DELAY = 1500;
  var BACKGROUND_SOUND_DELAY = 2000;
  var BACKGROUND_SOUND_VARIANCE = 4000;

  function prepareBackgroundSoundsLoop (sounds) {
    var currentSound;
    var nextSound;

    function playNextSound () {
      nextSound = sounds[Math.floor(Math.random() * sounds.length)];
      while (nextSound === currentSound) {
        nextSound = sounds[Math.floor(Math.random() * sounds.length)];
      }

      nextSound.addEventListener('ended', function onSoundEnded (e) {
        nextSound.removeEventListener('ended', onSoundEnded, false);
        setTimeout(function () {
          playNextSound();
        }, BACKGROUND_SOUND_DELAY + Math.round(Math.random() * BACKGROUND_SOUND_VARIANCE));
      }, false);

      nextSound.play();
    }

    return {
      start: function () {
        playNextSound();
      }
    };
  }

  function prepareVolumeTweening () {
    var volumeTweenElements = [];
    var volumeLoopTimeout = -1;

    function volumeLoop () {
      var changed = false;

      volumeTweenElements.forEach(function (obj) {
        if (obj) {
          changed = obj.processVolumeTween() ? true : changed;
        }
      });

      volumeLoopTimeout = setTimeout(volumeLoop, 10);
    }

    return {
      start: function () {
        volumeLoop();
      },
      stop: function () {
        clearTimeout(volumeLoopTimeout);
      },
      prepareVolumeTweenForElement: function (element, startVolume) {
        var _targetVolume;
        element.volume = _targetVolume = startVolume || 0;

        var startTime, originalVolume;

        element.processVolumeTween = function () {
          var time = Date.now();
          var dt = time - startTime;

          var newVolume = originalVolume < _targetVolume ? _targetVolume - originalVolume * dt : originalVolume - _targetVolume * dt;

          if (newVolume !== element.volume) {
            element.volume = newVolume;
            return true;
          }
          volumeTweenElements.splice(volumeTweenElements.indexOf(element), 1);
          return false;
        }
        Object.defineProperty(element, 'targetVolume', {
          get: function() {
            return _targetVolume;
          },
          set: function (val) {
            originalVolume = _targetVolume;
            startTime = Date.now();
            if (volumeTweenElements.indexOf(element) === -1) {
              volumeTweenElements.push(element);              
            }
            _targetVolume = val;
          }
        });
      }
    }
  }

  function init(e) {

    if (window.parent && window.parent.hideNav) {
      window.parent.hideNav();
    }


    var leftButton = document.querySelector('#left-button');
    var rightButton = document.querySelector('#right-button');
    var continueMessage = document.querySelector('#continue-message');
    var instructions = document.querySelector('#instructions'); 
    var lookAround = document.querySelector('#look-around'); 

    var startVideo = document.querySelector('video[data-video="start"]');
    var backgroundVideo = document.querySelector('video[data-video="background"]');
    var kitchenVideo = document.querySelector('video[data-video="kitchen"]');
    var rightVideos = Array.prototype.slice.call(document.querySelectorAll('video[data-video="right"]'));
    var leftVideos = Array.prototype.slice.call(document.querySelectorAll('video[data-video="left"]'));
    var videoContainer = document.querySelector('#video-container');
    var centerVideos = [backgroundVideo, kitchenVideo, startVideo];
    var video = centerVideos.concat(rightVideos).concat(leftVideos);
    var audio = Array.prototype.slice.call(document.querySelectorAll('audio'));


    var videoContainerIndex = 0;

    function stopVideosAfterTransition (videos) {
      videos.forEach(function (video) {
        video.transitionTimeout = setTimeout(function (e) {
          video.pause();
          video.transitionTimeout = null;
          video.hidden = true;
        }, VIDEO_TRANSITION_DURATION);
      });
    }

    function stopOtherVideosInGroup (exemptVideo, videoGroup) {
      videoGroup.forEach(function (video) {
        if (video !== exemptVideo) {
          video.pause();
          video.hidden;
          if (video.transitionTimeout) {
            clearTimeout(video.transitionTimeout);
          }
        }
      });
    }

    function playAndShowVideo (video) {
      if (video.transitionTimeout) {
        clearTimeout(video.transitionTimeout);
      }
      video.hidden = false;
      video.play();
    }

    function playPositionedVideo () {
      var newIndex, newVideo;
      switch(videoContainerIndex) {
        case -1:
          newIndex = rightVideos.videoIndex;
          newVideo = rightVideos[newIndex];
          stopVideosAfterTransition([kitchenVideo]);
          stopOtherVideosInGroup(newVideo, rightVideos);
          playAndShowVideo(newVideo);
          rightVideos.videoIndex = (rightVideos.videoIndex + 1) % rightVideos.length;
        break;

        case 0:
          stopVideosAfterTransition(rightVideos.concat(leftVideos));
          if (Math.random() > .5) {
            playAndShowVideo(kitchenVideo);
          }
        break;

        case 1:
          newIndex = leftVideos.videoIndex;
          newVideo = leftVideos[newIndex];
          stopVideosAfterTransition([kitchenVideo]);
          stopOtherVideosInGroup(newVideo, leftVideos);
          playAndShowVideo(newVideo);
          leftVideos.videoIndex = (leftVideos.videoIndex + 1) % leftVideos.length;
        break;
      }
    }

         var keyPressRight = function(e) {
            console.log("pressed a key"); 
            if (e.which == 39) {
              console.log("right"); 
              //this is not working, when you press up. 
                onRightButtonClick(e); 
              }
            }


            var keyPressLeft = function(e) {
              if (e.which == 37) {
                onLeftButtonClick(e); 
              }
            }

    // document.addEventListener('keydown',keyPressLeft, false); 

    function onLeftButtonClick (e) {
      // document.addEventListener('keydown',keyPressLeft, false); 
      // document.addEventListener('keydown', keyPressRight, false); 

      videoContainerIndex = Math.min(videoContainerIndex + 1, 1);
      playPositionedVideo();
      videoContainer.style.left = 50 + videoContainerIndex * 100 + '%';

      if (videoContainerIndex === 1) {
        leftButton.classList.add('hidden');
        lookAround.classList.add('hidden'); 
        leftButton.removeEventListener('click', onLeftButtonClick, false);
        document.removeEventListener('keydown',keyPressLeft, false); 

      }
      else if (videoContainerIndex === 0) {
        rightButton.classList.remove('hidden');
        lookAround.classList.remove('hidden'); 
        rightButton.addEventListener('click', onRightButtonClick, false);
        document.addEventListener('keydown', keyPressRight, false);    
        // document.addEventListener('keydown', keyPressRight, false); 
     
      }
    }

    function onRightButtonClick (e) {
      // document.addEventListener('keydown', keyPressRight, false); 
      // document.addEventListener('keydown',keyPressLeft, false); 

      videoContainerIndex = Math.max(videoContainerIndex - 1, -1);
      playPositionedVideo();
      videoContainer.style.left = 50 + videoContainerIndex * 100 + '%';

      if (videoContainerIndex === -1) {
        rightButton.classList.add('hidden');
        lookAround.classList.add('hidden'); 
        rightButton.removeEventListener('click', onRightButtonClick, false);
        document.removeEventListener('keydown', keyPressRight, false); 
      }
      else if (videoContainerIndex === 0) {
        leftButton.classList.remove('hidden');
        lookAround.classList.remove('hidden'); 
        leftButton.addEventListener('click', onLeftButtonClick, false);   
        document.addEventListener('keydown', keyPressLeft, false);      
      }
    }

    function positionVideo () {
      var aspectRatio = backgroundVideo.videoWidth / backgroundVideo.videoHeight;
      var scale = 1;

      videoContainer.style.width = backgroundVideo.videoWidth + 'px';
      videoContainer.style.height = backgroundVideo.videoHeight + 'px';
      videoContainer.style.marginLeft = -backgroundVideo.videoWidth / 2 + 'px';
      videoContainer.style.marginTop = -backgroundVideo.videoHeight / 2 + 'px';

      if (window.innerWidth / backgroundVideo.videoWidth * backgroundVideo.videoHeight < window.innerHeight) {
        scale = window.innerHeight / backgroundVideo.videoHeight;
      }
      else {
        scale = window.innerWidth / backgroundVideo.videoWidth;
      }

      videoContainer.style.transform = videoContainer.style.WebkitTransform = videoContainer.style.MozTransform = 
        videoContainer.style.webkitTransform = videoContainer.style.mozTransform = 'scale(' + scale + ')';

    }
    //there was some popcorn js stuff from the steps left here. 

    leftVideos.videoIndex = 0;
    rightVideos.videoIndex = 0;

    var assets = video.concat(audio);
    console.log('asset length', assets.length); 
    //console.dir(assets)

      $('#overlay1').fadeIn();
    util.loader.ensureLoaded(assets, function(percent) {
      console.log("total percenteges: ", percent);
          percent *= 100;
          percent += "%";
          $("#AptProgressBar #Progress").stop()
        .animate({
          width : percent
        }, 100);
    }, function(){
      console.log("DONEEEEE");
      $('#overlay1').fadeOut();
      
      window.addEventListener('resize', positionVideo, false);
      positionVideo();
      
      var volumeTweenController = prepareVolumeTweening();

      volumeTweenController.start();

      rightVideos.concat(leftVideos).concat(kitchenVideo).forEach(function (video) {
        volumeTweenController.prepareVolumeTweenForElement(video, 0);
      });

      volumeTweenController.prepareVolumeTweenForElement(backgroundVideo, 1);

      kitchenVideo.hidden = true;
      backgroundVideo.hidden = true;

      startVideo.play();

      backgroundPause = false; 
      backgroundPlaying = false; 


        var keyPressInstructions = function(e) {
            console.log('pressed a key'); 
                    if (e.which !== 37 || e.which !== 39) {
                      console.log('not left or right'); 
                     hideInstructions(); 
                    }
                  }
      //this is when the start video ends, what do you want to have happen?
      startVideo.addEventListener('ended', function onStartVideoEnded (e) {
        startVideo.removeEventListener('ended', onStartVideoEnded, false);

          backgroundVideo.hidden = false;
          startVideo.hidden = true;
          backgroundVideo.pause();
          backgroundPause = true; 

          if (backgroundPause) {
            console.log('background video is paused'); 
            //pause the background video after start video ends and add the instructions. 
            instructions.classList.remove('hidden'); 
             document.addEventListener('keydown', keyPressInstructions, false); 

                window.addEventListener('click', function hideInstructions() {
                  window.removeEventListener('click', hideInstructions, false )
                  instructions.classList.add('hidden'); 
                  backgroundVideo.play(); 
                }, false); 

                // document.addEventListener('keydown', keyPressInstructions, false); 
          }

          backgroundPlaying = true; 

          if (backgroundPlaying) {
                   //add button controls 
                   rightButton.classList.remove('hidden');
                   leftButton.classList.remove('hidden');
                   leftButton.addEventListener('click', onLeftButtonClick, false);
                   rightButton.addEventListener('click', onRightButtonClick, false);
                   document.addEventListener('keydown', keyPressRight, false); 
                   document.addEventListener('keydown', keyPressLeft, false); 

                backgroundVideo.addEventListener('ended', function (e) {
                  if (window.parent && window.parent.next) {
                    window.parent.next();
                  }
                  else {
                    videoContainer.style.left = '50%';
                    leftButton.removeEventListener('click', onLeftButtonClick, false);
                    rightButton.removeEventListener('click', onRightButtonClick, false);
                    document.removeEventListener('keydown', keyPressLeft, false); 
                    document.removeEventListener('keydown', keyPressRight, false); 
                    rightButton.classList.remove('hidden');
                    leftButton.classList.add('hidden');
                    rightButton.addEventListener('click', function (e) {
                    }, false);
                }
              }, false);
          }
      }, false);
      prepareBackgroundSoundsLoop(audio).start();
    });
  }

  document.addEventListener('DOMContentLoaded', init, false);
}());