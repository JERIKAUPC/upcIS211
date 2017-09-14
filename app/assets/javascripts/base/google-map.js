var GoogleMap = {
    obj: null,
    info: null,

    center: {
        lat: -12.077450,
        lng: -77.093677
    },

    init: function () {
        var map = $("#map");
        if ( map.length > 0 ) this.runMap( map );
    },

    runMap: function ( map ) {
        console.log(map.get(0));
        this.obj = new google.maps.Map( map.get(0) , {
          center: this.center,
          zoom: 16
        });

        this.addMarker( this.center );
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
    }
}
