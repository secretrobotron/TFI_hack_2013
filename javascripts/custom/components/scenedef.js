var Pages = function () {
  var pageinfo = [

  //only add played: false to narrations from subframes. 
  //INTRODUCTION
         { 
            url:"pages/0.html", 
            title: "The Introduction", 
            transition: 'fade', 
            frames: [
              {
                  url: "pages/0/intro.html",  //page1, frame 0 
                 // container: 'iframe'
              }, 
            ], 
          },

  

    {//Chapter 1 
        url: "pages/1.html", 
        title: "The Street", 
        transition: 'fade',
            sound: 
              { // 'background'
                urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.0_entire_scene_background.mp3'],
                container: 'iframe', 
                loop: true,
                buffer:true,
                autoplay: false,
                fadein:800 
              },

            frames: [
            //Frame intro
                { 
                  url: "pages/1/intro.html", 
                    sound: 
                      {
                        urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.1_background.mp3', 'http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.1_background.oga'],
                        loop: true,
                        buffer:true,
                        autoplay: false,
                        fadein:800
                      },
                        narration: []
                  },
                //Frame 1 
                   { 
                      url: "pages/1/1.html", 
                        sound: 
                          {
                            urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.1_background.mp3', 'http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.1_background.oga'],
                            loop: true,
                            buffer:true,
                            autoplay: false,
                            fadein:800
                          },
                            narration: [
                              {
                                urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.1_narrative.mp3', 'http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.1_narrative.ogg'],
                                loop: false, 
                                buffer: true, 
                                autoplay: false, 
                                fadein: 0, 
                                onend: function() {
                                  _timer.checkTimer(); 
                                }
                              }
                            ]     
                    }, //end of frame 1 

              { //FRAME 2 
                subframes: [
                  {//subframe1 
                    url: "pages/1/2.html",
                    visited: false,
                    isDefault: false, 
                      sound: {
                          urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.2_background.mp3', 'http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.2_background.oga'],
                          loop: true, 
                          buffer: true, 
                          autoplay: false, 
                          fadein:100
                      }, 
                      narration: []
                  }, 
                  {//subframe 2 
                    url: "pages/1/2b.html",
                    visited: false, 
                    isDefault: true, 
                      sound: {
                        urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.2_background.mp3', 'http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.2_background.oga'],
                        loop: true,
                        buffer:true,
                        autoplay: false,
                        fadein:800
                      }, 
                      narration: []
                  }, 
                ]
              }, //END OF FRAME 2

              { //FRAME 3
                subframes: [
                  {//subframe 1
                    url: "pages/1/3.html",
                    visited:false,
                    isDefault: false,
                      sound: {
                        urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.3_background.mp3', 'http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.3_background.oga'],
                        loop: true,
                        buffer:true,
                        autoplay: false,
                        fadein:800
                      }, 
                      narration:[]
                  }, //end subframe 1
                  { //start subframe 2
                    url:"pages/1/3b.html", 
                    visited:false,
                    isDefault: true, 
                      sound: {
                          urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.3_background.mp3', 'http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.3_background.oga'],
                          loop: true,
                          buffer:true,
                          autoplay: false,
                          fadein:800
                      }, 
                      narration: []
                  }
                ] //end of subframe object 
              },//end of frame 3

              { //FRAME 4
                subframes: [
                  {//subframe 1
                    url: "pages/1/4.html", 
                    visited: false, 
                    isDefault: false, 
                      sound: {
                        urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.4_background.mp3', 'http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.4_background.oga'],
                        loop: true,
                        buffer:true,
                        autoplay: false,
                        fadein:100
                      }, 
                      narration: [
                      {
                        urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.4_narrative.mp3', 'http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.4_narrative.ogg'],
                        loop: false,
                        buffer:true,
                        autoplay: false,
                        fadein:0,
                        delay: 0, 
                        onend: function() {
                            _timer.checkTimer(); 
                          }
                      }
                      ]
                  }, //end of subframe 1 
                  { //subframe 2
                    url: "pages/1/4b.html",
                    visited:false,
                    isDefault: true, 
                      sound: {
                        urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.4_background.mp3', 'http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.4_background.oga'],
                        loop: true,
                        buffer:true,
                        autoplay: false,
                        fadein:800
                      }, 
                      narration: []
                  }
                ] //end subframe object
              }, //end frame 4 
              { //FRAME 5 
                subframes: [
                  { //subframe 1
                    url: "pages/1/5.html",
                    visited: false, 
                    isDefault: false, 
                      sound: {
                        urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.5_background.mp3', 'http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.5_background.oga'],
                        loop: true,
                        buffer:true,
                        autoplay: false,
                        fadein:800
                      },
                      narration: []

                  }, //end subframe 1
                  { //start subframe 2
                    url: "pages/1/5b.html", 
                    visited: false, 
                    isDefault:true, 
                      sound: {
                          urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.5_background.mp3', 'http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.5_background.oga'],
                          loop: true,
                          buffer:true,
                          autoplay: false,
                          fadein:800
                      }, 
                      narration: []
                  }, 
                ]
              },  //end of frame 5 
              { //FRAME 6 
                subframes: [
                  { //subframe 1
                      url: "pages/1/6.html", 
                      visited:false,
                      isDefault: false, 
                        sound: {
                           urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.6_background.mp3', 'http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.6_background.oga'],
                           loop: true,
                           buffer:true,
                           autoplay: false,
                           fadein:100 
                        }, 
                        narration: [
                        {
                          urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.6_narrative.mp3', 'http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.6_narrative.ogg'],                     
                          loop: false, 
                          buffer:true,
                          autoplay: false,
                          fadein:0,
                          delay: 0, 
                          onend: function() {
                            _timer.checkTimer(); 
                          }
                        }]
                  }, //end subframe 1
                  { //subframe 2 
                      url: "pages/1/6b.html", 
                      visited:false,
                      isDefault: true, 
                      sound: {
                        urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.6_background.mp3', 'http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.6_background.oga'],
                        loop: true,
                        buffer:true,
                        autoplay: false,
                        fadein:100
                      }, 
                      narration: [
                      {
                        urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.6b_narrative.mp3', 'http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.6b_narrative.ogg'],
                        loop: false,
                        buffer:true,
                        autoplay: false,
                        fadein: 0,  
                        delay: 0,
                        onend: function() {
                          //move on to chapter 2, this can't be stopped
                          setTimeout(function(){ changePage("next"); },1500);
                        } 
                      }]
                  }, 
                ]
              },//END OF SUBFRAME 6 \

              { //SUBFRAME 7
                subframes: [
                  { //subframe 1
                      url: "pages/1/7.html",
                      visited:false,
                      isDefault: false,  
                        sound: {
                            urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.7_background.mp3', 'http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.7_background_aif.mp3'],
                            loop: true,
                            buffer:true,
                            autoplay: false,
                            fadein:800
                          }, 
                        narration: [
                        {
                          urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.7_narrative.mp3', 'http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.7_narrative.ogg'],
                          loop: false,
                          buffer:true,
                          autoplay: false,
                          fadein:0,
                          delay: 0, 
                          onend: function() {
                            _timer.checkTimer(); 
                          }
                        }]
                  }, //end subframe 1 
                  { //subframe 2 
                      url: "pages/1/7b.html",
                      visited:false,
                      isDefault: true, 
                        sound: {
                          urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.7_background.mp3', 'http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.7_background_aif.mp3'],
                          loop: true,
                          buffer:true,
                          autoplay: false,
                          fadein:800
                        }, 
                        narration: [
                        {
                          urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.7b_narrative.mp3', 'http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.7b_narrative.ogg'],
                          loop: false,
                          buffer:true,
                          autoplay: false,
                          fadein:0,
                          delay: 0, 
                          onend: function() {
                            _timer.checkTimer(); 
                          }
                        }]
                  }, 
                ]
              }, //FRAME 7 

              { //FRAME 8 
                subframes: [
                  {
                    url: "pages/1/8.html", 
                    visited:false,
                    isDefault: false, 
                      sound: {
                        urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.8_background.mp3', 'http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.8_background.oga'],
                        loop: true,
                        buffer:true,
                        autoplay: false,
                        fadein:800
                      }, 
                      narration: [
                      {
                        urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.8_narrative.mp3', 'http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.8_narrative.ogg'],
                        loop: false,
                        buffer:true,
                        autoplay: false,
                        fadein:0,
                        delay: 1000, 
                        onend: function() {
                          _timer.checkTimer(); 
                        }
                      }]
                  }, //end subframe 1
                  { //subframe 2 
                    url: "pages/1/8b.html", 
                    visited:false,
                    isDefault: true,
                      sound: {
                        urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.8_background.mp3', 'http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.8_background.ogg'],
                        loop: true,
                        buffer:true,
                        autoplay: false,
                        fadein:800
                      }, 
                      narration: [
                      {
                        urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.8b_narrative.mp3', 'http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.8b_narrative.ogg'],
                        loop: false,
                        buffer:true,
                        autoplay: false,
                        fadein:0,
                        delay: 1000, 
                        onend: function() {
                          _timer.checkTimer(); 
                        }
                      }]
                  },  //end subframe 2 
                ]
              }, //END FRAME 8 

              { //FRAME 9 
                url: "pages/1/9.html", 
                  sound: {
                    urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.9_background.mp3', 'http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.9_background.oga'],
                    loop: true,
                    buffer:true,
                    autoplay: false,
                    fadein:800
                  }, 
                  narration: [
                  {
                    urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.9_narrative.mp3', 'http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.9_narrative.ogg'],
                    onload: function() {
                        hideNavNext(); 
                        // console.log("the right arrow is removed"); 
                      }, 
                    loop: false,
                    buffer:true,
                    autoplay: false,
                    fadein:0,
                    delay: 1000, 
                    onend: function() {
                        //only start the timer after she has finished speaking. 
                     _timer.checkTimer(); 
                    }
                  }]
              },  //end frame 9 

          ] //end of all frames 
    }, //End of chapter 1 
 

    //CHAPTER 2//
    { 
      url: "pages/2.html", title: "The Stairs", 
      frames: [
        { 
          url: "pages/2/1.html", //this doesn't exist 
            sound: 
              { // 'background'
                urls: ['http://dbef91h7r4asa.cloudfront.net/assets/2_stairs/sound/2.0backgroundloop.mp3', 'http://dbef91h7r4asa.cloudfront.net/assets/2_stairs/sound/2.0backgroundloop.ogg' ],
                loop: true,
                buffer:true,
                autoplay: false,
                fadein:800 
              },
        }
      ] //end of frames 
    }, //end of chapter 2 

    ///CHAPTER 4//
    { 
      url: "pages/4.html", title: "The Apartment", 
      frames: [
        { 
          url: "pages/4/1.html", //leads you to the//this could also have a background audio here.  next stuff. 
        }
      ]
    },

    //CHAPTER 5// 

    { 
      url: "pages/5b.html", 
      title: "The Listing",
      trans: 'fade',
          sound: 
                  { // 'background'
                    urls: ['http://dbef91h7r4asa.cloudfront.net/assets/5_website/audio/5.0_backgroundloop.mp3', 'http://dbef91h7r4asa.cloudfront.net/assets/5_website/audio/5.0_backgroundloop.ogg' ],
                    container: 'iframe', 
                    loop: true,
                    buffer:true,
                    autoplay: false,
                    fadein:800 
                  },  
          frames: [
          //frame 1 
            {
              url: "pages/listing/1.html", //the intro video 
            }, 
            {
              url: "pages/5.html", //the listing
            }, 
            {
              url: "pages/listing/2.html" //the call video 
            }, 
       ]
    }, //END OF CHAPTER 5 

    { //Chapter 6: part 2
      url: "pages/2.0.html", 
      title: "Part II", 
      trans: 'fade', 
        frames: [
          {
            url: "pages/2.0/index.html", 
          }
        ]
    }, 

        { //Credits
        url: "pages/credits.html", 
        title: "Credits", 
        trans: 'fade', 
          frames: [
            {
              url: "pages/credits/index.html", 
            }
          ]
      }
        
          

    ];

  this.currentSubframeIndex = 0;
  this.resetSubframeIndex = function(){ this.currentSubframeIndex = 0; }

  this.pageCount = function () { return pageinfo.length; }
  this.getPageInfo = function (page)  { return pageinfo[page]; }
  this.getPageTitle = function (page)  { return pageinfo[page].title; }
  this.getTransition = function (page)  { return pageinfo[page].transition || 'crossFade'; }

  this.getPageUrl = function (page) { return pageinfo[page].url; }
  this.getPageSound = function (page, frame) { return pageinfo[page].sound; }

  //I have to check if you have multiple frame narrations
  this.getFrameNarration = function (page, frame) { 

    if( this.doesFrameHaveSubframes(page,frame) ){
      // console.log("subframes" + this.doesHaveSubframes(page,frame)); 
      console.log("inside of getFrameNarration"); 

      var n = this.getSubframeByIndex( page, frame, this.currentSubframeIndex ).narration;
      return n;
      // console.log(n); 
      // console.log("got subframe narration"); 

    }else{
      // console.log("got narration"); 
      return pageinfo[page].frames[frame].narration; 
    }

  }
  this.getFrameSound = function (page, frame) { 
    
    if( this.doesFrameHaveSubframes( page,frame )  ){
      // console.log("getting subframe sound for subframe: "+this.currentSubframeIndex);
      var s = this.getSubframeByIndex( page, frame, this.currentSubframeIndex ).sound;
      // console.log(s);
      return s;
    }else{
      // console.log("got sound"); 
      return pageinfo[page].frames[frame].sound; 
    }

  }

  //what index am I on?
  this.getFrameIndex = function (page, frame) { return pageinfo[page].frames[frame].url; }; 


  this.getFrames = function (page) {
    return pageinfo[page].frames;
  }

  this.doesFrameHaveSubframes = function( page, frame ){
    //this signifier was not correct, because if you don't have subframes, it doesn't really know how to check. 
    //that is why you have two conditions, in case it doesn't have it. 
    if( pageinfo[page].frames[frame] && pageinfo[page].frames[frame].subframes ){
      // console.log( "has subframes" );
      return true;
    }
    else{
      // console.log( "NO subframes" );
      return false;
    }

  }

  this.getSubframeByIndex = function( page, frame, subframe_index ){
    if( subframe_index < pageinfo[page].frames[frame].subframes.length ){
        var sf = pageinfo[page].frames[frame].subframes[subframe_index];
       return sf;

    }
    else{
      // console.log("you asked for a subframe that was not there at index: "+subframe_index);
      return (subframe_index); 
    }
  } 

  this.visitSubframe = function( page, frame ){
    console.log( "getting subframe" );
    var subframes = pageinfo[page].frames[frame].subframes;

    var foundSubframe = false;
      for(var i = 0; i < subframes.length; i++ ){
          //if we've already been there, skip this and go to the next loop iteration. 
          if(subframes[i].visited) continue;
          else {
            // console.log("new subframe"); 
            this.currentSubframeIndex = i;
            // console.log("found unvisited subframe ad index: "+this.currentSubframeIndex);
            foundSubframe = true;
            subframes[i].visited = true;
            return subframes[i];
            break;
          }

      }
      if(!foundSubframe){
        // console.log("all subframes visted");
        for(var i = 0; i < subframes.length; i++ ){
          //if we've already been there, skip this and go to the next loop iteration. 
          if(subframes[i].isDefault){
            this.currentSubframeIndex = i;
            // console.log("found default");
            //this means you are now in the second one. 
            return subframes[i];
          } 
        }
      }

  }


  this.getFrameCount = function (page) {
    return pageinfo[page].frames.length;
  };
}; 

