    // page navigation code

    var _pageIndex = 0,
    _frameIndex = 0,
    slideIndex = 0,
    // lightboxIndex = 0,

    // frameEnd = frames.length - 1,
    pageview = $(".pageview"),
    pageview_width = 0,
    frameview = $(".frameview").first(),
    nextbutton = $("#nextbutton"),
    prevbutton = $("#prevbutton"),
    chapters = $(".chapters"),
    pagecounter = $(".pagecounter"),
    pagetitle = $(".pagetitle"),
    framecounter = $(".framecounter"),
    overlay = $('.overlay'),
    body = $("body"),
    navList = $("#mainnav"),
    animating = false;
    
    //give the function a name so you can listen and not listen to it. 
    var keyPressLeft = function(e) {
        if(e.which == 37) { //left previous
          // console.log("prev"); 
          $('.prevbutton').trigger("click"); 
        } 
    }

    var keyPressRight = function(e) {
        if (e.which == 39) {
          $('.nextbutton').trigger("click"); 
        }
    }
    
    var keyPressBackspace = function(e) {
      if (e.which==32) {
        $("#skip-notice").trigger('click'); 
      }
    }

    function enableKeyBackspace() {
      // console.log('enablebackspace'); 
      document.addEventListener('keydown', keyPressBackspace, false); 
    }

    function enableKeyRight() {
      document.addEventListener('keydown', keyPressRight, false); 
    }

    function enableKeyLeft() {
      document.addEventListener('keydown', keyPressLeft, false); 
    }
    //You can move left and right through the chapter. 
    function enablekeyRightLeft() {
      // console.log('called keys'); 
      document.addEventListener('keydown', keyPressRight, false); 
      document.addEventListener('keydown', keyPressLeft, false); 
    }

    function disableKeyLeft() {
        document.removeEventListener('keydown', keyPressLeft, false); 
    }

    function disableKeyRight() {
          //it can't recognize that function. 
          console.log('disabled keypress'); 
          document.removeEventListener('keydown', keyPressRight, false); 
        }

    function disableRightLeft() {
      document.removeEventListener('keydown', keyPressRight, false); 
      document.removeEventListener('keydown', keyPressRight, false); 
    }
  
    function hideNavNext() {nextbutton.addClass('hidden');}
    function showNavNext() { if( nextbutton.hasClass("hidden") ){ nextbutton.removeClass('hidden'); } }
    function hideNavPrev() {prevbutton.addClass('hidden');}
    function showNavPrev() { if( nextbutton.hasClass("hidden") ){ prevbutton.removeClass('hidden');} }
    function hideNav() {nextbutton.addClass('hidden'); prevbutton.addClass('hidden');}
    function showNav() {nextbutton.removeClass('hidden'); prevbutton.removeClass('hidden');}

    // function disableKeyPress() {$("body").removeEventListener('keydown', keyPress, false);}

// Fills the navigation with the appropriate links and dropdowns
//$.each(pages, function(pageNumber){

  for (var i=0; i < _pages.pageCount(); i++) {
      var navPage = $('<li/>').appendTo(navList);
      var navPageLink = $('<a/>').text(_pages.getPageTitle(i)).attr('onClick', 'changePage('+ i +')').appendTo(navPage);

      // if (_pages.getFrameCount(i) > 1) {
      //   navPage.addClass('has-dropdown');
      //   var navPageList = $('<ul />').addClass('dropdown').appendTo(navPage);

      //   var fr = _pages.getFrames(i);
      //   $.each(fr, function(frameNumber){
      //         var navFrame = $('<li/>').appendTo(navPageList);
      //         var navFrameLink = $('<a/>').text('Page ' + (frameNumber + 1)).attr('onClick', 'changePage('+ i +', ' +frameNumber +')').appendTo(navFrame);
      //   });
      // };  
  }
//});

/////////////////////////////////////////////////////////////////////////////////
// FRAMES ///////////////
/////////////////////////////////////////////////////////////////////////////////

