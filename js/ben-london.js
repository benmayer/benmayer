  function init() {

    var themap = document.getElementById('map'),
        bensLondon = [
      {
        "featureType": "water",
        "stylers": [
          { 
            "color": "#239acc" 
            // "color": "#78CBEB"
          }
        ]
      },{
        "featureType": "landscape",
        "stylers": [
          { "color": "#efefef" }
        ]
      },{
        "featureType": "road",
        "stylers": [
          { "visibility": "off" }
        ]
      },{
        "featureType": "administrative",
        "stylers": [
          { "visibility": "off" }
        ]
      },{
        "featureType": "poi",
        "stylers": [
          { "visibility": "off" }
        ]
      },{
        "featureType": "transit.station.rail",
        "elementType": "labels.text.fill",
        "stylers": [
          { "visibility": "on" },
          { "color": "#ff8080" },
          { "weight": 4.3 }
        ]
      },{
        "featureType": "transit.line",
        "stylers": [
          { "visibility": "off" }
        ]
      },{
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
          { "color": "#4e4145" },
          { "visibility": "on" }
        ]
      },{
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
          { "visibility": "on" },
          { "color": "#808080" }
        ]
      },{
      }
    ];
    
    var mapOptions = {
      zoom: 13,
      center: new google.maps.LatLng(51.5191113,-0.1084786 ),
      disableDefaultUI: true,
      mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'benslondon']
          }
    };

    var map = new google.maps.Map(themap,
        mapOptions);

    var styledMapOptions = {
        name: "Ben's London"
      };
    var bensLondonMapType = new google.maps.StyledMapType(
        bensLondon, styledMapOptions);

    map.mapTypes.set('benslondon', bensLondonMapType);
    map.setMapTypeId('benslondon');

    setMarkers(map);

    google.maps.event.addListener(map, 'zoom_changed', function() {
        var zoomLevel = map.getZoom();
        if (zoomLevel > 14 ) { themap.className = "closeup zoom"+zoomLevel; }
        else{
          themap.className = "";
        }
    });
}

function setMarkers(map){
  $.ajax({
    type: "GET",
    dataType: "jsonp",
    cache: false,
    url: "https://api.instagram.com/v1/users/36028700/media/recent?access_token=36028700.c2b4d0f.cc3f17f51cda4cc6a2d4083929d1a6d9",
    success : function(json){
      var i,
          posts = json.data;

      for ( i = 0;  i < posts.length ; i++) {
          
          var post = posts[i];
          if ( !post.location ) continue;  // filter out no locations
          
          var location = post.location,
              latLng = new google.maps.LatLng( location.latitude, location.longitude),
              image = post.images,
              title = location.name;  

          if ( !title ) {
             if(post.caption ){ title = post.caption.text;}
             else{title = '';}
          }
          
          marker = new RichMarker({
            position: latLng,
            map: map,
            draggable: false,
            flat: true, 
            anchor: RichMarkerPosition.MIDDLE,
            title : title,
            content: '<div class="spots"><div class="title"><span>'+title+'</span></div><div class="img"><a class="fancybox" rel="group" href="'+image.standard_resolution.url+'" title="'+title+'"><img src="'+image.low_resolution.url+'" alt="'+title+'"/></a></div></div>',
            zIndex : i
          });
        // google.maps.event.addListener(marker, 'click', function(){
        // });
      }
    }
  });
}



// Register an event listener to fire when the page finishes loading.
google.maps.event.addDomListener(window, 'load', init);


$(window).bind("load", function() {
	// console.log("loaded");
	$(".fancybox").fancybox(
		{
	    padding    : 0,
	    margin     : 5,
	    nextEffect : 'fade',
	    prevEffect : 'fade',
	});
});

// $(document).ready(function(){
// 	console.log("ready");
// 	$('.spots').on('click',function(){
// 		console.log("clicked");
// 	});
// });