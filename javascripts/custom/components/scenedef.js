var Pages = function () {
  var pageinfo = [
      { 
        url:"pages/0.html", 
        title: "The Introduction", 
        transition: 'fade', 
        frames: [
          {
              url: "pages/0/intro.html"
          }, 
        ], 
      }, 


      {
      url: "pages/1.html", 
      title: "The Street", 
//      transition: 'fade', // 'horizontal', 'vertical'
      transition: 'fade',
      sound: { // 'background'
        urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.0_entire_scene_background.mp3'],
        loop: true,
        buffer:true,
        autoplay: false,
        fadein:800 
            },

      frames: [

        { 
          url: "pages/1/intro.html"
        },

        { 
          url: "pages/1/1.html",
          sound: {
            urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.1_background.mp3', 'http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.1_background.oga'],
            loop: true,
            buffer:true,
            autoplay: false,
            fadein:800, 
            onend: function() {
                //only start the timer after she has finished speaking. 
                _timer.checkTimer(); 
              }

          },
          narration: []
        },

        { 
          url: "pages/1/2.html", 
          sound: {
            urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.2_background.mp3', 'http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.2_background.oga'],
            loop: true,
            buffer:true,
            autoplay: false,
            fadein:800
          },
          narration: [   
          {
              urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.2_narrative.mp3', 'http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.2_narrative.oga'],
              loop: false,
              buffer:true,
              autoplay: false,
              fadein:0,
              delay: 3000, 
              onend: function() {
                _timer.checkTimer(); 
              }
            }
            ]
        },
        { 
          url: "pages/1/3.html", 
          sound: {
            urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.3_background.mp3', 'http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.3_background.oga'],
            loop: true,
            buffer:true,
            autoplay: false,
            fadein:800
          },
          narration: [
            {
              urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.3_narrative.mp3'],
              loop: false,
              buffer:true,
              autoplay: false,
              fadein:0,
              delay: 3000, 
              onend: function() {
                _timer.checkTimer(); 
              }
            }
          ]
        },
        { 
          url: "pages/1/4.html", 
          sound: {
            urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.4_background.mp3', 'http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.4_background.oga'],
            loop: true,
            buffer:true,
            autoplay: false,
            fadein:800
          },
          narration: [
              {
              urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.4_narrative.mp3'],
              loop: false,
              buffer:true,
              autoplay: false,
              fadein:0,
              delay: 3000, 
              onend: function() {
                _timer.checkTimer(); 
              }
            }
          ]
        },

        //object holding subframes
        {
          subframes : [
            //subframe 1
           { 
              url: "pages/1/5.html",
              visited:false,
              isDefault: false, 
              sound: {
                urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.5_background.mp3', 'http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.5_background.oga'],
                loop: true,
                buffer:true,
                autoplay: false,
                fadein:800
              },
              //this will change 
              narration: [
              {
                urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.5_narrative.mp3'],
                loop: false,
                buffer:true,
                autoplay: false,
                fadein:0,
                delay: 1500, 
                onend: function() {
                  _timer.checkTimer(); 
                }
              }
              ]
            },
            { //subframe 2
              url: "pages/1/5b.html", 
              visited:false,
              isDefault: true,
              sound: {
                urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.5_background.mp3', 'http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.5_background.oga'],
                loop: true,
                buffer:true,
                autoplay: false,
                fadein:800
              },
              //this will change 
              narration: [
              {
                  onload: function() {
                  console.log("hide arrows");
                  hideNavNext(); 
                  hideNavPrev(); 
                }, 
                urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.5b_narrative.mp3'],

                loop: false,
                buffer:true,
                autoplay: false,
                fadein:0,
                delay: 1500,
                onend: function() {
                  //move on to chapter 2, this can't be stopped
                  setTimeout(function(){ changePage("next"); },2000);

                }
              }
            ] //end of narration objects      
          } //end subframe 2 
        ] //end subframe object 
      }, //end of 1.5 

        {
          subframes: [
        { 
          url: "pages/1/6.html", 
          sound: {
            urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.6_background.mp3', 'http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.6_background.oga'],
            loop: true,
            buffer:true,
            autoplay: false,
            fadein:800, 
            onend: function() {
                _timer.checkTimer(); 
              }
          },       
        }, //end subframe 1 
  
        {  // start subframe 2 
          url: "pages/1/6.html", 
          sound: {
            urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.6_background.mp3', 'http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.6_background.oga'],
            loop: true,
            buffer:true,
            autoplay: false,
            fadein:800, 

          }, 
          narration:  [
          {
            urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.6b_narrative.mp3', 'http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.6b_narrative_a.oga'],
              played: false, 
              loop: false,
              buffer:true,
              autoplay: false,
              fadein:0,
              delay: 3000
          }
        ] //end of the narration object 
       } //end subframe 2 
      ] //end subframe object 
    }, //end 1.6 


        //frame 7 (talking to woman scene)
        { 
          url: "pages/1/7.html", 
          sound: {
            urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.7_background.mp3', 'http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.7_background_aif.mp3'],
            loop: true,
            buffer:true,
            autoplay: false,
            fadein:800

          },
          narration: [
            {
              urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.7A_narrative.mp3', 'http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.7A_narrative_a.oga'],
              played: false, 
              loop: false,
              buffer:true,
              autoplay: false,
              fadein:0,
              delay: 3000
            },
                  {
              urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.7B_narrative.mp3', 'http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.7B_narrative_a.oga'],
              played: false,
              loop: false,
              buffer:true,
              autoplay: false,
              fadein:0,
              // delay: 3000
            },
                  {
              urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.7C_narrative.mp3', 'http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.7C_narrative_a.oga'],
              played: false,
              loop: false,
              buffer:true,
              autoplay: true,
              fadein:0,
              // delay: 3000
            },
            {
              urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.7D_narrative.mp3', 'http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.7D_narrative_b.oga'],
              played: false,
              loop: false,
              buffer:true,
              autoplay: true,
              fadein:0,
              // delay: 3000,
              // well now this is not json encodable
              //What is going on here?
              onend: function() {
                //only start the timer after she has finished speaking. 
                _timer.checkTimer();
              }
            }
          ]
        }, //end of 1.7 


//start of 1.8 

  {
          subframes: [
            
            { // start subframe 1 
            url: "pages/1/8.html", 
            sound: {
            urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.8_background.mp3', 'http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.8_background.oga'],
            loop: true,
            buffer:true,
            autoplay: false,
            fadein:800
            }, 
            narration: [
            {
              urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.8_narrative.mp3'],
              loop: false,
              buffer:true,
              autoplay: false,
              fadein:0,
              delay: 3000, 
               onend: function() {
                //only start the timer after she has finished speaking. 
                _timer.checkTimer(); 
              }
            }
          ] // end of narration object
        }, //end of subframe 1 
        //subframe 2 
            { // start subframe 1 
            url: "pages/1/8.html", 
            sound: {
            urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.8_background.mp3', 'http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.8_background.oga'],
            loop: true,
            buffer:true,
            autoplay: false,
            fadein:800
            }, 
            narration: [
            {
              urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.8b_narrative.mp3'],
              loop: false,
              buffer:true,
              autoplay: false,
              fadein:0,
              delay: 3000, 
               onend: function() {
                //only start the timer after she has finished speaking. 
                _timer.checkTimer(); 
              }
            }
          ] // end of narration object
        }, //end of subframe 1 
    ] // end of subframes 
  },  //end of 1.8


        { 
          url: "pages/1/8.html", 
          sound: {
            urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.8_background.mp3', 'http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.8_background.oga'],
            loop: true,
            buffer:true,
            autoplay: false,
            fadein:800
          },
           narration: [
            {
              urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.8_narrative.mp3'],
              loop: false,
              buffer:true,
              autoplay: false,
              fadein:0,
              delay: 3000, 
               onend: function() {
                //only start the timer after she has finished speaking. 
                _timer.checkTimer(); 
              }
            }
          ]
        },



        { 
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
              onload: function() {
                hideNavNext(); 
                console.log("the right arrow is removed"); 
              }, 
              urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.9_narrative.mp3', 'http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.9_narrative.oga'],
              loop: false,
              buffer:true,
              autoplay: false,
              fadein:0,
              delay: 3000, 
               onend: function() {
                //only start the timer after she has finished speaking. 
                _timer.checkTimer(); 
              }
            }
          ]
        },
      ] 
    },

    //CHAPTER 2//
    { 
      url: "pages/2.html", title: "The Stairs", 
      frames: [
        { 
          url: "pages/2/1.html" //this doesn't exist 
        }
      ]
    },
    // //starts evan hack
    // { 
    //   url: "pages/apartment/index.html", title: "The Stairs", 
    //   frames: [
    //     { 
    //       url: "pages/apartment/index.html" //this doesn't exist 
    //     }
    //   ]
    // },
    // //end evan hack

    ///CHAPTER 4//
    { 
      url: "pages/4.html", title: "The Apartment", 
      frames: [
        { 
          url: "pages/4/1.html"
        }
      ]
    },

    //CHAPTER 5// 

    { 
      url: "pages/5.html", title: "The Listing", 
      transition: 'vertical', 
      frames: [
        { 
          url: "pages/listing/index.html"
        }
      ]
    },

