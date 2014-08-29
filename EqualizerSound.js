 
 //Now event listener to add/remove sound button
	document.getElementById('soundEffect').addEventListener("click", function() {
	    soundEffect()
	}, false);

var soundPlay = 0;

	soundEffect = function() {
	    if (soundPlay == 1){
	        soundPlay = 0;
	    }
	    else{
	        soundPlay = 1;
	    }
	}