 ///THESE ARE THE BACKGROUND AND NARRATION AUDIO PLAYERS
 /////////TO MAKE SURE BACKGROUND AND NARRATION ARE FADING IN AND OUT AS OPPOSED TO JUST GETTING CUT OFF. 
 //////// So that they are crossfading between each other. 

            var currentFrameNarration = null,
                currentFrameBackground1 = null,
                currentPageBackground1 = null,
                currentFrameBackground2 = null,
                currentPageBackground2 = null;

            var pageBg1Playing = false;
            var pageBg2Playing = false;
            var frameBg1Playing = false;
            var frameBg2Playing = false;            

            // page background audio
            function changePageBackground(info) { 

              //if bg1 is not null, then it is playing and bg2 needs to be created and bg1 faded out
              if (pageBg1Playing){

                if (!info){
                  currentPageBackground1.fadeOut(0, 400);
                  pageBg1Playing = false;
                  return;
                }else{
                  
                  currentPageBackground2 = new Howl(info);
                  currentPageBackground2.fadeIn(1, info.fadein || 800);
                  pageBg2Playing = true;
                  currentPageBackground1.fadeOut(0, 400);
                  pageBg1Playing = false;

                }
              //if bg1 is null, check bg2
              }else if( pageBg2Playing ){

                    if (!info){
                          //if there is no info then return early and fade out bg2
                          currentPageBackground2.fadeOut(0, 400);
                          pageBg2Playing = false;
                          return;
                        }else{

                          currentPageBackground1 = new Howl(info);
                          currentPageBackground1.fadeIn(1, info.fadein || 800);
                          pageBg1Playing = true;
                          currentPageBackground2.fadeOut(0, 400);
                          pageBg2Playing = false;
                        }

              }else{

                if (!info){
                  return;
                } 
                //they are both null, so start up bg1
                currentPageBackground1 = new Howl(info);
                currentPageBackground1.fadeIn(1, info.fadein || 800);
                pageBg1Playing = true;

              }

            }

            function changeFrameBackground(info) { 
              //if bg1 is not null, then it is playing and bg2 needs to be created and bg1 faded out
              if (frameBg1Playing){
                // console.log('skipped'); 

                if (!info){
                  //if there is no info then return early and fade out bg1
                  currentFrameBackground1.fadeOut(0, 400);
                  frameBg1Playing = false;
                  return;
                }else{
                  // console.log('created new background audio'); 
                  //create 2 and fadeout 1
                  currentFrameBackground2 = new Howl(info);
                  currentFrameBackground2.fadeIn(1, info.fadein || 800);
                  frameBg2Playing = true;
                  currentFrameBackground1.fadeOut(0, 400);
                  frameBg1Playing = false;
                }

                //if bg1 is null, check bg2
              }else if( frameBg2Playing ){

              if (!info){
                    //if there is no info then return early and fade out bg2
                    currentFrameBackground2.fadeOut(0, 400);
                    frameBg2Playing = false;
                    return;
                  }else{
                    //create 2 and fadeout 1
                    currentFrameBackground1 = new Howl(info);
                    currentFrameBackground1.fadeIn(1, info.fadein || 800);
                    frameBg1Playing = true;
                    currentFrameBackground2.fadeOut(0, 400);
                    frameBg2Playing = false;
                  }

              }else{

                if (!info){
                  return;
                } 
                //they are both null, so start up bg1
                currentFrameBackground1 = new Howl(info);
                currentFrameBackground1.fadeIn(1, info.fadein || 800);
                frameBg1Playing = true;
              }

            }


////////////////////////This makes sure that we don't repeat the narratives//////////////
/////////////////////////////////////////////////////

            var currentDelay = null; 
            var hasDelay = false;
            //there is somethign waitng to play  

            //safety so that we clear the audio. 
            function clearDelayedAudio(){
              if(currentDelay)
                clearTimeout(currentDelay); 
                //console.log("just cleared the delay"); 
              hasDelay = false;
            }

            function delayAudio(cfa, si) {
              //console.log(cfa );
              //This makes sure that we don't repeat the narratives
              if (hasDelay) {
                clearTimeout(currentDelay); 
                currentDelay = setTimeout( 
                function () { 
                  // console.log('playing delayed audio');
                  cfa.fadeIn(1, si.fadein || 0); 
                  hasDelay = false; 
                },
                si.delay
                );
              }
                else {
                      currentDelay = setTimeout( 
                      function () { 
                      //console.log('playing delayed audio');
                      cfa.fadeIn(1, si.fadein || 0); 
                      hasDelay = false; 
                     },
                      si.delay
                    );

                    hasDelay = true; 
                }

              }

            function changeFrameNarration(info) { 
              // cancel current frame audio instances
              //You erase this function so that you don't shut Martha up if you change the slides. 
              // if (currentFrameNarration) {
              //  // currentFrameNarration.fadeOut(0,400);
              // }

              //the subgrame narration is not entering this loop, so we can't hear it with a delay. 
              if (!info) return; 

              // console.log(Array.isArray(info)); 

              // find first non played clip
              if (Array.isArray(info)) {
                for (var i=0; i< info.length; i++) {
                  var si = info[i]; 
                  // console.log("played" + si.played); 
                  if (si.played) continue; //if you already played it, go to the next iteration of the loop 
                  //if you didn't do it, make it true. 
                  // console.log("changing played to true"); 
                  si.played = true;
                  // console.log("played" + si.played); 
                  currentFrameNarration = new Howl(si);
                  if (si.delay) {

                    //it is not adding subframe narrations here 
                    console.log('delayed audio to be played: ', si.delay, si.urls[0]);
                    delayAudio(currentFrameNarration, si);
                  }
                  else  
                    currentFrameNarration.fadeIn(1, si.fadein || 0); 
                  break;
                }
              }
              else {
                if (info.played) return;
                info.played = true;
                currentFrameNarration = new Howl(info);
                currentFrameNarration.fadeIn(1, info.fadein || 0); 
                // console.log("narration fading in"); 
              }
            }

            var soundEnabled = true; 
            
            function toggleSound(){
              if (soundEnabled) {
                // console.log("mute"); 
                soundEnabled = false;
                Howler.mute();
                //here is where we will add the alternative images. change image source with jquery 
                // $('.audio').text('Enable Audio');
                $('.audio').attr('src', "https://s3-us-west-2.amazonaws.com/89steps/assets/ux/Menu/Sound_Off.svg"); 
              }else {
                    // console.log('unmute'); 
                    soundEnabled = true;
                    Howler.unmute();
                    $('.audio').attr('src', "https://s3-us-west-2.amazonaws.com/89steps/assets/ux/Menu/Sound_On.svg"); 
                }
              };
            