// function disableKeyPress() {$("body").removeEventListener('keydown', keyPress, false);}


function changeFrame(value, callback) {
  // console.log("changeFrame click");
  frameview = $(".frameview").first();
  _pages.resetSubframeIndex();

  var frameCount = _pages.getFrameCount(_pageIndex),
    currentIndex = _frameIndex,
    trans = _pages.getTransition(_pageIndex);
  
        if (value==="next") {
          if (_frameIndex < frameCount-1) _frameIndex++;
        } 
        else if (value==="prev") { 
          if (_frameIndex > 0) _frameIndex--;
        } 
        else if (value==="first") { 
          _frameIndex = 0;
          trans = false;
        } 
        else if (value==="last") {
          _frameIndex = frameCount - 1;
          trans = false;
        } 
        else { 
          _frameIndex = Math.min(frameCount-1, Math.max(0, parseInt(value)));
          trans = false;
        }

        if (animating) {
          trans = false;
          animating = false;
        }

  if (trans) {
    if (trans === 'fade') trans = 'crossFade';
    else if (trans === 'vertical') trans = (currentIndex > _frameIndex)  ? 'slideUp' : 'slideDown';
    else if (trans === 'horizontal') trans = (currentIndex > _frameIndex)  ?'slideLeft' : 'slideRight';

    frameview.children().wrapAll('<div class="old ' + trans + '" />');
    frameview.prepend('<div class="new ' + trans + '" />');


    var frameNew = $('.new'),
    frameOld = $('.old');
    frameNew.eq(0).load(getCurrentFrameUrl(), function() {

      //this waits for images to get loaded. 
      $(this).imagesLoaded(function(){
        focalpoint(function() {
          frameNew.addClass('animate');
          frameOld.addClass('animate');
          animating = true;
          console.log("everytime"); 

          //very important, this makes sure that you don't accumulate divs on top of each other. 
          frameNew.children().unwrap();
            
                setTimeout(function(){
                    frameOld.remove();


                    animating = false;

                    var videoElements = frameview[0].querySelectorAll('video.frame-video');
                    var videoCount = videoElements.length;
                    // console.log(videoCount); 
                    var loadedVideos = 0;

                    // force video to play!
                    //this means the video is not buffered. 
                    Array.prototype.forEach.call(videoElements, function (v) {
                      //the audio is waiting for you to get through the videos

                      //video is already loaded, if the video was already ready, callback was never called. 
                      if (v.readyState === 4){
                        v.play(); 
                        loadedVideos++;
                          if (videoCount === loadedVideos){
                            //start the audio
                            clearDelayedAudio();
                            //get the background and frame audio. 
                            changeFrameBackground(_pages.getFrameSound(_pageIndex, _frameIndex));
                            changeFrameNarration(_pages.getFrameNarration(_pageIndex, _frameIndex));
                            }
                        } else {
                        //wait for it to load
                          v.addEventListener('canplaythrough', function onCanPlayThrough () { 
                            v.removeEventListener('canplaythrough', onCanPlayThrough); 
                            v.play(); 
                            loadedVideos++;
                            //everything is loaded 
                            if (videoCount === loadedVideos){
                              //start the audio
                              clearDelayedAudio();
                              changeFrameBackground(_pages.getFrameSound(_pageIndex, _frameIndex));
                              changeFrameNarration(_pages.getFrameNarration(_pageIndex, _frameIndex));
                            }
                           });
                        }
                    });
                  },1500); //end of set timeout function. 
            });
          });
        }); 
      } else {

 
      frameview.fadeOut('fast', function() { 
           if (getCurrentFrameContainer() === 'iframe') {
            // console.log('iframe here'); 
           frameview.removeClass('loaded');

            var iframe = frameview[0].querySelector('iframe');

            if (!iframe) {
              iframe = document.createElement('iframe');
              frameview[0].appendChild(iframe);
            }

           iframe.src = getCurrentFrameUrl();
              setTimeout(function () {
              frameview.fadeIn();
              frameview.addClass('loaded'); 
              // console.log('added iframe'); 
           }, 100);
        }
        else {
          frameview.removeClass('loaded').load(getCurrentFrameUrl(), function() {
              // changeSlider('first');
             // console.log("new frame fades in"); 
              frameview.fadeIn();

          }); 
        }
      });
  }

  //we have to stop the timer aevery time we change frames. 
  _timer.stopTimer(); 


  if(_pageIndex === 0 && _frameIndex === 0 ) framecounter.addClass("hidden");
  else {
    if(framecounter.hasClass("hidden"))
      framecounter.removeClass("hidden");
  }

  if(_pageIndex === 0 && _frameIndex === 9 ) { hideNavNext();}

  framecounter.text((_frameIndex) + "/" + (frameCount-1));

  var end = _pages.pageCount() - 1;
  var frameEnd = _pages.getFrameCount(_pageIndex) - 1;
  // if(_pageIndex === end && _frameIndex === frameEnd){ hideNavNext(); showNavPrev(); }
  if(_pageIndex === end && _frameIndex === frameEnd){ hideNavNext(); }
  else if (_pageIndex === 0 && _frameIndex === 0)   { hideNav(); }
  else                           { hideNav();}

    //optional call back
    if(callback) callback();

}


