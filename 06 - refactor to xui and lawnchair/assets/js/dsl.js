// the app method accepts a fn to invoke on init unobtrusively 
var run = function(application) {
    x$(window).on('load', function() {
        if (document.readyState == 'loaded' || document.readyState == 'complete') {
            application.call(this);
        } else {
        	if (navigator.userAgent.indexOf('Browzr') > -1) {
        	    // blackberry
        		setTimeout(application, 250)	
        	} else {
        	    // final callback?
        		x$(document).on('deviceready', application, false);
        	}
        };
    });
}

// throw our settings into a lawnchair
, store = new Lawnchair({adaptor:'dom'})

// shows id passed
, display = function(id) {
    x$(["#welcome", "#map", "#settings"]).each(function(e, i) {
        var display = '#' + x$(e)[0].id === id ? 'block' : 'none';
        x$(e).css({ 'display':display })
    });
}

// reg a click to [id]_button, displays id (if it exists) and executes callback (if it exists)
, when = function(id, callback) {
    x$(id + '_button').click(function () {
        if (x$(id).length > 0)
            display(id);
        if (callback)
            callback.call(this);
    });
}

// gets the value of the setting from the ui
, ui = function(setting) {
    var radio = x$('#settings_form')[0][setting];
    for (var i = 0, l = radio.length; i < l; i++) {
        if (radio[i].checked)
            return radio[i].value;
    }
};