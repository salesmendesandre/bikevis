var greenIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

var orangeIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});


var appVue = new Vue({
    el: '#app',
    data: {
        map: null,
        stations: [
            {
                id: 173,
                name: "Broadway & W 49 St",
                lat: 40.76068327,
                lng: -73.98452729,
            },
            {
                id: 225,
                name: "W 14 St & The High Line",
                lat: 40.74195138,
                lng: -74.00803013,
            },
            {
                id: 351,
                name: "Front St & Maiden Ln",
                lat: 40.70530954,
                lng: -74.00612572,
            },
            {
                id: 363,
                name: "West Thames St",
                lat: 40.70834698,
                lng: -74.01713445,
            },
            {
                id: 390,
                name: "Duffield St & Willoughby St",
                lat: 40.69221589,
                lng: -73.9842844,
            },
            {
                id: 501,
                name: "FDR Drive & E 35 St",
                lat: 40.744219,
                lng: -73.97121214,
            },
            {
                id: 514,
                name: "12 Ave & W 40 St",
                lat: 40.76087502,
                lng: -74.00277668,
            },
            {
                id: 3183,
                name: "Exchange Place",
                lat: 40.7162469,
                lng: -74.0334588,
            },
            {
                id: 3184,
                name: "Paulus Hook",
                lat: 40.7141454,
                lng: -74.0335519,
            },
            {
                id: 3185,
                name: "City Hall",
                lat: 40.7177325,
                lng: -74.043845,
            },
            {
                id: 3186,
                name: "Grove St PATH",
                lat: 40.71958612,
                lng: -74.04311746,
            },
            {
                id: 3187,
                name: "Warren St",
                lat: 40.7211236,
                lng: -74.03805095,
            },
            {
                id: 3188,
                name: "NJCU",
                lat: 40.7101087,
                lng: -74.0858489,
            },
            {
                id: 3189,
                name: "West Side Light Rail",
                lat: 40.714402,
                lng: -74.0887723,
            },
            {
                id: 3190,
                name: "Garfield Ave Station",
                lat: 40.71046702,
                lng: -74.0700388,
            },
            {
                id: 3191,
                name: "Union St",
                lat: 40.7182113,
                lng: -74.0836394,
            },
            {
                id: 3192,
                name: "Liberty Light Rail",
                lat: 40.7112423,
                lng: -74.0557013,
            },
            {
                id: 3193,
                name: "Lincoln Park",
                lat: 40.7246051,
                lng: -74.07840595,
            },
            {
                id: 3194,
                name: "McGinley Square",
                lat: 40.72533993,
                lng: -74.06762213,
            },
            {
                id: 3195,
                name: "Sip Ave",
                lat: 40.73074263,
                lng: -74.06378388,
            },
            {
                id: 3196,
                name: "Riverview Park",
                lat: 40.7443187,
                lng: -74.0439909,
            },
            {
                id: 3197,
                name: "North St",
                lat: 40.752559,
                lng: -74.044725,
            },
            {
                id: 3198,
                name: "Heights Elevator",
                lat: 40.74871595,
                lng: -74.0404433,
            },
            {
                id: 3199,
                name: "Newport Pkwy",
                lat: 40.7287448,
                lng: -74.0321082,
            },
            {
                id: 3200,
                name: "MLK Light Rail",
                lat: 40.7111305,
                lng: -74.0788855,
            },
            {
                id: 3201,
                name: "Dey St",
                lat: 40.737711,
                lng: -74.066921,
            },
            {
                id: 3202,
                name: "Newport PATH",
                lat: 40.7272235,
                lng: -74.0337589,
            },
            {
                id: 3203,
                name: "Hamilton Park",
                lat: 40.72759597,
                lng: -74.04424731,
            },
            {
                id: 3205,
                name: "JC Medical Center",
                lat: 40.71653978,
                lng: -74.04963791,
            },
            {
                id: 3206,
                name: "Hilltop",
                lat: 40.7311689,
                lng: -74.0575736,
            },
            {
                id: 3207,
                name: "Oakland Ave",
                lat: 40.7376037,
                lng: -74.0524783,
            },
            {
                id: 3209,
                name: "Brunswick St",
                lat: 40.7241765,
                lng: -74.0506564,
            },
            {
                id: 3210,
                name: "Pershing Field",
                lat: 40.74267714,
                lng: -74.05178863,
            },
            {
                id: 3211,
                name: "Newark Ave",
                lat: 40.72152515,
                lng: -74.04630454,
            },
            {
                id: 3212,
                name: "Christ Hospital",
                lat: 40.73478582,
                lng: -74.05044364,
            },
            {
                id: 3213,
                name: "Van Vorst Park",
                lat: 40.71848892,
                lng: -74.04772663,
            },
            {
                id: 3214,
                name: "Essex Light Rail",
                lat: 40.7127742,
                lng: -74.0364857,
            },
            {
                id: 3215,
                name: "Central Ave",
                lat: 40.7467299,
                lng: -74.0492509,
            },
            {
                id: 3216,
                name: "Columbia Park",
                lat: 40.6970299,
                lng: -74.0969366,
            },
            {
                id: 3217,
                name: "Bayside Park",
                lat: 40.69865054,
                lng: -74.08207968,
            },
            {
                id: 3220,
                name: "5 Corners Library",
                lat: 40.73496102,
                lng: -74.05950308,
            },
            {
                id: 3225,
                name: "Baldwin at Montgomery",
                lat: 40.7236589,
                lng: -74.0641943,
            },
        ],
        selectedStation: null,
        trips: [],
        stationsArray: [],
        tripsMatrix: null,
        opacityTripsMatrix: null,
        checkedOrigin:true
    },
    methods: {
        initMap: function () {
            this.map = L.map('mapid', {
                center: [40.72, -74.0334588],
                minZoom: 2,
                zoom: 13
            });
            var basemap = L.tileLayer("http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
                maxZoom: 20,
                subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
            });
            if (this.map.hasLayer(basemap)) {
                this.map.removeLayer(basemap);
            } else {
                this.map.addLayer(basemap);
            }
        },
        //Stations
        getStation: function (id) {
            for (var i = 0; i < this.stations.length; i++) {
                if (this.stations[i].id == id) {
                    return this.stations[i];
                }
            }
        },
        checkBoxChanged:function () {
            this.checkedOrigin=!this.checkedOrigin;
            this.recalculate();
        },
        paintStation: function (station) {
            var options = {
                id: station.id,
                tag: "STATION"
            };

            if(station.name==this.selectedStation){
               if(this.checkedOrigin){
                   options.icon=greenIcon;
               }else{
                   options.icon=orangeIcon;
               }

            }

            var marker = L.marker([station.lat, station.lng], options).addTo(this.map);
        },
        getLayerStation: function (id) {
            var returnLayer = null;
            this.map.eachLayer(function (layer) {
                if (layer.options.id == id) {
                    returnLayer = layer;
                }
            });
            return returnLayer;
        },
        paintAllStations: function () {
            for (var i = 0; i < this.stations.length; i++) {
                this.paintStation(this.stations[i]);
            }
        },

        removeAllLayersWithTag: function (tag) {
            this.map.eachLayer(function (layer) {
                if (layer.options.tag == tag) {
                    layer.remove();
                }
            });
        },
        makeVectorStations: function () {
            for (var i = 0; i < this.stations.length; i++) {
                this.stationsArray.push(this.stations[i].id);
            }
        },
        getStationByName: function (_name) {
            for (var i = 0; i < this.stations.length; i++) {
                if (this.stations[i].name == _name) {
                    return this.stations[i];
                }
            }
        },
        getTrips: function () {
            $.getJSON("https://salesmendesandre.github.io/bikevis/data/01.json", function (data) {
                appVue.trips = data;
                appVue.calculateTripsMatrix();
                appVue.calculateTripsOpacityMatrix();
                appVue.paintAllTrips();
            });
        },
        calculateTripsMatrix: function () {
            console.log("Calculando Matrix");
            var trips = this.trips;
            var currentMatrix = matrix(this.stationsArray.length, this.stationsArray.length, 0);
            var arrayStation = this.stationsArray;
            for (var i = 0; i < trips.length; i++) {
                var startStationId = trips[i]['Start Station ID'];
                var endStationId = trips[i]['End Station ID'];
                var startStationIndex = arrayStation.indexOf(startStationId);
                var endStationIndex = arrayStation.indexOf(endStationId);
                currentMatrix[startStationIndex][endStationIndex] = currentMatrix[startStationIndex][endStationIndex] + 1;
            }
            this.tripsMatrix = currentMatrix;
            console.log("Fin calcular Matrix");
        },
        calculateTripsOpacityMatrix: function () {
            var opacityTripsMatrix = copyMatrix(this.tripsMatrix);
            var maxVal = 0;
            for (var i = 0; i < opacityTripsMatrix.length; i++) {
                for (var j = 0; j < opacityTripsMatrix[i].length; j++) {
                    if (opacityTripsMatrix[i][j] > maxVal) {
                        maxVal = opacityTripsMatrix[i][j];
                    }
                }
            }
            console.log("maxVal", maxVal);
            for (var i = 0; i < opacityTripsMatrix.length; i++) {
                for (var j = 0; j < opacityTripsMatrix[i].length; j++) {
                    opacityTripsMatrix[i][j] = opacityTripsMatrix[i][j] / maxVal;
                }
            }
            this.opacityTripsMatrix = opacityTripsMatrix;
        },
        paintTrip: function (stationStart, stationEnd, opacity) {
            var polyline = L.polyline([
                    [stationStart.lat, stationStart.lng],
                    [stationEnd.lat, stationEnd.lng]
                ],
                {
                    color: 'red',
                    weight: 2,
                    opacity: opacity,
                    dashArray: '20,15',
                    lineJoin: 'round'
                }
            ).addTo(this.map);
            polyline.options.tag="LINE";
        },
        paintAllTrips: function () {
            var stationsArray = this.stationsArray;
            for (var i = 5; i < stationsArray.length; i++) {
                var startStation = this.getStation(stationsArray[i]);
                for (var j = 0; j < stationsArray.length; j++) {
                    var endStation = this.getStation(stationsArray[j]);
                    this.paintTrip(startStation, endStation, this.opacityTripsMatrix[i][j])
                }
            }
        },
        stationChanged: function () {
            this.recalculate();
        },
        recalculate:function () {
            this.removeAllLayersWithTag("STATION");
            this.removeAllLayersWithTag("LINE");
            if(this.selectedStation!=""){
                var selectedStation=this.getStationByName(this.selectedStation);
                this.map.panTo(new L.LatLng(selectedStation.lat, selectedStation.lng),{animate: true, duration: 3.0});
            }

            appVue.paintAllStations();
        }
    }
});

appVue.initMap();
appVue.makeVectorStations();
appVue.getTrips();
appVue.paintAllStations();


//TOOLS
function matrix(rows, cols, defaultValue) {
    var arr = [];
    for (var i = 0; i < rows; i++) {
        arr.push([]);
        arr[i].push(new Array(cols));
        for (var j = 0; j < cols; j++) {
            arr[i][j] = defaultValue;
        }
    }
    return arr;
}

function copyMatrix(matrixCopy) {
    var copy = matrix(matrixCopy.length, matrixCopy[0].length, 0);

    for (var i = 0; i < matrixCopy.length; i++) {
        for (var j = 0; j < matrixCopy[i].length; j++) {
            copy[i][j] = matrixCopy[i][j];
        }
    }
    return copy;
}

$("[name='checkboxOD']").bootstrapSwitch({
    on:  "  Origin   ",
    off: 'Destination',
    offClass: 'warning',
    onClass: 'success'
});

$("[name='checkboxOD']").change(function() {
    appVue.checkBoxChanged();
});



$( document ).ready(function() {
    var options = {};
    $('#startDay').datepicker(options);
    $('#endDay').datepicker(options);
});
