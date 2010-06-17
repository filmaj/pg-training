/**
  storing our JavaScript in a separate file allows us to manage
  our app's behaviour separately from the markup and presentation
  
  if you have a larger app, you will want to split your application
  code into multiple js files
**/

function loadItUp(initializationFunction) {
	if (document.readyState == 'loaded' || document.readyState == 'complete') {
		initializationFunction();
	} else {
		if (navigator.userAgent.indexOf('Browzr') > -1) {
			setTimeout(initializationFunction, 250)	
		} else {
			document.addEventListener('deviceready', initializationFunction, false);
		}
	}
}

function appInit() {
  document.getElementById('map_button').ontouchend = function () {
    alert('You touched the map button!');
  }
  
  document.getElementById('settings_button').ontouchend = function () {
    alert('You touched the settings button!');
  }
}

// this function will allow us to hide the current view and
// to display a new one
function displayView(id) {
  
}