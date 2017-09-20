var GoogleMap = {
    obj: null,      //objeto mapa
    info: null,
    inw: null,//objeto infowindow
    autocomplete: null,
    places: null,
    markers : [],   //Marcadores actuales
    grafico : [],   //zona actual
    urlser : '/api/v1/offers', //url servicio
    consult: null,

    center: {
        lat: -12.077450,
        lng: -77.093677
    },

    init: function () {
        var map = $("#map");
        if ( map.length > 0 ) this.runMap( map );
    },

    runMap: function ( map ) {
        this.obj = new google.maps.Map( map.get(0) , {
          center: this.center,
          zoom: 16,
          mapTypeId: 'terrain',
          styles: [ { "elementType": "geometry", "stylers": [ { "color": "#ebe3cd" } ] }, { "elementType": "labels.text.fill", "stylers": [ { "color": "#523735" } ] }, { "elementType": "labels.text.stroke", "stylers": [ { "color": "#f5f1e6" } ] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [ { "color": "#c9b2a6" } ] }, { "featureType": "administrative.land_parcel", "elementType": "geometry.stroke", "stylers": [ { "color": "#dcd2be" } ] }, { "featureType": "administrative.land_parcel", "elementType": "labels.text.fill", "stylers": [ { "color": "#ae9e90" } ] }, { "featureType": "landscape.man_made", "elementType": "geometry.stroke", "stylers": [ { "color": "#b10a3c" } ] }, { "featureType": "landscape.natural", "elementType": "geometry", "stylers": [ { "color": "#dfd2ae" } ] }, { "featureType": "poi", "elementType": "geometry", "stylers": [ { "color": "#dfd2ae" } ] }, { "featureType": "poi", "elementType": "labels.text", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [ { "color": "#93817c" } ] }, { "featureType": "poi.business", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [ { "color": "#a5b076" } ] }, { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [ { "color": "#447530" } ] }, { "featureType": "road", "elementType": "geometry", "stylers": [ { "color": "#f5f1e6" } ] }, { "featureType": "road", "elementType": "labels.icon", "stylers": [ { "visibility": "off" } ] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [ { "color": "#fdfcf8" } ] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [ { "color": "#f8c967" } ] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [ { "color": "#e9bc62" } ] }, { "featureType": "road.highway.controlled_access", "elementType": "geometry", "stylers": [ { "color": "#e98d58" } ] }, { "featureType": "road.highway.controlled_access", "elementType": "geometry.stroke", "stylers": [ { "color": "#db8555" } ] }, { "featureType": "road.local", "elementType": "labels.text.fill", "stylers": [ { "color": "#806b63" } ] }, { "featureType": "transit", "stylers": [ { "visibility": "off" } ] }, { "featureType": "transit.line", "elementType": "geometry", "stylers": [ { "color": "#dfd2ae" } ] }, { "featureType": "transit.line", "elementType": "labels.text.fill", "stylers": [ { "color": "#8f7d77" } ] }, { "featureType": "transit.line", "elementType": "labels.text.stroke", "stylers": [ { "color": "#ebe3cd" } ] }, { "featureType": "transit.station", "elementType": "geometry", "stylers": [ { "color": "#dfd2ae" } ] }, { "featureType": "water", "elementType": "geometry.fill", "stylers": [ { "color": "#b9d3c2" } ] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [ { "color": "#92998d" } ] } ]
        });

        //this.addMarker( this.center );
        this.inw = new google.maps.InfoWindow({map: this.obj});
        this.obj.addListener('center_changed', function(e) {
          // 3 seconds after the center of the map has changed, pan back to the
          // marker.
          window.setTimeout(GoogleMap.extdata(e), 3000);
          
        }
        );
        this.conectarDB(this.inw,this.obj);
        this.iniciarAutocompletar();
    },

    addMarker: function ( position ) {
        new mapIcons.Marker({
            position: position,
            map: this.obj,
            icon: {
                path: mapIcons.shapes.SQUARE_PIN,
                fillColor: '#00CCBB',
                fillOpacity: 1,
                strokeColor: '',
                strokeWeight: 0
            },
            map_icon_label: '<span class="map-icon map-icon-map-pin"></span>'
        });
    },
    
    plantilla: function (of,clase,nid){
        if (clase==1){
            return "<div id='o"+ nid +"' class='box-oferta box-oferta2'><table><tr><td><img class='list-img' src='/assets/welcome/carrito.jpg'/></td><td><p id='search-subt'><i class='fa fa-id-card'></i> NOMBRE DE OFERTA</p><p>  <i class='fa fa-flag-o'></i>"  + of.address +"</p><p>  <i class='fa fa-map-marker'> " + of.location + "</p><table><tr><td id='idts'><div>Con techo</div></td><td id='idts'><div>Grande</div></td><td id='idts'><div>Control</div></td><td id='idts'><div></div></td></tr><tr><td id='idts'><div class='big-icon-search'><i class='fa fa-umbrella'></div></td><td id='idts'><div class='big-icon-search'><i class='fa fa-taxi'></div></td><td id='idts'><div class='big-icon-search'><i class='fa fa-lock'></div></td><!--<td id='idts'> <button><a href='/search/estacionamiento'>Ver detalle</a></button></td>--></tr></table></td></tr></table></div><br>";
        } else {
            return "<div id='o"+ nid +"' class='box-oferta'><table><tr><td><img class='list-img' src='/assets/welcome/carrito.jpg'/></td><td><p id='search-subt'><i class='fa fa-id-card'></i> NOMBRE DE OFERTA</p><p>  <i class='fa fa-flag-o'></i>"  + of.address +"</p><p>  <i class='fa fa-map-marker'> " + of.location + "</p><table><tr><td id='idts'><div>Con techo</div></td><td id='idts'><div>Grande</div></td><td id='idts'><div>Control</div></td><td id='idts'><div></div></td></tr><tr><td id='idts'><div class='big-icon-search'><i class='fa fa-umbrella'></div></td><td id='idts'><div class='big-icon-search'><i class='fa fa-taxi'></div></td><td id='idts'><div class='big-icon-search'><i class='fa fa-lock'></div></td><!--<td id='idts'> <button><a href='/search/estacionamiento'>Ver detalle</a></button></td>--></tr></table></td></tr></table></div><br>";
        }
    },

    ubicart: function(){
      var cm2 =GoogleMap.center;
      var nz2 = GoogleMap.obj.getZoom();
      var dv2 =$("#map").height()*Math.PI*Math.cos(cm2.lat*Math.PI/180)/Math.pow(2,nz2+2);
      var dh2 =$("#map").width()*Math.PI*Math.cos(cm2.lng*Math.PI/180)/Math.pow(2,nz2);
      
      var datosjs = {
        lati: GoogleMap.obj.getCenter().lat(),
        longi: GoogleMap.obj.getCenter().lng(),
        dla: dv2,
        dlo: dh2
      };
      var arraytemporal=[];
      if (GoogleMap.consult != null){
        GoogleMap.consult.abort();
        GoogleMap.consult=null;
        console.log("Abortado");
      }
      GoogleMap.consult = $.getJSON(GoogleMap.urlser, datosjs, function(response){
          arraytemporal=response.data;
          var pinpon=-1;
          var numid=1;
          var cm =GoogleMap.center;
          var nz = GoogleMap.obj.getZoom();
          var dv =$("#map").height()*Math.PI*Math.cos(cm.lat*Math.PI/180)/Math.pow(2,nz+2);
          var dh =$("#map").width()*Math.PI*Math.cos(cm.lng*Math.PI/180)/Math.pow(2,nz);
          
          document.getElementById('listoffers').innerHTML="";
        
          
          var arrayampliado=[];
          arraytemporal.forEach( function(valor, indice, arreglo) {
            var distancia=Math.pow(Math.pow(cm.lat-valor.latitude,2)+Math.pow(cm.lng-valor.longitude,2),0.5);
            arrayampliado.push({latitude: valor.latitude, longitude: valor.longitude, distance: distancia, location:"Cerca a tu casa", address: valor.address})
          }
          );
          arrayampliado=arrayampliado.sort(function (a, b) {
            return a.distance - b.distance ;
          });
          
          arraytemporal=arrayampliado;
          console.log(cm);
          console.log(arraytemporal);
          arraytemporal.forEach( function(valor, indice, arreglo) {
          //var la =parseFloat(valor.location.split(",")[0]);
          //var lo =parseFloat(valor.location.split(",")[1]);
          var la =valor.latitude;
          var lo =valor.longitude;
          
          console.log(""+la+" "+lo+" contra: "+(cm.lat+dv)+" y "+(cm.lat-dv));
          if ( (la<cm.lat+dv) && (la>cm.lat-dv) && (lo<cm.lng+dh) && (lo>cm.lng-dh) ){
          	marker = new google.maps.Marker({
          		position: new google.maps.LatLng(la,lo),
          		map: GoogleMap.obj,
          		title: valor.address,
          		animation: google.maps.Animation.DROP
        	  });
        	  var idstring="o"+numid;
        	  var michi="#"+idstring;
        	  marker.addListener('click', function() {
        	    $( michi ).addClass( "boxresaltado" );
              document.getElementById(idstring).scrollIntoView();
            });
        	  GoogleMap.markers.push(marker);
           document.getElementById('listoffers').innerHTML+=GoogleMap.plantilla(valor,pinpon,numid); 
            pinpon=pinpon*(-1);
            numid+=1;
            }
           });
        
        var redsqrt = [
          {lat: cm.lat+dv, lng: cm.lng+dh},
          {lat: cm.lat+dv, lng: cm.lng-dh},
          {lat: cm.lat-dv, lng: cm.lng-dh},
          {lat: cm.lat-dv, lng: cm.lng+dh}
        ];

        // colocar el cuadro rojo
        var sqrtONmap = new google.maps.Polygon({
          paths: redsqrt,
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 0.5,
          fillColor: '#FF0000',
          fillOpacity: 0.08
        });
        GoogleMap.grafico.push(sqrtONmap);
        sqrtONmap.addListener('click', function(e) {
          // 3 seconds after the center of the map has changed, pan back to the
          // marker.
          window.setTimeout(GoogleMap.extdata(e), 3000);
          
        });
        sqrtONmap.setMap(GoogleMap.obj);
      });
    },
        
    conectarDB: function(inw,obj){
      //var datosjs = {
      //  user_id: 1
      //};
      
      //var arraytemporal=[];
    
      //$.getJSON(GoogleMap.urlser, datosjs, function(response){
        
        //arraytemporal=response.data;
        //verificar centro
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            GoogleMap.center = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            console.log(GoogleMap.center);
            inw.setPosition(GoogleMap.center);
            inw.setContent('Ud esta aqui!');
            obj.setCenter(GoogleMap.center);
            GoogleMap.ubicart();
          }, function() {
            GoogleMap.ubicart();
            GoogleMap.handleLocationError(true, inw, obj.getCenter());
          });

          }

      //});

    },
    
    extdata: function(e){
        var datosjs = {};
        for (var i = 0; i < GoogleMap.markers.length; i++) {
          GoogleMap.markers[i].setMap(null);
        }
        for (var i = 0; i < GoogleMap.grafico.length; i++) {
          GoogleMap.grafico[i].setMap(null);
        }
        
        
        console.log(GoogleMap.grafico);

        GoogleMap.markers=[];
        GoogleMap.center ={lat: GoogleMap.obj.getCenter().lat() , lng: GoogleMap.obj.getCenter().lng() };

        //$.getJSON(GoogleMap.urlser, datosjs, function(response){
         // arraytemporal=response.data;
          GoogleMap.ubicart();
        //});
       },
    
    handleLocationError: function (browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: El servicio de geolocalizacion ha fallado.' :
                              'Error: Tu navegador no soporta geolocalizacion.');
    },
    
    iniciarAutocompletar: function(){
      this.autocomplete = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */ (
                document.getElementById('autocomplete')), {
              types: ['geocode'],
              componentRestrictions: {'country': 'pe'}
            });
        this.places = new google.maps.places.PlacesService(this.obj);
        this.autocomplete.addListener('place_changed', function () {
        var place = GoogleMap.autocomplete.getPlace();
        if (place.geometry) {
          GoogleMap.obj.panTo(place.geometry.location);
          GoogleMap.obj.setZoom(16);
          GoogleMap.extdata(null);
        } else {
          document.getElementById('autocomplete').placeholder = 'Busque un lugar';
        }
      }
      );

    }
    
    
}