//get the current container of the frame 
function getCurrentFrameContainer() {
 //checking if the current frame has any subrames within the chapter. 
   if( _pages.doesFrameHaveSubframes( _pageIndex, _frameIndex ) ){
    return _pages.visitSubframe( _pageIndex, _frameIndex ).container;
  }
  else{
      return _pages.getFrames(_pageIndex)[_frameIndex].container;
  }
}


function getCurrentFrameUrl() { 
  //checking if the current frame has any subrames within the chapter. 
  if( _pages.doesFrameHaveSubframes( _pageIndex, _frameIndex ) ){
    return _pages.visitSubframe( _pageIndex, _frameIndex ).url;
  }
  else{
      return _pages.getFrames(_pageIndex)[_frameIndex].url; 
  }
}

function resetChapter1Subframes() {
  console.log('reset subframes XXXXX'); 
  // var _pageIndex = 1; 
  // var frames = _pages.getFrames(_pageIndex); //all the frames in chapter 1
  //var subframes = _pageIndex.frames[frame].subframes;
  // var _pageIndex = 1; 
  // var subframes = pageinfo[page].frames[frame].subframes; //this is the array that has all the visited; 

      for(var i = 0; i < frames.length; i++ ){
        var _pageIndex = 1; 
          var frames = _pages.getFrames(_pageIndex); 
          var subframes = _pageIndex.frames[i].subframes;
        // if (_pages.doesHaveSubframes(1, i)) {
          for (var j=0; j < frames[i].subframes.length; j++) {
              if(frames[i].subframes[j].visited = true) {
              frames[i].subframes[j].visited = false;
            }
        }
      // } 
   }
}



var _pages = new Pages();










