
var urlAndamentoNazionale = "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale.json";
var urlProvince = "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-province.json";
var urlAndamentoNazionaleLatest = "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale-latest.json";
var urlAndamentoDeceduti = "https://raw.githubusercontent.com/VitoFanelli/covid-19-italy/master/notebookIT/decessiITA.json";
var urlAndamentoDimessi = "https://raw.githubusercontent.com/VitoFanelli/covid-19-italy/master/notebookIT/dimessiITA.json";
var urlRegioni = "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni.json";

function getDatiAndamentoNazionale() {
  var jsonResultAndamentoNazionale;
  $.ajax({
    dataType: "json",
    url: urlAndamentoNazionale
    ,
    async: false,
    data: jsonResultAndamentoNazionale
    ,
    success: function (data) {
      jsonResultAndamentoNazionale
        = data;
    },
    error: function (e) {
      console.log("errore: " + e);
    }
  });
  return jsonResultAndamentoNazionale;
}


function getDatiAndamentoNazionaleLatest() {
  var jsonResultAndamentoNazionaleLatest;
  $.ajax({
    dataType: "json",
    url: urlAndamentoNazionaleLatest
    ,
    async: false,
    data: jsonResultAndamentoNazionaleLatest
    ,
    success: function (data) {
      jsonResultAndamentoNazionaleLatest
        = data;
    },
    error: function (e) {
      console.log("errore: " + e);
    }
  });
  return jsonResultAndamentoNazionaleLatest;

}

function getDatiProvince() {
  var jsonResultProvince;
  $.ajax({
    dataType: "json",
    url: urlProvince
    ,
    async: false,
    data: jsonResultProvince
    ,
    success: function (data) {
      jsonResultProvince = data;
    },
    error: function (e) {
      console.log("errore: " + e);
    }
  });
  return jsonResultProvince;
}

function getDatiRegioni() {
  var jsonResultRegioni;
  $.ajax({
    dataType: "json",
    url: urlRegioni
    ,
    async: false,
    data: jsonResultRegioni
    ,
    success: function (data) {
      jsonResultRegioni = data;
    },
    error: function (e) {
      console.log("errore: " + e);
    }
  });
  return jsonResultRegioni;
}


function getDatiDecedutiTrend() {
  var jsonTrendDeceduti;
  $.ajax({
    dataType: "json",
    url: urlAndamentoDeceduti
    ,
    async: false,
    data: jsonTrendDeceduti
    ,
    success: function (data) {
      jsonTrendDeceduti = data;
    },
    error: function (e) {
      console.log("errore: " + e);
    }
  });
  return jsonTrendDeceduti;

}


function getDatiDimessiTrend() {
  var jsonTrendDimessi;
  $.ajax({
    dataType: "json",
    url: urlAndamentoDimessi
    ,
    async: false,
    data: jsonTrendDimessi
    ,
    success: function (data) {
      jsonTrendDimessi = data;
    },
    error: function (e) {
      console.log("errore: " + e);
    }
  });
  return jsonTrendDimessi;

}
