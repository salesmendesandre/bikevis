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
        mapInitialConfig: {
            lat: 40.72,
            lng: -74.0334588,
            zoom: 13,
            minZoom: 2
        },
        map: null,
        stations: null,
        selectedStation: "ALL",
        trips: [],
        stationsArray: [],
        tripsMatrix: null,
        opacityTripsMatrix: null,
        checkedOrigin: true
    },
    methods: {
        initMap: function () {
            this.map = L.map('mapid', {
                center: [this.mapInitialConfig.lat, this.mapInitialConfig.lng],
                minZoom: this.mapInitialConfig.minZoom,
                zoom: this.mapInitialConfig.zoom
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
        /*
         * STATION
         */
        initStations: function () {
            $.getJSON("https://salesmendesandre.github.io/bikevis/data/stations.json", function (data) {
                appVue.stations = data;
                appVue.makeVectorStations();
                appVue.initTrips();

            });
        },
        getStation: function (id) {
            for (var i = 0; i < this.stations.length; i++) {
                if (this.stations[i].id == id) {
                    return this.stations[i];
                }
            }
        },
        getStationByName: function (_name) {
            for (var i = 0; i < this.stations.length; i++) {
                if (this.stations[i].name == _name) {
                    return this.stations[i];
                }
            }
        },
        paintStation: function (station) {
            if (this.selectedStation != "ALL" && this.selectedStation != station.name) {
                if (this.checkedOrigin) {
                    if (this.totalTripsIn(station.id) == 0) {
                        return;
                    }
                } else {
                    if (this.totalTripsOut(station.id) == 0) {
                        return;
                    }
                }
            }

            var options = {
                id: station.id,
                tag: "STATION"
            };

            if (this.selectedStation == "ALL" || station.name == this.selectedStation) {
                if (this.checkedOrigin) {
                    options.icon = greenIcon;
                } else {
                    options.icon = orangeIcon;
                }
            } else {
                if (this.checkedOrigin) {
                    options.icon = orangeIcon;
                } else {
                    options.icon = greenIcon;
                }
            }

            var marker = L.marker([station.lat, station.lng], options).addTo(this.map);
            marker.bindPopup("");
            marker.on('click', appVue.clickStation)
        },
        clickStation: function (event) {
            var marker = event.target;
            var station = this.getStation(marker.options.id);

            marker.closePopup();
            marker._popup.setContent('' +
                '<div style="width: 250px;">' +
                '   <h3>' + station.name + '</h3>' +
                '   <h5><b>Position:</b></h5>' +
                '       <h6 style="margin-left: 15px"><b>Lat: </b>' + station.lat + '</h6>' +
                '       <h6 style="margin-left: 15px"><b> Lng: </b>' + station.lng + '</h6>' +
                '   <h5><b>Trips:</b></h5>' +
                '       <h5 style="margin-left: 15px"><img src="img/sign-in.png" style="width: 20px"> ' + this.totalTripsIn(station.id) + '</h5>' +
                '       <h5 style="margin-left: 15px"><img src="img/sign-out.png" style="width: 20px"> ' + this.totalTripsOut(station.id) + '</h5>' +
                '   <button class="btn pull-right" onClick="appVue.selectStation(\''+station.name+'\')">Select Station</button>' +
                '   <div class="clearfix"></div>'+
                '</div>'
            );
            marker.openPopup();
        },
        selectStation:function(name){
            console.log("SelectStation:"+name);
            this.selectedStation=name;
          this.recalculate();
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
        makeVectorStations: function () {//Al PRINCIPIO
            for (var i = 0; i < this.stations.length; i++) {
                this.stationsArray.push(this.stations[i].id);
            }
        },

        /*
        * TRIPS
        */
        initTrips: function () {
            $.getJSON("https://salesmendesandre.github.io/bikevis/data/01.json", function (data) {
                appVue.trips = data;
                appVue.setControls();
                appVue.calculateTripsMatrix();
                appVue.calculateTripsOpacityMatrix();
                appVue.paintAllStations();
                appVue.paintAllTrips();

            });
        },
        calculateTripsMatrix: function () {
            console.log("calculateTripsMatrix()");
            var trips = this.trips;
            var currentMatrix = matrix(this.stationsArray.length, this.stationsArray.length, 0);
            var arrayStation = this.stationsArray;
            var selectedStation = this.getStationByName(this.selectedStation);

            var startSelectedDay = $('#startDay').val();
            var startSelectedHour = $('#startHour').val();
            var startSelectedDate = new Date(startSelectedDay.split('/')[2], startSelectedDay.split('/')[1] - 1, startSelectedDay.split('/')[0]);

            var endSelectedDay = $('#endDay').val();
            var endSelectedHour = $('#endHour').val();
            var endSelectedDate = new Date(endSelectedDay.split('/')[2], endSelectedDay.split('/')[1] - 1, endSelectedDay.split('/')[0]);

            for (var i = 0; i < trips.length; i++) {
                var tripStartDay = trips[i]["Start Time"].split(" ")[0];
                var tripStartHour = trips[i]["Start Time"].split(" ")[1];
                var tripStartDate = new Date(tripStartDay.split('/')[2], tripStartDay.split('/')[1] - 1, tripStartDay.split('/')[0]);

                var tripEndDay = trips[i]["Stop Time"].split(" ")[0];
                var tripEndHour = trips[i]["Stop Time"].split(" ")[1];
                var tripEndDate = new Date(tripEndDay.split('/')[2], tripEndDay.split('/')[1] - 1, tripEndDay.split('/')[0]);

                if (startSelectedDate <= tripStartDate && tripEndDate <= endSelectedDate) {
                    if (startSelectedHour <= tripStartHour && tripEndHour <= endSelectedHour) {
                        var startStationId = trips[i]['Start Station ID'];
                        var endStationId = trips[i]['End Station ID'];
                        var startStationIndex = arrayStation.indexOf(startStationId);
                        var endStationIndex = arrayStation.indexOf(endStationId);

                        if (this.selectedStation == "ALL") {
                            currentMatrix[startStationIndex][endStationIndex] = currentMatrix[startStationIndex][endStationIndex] + 1;
                        } else {
                            if (this.checkedOrigin) {
                                if (selectedStation.id == startStationId) {
                                    currentMatrix[startStationIndex][endStationIndex] = currentMatrix[startStationIndex][endStationIndex] + 1;
                                }
                            } else {
                                if (selectedStation.id == endStationId) {
                                    currentMatrix[startStationIndex][endStationIndex] = currentMatrix[startStationIndex][endStationIndex] + 1;
                                }
                            }
                        }
                    }
                }
            }
            this.tripsMatrix = currentMatrix;
            console.log("End calculateTripsMatrix");
        },

        totalTripsIn: function (id) {
            var station = this.getStation(id);
            var stationIndex = this.stationsArray.indexOf(station.id);
            var totalIn = 0;
            for (var i = 0; i < this.stationsArray.length; i++) {
                totalIn += this.tripsMatrix[i][stationIndex];
            }
            return totalIn;
        },
        totalTripsOut: function (id) {
            var station = this.getStation(id);
            var stationIndex = this.stationsArray.indexOf(station.id);
            var totalOut = 0;
            for (var i = 0; i < this.stationsArray.length; i++) {
                totalOut += this.tripsMatrix[stationIndex][i];
            }
            return totalOut;
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
            for (var i = 0; i < opacityTripsMatrix.length; i++) {
                for (var j = 0; j < opacityTripsMatrix[i].length; j++) {
                    if (!opacityTripsMatrix[i][j] == 0) {
                        opacityTripsMatrix[i][j] = opacityTripsMatrix[i][j] / maxVal;
                    }
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
                    color: '#f00',
                    weight: 2,
                    opacity: 0.08 + opacity * 0.92,
                }
            ).addTo(this.map);
            polyline.options.tag = "LINE";
        },
        paintAllTrips: function () {
            var stationsArray = this.stationsArray;
            for (var i = 5; i < stationsArray.length; i++) {
                var startStation = this.getStation(stationsArray[i]);
                for (var j = 0; j < stationsArray.length; j++) {
                    if (this.opacityTripsMatrix[i][j] != 0) {
                        var endStation = this.getStation(stationsArray[j]);
                        this.paintTrip(startStation, endStation, this.opacityTripsMatrix[i][j])
                    }

                }
            }
        },
        stationChanged: function () {
            this.recalculate();
        },
        checkBoxChanged: function () {
            this.checkedOrigin = !this.checkedOrigin;
            this.recalculate();
        },
        recalculate: function () {
            this.removeAllLayersWithTag("STATION");
            this.removeAllLayersWithTag("LINE");
            if (this.selectedStation == "ALL") {
                this.map.setView(new L.LatLng(this.mapInitialConfig.lat, this.mapInitialConfig.lng), this.mapInitialConfig.zoom);
            } else {
                var selectedStation = this.getStationByName(this.selectedStation);
                this.map.setView(new L.LatLng(selectedStation.lat, selectedStation.lng), this.mapInitialConfig.zoom + 1);
            }

            appVue.calculateTripsMatrix();
            appVue.calculateTripsOpacityMatrix();
            appVue.paintAllStations();
            appVue.paintAllTrips();
        },
        setControls: function () {

            var startDay = this.trips[0]['Start Time'].split(" ")[0];
            var startDate = new Date(Number(startDay.split('/')[2]), Number(startDay.split('/')[1]) - 1, Number(startDay.split('/')[0]));

            $('#startDay').val(startDay);
            var endDay = this.trips[this.trips.length - 1]['Start Time'].split(" ")[0];
            var endDate = new Date(Number(endDay.split('/')[2]), Number(endDay.split('/')[1]) - 1, Number(endDay.split('/')[0]));
            $('#endDay').val(endDay);

            $('#startDay').bootstrapMaterialDatePicker
            ({
                weekStart: 0,
                format: 'DD/MM/YYYY',
                shortTime: true,
                time: false,
                minDate: startDate,
                maxDate: endDate
            }).on('change', function (e, date) {
                $('#endDay').bootstrapMaterialDatePicker('setMinDate', date);
                appVue.recalculate();
            });

            $('#endDay').bootstrapMaterialDatePicker
            ({
                weekStart: 0,
                format: 'DD/MM/YYYY',
                shortTime: true,
                time: false,
                minDate: startDate,
                maxDate: endDate
            }).on('change', function (e, date) {
                $('#startDay').bootstrapMaterialDatePicker('setMaxDate', date);
                appVue.recalculate();
            });

            $('#startHour').bootstrapMaterialDatePicker(
                {date: false, format: 'HH:mm'}
            ).on('change', function (e, date) {
                $('#endHour').bootstrapMaterialDatePicker('setMinDate', date);
                appVue.recalculate();
            });

            $('#endHour').bootstrapMaterialDatePicker(
                {date: false, format: 'HH:mm'}
            ).on('change', function (e, date) {
                $('#startHour').bootstrapMaterialDatePicker('setMaxDate', date);
                appVue.recalculate();
            });
        }
    }
});

appVue.initMap();
appVue.initStations();


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
    on: "  Origin   ",
    off: 'Destination',
    offClass: 'warning',
    onClass: 'success'
});

$("[name='checkboxOD']").change(function () {
    appVue.checkBoxChanged();
});