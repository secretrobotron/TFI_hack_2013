//all the variables need to have event listeners, and that is how they will
//bring in the noise and the images. 
	if (window.parent && window.parent.hideNav) {
      window.parent.hideNav();
      console.log('hid navigation'); 
    }
function init(e) {
	//hide Navivgation for the listing. 
	// if (window.parent && window.parent.hideNav) {
 //      window.parent.hideNav();
 //      console.log('hid navigation'); 
 //    }

	var address = document.querySelector("#address");
	var price = document.querySelector("#price"); 
	var agent = document.querySelector("#agent"); 
	var map = document.querySelector("#map"); 
	//var a1 = document.querySelector("#apartment1"); 
	var nextButton = document.querySelector("#next-button"); 
	var answer = document.querySelector("#answer");
	var ignore = document.querySelector("#ignore"); 
	// var video = document.querySelector()
	var videoplayed = true; 

				$("#instructions").removeClass('hidden');  
				window.addEventListener('click', function hideInstructions() {
						window.removeEventListener('click', hideInstructions); 
						instructions.classList.add('hidden'); 
					}, false); 


				$(".fancybox").fancybox({
			        padding : 0, 
			        arrows: true, 
			        closeBtn: true,
			        nextEffect: 'fade', 
			        prevEffect: 'fade', 
			        // loop: true, 
			    });

	// var a1 = document.querySelector("#apartment1"); 
	callComesIn(); 
	activeAddress(); 
	activePrice(); 
	activeAgent();  
	activeA1(); //undefined is not a function
	activeA2(); 
	activeA3(); 
	activeA4(); 
	activeA5(); 
	changeMap(); 
	activateAmenities(); //amenities is not defined
	activeTransit(); 
	activeCrime(); 
	activeSchools(); 

} //end of INIT
		//if a howl already exists, then replace it with this one.
		//make this into a function 
		//fade out the old one. 
		//changeAudio(urls) { }

function checkSound(sound) {
	var currentSound = sound; 
	console.log(currentSound); 

	if(currentSound.duration != currentSound.end) {
		console.log('havent finished this sound'); 
		currentSound.fadeOut(0,1); 
	}
	//if a howl instance is still playing, only start a new one if you can. 
}

function callComesIn() {
	setTimeout(function(){
	console.log("call coming in"); 
	var callVideo = document.querySelector('video[data-video="calling"]'); 
	var videoplayed = false; 
	var ring = {
			urls: ['http://dbef91h7r4asa.cloudfront.net/assets/5_website/audio/5.20ring.mp3', 'http://dbef91h7r4asa.cloudfront.net/assets/5_website/audio/5.20ring.mp3'],
			loop: true,
			buffer:true,
			autoplay: false,
			fadein:0, 
			delay: 1000, 
			}; 

	var player = new Howl(ring); 
	player.fadeIn(1, 200);

	//show the call 
	$('.calling').removeClass('hidden'); 

		//ANSWER THE CALL
		answer.addEventListener('click', function() {
			$('.calling').addClass('hidden');
			window.parent.next(); 
			//maybe if I change it to next, it won't do this? 
			//remove the rest of the event listeners, so you can't click on anything else. 
			videoplayed = true; 
									    
		})

		//IGNORE THE CALL 
		ignore.addEventListener('click', function() {
			//make it go away and then make you keep exploring the page 
			player.pause(); 
			$('.calling').addClass('hidden');
			videoplayed = false; 

				//GET A SECOND CALL IF YOU DIDN'T ANSWER
				if (!videoplayed) {
				console.log("you shoudl get another call soon"); 
				callComesIn();  
			}
		})    
	},75000); //call comes in after 45 seconds 
}

function playStartVideo() {
	var startVideo = document.querySelector('video[data-video="start"]'); 
	startVideo.play(); 
	popcorn = Popcorn(startVideo); 
	var VIDEO_END_TIME = 48; //in seconds

		popcorn.cue(VIDEO_END_TIME, function() {
			startVideo.pause(); 
			startVideo.classList.add('hidden'); 
		})
}



//this activates everything for the address 
function activeAddress() {
	console.log('clicked address'); 
	address.addEventListener('click', function(e) {
			 
			var sound = new Howl({
				urls: ['http://dbef91h7r4asa.cloudfront.net/assets/5_website/audio/5.02_address_audio_01.mp3'], 
				buffer: false,
			}).play(); 

			checkSound(sound);
		});
} 

function activePrice() {
	price.addEventListener('click', function(e) {
			var sound = new Howl({
				urls: ['http://dbef91h7r4asa.cloudfront.net/assets/5_website/audio/5.03_price_audio_01.mp3'], 
				buffer: false, 
			}).play(); 
		}); 

	// price.removeEventListener('hover', function(e), false); 

}

