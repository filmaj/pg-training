/**
  storing our JavaScript in a separate file allows us to manage
  our app's behaviour separately from the markup and presentation
  
  if you have a larger app, you will want to split your application
  code into multiple js files
**/

// TODO: clean this up
function loadItUp(initializationFunction) {
	if (document.readyState == 'loaded' || document.readyState == 'complete') {
	  document.addEventListener('deviceready', initializationFunction, false);
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
  document.getElementById('map_button').onclick = function () {
    displayView('map');
    navigator.geolocation.getCurrentPosition(displayGoogleMap);
  }
  
  // "Settings" button (welcome view)
  document.getElementById('settings_button').onclick = function () {
    displayView('settings');
  }
  
  // "Go Back" button (map view)
  document.getElementById('back_button').onclick = function () {
    displayView('welcome');
  }
  
  // "Save" button (settings view)
  // we want to override the default behaviour, so we return false
  document.getElementById('save_button').onclick = function () {
    displayView('welcome');
    return false;
  }
  
  // check if we can access google.com
  navigator.network.isReachable("google.com", isNetworkAvailable);
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

// letting the user know if we can't get any maps
function isNetworkAvailable(status) {
	if (status.internetConnectionStatus === NetworkStatus.NOT_REACHABLE) {
		navigator.notification.alert(
		  "No internet connection - we won't be able to show you any maps", 
		  "PhoneGap Training", 
		  "Okay");
	} else {
		navigator.notification.alert(
		  "We can reach Google - get ready for some awesome maps!", 
		  "PhoneGap Training", 
		  "Huzzah!");
	}
}

// replacing the placeholder image with an image based on the given location
function displayGoogleMap(position) {
  var location = "" + position.coords.latitude + "," + position.coords.longitude;
  var mapType = get_radio_value(document.getElementById('settings_form').map_type);
  var zoomLevel = get_radio_value(document.getElementById('settings_form').zoom_level);
  
  var mapPath = " http://maps.google.com/maps/api/staticmap?center=" + 
              location + "&zoom=" + zoomLevel +
              "&size=250x250&maptype=" + mapType + "&markers=color:red|label:P|" + 
              location + "&sensor=false";
			debug.log(mapPath);
              
  document.getElementById("static_map").src = mapPath;
}

function get_radio_value(radEl)
{
for (var i=0; i < radEl.length; i++)
   {
   if (radEl[i].checked)
      {
      return radEl[i].value;
      }
   }
}
