// 
//  --- our app behavior logic ---
//
run(function () {
    // immediately invoked on first run
    var init = (function () {
        navigator.network.isReachable("google.com", function(status) {
			var connectivity = (status.internetConnectionStatus || status.code || status);
        	if (connectivity === NetworkStatus.NOT_REACHABLE) {
        		alert("No internet connection - we won't be able to show you any maps");
        	} else {
        		alert("We can reach Google - get ready for some awesome maps!");
        	}
        });
    })();
    
    // a little inline controller
    when('#welcome');
    when('#settings', function() {
		store.get('config', function(saved) {
			if (saved) {
				if (saved.map) {
					// BLACKBERRY CAVEAT: we have to dig into the DOM references for the selected elements
					// and directly reference the 'checked' attribute.
					x$('input[value=' + saved.map + ']')[0].checked = true;
				}
				if (saved.zoom) {
					// BLACKBERRY CAVEAT: we have to dig into the DOM references for the selected elements
					// and directly reference the 'checked' attribute.
					x$('input[name=zoom][value="' + saved.zoom + '"]')[0].checked = true;
				}
			}
		});
		
	});
    when('#map', function () {
        store.get('config', function (saved) {
            // construct a gmap str
            var map  = saved ? saved.map || ui('map') : ui('map')
            ,   zoom = saved ? saved.zoom || ui('zoom') : ui('zoom')
            ,   path = "http://maps.google.com/maps/api/staticmap?center=";
			
            navigator.geolocation.getCurrentPosition(function (position) {
                var location = "" + position.coords.latitude + "," + position.coords.longitude;
                path += location + "&zoom=" + zoom;
                path += "&size=250x250&maptype=" + map + "&markers=color:red|label:P|";
                path += location + "&sensor=false";

                x$('img#static_map').attr('src', path);
            }, function(error) { alert('Oh no there was an error : ' + error); });
        });
		
    });
    when('#save', function () {
        store.save({
            key:'config',
            map:ui('map'),
            zoom:ui('zoom')
        });
        display('#welcome');
    });
});
