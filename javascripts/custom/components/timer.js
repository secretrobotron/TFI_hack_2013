
//This is the listener to when people are doing soemthing int he applicaiton or not 

<<<<<<< HEAD
// I am assing this comment to push it and see if it works. 


var Timer = function() {

var firstNarration = {
              urls: ['assets/1/sound/1.2_narrative.mp3'],
=======
var Timer = function() {

var firstNarration = {
              urls: ['assets/1/sound/1.2_narrative.mp3', 'assets/1/sound/1.2_narrative.oga'],
>>>>>>> 66bbe942ed98f242ccaf5feb263856f486fcd87c
              loop: false,
              buffer:true,
              autoplay: false,
              fadein:0,
              delay: 3000
            }; 

var secondNarration = {
<<<<<<< HEAD
            urls: ['assets/1/sound/1.0_narrative.mp3', 'assets/1/sound/1.0_narrative.oga'],
=======
            urls: ['assets/1/sound/1.9_narrative.mp3', 'assets/1/sound/1.9_narrative.oga'],
>>>>>>> 66bbe942ed98f242ccaf5feb263856f486fcd87c
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
// 	changePage("next"); 
// }; 

//you count for the first sound, after 15 seconds, you start counting for the second sound. 
this.startTimer = function()  {
	timerOn = true;
	playSound = setTimeout(function()
		{
			player = new Howl(firstNarration); 
			console.log("playing first timeout sound"); 
			player.fadeIn(1, 800); //this will fad ein the sound after 800 milliseconds
			firstSound = true; 
			playSound2 = setTimeout(function() {
				player = new Howl(secondNarration); 
				player.fadeIn(1,800);
				console.log("playing second timeout sound"); 
				firstSound = false; 
				timerOn = false; 
<<<<<<< HEAD
			}, 90000); //90000
=======
			}, 20000); //90000
>>>>>>> 66bbe942ed98f242ccaf5feb263856f486fcd87c

		}, 15000); //play this after 15 sec 

	}; 

	this.stopTimer = function () {
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
		this.stopTimer(); 
		this.startTimer(); 
	}; 

	this.isTimerOn = function() {
		return timerOn; 
	}
<<<<<<< HEAD

		//IF THE USER DOES NOTHING, THEY WILL HEAR THIS. 
		//THIS IS ADDING THE TIMED OUT NARRATIONS FOR CHAPTER 1
		//we fire this at the end of oned in the json objects
	this.checkTimer = function() {
    console.log("i am checking the timer"); 
        if (_pageIndex === 0) {
          console.log("you are in chapter 1 and not in 1.7")
          //if youw ere counting, count again every time we are in a new frame. 
          if (_timer.isTimerOn() ) {
            //timer was on and i moved to next frame and im not in page 7. 
            _timer.resetTimer(); 
          } else {
              _timer.startTimer(); 
          }
        } else {
            //if you are not in chapter 1 or 1.7 
            //console.log("you are not in chapter1 or you are at 1.7"); 
            _timer.stopTimer(); 
        }
    }
=======
>>>>>>> 66bbe942ed98f242ccaf5feb263856f486fcd87c
}

//global timer. 
var _timer = new Timer(); 
