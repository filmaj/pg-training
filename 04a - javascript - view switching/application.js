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
  // there are 4 interaction points in the app:
  // "Show My Location" button (welcome view)
  document.getElementById('map_button').ontouchend = function () {
    displayView('map');
  }
  
  // "Settings" button (welcome view)
  document.getElementById('settings_button').ontouchend = function () {
    displayView('settings');
  }
  
  // "Go Back" button (map view)
  document.getElementById('back_button').ontouchend = function () {
    displayView('welcome');
  }
  
  // "Save" button (settings view)
  // we want to override the default behaviour, so we return false
  document.getElementById('save_button').ontouchend = function () {
    displayView('welcome');
    return false;
  }
}

// this function will allow us to hide the current view and
// to display a new one
function displayView(id) {
  var views = ["welcome", "map", "settings"];
  var i=0;
  
  while (i < views.length) {
    if (views[i]==id) {
      document.getElementById(id).style.display = "block";
    } else {
      document.getElementById(views[i]).style.display = "none";
    }
    i++;
  }
}