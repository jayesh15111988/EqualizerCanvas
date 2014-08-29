
//Game Interval to keep track of animation recurrence event. Reset it to pause the ongoing animation
var Game_Interval;

//Add event listener to buttons on the view to start or update equalizer
document.getElementById('startShow').addEventListener("click", function() {
    
    startShow();
    document.getElementById('pause').style.display = 'inline';

}, false);

document.getElementById('pause').addEventListener("click", function() {

    //We know that Game_Interval is defined before being passed to this function
    clearInterval(Game_Interval);
    document.getElementById('pause').style.display = 'none';

}, false);

//Get canvas element
var can = document.getElementById("equalizerCanvas");

//Routine tasks before getting started with canvas animation
var canvasContext = can.getContext("2d");

//Setup maximum width and height over which canvas animation will span
var maximumWidth = window.innerWidth;
var maximumHeight = 400;
var yValueForIndividualEqualizerBars=350;

//Variables to hold audio info which will be used to play while equalizer is being played.
//You can add your own 
var audioSource;
var audioFileName;
var audioErrorNode;

function initializeCanvasWithImageSource(placeHolderImageSource) {
    var base_image = new Image();
    base_image.src = 'Dummy_Equalizer.jpg';

    base_image.onload = function() {
        canvasContext.drawImage(base_image, 0, 0);

    }
}

function getRandomColor(){
	return (Math.random() * 255 >> 0);
}

initializeCanvasWithImageSource('Dummy_Equalizer.jpg');

function individualBarObject(xValueOfRandomBar) {
    
    this.x = xValueOfRandomBar;
    this.y = yValueForIndividualEqualizerBars;

    var r = getRandomColor();
    var g = getRandomColor();
    var b = getRandomColor();

    this.color = "rgba(" + r + "," + g + "," + b + ",0.5)";
    //Initial height for indididual bar
    this.height = Math.random() * 200 + 100;

}

function isInputValueInvalid(inputValueOfParameter){
	return ((inputValueOfParameter.length==0) || (inputValueOfParameter<1));
}

startShow = (function() {

    audioFileName = document.getElementById('inputSoundFile').value;

	//Input the full audio file name along with extension - Make sure file resides in the same directory as all source files

    //If none provided, it will take default file name as an input

    if (audioFileName.length < 5) {
        audioFileName = "glass_shatter_c.wav";
    }

    audioSource = new Audio(audioFileName);

	audioSource.addEventListener("error", function(e) {
    
    //Remove the node to prevent duplication of error message all over the place
    //when user does not have valid audio source and still continues pressing play button on the screen    
	if(typeof audioErrorNode !=='undefined'){
		document.body.removeChild(audioErrorNode);
	}

        var prop='';
        props='Error with description '+e.currentTarget.error.code+' Occurred\
         '+'\
         ';

        props+='And audio Error codes are as follows --------> ';
        
        
        var o = e.currentTarget.error;
        for (prop in o) {
            props += prop+' = '+o[prop]+ '\
            ';
            
        }
	
	audioErrorNode=document.createTextNode(props);
        document.body.appendChild(audioErrorNode);
    });

    //Maximum height each bar can reach
    var height = document.getElementById('height').value;
    
    //Number of bars to be shown on canvas
    var numbver = document.getElementById('numbers').value;
    
    //Width of an individual bar element
    var width = document.getElementById('width').value;

    //Frame rate - Decided how many time frame gets refreshed per second. e.g. If you input 1,
    //It will refresh only once per second
    var frameRate = document.getElementById('frameRate').value;

    //Width of the total area when equalizer is situated
    var areaWidth = document.getElementById('areaWidth').value;

    //Set canvas width to maximum possible screen width
    if (can.width < window.innerWidth) {
        can.width = maximumWidth;
    }

    var x = 100,y = 100;

    function draw() {

    	//Did user clicked the button to play sound?
        if (soundPlay == 1) {
            audioSource.play();
        }
        //Nops, user played pause sound button in between - Pause the ongoing audio
        else{
        	audioSource.pause();	
        }

		//Each time new animation appears, make it overlap with previous screen
		//More information on globalCompositeOperation operations on 
		//http://www.html5canvastutorials.com/advanced/html5-canvas-global-composite-operations-tutorial/

		//Destination will completely eclipse source
        canvasContext.globalCompositeOperation = "source-over";
        canvasContext.fillStyle = "rgba(0,0,0,1.0)";
        canvasContext.fillRect(0, 0, maximumWidth, maximumHeight);

        //Source will overlap destination i.e. big black space. But in lighter manner. They will still be visible to us
        canvasContext.globalCompositeOperation = "lighter";

        //How many bars do we want to get displayed?
        for (var i = 0; i < equalizerBars.length; i++) {

            var part = equalizerBars[i];

            canvasContext.beginPath();
            
            //Color gradient ramain same over the course of time
            //We do not want to make it way too fancy

            var grad = canvasContext.createRadialGradient(part.x, part.y, 0, part.x, part.y, 20);

            grad.addColorStop(0, "white");
            grad.addColorStop(1, part.color);

            if (isInputValueInvalid(width)) {
                width = 15;
            }

            canvasContext.fillStyle = grad;

            //Height is - because we want equalizer bars to grow in vertical direction

            canvasContext.rect(part.x, part.y, width, -part.height);
            canvasContext.fill();

            if (isInputValueInvalid(height)){
                height = 200;
            }


            part.height += height * Math.random();

			//Height of the equalizer bar should not exceed certain threshold
            if (part.height > Math.random() * (1.5 * height)) {
                part.height = Math.random() * (height * 0.8);
            }

        }

    }

	//If number of equalizer bars is some invalid number, default it to value of 20
    if (isInputValueInvalid(numbver)){
        numbver = 20;
    }

    //Array to hold each equalizer bar array whose height will be constantly updated
    var equalizerBars = [];

    //Width of cnavas element
    if (isInputValueInvalid(areaWidth)){
        areaWidth = 600
    }

    //Assign each bar deterministic x and y positions but variable and random color and height. Height will eventually be changed
    //Over the course of time

	//20 is the xpacings in pixels before first equalizer is printed on the screen

    for (var i = 20; i <= areaWidth; i += areaWidth / numbver) {

        equalizerBars.push(new individualBarObject(i));

    }

    //Frame rate - How many times a second, screen should be refershed
    if (isInputValueInvalid(frameRate)) {
        frameRate = 12;
    }

	//Clear previous Game_Interval. If not, pressing play button multiple times we actually speed up our animation
	//By double the previous amount (which is not what we want)

    if (typeof Game_Interval != "undefined") {
        clearInterval(Game_Interval)
    }

	//Start the animation - Screen will now be refreshed frameRate times per seconds
    Game_Interval = setInterval(draw, (1 / frameRate) * 1000);

})