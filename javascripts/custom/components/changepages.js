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
    

    function hideNavNext() {nextbutton.addClass('hidden');}
    function showNavNext() { if( nextbutton.hasClass("hidden") ){ nextbutton.removeClass('hidden'); } }
    function hideNavPrev() {prevbutton.addClass('hidden');}
    function showNavPrev() { if( nextbutton.hasClass("hidden") ){ prevbutton.removeClass('hidden');} }
    function hideNav() {nextbutton.addClass('hidden'); prevbutton.addClass('hidden');}
    function showNav() {nextbutton.removeClass('hidden'); prevbutton.removeClass('hidden');}


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
// Sliders ///////////////
/////////////////////////////////////////////////////////////////////////////////

// function changeSlider(value) {
//   console.log("changeSlider has been clicked" + value); 
//   var slider = $("ul.slider"),
//   slides = slider.children('li'),
//   slideCount = slides.length, 
//   slidecounter = slider.children('.counter'), 
//   currentIndex = slideIndex;
  
//   if (value==="next") {
//     slideIndex < slideCount-1 ? slideIndex++ : slideIndex = 0;
//   } 
//   else if (value==="prev") { 
//     slideIndex > 0 ? slideIndex-- : slideIndex = slideCount-1;
//   } 
//   else if (value==="first") { 
//     slideIndex = 0;
//   } 
//   else if (value==="last") {
//     slideIndex = slideCount - 1;
//   } 
//   else { 
//     slideIndex = Math.min(slideCount-1, Math.max(0, parseInt(value)));
//   }

//   slides.removeClass('active');
//   slides.addClass('hidden'); 

//   slides.eq(slideIndex).removeClass('hidden'); 

//   slides.eq(slideIndex).addClass('active').find('video').each( function () { 
//     var el = $(this)[0];
//     if (el) el.play(); 
//   } );

//   slides.eq(currentIndex).find('video').each( function () { 
//     var el = $(this)[0];
//     if (el) el.pause(); 
//   } );

//     // slideview.fadeOut('fast', function() { 
//     //     slideview.removeClass('loaded').load(getCurrentslideUrl(), function() { 
//     //         slideview.show();
//     //     }); 
//     // });

//   // changeslideBackground(_pages.getslideSound(_pageIndex, slideIndex));
//   // changeslideNarration(_pages.getslideNarration(_pageIndex, slideIndex));
  
//   slidecounter.text((slideIndex+1) + "/" + (slideCount));
// }

/////////////////////////////////////////////////////////////////////////////////
// FRAMES ///////////////
/////////////////////////////////////////////////////////////////////////////////

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
    $(this).imagesLoaded(function(){
      focalpoint(function() {
        frameNew.addClass('animate');

        ///special case for intro gif to last longer in its intro transition
        if(_frameIndex == 1 && _pageIndex === 0){
          frameOld.addClass("first_gif");
        }

        frameOld.addClass('animate');
        // changeSlider('first');
        animating = true;

        setTimeout(function(){
          frameOld.remove();
          frameNew.children().unwrap();
          animating = false;

          var videoElements = frameview[0].querySelectorAll('video.frame-video');
          var videoCount = videoElements.length;
          var loadedVideos = 0;

          // force video to play!
          //this means the video is not buffered. 
          Array.prototype.forEach.call(videoElements, function (v) {
            v.play();
            v.oncanplaythrough = function(){
              loadedVideos++;
              if (videoCount === loadedVideos){
                //everything is loaded
                //start the audio
                clearDelayedAudio();
                changeFrameBackground(_pages.getFrameSound(_pageIndex, _frameIndex));
                changeFrameNarration(_pages.getFrameNarration(_pageIndex, _frameIndex));
              }
            };
          });
        },1500);
      });
    });
  }); 
} else {

  //

    frameview.fadeOut('fast', function() { 
         if (getCurrentFrameContainer() === 'iframe') {
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
         }, 100);
      }
      else {
        frameview.removeClass('loaded').load(getCurrentFrameUrl(), function() {
            // changeSlider('first');
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

  framecounter.text((_frameIndex) + "/" + (frameCount-1));

  var end = _pages.pageCount() - 1;
  var frameEnd = _pages.getFrameCount(_pageIndex) - 1;
  if(_pageIndex === end && _frameIndex === frameEnd){ hideNavNext(); showNavPrev(); }
  else if (_pageIndex === 0 && _frameIndex === 0)   { showNavNext(); hideNavPrev(); }
  else                                            { showNav(); }

    //optional call back
    if(callback) callback();

}





// function switchAudio(pages,_pageIndex, _frameIndex){
//   //make sure delayed audio does not play after frame change;
  
// }

/////////////////////////////////////////////////////////////////////////////////
// PAGES ///////////////
/////////////////////////////////////////////////////////////////////////////////

function changePage(value, frame) {
    var pagect = _pages.pageCount();

    //console.log("I'm on page "+_pageIndex +" and frame: "+_frameIndex);


    if (value==="next") { if (_pageIndex < pagect-1) _pageIndex++; }
    else if (value==="prev") { if (_pageIndex > 0) _pageIndex--; } 
    else if (value==="first") { _pageIndex = 0; } 
    else if (value==="last"){ _pageIndex = pagect - 1; } 
    else if (value==="apt") {_pageIndex = 2}
    else { _pageIndex = Math.max(0, Math.min(pagect - 1, parseInt(value))); }

    pageview.fadeOut('fast', function() { 
        pageview.removeClass('loaded').load(_pages.getPageUrl(_pageIndex), function() {
            frame ? changeFrame(frame) : changeFrame('first');
            pageview.fadeIn();
            //start the audio after the fade in. 
        }); 
    });

    //console.log("pagect," pagect);

    changePageBackground(_pages.getPageSound(_pageIndex));

    pagetitle.text(_pages.getPageTitle(_pageIndex));
  
}

/////////////////////////////////////////////////////////////////////////////////
//  COMBO FUNCTIONS ///////////////
/////////////////////////////////////////////////////////////////////////////////

function next() { 

  // console.log("I'm on page "+_pageIndex +" and frame: "+_frameIndex);

//special case for the intro to unhide the loaded animated gif
    // if( _frameIndex == 0 && _pageIndex == 0 ){
    //   console.log("went into first special case"); 
    //   $("#intro_title").addClass("hidden");
    //   $("#intro_gif").removeClass("hidden");
    // }


    //what does this logic mean? 
    if (_frameIndex < _pages.getFrameCount(_pageIndex)-1) { 

      ///special cases 
      if( _frameIndex === 0 && _pageIndex === 0 ){
        //dont show back nav at beginning, use the callback option to call hide on the cursor
        changeFrame('next', hideNavPrev );
        changeFrame('next', hideNavNext );
      }else{
        changeFrame('next'); 
     }

     //special case for the end of the stairs scene?

    } 
    else if(_pageIndex < _pages.pageCount()-1){ 
      changePage('next'); 
    }
}

function prev() { 

    if (_frameIndex > 0) { changeFrame('prev'); } 
    else if(_pageIndex > 0) { changePage('prev', 'last');}
}

