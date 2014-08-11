
//This is the listener to when people are doing soemthing int he applicaiton or not 

var Timer = function() {

var firstNarration = {
              urls: ['assets/1/sound/1.2_narrative.mp3', 'assets/1/sound/1.2_narrative.oga'],
              loop: false,
              buffer:true,
              autoplay: false,
              fadein:0,
              delay: 3000
            }; 

var secondNarration = {
            urls: ['assets/1/sound/1.9_narrative.mp3', 'assets/1/sound/1.9_narrative.oga'],
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
			}, 20000); //90000

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
}

//global timer. 
var _timer = new Timer(); 
