// 
//  --- our app behavior logic ---
//
run(function() {
    
    // immediately invoked on first run
    var init = (function() {
        navigator.network.isReachable("google.com", function(status) {
        	if (status.internetConnectionStatus === NetworkStatus.NOT_REACHABLE) {
        		alert("No internet connection - we won't be able to show you any maps");
        	} else {
        		alert("We can reach Google - get ready for some awesome maps!");
        	}
        });
    })();
    
    // a little inline controller
    when('#welcome');
    when('#settings');
    when('#map', function () {
        store.get('config', function (saved) {
            // construct a gmap str
            var map  = saved.map || ui('map')
            ,   zoom = saved.zoom || ui('zoom')
            ,   path = "http://maps.google.com/maps/api/staticmap?center="
            ;
            navigator.geolocation.getCurrentPosition(function (position) {
                var location = "" + position.coords.latitude + "," + position.coords.longitude;

                path += location + "&zoom=" + zoom;
                path += "&size=250x250&maptype=" + map + "&markers=color:red|label:P|";
                path += location + "&sensor=false";

                x$('img#static_map').attr(src, path);
            });
        });
    });
    when('#save', function() {
        store.save({
            key:'config',
            map:ui('map'),
            zoom:ui('zoom')
        });
        display('#welcome');
    });
});
