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
              container: 'iframe' 
              // container: 'iframe'
          }, 
        ], 
      },

      //Chapter 1 
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
          //first frame (skipping 1/1.html because we dont need two of those anymore)
             url: "pages/1/intro.html", 
              sound: {
                urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.1_background.mp3', 'http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.1_background.oga'],
                loop: true,
                buffer:true,
                autoplay: false,
                fadein:800, 
              // onend: function() {
              //   //only start the timer after she has finished speaking. 
              //   _timer.checkTimer(); 
              // }

            },
            narration: []
          },
      

        { 
          url: "pages/1/1.html",
          sound: {
            urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.1_background.mp3', 'http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.1_background.oga'],
            loop: true,
            buffer:true,
            autoplay: false,
            fadein:800, 
          },
          narration: [
          {
              urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.1_narrative.mp3', 'http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.1_narrative.ogg'],
              loop: false,
              buffer:true,
              autoplay: false,
              fadein: 0,
              delay: .5, 
              onend: function() {
                _timer.checkTimer(); 
              }
            }
          ]
        },

//second frame {}
      {
      subframes : [
        { 
          url: "pages/1/2.html",
          visited:false,
          isDefault: false,  
              sound: {
                urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.2_background.mp3', 'http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.2_background.oga'],
                loop: true,
                buffer:true,
                autoplay: false,
                fadein:800
              },
              narration: []
          }, //end of subframe 1 

          {
            url: "pages/1/2b.html",
            visited:false,
            isDefault: true, 
            sound: {
                urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.2_background.mp3', 'http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.2_background.oga'],
                loop: true,
                buffer:true,
                autoplay: false,
                fadein:800
            },
              narration: [] 
          } //end of subframe 2 
        ] //end of subframe object 
      },  //end of 1.2 
          //frame 1.3 

      {
        subframes: [
          { 
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
                  narration: []
                },
                //subframe 2 
                {
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
                  narration:[]
                },
              ]
            }, 
        

        {
          subframes: [
              { 
              url: "pages/1/4.html",
              visited:false,
              isDefault: false,  
              sound: {
                urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.4_background.mp3', 'http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.4_background.oga'],
                loop: true,
                buffer:true,
                autoplay: false,
                fadein:800
              },
              narration: [
                  {
                  urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.4_narrative.mp3', 'http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.4_narrative.ogg'],
                  loop: false,
                  buffer:true,
                  autoplay: false,
                  fadein:0,
                  delay: 1000, 
                  onend: function() {
                    _timer.checkTimer(); 
                  }
                }
              ]
            },
               { 
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
                  narration:[]
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
              narration:[]
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
                 narration:[]
              } //end subframe 2 
            ] //end subframe object 
          }, //end of 1.5 
              //this will change 
            //   narration: [
            //   {
            //       onload: function() {
            //       console.log("hide arrows");
            //       hideNavNext(); 
            //       hideNavPrev(); 
            //     }, 
            //     urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.5b_narrative.mp3'],

            //     loop: false,
            //     buffer:true,
            //     autoplay: false,
            //     fadein:0,
            //     delay: 1500,
            //     onend: function() {
            //       //move on to chapter 2, this can't be stopped
            //       setTimeout(function(){ changePage("next"); },2000);

            //     }
            //   }
            // ] //end of narration objects      
      //     } //end subframe 2 
      //   ] //end subframe object 
      // }, //end of 1.5 

        {
          subframes: [
              { 
                url: "pages/1/6.html", 
                visited:false,
                isDefault: false, 
                  sound: {
                    urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.6_background.mp3', 'http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.6_background.oga'],
                    loop: true,
                    buffer:true,
                    autoplay: false,
                    fadein:800 
                    }, 
                    narration:  [
                    {
                      urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.6_narrative.mp3', 'http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.6_narrative.ogg'],                     
                        loop: false, 
                        buffer:true,
                        autoplay: false,
                        fadein:0,
                        delay: 1000, 
                        onend: function() {
                        _timer.checkTimer(); 
                      } 
                    }
                  ]//end of the narration ob      
                }, //end subframe 1 
  
              {  // start subframe 2 
                url: "pages/1/6b.html", 
                visited:false,
                isDefault: true, 
                sound: {
                  urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.6_background.mp3', 'http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.6_background.oga'],
                  loop: true,
                  buffer:true,
                  autoplay: false,
                  fadein:800
                }, 
                narration:  [
                {
                  urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.6b_narrative.mp3', 'http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.6b_narrative.ogg'],
                    played: false, 
                    loop: false,
                    buffer:true,
                    autoplay: false,
                    fadein: 0,  
                    delay: 1000, 
                    onend: function() {
                        //move on to chapter 2, this can't be stopped
                        setTimeout(function(){ changePage("next"); },2000);
                      }
                    }
                  ]
                } //end subframe 2 
              ] //end subframe object 
            }, //end 1.6 

        {
          subframes: [
            { 
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
                  delay: 1000, 
                   onend: function() {
                //     //only start the timer after she has finished speaking. 
                    _timer.checkTimer();
                  }
                }
              ]
            }, //end subframe 1

           { 
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
                  played: false, 
                  loop: false,
                  buffer:true,
                  autoplay: false,
                  fadein:0,
                  delay: 0, 
                   onend: function() {
                //     //only start the timer after she has finished speaking. 
                    _timer.checkTimer();
                  }
                }
              ]
            } //end of 1.7b 
          ]
        }, //end of 1.7 object 
        



      { //start of 1.8 
          subframes: [
            
            { // start subframe 1 
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
              urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.8_narrative.mp3'],
              loop: false,
              buffer:true,
              autoplay: false,
              fadein:0,
              delay: 1000, 
               onend: function() {
                //only start the timer after she has finished speaking. 
                _timer.checkTimer(); 
              }
            }
          ] // end of narration object
        }, //end of subframe 1 
        //subframe 2 
            { // start subframe 2
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
                played: false, 
                loop: false,
                buffer:true,
                autoplay: false,
                fadein:0,
                delay: 1000, 
                 onend: function() {
                  //only start the timer after she has finished speaking. 
                  _timer.checkTimer(); 
                }
            }
          ] // end of narration object
        } //end of subframe 1 
    ] // end of subframes 
  },  //end of 1.8



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
              urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.9_narrative.mp3', 'http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.9_narrative.ogg'],
              loop: false,
              buffer:true,
              autoplay: false,
              fadein:0,
              delay: 1000, 
               onend: function() {
                //only start the timer after she has finished speaking. 
                _timer.checkTimer(); 
              }
            }
          ]
        },
      ] 
    }, //end of 1.9 

    //CHAPTER 2//
    { 
      url: "pages/2.html", title: "The Stairs", 
      frames: [
        { 
          url: "pages/2/1.html" //this doesn't exist 
        }
      ]
    },

    ///CHAPTER 4//
    { 
      url: "pages/4.html", title: "The Apartment", 
      frames: [
        { 
          url: "pages/4/1.html" //leads you to the next stuff. 
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
          //onload: _timer.checkTimer(); 
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

    if( this.doesFrameHaveSubframes(page,frame) ){
      // console.log("subframes" + this.doesHaveSubframes(page,frame)); 
      console.log("inside of getFrameNarration"); 

      var n = this.getSubframeByIndex( page, frame, this.currentSubframeIndex ).narration;
      return n;
      console.log("this" + n); 

    }else{
      // console.log("got narration"); 
      return pageinfo[page].frames[frame].narration; 
    }

  }
  this.getFrameSound = function (page, frame) { 
    
    if( this.doesFrameHaveSubframes( page,frame )  ){
      // console.log("getting subframe sound for subframe: "+this.currentSubframeIndex);
      var s = this.getSubframeByIndex( page, frame, this.currentSubframeIndex ).sound;
      console.log(s);
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

    // console.log( "checking for subframes" );

    if( pageinfo[page].frames[frame].subframes ){
      console.log( "has subframes" );
      return true;
    }
    else{
      console.log( "NO subframes" );
      return false;
    }

  }

  this.getSubframeByIndex = function( page, frame, subframe_index ){
    // console.log("gettting subframe by index"); 
    if( subframe_index < pageinfo[page].frames[frame].subframes.length ){
        var sf = pageinfo[page].frames[frame].subframes[subframe_index];
        console.log(sf);
       return sf;

    }
    else{
      console.log("you asked for a subframe that was not there at index: "+subframe_index);
      //return (subframe_index); 
    }

  } 

  this.visitSubframe = function( page, frame ){
    //THE PROBELM IS HERE BECAUSE IT SAYS THAT WE DONT HAVE A SUBFRAME WHEN WE DO. 

     console.log( "getting subframe" );
    var subframes = pageinfo[page].frames[frame].subframes;

    var foundSubframe = false;
      for(var i = 0; i < subframes.length; i++ ){
          // console.log( "checking subframe" );
          // console.log( "been here:" + subframes[i].visited );
          //if we've already been there, skip this and go to the next loop iteration. 
          if(subframes[i].visited) continue;
          else {
            console.log("new subframe"); 
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

var _pages = new Pages();

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











