//all the variables need to have event listeners, and that is how they will
//bring in the noise and the images. 



function init(e) {

	// _timer.checkTimer(); 
	hideNav(); 

	
	var address = document.querySelector("#address");
	var price = document.querySelector("#price"); 
	var agent = document.querySelector("#agent"); 
	var map = document.querySelector("#map"); 
	var a1 = document.querySelector("#a1"); 
	var a2 = document.querySelector("#a2"); 
	var a3 = document.querySelector("#a3"); 
	var a4 = document.querySelector("#a4");
	var a5 = document.querySelector("#a5"); 
	var nextButton = document.querySelector("#next-button"); 
	var crime = document.querySelector("#crime"); 
	var transit = document.querySelector("#transit"); 
	var amenities = document.querySelector("#amen"); 


	setTimeout(function() {

	$("#overlay").fadeOut('slow'); 	
	console.log("fadein"); 
	$('#prevbutton').addClass('hidden');
 	$('#nextbutton').addClass('hidden');
	},3000); 

	hideNav(); 

	$(".fancybox").fancybox({
        padding : 0, 
        arrows: true, 
        closeBtn: true,
        nextEffect: 'fade', 
        prevEffect: 'fade', 
        // loop: true, 
    });

	// setTimeout(function() {

 //    _timer.isCalling();
 //    $('.calling').removeClass('hidden'); 
 //    // $('.calling').addEventListener('click', function() {
 //    // 	console.log("end call"); 
 //    // }) 
 //    //remove hidden on call. 

	// },10000); 

 
 
	// activeAddress(); 
	// activePrice(); 
	// activeAgent(); 
	// activeA1(); 
	// activeA2(); 
	// activeA3(); 
	// activeA4(); 
	// activeA5(); 
	// changeMap(); 
	// activateAmenities(); 

}

// setTimeout(function(){
// 	$('#prevbutton').addClass('hidden');
// 	$('#nextbutton').addClass('hidden');
// }, 100)



//this activates everything for the address 
// function activeAddress() {
// 	address.addEventListener('hover', function(e) {
// 			var sound = new Howl({
// 				urls: ['http://dbef91h7r4asa.cloudfront.net/assets/5_website/audio/5.02_address_audio_01.mp3'], 
// 				buffer: false,
// 				onend: 
// 			}).play(); 
// 		});

// } 

function activePrice() {
	price.addEventListener('hover', function(e) {
			var sound = new Howl({
				urls: ['http://dbef91h7r4asa.cloudfront.net/assets/5_website/audio/5.03_price_audio_01.mp3'], 
				buffer: false, 
			}).play(); 
		}); 

}

function activeAgent() {
	agent.addEventListener('hover', function(e) {
		var sound = new Howl({
				urls: ['http://dbef91h7r4asa.cloudfront.net/assets/5_website/audio/5.05_agent_audio_01.mp3'], 
				buffer: false, 
			}).play(); 
		}); 
}

function activeA1() {
	a1.addEventListener('hover', function(e) {
		var sound = new Howl({
				urls: ['http://dbef91h7r4asa.cloudfront.net/assets/5_website/audio/5.08_apt19_audio_01.mp3'], 
				buffer: false, 
			}).play(); 
		}); 
}


function activeA2() {
	a2.addEventListener('hover', function(e) {
		var sound = new Howl({
					urls: ['http://dbef91h7r4asa.cloudfront.net/assets/5_website/audio/5.08_apt27_audio_01.mp3'], 
					buffer: false, 
				}).play(); 
			});  
}

function activeA3() {
	a3.addEventListener('hover', function(e) {
		var sound = new Howl({
					urls: ['http://dbef91h7r4asa.cloudfront.net/assets/5_website/audio/5.08_apt20_audio_01.mp3'], 
					buffer: false, 
				}).play(); 
			});  
}

function activateAmenities() {
	//here is where the amenities. 
	var sound = new Howl({
		urls: ['https://s3-us-west-2.amazonaws.com/89steps/assets/5_website/audio/5.18_amenities_audio.mp3', 'https://s3-us-west-2.amazonaws.com/89steps/assets/5_website/audio/5.18_amenities_audio.ogg']
		buffer: false, 
	}).play(); 
}

function activeA4() {
	a4.addEventListener('hover', function(e) {
		console.log("a4"); 
	})
}

function activeA5() {
	a5.addEventListener('hover', function(e){
		console.log("a5"); 
	})
}

function changeMap() {
	map.addEventListener('hover', function(e) {
		console.log("changed the src"); 
		this.src="http://dbef91h7r4asa.cloudfront.net/assets/5_website/img/5.14_map_02.gif"; 

			var sound = new Howl({
					urls: ['http://dbef91h7r4asa.cloudfront.net/assets/5_website/audio/5.14_map_audio_01.mp3'], 
					buffer: false, 
				}).play(); 
	}); 
}





document.addEventListener('DOMContentLoaded', init, false);








