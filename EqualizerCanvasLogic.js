	
	 var Game_Interval;
	 //Add event listener to buttons on the view to start or update equalizer
	document.getElementById('startShow').addEventListener("click", function() {
	    startShow();
	    document.getElementById('pause').style.display='inline';
	}, false);

	 //Now event listener to add/remove sound button
	document.getElementById('soundEffect').addEventListener("click", function() {
	    soundEffect()
	}, false);

document.getElementById('pause').addEventListener("click", function() {
	    

	  
	    clearInterval(Game_Interval);
	    document.getElementById('pause').style.display='none';
	
	
	}, false);


var can = document.getElementById("equalizerCanvas");
 var canvasContext = can.getContext("2d");
var maximumWidth=window.innerWidth;
var maximumHeight=400;






function initializeCanvasWithImageSource(placeHolderImageSource){
	var base_image = new Image();
  base_image.src = 'Dummy_Equalizer.jpg';


  base_image.onload = function(){
    canvasContext.drawImage(base_image,0 , 0);

  }
}


initializeCanvasWithImageSource('Dummy_Equalizer.jpg');




	var soundPlay = 0;



	soundEffect = function() {
	    if (soundPlay == 1){
	        soundPlay = 0;
	    }
	    else{
	        soundPlay = 1;
	    }
	}


	startShow = (function() {

	    var audioSource;

	    var audioFileName = document.getElementById('inputSoundFile').value;
	    if (audioFileName.length < 5) {
	        audioFileName = "glass_shatter_c.wav";
	    }

	    audioSource = new Audio(audioFileName);

	    

	    var height = document.getElementById('height').value;
	    var numbver = document.getElementById('numbers').value;
	    var width = document.getElementById('width').value;
	    var frameRate = document.getElementById('frameRate').value;
	    var areaWidth = document.getElementById('areaWidth').value;
	    if (can.width < window.innerWidth) {
	        can.width = maximumWidth;
	    }

	   

	    var x = 100,
	        y = 100;

	    function draw() {
	        if (soundPlay == 1)
	            audioSource.play();
	        canvasContext.globalCompositeOperation = "source-over";
	        canvasContext.fillStyle = "rgba(0,0,0,0.8)";
	        canvasContext.fillRect(0, 0, maximumWidth, maximumHeight);
	        canvasContext.globalCompositeOperation = "lighter";
	        for (var i = 0; i < particle.length; i++) {
	            var part = particle[i];
	            canvasContext.beginPath();
	            var grad = canvasContext.createRadialGradient(part.x, part.y, 0, part.x, part.y, 20);

	            grad.addColorStop(0, "white");
	            grad.addColorStop(1, part.color);

	            if (width.length == 0 || width < 1){
	                width = 15;
	            }

	            canvasContext.fillStyle = grad;
	            canvasContext.rect(part.x, part.y, width, -part.height);
	            canvasContext.fill();
	            if (height.length == 0 || height < 1)
	                height = 200;
	            part.height += height * Math.random();
	            if (part.height > Math.random() * (1.5 * height)) {
	                part.height = Math.random() * (height * 0.8);
	            }

	            
	        }

	    }

	    function ranpoint(xValueOfRandomBar) {
	        this.x = xValueOfRandomBar;
	        this.y = 350;

	        var r = Math.random() * 255 >> 0;
	        var g = Math.random() * 255 >> 0;
	        var b = Math.random() * 255 >> 0;

	        this.color = "rgba(" + r + "," + g + "," + b + ",0.5)";
	        this.height = Math.random() * 200 + 100;

	    }

	    if (numbver.length == 0 || numbver < 1)
	        numbver = 20;
	    var particle = [];

	    if (areaWidth.length == 0 || areaWidth < 1)
	        areaWidth = 600
	    for (var i = 20; i <= areaWidth; i += areaWidth / numbver) {

	        particle.push(new ranpoint(i));

	    }
	    if (frameRate.length == 0)
	        frameRate = 12;

	    if (typeof Game_Interval != "undefined") clearInterval(Game_Interval);
	    Game_Interval = setInterval(draw, (1 / frameRate) * 1000);

	})