function creaMappa() {
    jQuery.get("https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni-latest.json", 
        function(data, status) {
        var jsonData = JSON.parse(data);

        var mappa = document.getElementById("map");
        if (mappa != null) {
            mappa.parentNode.removeChild(mappa);
        }
        var center = jsonData.mapCenter;
        var height = $("body").height();
        $('#map').css('height', height);
        $('#divMappa').append('<div id="map" style="width: 100%; height:' + height + 'px; border: 2px solid #AAA;"></div>');

        var map = L.map('map', {
            center: [41.890251, 12.492373],
            minZoom: 1,
            zoom: 5,
            zoomControl: false,
            doubleClickZoom: false,
            boxZoom: false,
            scrollWheelZoom: true,
            dragging: true
        });

        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            minZoom: 5
        }).addTo(map);

        for (var i in jsonData) {
            if (jsonData[i].totale_casi != 0) {
                var dim = (Math.sqrt(jsonData[i].totale_casi) * 400) + 200;

                var circle = L.circle([jsonData[i].lat, jsonData[i].long], dim, {
                    stroke: true, // true/false for stroke
                    color: '#178c53', // the color if stroke enabled
                    opacity: 1, // a value between 0 and 1
                    weight: 2, // stroke weight
                    fill: true, // true/false for fill
                    fillColor: '#54bd80', // HEX or color name
                    fill0pacity: 1, // opacity 0-1 of fill
                }).addTo(map);

                var guaSuTotCasi = jsonData[i].dimessi_guariti / jsonData[i].totale_casi * 100;
                var decSuTotCasi = jsonData[i].deceduti / jsonData[i].totale_casi * 100;

                var tooltip = '<div style="color: white">' +
                    '<p class="text-uppercase font-weight-bold text-left my-1">' + jsonData[i].denominazione_regione + '</p>' +
                    '<hr class="my-2" style="border-top: 1px solid white;">';
                tooltip = tooltip +
                    '<div class="text-left mt-2" style="display: table; inline-size: max-content; width:100%">' +
                    '<p class="my-0 font-weight-bold">Nuovi positivi: <span class="float-right">' + formatNumber(jsonData[i].nuovi_positivi) + '</span></p>' +
                    '<p class="my-0">Dimessi guariti: <span class="float-right">' + formatNumber(jsonData[i].dimessi_guariti) + '</span></p>' +
                    '<p class="my-0">Deceduti: <span class="float-right">' + formatNumber(jsonData[i].deceduti) + '</span></p>' +
                    '<p class="my-0">Attualmenti positivi: <span class="float-right">' + formatNumber(jsonData[i].totale_positivi) + '</span></p>' +
                    '<p class="my-0">Totale casi: <span class="float-right">' + formatNumber(jsonData[i].totale_casi) + '</span></p>' +
                    '<hr class="my-1" style="border-top: 1px solid white;">' +
                    '<p class="my-0">Terapia intensiva: <span class="float-right">' + formatNumber(jsonData[i].terapia_intensiva) + '</span></p>' +
                    '<p class="my-0">Ricoverati con sintomi: <span class="float-right">' + formatNumber(jsonData[i].ricoverati_con_sintomi) + '</span></p>' +
                    '<p class="my-0">Totale ospedalizzati: <span class="float-right">' + formatNumber(jsonData[i].totale_ospedalizzati) + '</span></p>' +
                    '<hr class="my-1" style="border-top: 1px solid white;">' +
                    '<p class="my-0">Isolamento domiciliare: <span class="float-right">' + formatNumber(jsonData[i].isolamento_domiciliare) + '</span></p>' +
                    '<p class="my-0">Tamponi: <span class="float-right">' + formatNumber(jsonData[i].tamponi) + '</span></p>' +
                    '</div></div>';

                circle.bindPopup(tooltip);

            }

        }
    });
}


function ciao() {
    console.log("fanculo!!!!!!!!!!!!!!")
}