function activeAgent() {
	agent.addEventListener('click', function(e) {
		var sound = new Howl({
				urls: ['http://dbef91h7r4asa.cloudfront.net/assets/5_website/audio/5.05_agent_audio_01.mp3'], 
				buffer: false, 
			}).play(); 
		}); 
}

function activeA1() {
	var apt1 = document.querySelector("#a1"); 
	apt1.addEventListener('click', function(e) {
		var sound = new Howl({
				urls: ['http://dbef91h7r4asa.cloudfront.net/assets/5_website/audio/5.08_apt19_audio_01.mp3'], 
				buffer: false, 
			}).play(); 
		}); 
}


function activeA2() {
	var apt2 = document.querySelector("#a2"); 
	apt2.addEventListener('click', function(e) {
		var sound = new Howl({
					urls: ['https://s3-us-west-2.amazonaws.com/89steps/assets/5_website/audio/5.09_apt27_audio_01.mp3', 'https://s3-us-west-2.amazonaws.com/89steps/assets/5_website/audio/5.09_apt27_audio_01.ogg'], 
					buffer: false, 
				}).play(); 
			});  
}

function activeA3() {
	var apt3 = document.querySelector("#a3"); 
	apt3.addEventListener('click', function(e) {
		var sound = new Howl({
					urls: ['https://s3-us-west-2.amazonaws.com/89steps/assets/5_website/audio/5.10_apt20_audio_01.mp3', 'https://s3-us-west-2.amazonaws.com/89steps/assets/5_website/audio/5.10_apt20_audio_01.ogg'], 
					buffer: false, 
				}).play(); 
			});  
}

function activateAmenities() {
	//here is where the amenities. 
	var amenities = document.querySelector("#amen"); 
	amenities.addEventListener('click', function(e) {
			var sound = new Howl({
			urls: ['https://s3-us-west-2.amazonaws.com/89steps/assets/5_website/audio/5.18_amenities_audio.mp3', 'https://s3-us-west-2.amazonaws.com/89steps/assets/5_website/audio/5.18_amenities_audio.ogg'], 
			buffer: false, 
		}).play(); 
	}); 	
}


function activeTransit() {
	var transit = document.querySelector("#transit"); 
	transit.addEventListener('click', function(e){
		var sound = new Howl ({
			urls: ['https://s3-us-west-2.amazonaws.com/89steps/assets/5_website/audio/5.16_transit_audio_01.mp3', 'https://s3-us-west-2.amazonaws.com/89steps/assets/5_website/audio/5.16_transit_audio_01.ogg'], 
			buffer: false, 
		}).play(); 
	}); 
}

function activeCrime() {
	var crime = document.querySelector("#crime"); 
	crime.addEventListener('click', function(e){
		var sound = new Howl ({
			urls:['https://s3-us-west-2.amazonaws.com/89steps/assets/5_website/audio/5.15_crime_audio_01.mp3', 'https://s3-us-west-2.amazonaws.com/89steps/assets/5_website/audio/5.15_crime_audio_01.ogg'], 
			buffer: false, 
		}).play();
	}); 
} 

function activeSchools() {
	var schools = document.querySelector("#schools"); 
	schools.addEventListener('click', function(e){
		var sound = new Howl ({
			urls:['https://s3-us-west-2.amazonaws.com/89steps/assets/5_website/audio/5.17_schools_audio.mp3', 'https://s3-us-west-2.amazonaws.com/89steps/assets/5_website/audio/5.17_schools_audio.ogg'], 
			buffer: false, 
		}).play(); 
	}); 
}   



function activeA4() {
	var apt4 = document.querySelector("#a4"); 
	apt4.addEventListener('click', function(e) {
		var sound = new Howl({
			urls:['https://s3-us-west-2.amazonaws.com/89steps/assets/5_website/audio/5.11_apt23_audio.mp3', 'https://s3-us-west-2.amazonaws.com/89steps/assets/5_website/audio/5.11_apt23_audio.ogg'], 
			buffer: false, 
		}).play(); 
	}); 
}


function activeA5() {
	var apt5 = document.querySelector("#a5"); 
	apt5.addEventListener('click', function(e){
		var sound = new Howl({
			urls:['https://s3-us-west-2.amazonaws.com/89steps/assets/5_website/audio/5.12_apt21_audio_01.mp3', 'https://s3-us-west-2.amazonaws.com/89steps/assets/5_website/audio/5.12_apt21_audio_01.ogg'], 
			buffer: false, 
		}).play(); 
	}); 
}

function changeMap() {
	map.addEventListener('click', function(e) {
		console.log("changed the src"); 
		this.src="http://dbef91h7r4asa.cloudfront.net/assets/5_website/img/5.14_map_02.gif"; 

			var sound = new Howl({
					urls: ['http://dbef91h7r4asa.cloudfront.net/assets/5_website/audio/5.14_map_audio_01.mp3'], 
					buffer: false, 
				}).play(); 
	}); 
}





document.addEventListener('DOMContentLoaded', init, false);








