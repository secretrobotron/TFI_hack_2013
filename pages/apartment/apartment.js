(function() {

  var VIDEO_TRANSITION_DURATION = 1000;
  var BUTTON_SHOW_DELAY = 1500;
  var BACKGROUND_SOUND_DELAY = 2000;
  var BACKGROUND_SOUND_VARIANCE = 4000;



  function prepareBackgroundSoundsLoop (sounds) {
    var currentSound;
    var nextSound;

    //there iis something here where it is playing the same audio over and over 

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
      //takes a group of sounds and ensures that they play as a backgroup 
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
    // $('#overlay').fadeOut();


    //hide the navigation. 
    if (window.parent && window.parent.hideNav) {
      window.parent.hideNav();
    }

    var instructions = document.querySelector('#instructions'); 

    var startVideo = document.querySelector('video[data-video="start"]');
    var backgroundVideo = document.querySelector('video[data-video="background"]');
    var kitchenVideo = document.querySelector('video[data-video="kitchen"]');
    var rightVideos = Array.prototype.slice.call(document.querySelectorAll('video[data-video="right"]'));
    var leftVideos = Array.prototype.slice.call(document.querySelectorAll('video[data-video="left"]'));
    var videoContainer = document.querySelector('#video-container');
    var centerVideos = [backgroundVideo, kitchenVideo, startVideo];
    var videos = centerVideos.concat(rightVideos).concat(leftVideos); //they are all part of the array. 
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

    function onLeftButtonClick (e) {
      videoContainerIndex = Math.min(videoContainerIndex + 1, 1);
      playPositionedVideo();
      instructions.classList.remove('hidden'); 
      videoContainer.style.left = 50 + videoContainerIndex * 100 + '%';

      if (videoContainerIndex === 1) {
        leftButton.classList.add('hidden');
        leftButton.removeEventListener('click', onLeftButtonClick, false);
      }
      else if (videoContainerIndex === 0) {
        rightButton.classList.remove('hidden');
        rightButton.addEventListener('click', onRightButtonClick, false);        
      }
    }

    function onRightButtonClick (e) {
      videoContainerIndex = Math.max(videoContainerIndex - 1, -1);
      playPositionedVideo();
      instructions.classList.remove('hidden'); 
      videoContainer.style.left = 50 + videoContainerIndex * 100 + '%';

      if (videoContainerIndex === -1) {
        rightButton.classList.add('hidden');
        rightButton.removeEventListener('click', onRightButtonClick, false);
      }
      else if (videoContainerIndex === 0) {
        leftButton.classList.remove('hidden');
        leftButton.addEventListener('click', onLeftButtonClick, false);        
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

    leftVideos.videoIndex = 0;
    rightVideos.videoIndex = 0;

    //here, it is checking that all of the audio and video files are part of the assets array. 
    var assets = videos.concat(audio);

//this should potentially get this to not start the audio at the same time. 
    
    volumeTweenController.start();
    startVideo.play(); 
    backgroundVideo.play(); 
    prepareBackgroundSoundsLoop(audio).start(); 
  }

function preLoad(e) {
     // $('#overlay').fadeIn();
     console.log("i am in preload"); 

    var instructions = document.querySelector('#instructions'); 

    var startVideo = document.querySelector('video[data-video="start"]');
    var backgroundVideo = document.querySelector('video[data-video="background"]');
    var kitchenVideo = document.querySelector('video[data-video="kitchen"]');
    var rightVideos = Array.prototype.slice.call(document.querySelectorAll('video[data-video="right"]'));
    var leftVideos = Array.prototype.slice.call(document.querySelectorAll('video[data-video="left"]'));
    var videoContainer = document.querySelector('#video-container');
    var centerVideos = [backgroundVideo, kitchenVideo, startVideo]; 

    //check that all videos have loaded or wait for them to load. 
    var videos = centerVideos.concat(rightVideos).concat(leftVideos); //they are all part of the array. 

  //check that all audio has loaded 
    var audio = Array.prototype.slice.call(document.querySelectorAll('audio'));

    //after you wait, now you ensure if it is loaded. 
    var assets = videos.concat(audio);

    //util.loader.ensureLoaded(assets, init) //this should be the things that should be in other places. 

    util.loader.ensureLoaded(assets, function () {
        //cool i received a progress update!
        // progressBar.update(oweifnoiwmef);
    }, function(){
      console.log("in ensureLoaded + have fired callback"); 
      window.addEventListener('resize', positionVideo, false);
      positionVideo();
      
      var volumeTweenController = prepareVolumeTweening();

      // volumeTweenController.start();
      //moved it to init to fix the audio. 

      rightVideos.concat(leftVideos).concat(kitchenVideo).forEach(function (video) {
        console.log("preparing volume tween"); 
        volumeTweenController.prepareVolumeTweenForElement(video, 0);
      });

      volumeTweenController.prepareVolumeTweenForElement(backgroundVideo, 1);

      kitchenVideo.hidden = true;
      backgroundVideo.hidden = true;


      startVideo.pause();
      startVideo.addEventListener('ended', function onStartVideoEnded (e) {
        startVideo.removeEventListener('ended', onStartVideoEnded, false);
  
        backgroundVideo.hidden = false;
        startVideo.hidden = true;
        backgroundVideo.pause();

        setTimeout(function () {
          rightButton.classList.remove('hidden');
          leftButton.classList.remove('hidden');
          instructions.classList.remove('hidden'); 
          leftButton.addEventListener('click', onLeftButtonClick, false);
          rightButton.addEventListener('click', onRightButtonClick, false);
        }, BUTTON_SHOW_DELAY);

        //If background video has ended, then take me to the next scene. 
        backgroundVideo.addEventListener('ended', function (e) {
          if (window.parent && window.parent.next) {
            //uncomment that out to go to the next page. 
            //window.parent.next();
            alert("click here to go to her real estate website"); 
            continueMessage.classList.remove("hidden"); 
          }
          else {
            videoContainer.style.left = '50%';
            leftButton.removeEventListener('click', onLeftButtonClick, false);
            rightButton.removeEventListener('click', onRightButtonClick, false);
            rightButton.classList.remove('hidden');
            instructions.classList.remove('hidden'); 
            leftButton.classList.add('hidden');
            rightButton.addEventListener('click', function (e) {
            }, false);
          }
        }, false);
      }, false);

      //prepareBackgroundSoundsLoop(audio).start();

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
    }); //ensureloader ends. 

    assets.forEach(function (asset) {
      asset.load && asset.load();
    });

    }; //preloader ends 

    // setTimeout(function() {
    //   init(); 
    // }, 2000); 
  // setTimeout(function() {
  //   $('#overlay').fadeOut();
  //       setTimeout(function() {
  //       init(); 
  //     },6000); 
  // },6000) 
 
 
    //showLoading(); 
  

  document.addEventListener('DOMContentLoaded', preLoad, false);
}());