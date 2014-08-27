//all the variables need to have event listeners, and that is how they will
//bring in the noise and the images. 



function init(e) {

	var address = document.querySelector('#address');
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
 
	activeAddress(); 
	activePrice(); 
	activeAgent(); 
	activeA1(); 
	activeA2(); 
	activeA3(); 
	activeA4(); 
	activeA5(); 
	changeMap(); 
	// changeSlider(value); 

}



//this activates everything for the address 
function activeAddress() {
	address.addEventListener('click', function(e) {
			var sound = new Howl({
				urls: ['https://s3-us-west-2.amazonaws.com/89steps/assets/5_website/audio/5.02_address_audio_01.mp3'], 
				buffer: false, 
			}).play(); 
		});

} 

function activePrice() {
	price.addEventListener('click', function(e) {
			var sound = new Howl({
				urls: ['https://s3-us-west-2.amazonaws.com/89steps/assets/5_website/audio/5.03_price_audio_01.mp3'], 
				buffer: false, 
			}).play(); 
		}); 

}

function activeAgent() {
	agent.addEventListener('click', function(e) {
		var sound = new Howl({
				urls: ['https://s3-us-west-2.amazonaws.com/89steps/assets/5_website/audio/5.05_agent_audio_01.mp3'], 
				buffer: false, 
			}).play(); 
		}); 
}

function activeA1() {
	a1.addEventListener('click', function(e) {
		var sound = new Howl({
				urls: ['https://s3-us-west-2.amazonaws.com/89steps/assets/5_website/audio/5.08_apt19_audio_01.mp3'], 
				buffer: false, 
			}).play(); 
		}); 
}


function activeA2() {
	a2.addEventListener('click', function(e) {
		var sound = new Howl({
					urls: ['https://s3-us-west-2.amazonaws.com/89steps/assets/5_website/audio/5.08_apt27_audio_01.mp3'], 
					buffer: false, 
				}).play(); 
			});  
}

function activeA3() {
	a3.addEventListener('click', function(e) {
		var sound = new Howl({
					urls: ['https://s3-us-west-2.amazonaws.com/89steps/assets/5_website/audio/5.08_apt20_audio_01.mp3'], 
					buffer: false, 
				}).play(); 
			});  
}

function activeA4() {
	a4.addEventListener('click', function(e) {
		console.log("a4"); 
	})
}

function activeA5() {
	a5.addEventListener('click', function(e){
		console.log("a5"); 
	})
}

function changeMap() {
	map.addEventListener('click', function(e) {
		console.log("changed the src"); 
		this.src="https://s3-us-west-2.amazonaws.com/89steps/assets/5_website/img/5.14_map_02.gif"; 

			var sound = new Howl({
					urls: ['https://s3-us-west-2.amazonaws.com/89steps/assets/5_website/audio/5.14_map_audio_01.mp3'], 
					buffer: false, 
				}).play(); 
	}); 
}

// function goToNext() {
// 	nextButton.addEventListener('click', function(e){
// 		alert("this will go to the next page"); 
// 	})
// }

function changeSlider(value) {
  console.log("changeSlider has been clicked" + value); 
  var slider = $("ul.slider"),
  slides = slider.children('li'),
  slideCount = slides.length, 
  slidecounter = slider.children('.counter'), 
  currentIndex = slideIndex;
  
  if (value==="next") {
    slideIndex < slideCount-1 ? slideIndex++ : slideIndex = 0;
  } 
  else if (value==="prev") { 
    slideIndex > 0 ? slideIndex-- : slideIndex = slideCount-1;
  } 
  else if (value==="first") { 
    slideIndex = 0;
  } 
  else if (value==="last") {
    slideIndex = slideCount - 1;
  } 
  else { 
    slideIndex = Math.min(slideCount-1, Math.max(0, parseInt(value)));
  }

  slides.removeClass('active');
  slides.addClass('hidden'); 

  slides.eq(slideIndex).removeClass('hidden'); 

  slides.eq(slideIndex).addClass('active').find('video').each( function () { 
    var el = $(this)[0];
    if (el) el.play(); 
  } );

  slides.eq(currentIndex).find('video').each( function () { 
    var el = $(this)[0];
    if (el) el.pause(); 
  } );

    // slideview.fadeOut('fast', function() { 
    //     slideview.removeClass('loaded').load(getCurrentslideUrl(), function() { 
    //         slideview.show();
    //     }); 
    // });

  // changeslideBackground(_pages.getslideSound(_pageIndex, slideIndex));
  // changeslideNarration(_pages.getslideNarration(_pageIndex, slideIndex));
  
  slidecounter.text((slideIndex+1) + "/" + (slideCount));
}



document.addEventListener('DOMContentLoaded', init, false);








