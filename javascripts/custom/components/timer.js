
//This is the listener to when people are doing soemthing int he applicaiton or not 


// I am assing this comment to push it and see if it works. 


var Timer = function() {

var firstNarration = {
              urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.10_narrative.mp3', 'http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.10_narrative.ogg'],
              loop: false,
              buffer:true,
              autoplay: false,
              fadein:0,
              delay: 3000
            }; 

var secondNarration = {

            urls: ['http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.0_narrative.mp3', 'http://dbef91h7r4asa.cloudfront.net/assets/1_street/sound/1.0_narrative.ogg'],

            loop: false,
            buffer:true,
            autoplay: false,
            fadein:0, 
            delay: 1000, 
            //this will take you to the next chapter (page)
          onend: function() {
              changePage("next"); 
          }
}; 

var player,  
playSound,
playSound2,  
firstSound = false, 
timerOn = false; 

// var goNextChapter = function() {
//  changePage("next"); 
// }; 

//you count for the first sound, after 15 seconds, you start counting for the second sound. 
this.startTimer = function(delay)  {
  //if there is no delay, it will be 15000 otherwise, it will be the 'delay' value I give it. 
  var delayTime = 15000; 
  if (delay)  delayTime = delay;

console.log("the timer has started"); 
  timerOn = true;
  playSound = setTimeout(function()
    {
      player = new Howl(firstNarration); 
      //console.log("playing first timeout sound"); 
      player.fadeIn(1, 800); //this will fad ein the sound after 800 milliseconds
      firstSound = true; 
      playSound2 = setTimeout(function() {
        player = new Howl(secondNarration); 
        player.fadeIn(1,800);
        //console.log("playing second timeout sound"); 
        firstSound = false; 
        timerOn = false; 
      }, 50000); //90000

    }, delayTime); //play this after 15 sec 

  }; 

  this.stopTimer = function () {
    //console.log("timer stopped"); 
    timerOn = false; 
    //restart the timer
    if (firstSound) {
      clearTimeout(playSound2); 
      firstSound = false; 
    } else {
      clearTimeout(playSound);
    }
  
  }; 

  this.resetTimer = function () {
    currentFrameIndex = _frameIndex;
    this.stopTimer();
    //this keep sthe condition for 1.7 when called at a different place. 
    if (_frameIndex == 7) {
                this.startTimer(30000); 
              } else {
                this.startTimer(15000); 
              } 
  }; 

  this.isTimerOn = function() {
    return timerOn; 
  }

    //IF THE USER DOES NOTHING, THEY WILL HEAR THIS. 
    //THIS IS ADDING THE TIMED OUT NARRATIONS FOR CHAPTER 1
    //we fire this at the end of oned in the json object


  var currentFrameIndex = 0; 

  this.checkTimer = function() {
    console.log("i am checking the timer"); 
        if (_pageIndex === 1) {
          console.log("you are in chapter 1")
          //if youw ere counting, count again every time we are in a new frame. 
          if (this.isTimerOn() ) {
            //console.log("the timer was on"); 
            //timer was on and i moved to next frame and im not in page 7. 
            //if ive moved. 
            if (_frameIndex != currentFrameIndex) {
              console.log("the timer has been reset, because it was on and you are in a different frame"); 
              this.resetTimer(); 
            } 
            //console.log("frames are equal"); 
          } else { 
            //if she has done speaking the delayed audio.. ?
            //give a bigger delay to 1.7 
              if (_frameIndex == 7) {
                console.log("frame is 7"); 
                //this is how long it will take to start the audio 
                this.startTimer(45000); 
              } else {
                this.startTimer(15000); 
              }
              
              //console.log("the timer starts"); 
              currentFrameIndex = _frameIndex;
              //console.log("currentFrameIndex is " + currentFrameIndex );  

          }
        } else {
            //if you are not in chapter 1 or 1.7 
            ////console.log("you are not in chapter1 or you are at 1.7"); 
            this.stopTimer(); 
            console.log("the timer is stopped"); 
        }
    }

}

//global timer. 
var _timer = new Timer(); 