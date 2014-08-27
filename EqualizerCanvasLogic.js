	
	 var Game_Interval;
	 //Add event listener to buttons on the view to start or update equalizer
	document.getElementById('startShow').addEventListener("click", function() {
	    startShow();
	    document.getElementById('reset').style.display='inline';
	}, false);

	 //Now event listener to add/remove sound button
	document.getElementById('soundEffect').addEventListener("click", function() {
	    soundEffect()
	}, false);

document.getElementById('reset').addEventListener("click", function() {
	    

	    if(typeof Game_Interval!=='undefined'){
	    clearInterval(Game_Interval);
	    document.getElementById('reset').style.display='none';
	}
	
	}, false);


	var sndPlay = 0;



	soundEffect = function() {
	    if (sndPlay == 1){
	        sndPlay = 0;
	    }
	    else{
	        sndPlay = 1;
	    }
	}


	startShow = (function() {

	    var snd;

	    var audioFileName = document.getElementById('inputSoundFile').value;
	    if (audioFileName.length < 5) {
	        audioFileName = "glass_shatter_c.wav";
	    }

	    snd = new Audio(audioFileName);

	    var can = document.getElementById("equalizerCanvas");

	    var height = document.getElementById('height').value;
	    var numbver = document.getElementById('numbers').value;
	    var width = document.getElementById('width').value;
	    var frameRate = document.getElementById('frameRate').value;
	    var areaWidth = document.getElementById('areaWidth').value;
	    if (can.width < window.innerWidth) {
	        can.width = window.innerWidth;
	    }

	    var ctx = can.getContext("2d");

	    var x = 100,
	        y = 100;

	    function draw() {
	        if (sndPlay == 1)
	            snd.play();
	        ctx.globalCompositeOperation = "source-over";
	        ctx.fillStyle = "rgba(0,0,0,0.8)";
	        ctx.fillRect(0, 0, can.width, 400);
	        ctx.globalCompositeOperation = "lighter";
	        for (var i = 0; i < particle.length; i++) {
	            var part = particle[i];
	            ctx.beginPath();
	            var grad = ctx.createRadialGradient(part.x, part.y, 0, part.x, part.y, 20);

	            grad.addColorStop(0, "white");
	            grad.addColorStop(1, part.color);

	            if (width.length == 0 || width < 1){
	                width = 15;
	            }

	            ctx.fillStyle = grad;
	            ctx.rect(part.x, part.y, width, -part.height);
	            ctx.fill();
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