// //CHAPTER 6 


  // {
  //   url: "pages/6.html", title: "Microfilm", 
  //     transition: 'fade', 
  //     frames: [
  //       { 
  //         url: "pages/listing/index.html"
  //       }
  //     ]
  //   },



// //CHAPTER 7 



// //CHAPTER 8 



// //CHAPTER 9 




// //CHAPTER 10


    ];

  // todo add ajax loader if needed,
  // possibly add _pageIndex and _frameIndex to this

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

    if( this.doesFrameHaveSubframes( page,frame )  ){
      console.log("getting subframe narration for subframe: "+this.currentSubframeIndex);
      var n = this.getSubframeByIndex( page, frame, this.currentSubframeIndex ).narration;
      console.log(n);
      return n;
    }else{
      return pageinfo[page].frames[frame].narration; 
    }

  }
  this.getFrameSound = function (page, frame) { 
    
    if( this.doesFrameHaveSubframes( page,frame )  ){
      console.log("getting subframe sound for subframe: "+this.currentSubframeIndex);
      var s = this.getSubframeByIndex( page, frame, this.currentSubframeIndex ).sound;
      console.log(s);
      return s;
    }else{
      return pageinfo[page].frames[frame].sound; 
    }

  }

  //what index am I on?
  this.getFrameIndex = function (page, frame) { return pageinfo[page].frames[frame].url; }; 


  this.getFrames = function (page) {
    return pageinfo[page].frames;
  }

  this.doesFrameHaveSubframes = function( page, frame ){

    // console.log( "checking for subframes" );

    if( pageinfo[page].frames[frame].subframes ){
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
        console.log(sf);
       return sf;

    }
    else{
      console.log("you asked for a subframe that was not there at index: "+subframe_index);
    }

  } 

  this.visitSubframe = function( page, frame ){

    console.log( "getting subframe" );
    var subframes = pageinfo[page].frames[frame].subframes;

    var foundSubframe = false;


      for(var i = 0; i < subframes.length; i++ ){
          console.log( "checking subframe" );
          console.log( subframes[i].visited );

          //if we've already been there, skip this and go to the next loop iteration. 
          if(subframes[i].visited) continue;
          else {
            this.currentSubframeIndex = i;
            console.log("found unvisited subframe ad index: "+this.currentSubframeIndex);
            foundSubframe = true;
            subframes[i].visited = true;
            return subframes[i];
            break;
          }

      }
    
      if(!foundSubframe){
        console.log("all subframes visted");
        for(var i = 0; i < subframes.length; i++ ){
          //if we've already been there, skip this and go to the next loop iteration. 
          if(subframes[i].isDefault){
            this.currentSubframeIndex = i;
            console.log("found default");
            return subframes[i];
          } 
        }
      }

  }




  this.getFrameCount = function (page) {
    return pageinfo[page].frames.length;
  };
};

var _pages = new Pages();


function getCurrentFrameUrl() { 

  //checking if the current frame has any subrames within the chapter. 
  if( _pages.doesFrameHaveSubframes( _pageIndex, _frameIndex ) ){
    return _pages.visitSubframe( _pageIndex, _frameIndex ).url;
  }
  else{
      return _pages.getFrames(_pageIndex)[_frameIndex].url; 
  }
}