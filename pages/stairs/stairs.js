(function() {
  window.parent.disableRightLeft();  
  window.parent.hideNavPrev(); 
  window.parent.hideNav();



  var FADE_TRANSITION_DURATION = 1000;
  var FLOOR_SOUND_DELAY = 05;
  var FLOOR_SOUND_SEQUENCE_DELAY = 10;
  var FLOOR_SOUND_SEQUENCE_DELAY_VARIANCE = 10;

  var VIDEO_FPS = 24;

  // in seconds; latter segment converts from frames to fractions of second (base 10)
  var INTERACTION_START_TIME = 20 + (19 / VIDEO_FPS);

  //here is where I change where the interaction stops and the video can just play 
  var INTERACTION_END_TIME = 105 + (0 / VIDEO_FPS);

  var VIDEO_END_TIME = 119 + (0 / VIDEO_FPS);   //the video is 2:00 min- 120 seconds. 

  var SKIP_NOTICE_TIME = 10;

  var video;
  var popcorn;
  
  var numFloors = 1;
  var numSteps = 0;

  var volumeTweenController;
  var backgroundAudioController;
  var floorAudioController;

  function positionVideo () {
    console.log("positioning video"); 
    var video = document.querySelector('video[data-video="stairs"]');
    var width, height;
    var aspectRatio = video.videoWidth / video.videoHeight;

    // TODO: fix this scaling
    if (window.innerHeight * aspectRatio < window.innerWidth) {
      width = window.innerWidth;
      height = width / aspectRatio;      
    }
    else {
      height = window.innerHeight;
      width = height * aspectRatio;      
    }

    video.width = width;
    video.height = height;

    video.style.width = width + 'px';
    video.style.height = height + 'px';

    video.style.top = window.innerHeight / 2 - height / 2 + 'px';
    video.style.left = window.innerWidth / 2 - width / 2 + 'px';
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
        var _targetVolume, _realVolume;
        element.volume = _targetVolume = _realVolume = startVolume || 0;
        element.processVolumeTween = function () {
          _realVolume -= (_realVolume - element.targetVolume) * .15;
          var newVolume = Math.round(_realVolume * 1000) / 1000; // quick decimal truncate
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
            if (volumeTweenElements.indexOf(element) === -1) {
              volumeTweenElements.push(element);              
            }
            _targetVolume = val;
          }
        });
      }
    }
  }

  function prepareBackgroundAudio () {
    var stopFlag = false;
    var loopTimeout;
    var currentBackgroundAudioIndex = 0;
    var currentBackgroundAudio;

    var backgroundAudioClones = [
      document.querySelector('audio[data-background]'),
      document.querySelector('audio[data-background]').cloneNode(true)
    ];

    volumeTweenController.prepareVolumeTweenForElement(backgroundAudioClones[0], 0);
    volumeTweenController.prepareVolumeTweenForElement(backgroundAudioClones[1], 0);

    function backgroundAudioLoop () {
      if (currentBackgroundAudio.currentTime > currentBackgroundAudio.duration - .2) {
        var lastTargetVolume = currentBackgroundAudio.targetVolume;
        var lastVolume = currentBackgroundAudio.volume;
        var lastBackgroundAudio = currentBackgroundAudio;
        setTimeout(function(){
          lastBackgroundAudio.pause();
          lastBackgroundAudio.currentTime = 0;
        }, 100);
        currentBackgroundAudioIndex = (currentBackgroundAudioIndex + 1) % 2;
        currentBackgroundAudio = backgroundAudioClones[currentBackgroundAudioIndex];
        currentBackgroundAudio.volume = lastVolume;
        currentBackgroundAudio.targetVolume = lastTargetVolume;
        currentBackgroundAudio.play();
      }
      if (!stopFlag) {
        loopTimeout = setTimeout(backgroundAudioLoop, 100);
      }
    }

    currentBackgroundAudio = backgroundAudioClones[0];

    return {
      start: function () {
        currentBackgroundAudio.play();
        backgroundAudioLoop();
        stopFlag = false;
      },
      stop: function () {
        clearTimeout(loopTimeout);
        currentBackgroundAudio.pause();
        stopFlag = true;
      },
      fadeOut: function () {
        currentBackgroundAudio.targetVolume = 0;
      },
      fadeIn: function () {
        currentBackgroundAudio.targetVolume = 1;
      }
    }
  }

  function prepareFloorAudio () {
    var currentFloorAudioIndex = 0;

    var currentFloorAudio = null;
    var audioOnFloors = [];
    Array.prototype.forEach.call(document.querySelectorAll('audio[data-floor]'), function (element) {
      var floorIndex = Number(element.getAttribute('data-floor'));
      audioOnFloors[floorIndex] = audioOnFloors[floorIndex] || [];
      audioOnFloors[floorIndex].push(element);
      volumeTweenController.prepareVolumeTweenForElement(element, 0);
    });

    return {
      resetFloorIndex: function () {
        currentFloorAudioIndex = 0;
      },
      playFloorAudio: function (endedCallback) {
        if (!currentFloorAudio && audioOnFloors[numFloors]) {
          currentFloorAudio = audioOnFloors[numFloors][currentFloorAudioIndex++];
          if (currentFloorAudio) {
            setTimeout(function(){
              currentFloorAudio.volume = 0;
              currentFloorAudio.targetVolume = 1;
              currentFloorAudio.play();
              currentFloorAudio.addEventListener('ended', function (e) {
                currentFloorAudio = null;
                endedCallback(e);
              }, false);
            }, FLOOR_SOUND_DELAY);
          }
        }
      }
    }
  }

  function prepareStepsIncrementer (stairCounterSpan) {
    var real = 0;
    var rounded = 0;

    function loop () {
      var lastRounded = rounded;

      real -= (real - numSteps) * .15; //easy-mcpeasy tween
      rounded = Math.round(real);

      if (rounded !== lastRounded) {
        stairCounterSpan.innerHTML = rounded;
      }
      setTimeout(loop, 10);
    }
    loop();
  }

 


  function init(e) { 
       //this should make you be able to click the button when you press key. 

    console.log("i am in init in stairs"); 
    var progressButton = document.querySelector('#progress-button');
    var progressExplanation = document.querySelector('#progress-explanation');
    var stairCounter = document.querySelector('#stair-counter');
    var floorCounter = document.querySelector('#floor-counter');
    var floorCounterSpan = floorCounter.querySelector('span');
    var skipNotice = document.querySelector('#skip-notice'); 
    var instructions = document.querySelector('#instructions'); 
    //var video = document.querySelector('video');
    var video = document.querySelector('video[data-video="stairs"]');

    var stepData = JSON.parse(document.querySelector('#step-data').innerHTML);
    var floorData = JSON.parse(document.querySelector('#floor-data').innerHTML);

    ///making a new method for popcorn objects
    Popcorn.plugin('step', {
      start: function () {
        ++numSteps;
      }
    });

    Popcorn.plugin('floor', {
      start: function () {
        ++numFloors;
        floorAudioController.resetFloorIndex();
        floorCounterSpan.innerHTML = numFloors;
      }
    });



    //this will add the assets in the array audio as well as the background audio 
    var audio = Array.prototype.slice.call(document.querySelectorAll('audio'));
    //now we have all the assets
    // var video = document.querySelector('video'); 
    //var assets = audio.concat(video);
    var assets = audio; 
    //var assets = video.concat(audio); 
    console.log("assets" + assets.length);
    $("#overlay").fadeIn(); 


    util.loader.ensureLoaded(assets, function(percent) { 
      console.log("total percentages: ", percent);
      percent *= 100;
      percent += "%";
      $("#StairsProgressBar #Progress").stop()
        .animate({
          width : percent
        }, 100);
        window.top.disableKeyLeft(); 

    }, function() { 
      console.log("DONEEEEE");
      $("#overlay").fadeOut();
      video.classList.remove('hidden');  


      var playing = false;
      var keyUpTimeout = -1;
      var skipping = false;

      window.addEventListener('resize', positionVideo, false);
      positionVideo();

      popcorn = Popcorn("#stairs_video");

      // start stairway interaction
    popcorn.cue(INTERACTION_START_TIME, function () {
        //this is where you call that initial event listener for the up button. 

        //show the instructions + pause video 
        instructions.classList.remove('hidden'); 
        video.classList.add('paused');

               window.addEventListener('click', function() {
                    instructions.classList.add('hidden'); 
                    stairCounter.classList.remove('hidden');
                    floorCounter.classList.remove('hidden');
                    progressButton.classList.remove('hidden');
                //shows you you can skip when the button is paused(); 
                    skipNotice.classList.remove('hidden');
                 }); 

          var keyPressUp = function(e) {
            console.log("pressed a key"); 
            if (e.which == 38) {
              console.log("up"); 
              //this is not working, when you press up. 
                onProgressButtonMouseDown(e); 
              }
            }


            var keyReleaseUp = function(e) {
              if (e.which == 38) {
                onProgressButtonMouseUp(e); 
              }
            }


         setTimeout(function () {
          //this is to enable you to press the key up and go 
           progressButton.addEventListener('mousedown', onProgressButtonMouseDown, false);
           progressButton.addEventListener('mouseup', onProgressButtonMouseUp, false); 
           document.addEventListener('keydown', keyPressUp, false); 
           document.addEventListener('keyup',keyReleaseUp, false); 
           enableKeyBackspace(); 
           //enableKeyUp();   
           //this should allow you to go up the stairs. 
           //window.parent.enableKeyUp(); 
           //to enable the backspace, to skip // this works. 
           //window.parent.enableKeyBackspace(); 
           //pausing the video 
           popcorn.pause();
         }, 500); //after a second allow skipping and the button interaction
      }); //END INTERACTION START TIME. 

  
  //(AFTER EVERYTHING INSIDE OF THE STAIRS IS DONE AND YOU ARE WATCHING THE LAST VIDEO)
  popcorn.cue(INTERACTION_END_TIME, function () {
      progressButton.classList.add('hidden');
          setTimeout(function () {
            stairCounter.classList.add('hidden');
            floorCounter.classList.add('hidden');
            skipNotice.classList.add('hidden'); 
            video.play(); 
          }, 2000);
        
        popcorn.play();
        video.classList.remove('paused');
         });

        //wehn video ends 
        popcorn.cue(VIDEO_END_TIME, function(e) {
        //console.log("it should go to the apartment scene now");
        //take me to the next page (apt) 
            window.parent.next()
            window.top.hideNavNext(); 
            window.top.hideNavPrev(); 
          
      }); 


      stepData.forEach(function (step) {
        // Attempt to force a float for time, wrt 24 fps.
        popcorn.step({ start: Popcorn.util.toSeconds(step, 24) });
      });

      floorData.forEach(function (floor) {
        // Attempt to force a float for time, wrt 24 fps.
        popcorn.floor({ start: Popcorn.util.toSeconds(floor, 24) });
      });

      video.classList.add('full-opacity');

      function attemptToPlayVideo (e) {
        e.preventDefault();
        if (!playing) {
          console.log("video should be playing"); 
          playing = true;
          video.play();
          video.classList.remove('paused');
          backgroundAudioController.fadeOut();
        }
      }

      document.getElementById('progress-button').addEventListener('click', onProgressButtonMouseDown, false); 

      function tryAnotherFloorAudio () {
        setTimeout(function () {
          if (!playing) {
            floorAudioController.playFloorAudio(tryAnotherFloorAudio);
          }
        }, FLOOR_SOUND_SEQUENCE_DELAY + Math.round(Math.random()*FLOOR_SOUND_SEQUENCE_DELAY_VARIANCE));
      }

      function attemptToPauseVideo (e) {
        e.preventDefault();
        if (keyUpTimeout === -1 && !skipping) {
          video.classList.add('paused');
          keyUpTimeout = setTimeout(function(){
            if (!skipping) {
              playing = false;
              video.pause();
              keyUpTimeout = -1;
              backgroundAudioController.fadeIn();
              floorAudioController.playFloorAudio(tryAnotherFloorAudio);
            }
          }, FADE_TRANSITION_DURATION);
        }

      }

  
       //This will allow the user to go to the end. 
      function onSkipButton() {
            //this is what will happen when you click the skip button
        console.log("the button should skip to the last frame: "+INTERACTION_END_TIME); 
        skipNotice.classList.add('hidden');
       // popcorn.floor = floorData[4]
        skipping = true; 
        console.log(popcorn);
       //WTMFF = WHAT THE MOTHER FUCKING FUCK??!!!
        popcorn.currentTime(INTERACTION_END_TIME).play();
      }
      //here i grab the button 
      document.getElementById('skip-notice').addEventListener('click', onSkipButton, false); 
      
      function onProgressButtonMouseUp (e) {
        console.log("detect a moused up"); 
        skipping = false;
        progressButton.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
        progressButton.style.color = "rgba(0, 0, 0, 0.8)";
        attemptToPauseVideo(e);
      }

      function onProgressButtonMouseDown (e) {
        console.log("detect mouse down")
        skipping = false;
        progressButton.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
        progressButton.style.color = "rgba(255, 255, 255, 0.8)";
        attemptToPlayVideo(e);
   
      }

      volumeTweenController = prepareVolumeTweening();
      floorAudioController = prepareFloorAudio();
      backgroundAudioController = prepareBackgroundAudio();

      prepareStepsIncrementer(stairCounter.querySelector('span'));

      volumeTweenController.start();
      backgroundAudioController.start();

      video.play();
    });
  }

  document.addEventListener('DOMContentLoaded', init, false);


}());