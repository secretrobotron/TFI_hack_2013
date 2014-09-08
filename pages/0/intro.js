// console.log("you are in intro.js"); 
window.onclick(alert("you clicked")); 


// (function() {


// 	var VIDEO_FPS = 24; 

// 	var SHOW_TITLES = 48 + (19 /VIDEO_FPS); 
// 	// var VIDEO_END_TIME = 
// 	var START_VIDEO = 4 + (19/VIDEO_FPS); 

// 	var video; 
// 	var popcorn; 

// 	function positionVideo () {
// 	    var width, height;
// 	    var aspectRatio = video.videoWidth / video.videoHeight;

// 	    // TODO: fix this scaling
// 	    if (window.innerHeight * aspectRatio < window.innerWidth) {
// 	      width = window.innerWidth;
// 	      height = width / aspectRatio;      
// 	    }
// 	    else {
// 	      height = window.innerHeight;
// 	      width = height * aspectRatio;      
// 	    }

// 	    video.width = width;
// 	    video.height = height;

// 	    video.style.width = width + 'px';
// 	    video.style.height = height + 'px';

// 	    video.style.top = window.innerHeight / 2 - height / 2 + 'px';
// 	    video.style.left = window.innerWidth / 2 - width / 2 + 'px';
// 	  }

// function init(e) {
// 	console.log("init has been called"); 
// 	var introtitles = document.querySelector("#introtitles"); 
// 	var popcorn = Popcorn("#intro"); 

// 	//load video and pause it 
// 	popcorn.preload("auto");
// 	popcorn.pause();

// 	//start video at 4 seconds
// 	popcorn.cue(START_VIDEO, function() {
// 		console.log("start video has been called"); 
// 		popcorn.play(); 
// 	})

// 	}


// // document.addEventListener("DOMContentLoaded", init, false); 
// // document.addEventListener("DOMContentLoaded", alert("hi"), false); 

// }); 




// // function init() {

// // // var popcorn = Popcorn( '#intro'); 

// // console.log("this has started");
// // //hide nav

// // hideNav(); 
 
// // }

// // document.addEventListener("DOMContentLoaded", init, false); 