/////////////////////////////////////////////////////////////////////////////////
// PAGES ///////////////
/////////////////////////////////////////////////////////////////////////////////

function changePage(value, frame) {
  //why do you need to get the parameter of frame 
    var pagect = _pages.pageCount();

    //resetChapter1Subframes(); 

    //var newChapter = false; 

    if (value==="next") { if (_pageIndex < pagect-1) _pageIndex++; }
    else if (value==="prev") { if (_pageIndex > 0) _pageIndex--; } 
    else if (value==="first") { _pageIndex = 0; } 
    else if (value==="last"){ _pageIndex = pagect - 1; } 
    else if (value==="apt") {_pageIndex = 2}
    else { _pageIndex = Math.max(0, Math.min(pagect - 1, parseInt(value))); }

  //this was hapenning asynchronously, so you have to change the frame background noise in there. 
    pageview.fadeOut('fast', function() { 
        pageview.removeClass('loaded').load(_pages.getPageUrl(_pageIndex), function() {
            frame ?  changeFrame(frame) : changeFrame('first');
            changeFrameBackground(_pages.getFrameSound(_pageIndex, _frameIndex));
            pageview.fadeIn();
            //start the audio after the fade in. 
        }); 
    });

    changePageBackground(_pages.getPageSound(_pageIndex));

    pagetitle.text(_pages.getPageTitle(_pageIndex));

    if (_pageIndex > 1 && pagetitle != 'The Street') {
      console.log('ourside of the street'); 
      //resetChapter1Subframes(); 
    }
  
}

/////////////////////////////////////////////////////////////////////////////////
//  COMBO FUNCTIONS ///////////////
/////////////////////////////////////////////////////////////////////////////////


function next() { 

  console.log("I'm on page:" + _pageIndex + "and frame" + _frameIndex); 

    if (_frameIndex < _pages.getFrameCount(_pageIndex)-1) { 
          ///special cases 
          if( _frameIndex === 0 && _pageIndex === 0 ){
            //dont show back nav at beginning, use the callback option to call hide on the cursor
            changeFrame('next', hideNavPrev );
            changeFrame('next', hideNavNext );
          } else{
            changeFrame('next'); 
            }
          } else if(_pageIndex < _pages.pageCount()-1){ 
          changePage('next'); 
          console.log('changed chapters'); 
          }


          if (_pageIndex > 1) {
              //resetChapter1Subframes(); 
              console.log('resetting subframes in next'); 
              //resetChapter1Subframes(); 
            }
      }

function prev() { 

    if (_frameIndex > 0) { changeFrame('prev'); } 
    else if(_pageIndex > 0) { changePage('prev', 'last');}
}
