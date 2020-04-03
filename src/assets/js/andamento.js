

$(document).ready(function () {
  elaboraDatiAndamentoNazionale();
  elaboraDatiProvinciaPz();
  var aggiornamentoNazionaleLatest = getDatiAndamentoNazionaleLatest();
  var dataAggiornamento = getDataFromString(aggiornamentoNazionaleLatest[0].data);
  $('#dataAgg').text(getDateOraIta(dataAggiornamento));

  elaboraDatiDeceduti();
  elaboraDatiRegioneBasilicata();

});

var options = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    fontColor: "white",
  },
  scales: {
    xAxes: [{
      ticks: {
        fontColor: "white",
      }
    }],
    yAxes: [{
      ticks: {
        fontColor: "white",
        beginAtZero: true,
        maxTicksLimit: 5,
        stepSize: Math.ceil(250 / 5),
        max: 250
      }
    }]
  }
};


function elaboraDatiAndamentoNazionale() {
  var jsonResultAndamentoNazionale = getDatiAndamentoNazionale();
  var labeldata = [];
  var tamponi = [];
  var terapia_intensiva = [];
  var deceduti = [];
  var totale_attualmente_positivi = [];
  var variazione_totale_positivi = [];
  var nuovi_positivi = [];

  for (var i = 0; i < jsonResultAndamentoNazionale
    .length; i++) {
    var dataRilevamento = getDataFromString(jsonResultAndamentoNazionale
    [i].data);
    labeldata.push(getDateIta(dataRilevamento));
    tamponi.push(jsonResultAndamentoNazionale[i].tamponi);
    terapia_intensiva.push(jsonResultAndamentoNazionale[i].terapia_intensiva);
    deceduti.push(jsonResultAndamentoNazionale[i].deceduti);
    totale_attualmente_positivi.push(jsonResultAndamentoNazionale[i].totale_positivi);
    variazione_totale_positivi.push(jsonResultAndamentoNazionale[i].variazione_totale_positivi);
    nuovi_positivi.push(jsonResultAndamentoNazionale[i].nuovi_positivi);
  }
  renderChartLine1(labeldata, tamponi, totale_attualmente_positivi);
  renderChartLine2(labeldata, terapia_intensiva, deceduti);
  renderChartLine3(labeldata, variazione_totale_positivi, nuovi_positivi);

}


function elaboraDatiRegioneBasilicata() {
  var jsonRegioni = getDatiRegioni();
  var labeldata = [];
  var terapia_intensiva = [];
  var totale_casi = [];
  var tamponi = [];

  for (var i = 0; i < jsonRegioni.length; i++) {

    if (jsonRegioni[i].codice_regione == 17) {
      var dataRilevamento = getDataFromString(jsonRegioni
      [i].data);
      labeldata.push(getDateIta(dataRilevamento));
      terapia_intensiva.push(jsonRegioni[i].terapia_intensiva);
      totale_casi.push(jsonRegioni[i].totale_casi);
      tamponi.push(jsonRegioni[i].tamponi);

    }
  }
  renderGraficoRegioneBasilicata(labeldata, terapia_intensiva, tamponi, totale_casi);

}

function elaboraDatiProvinciaPz() {
  var jsonProvince = getDatiProvince();
  var labeldata = [];
  var totale_casiPz = [];
  var totale_casiMt = [];

  for (var i = 0; i < jsonProvince.length; i++) {

    if (jsonProvince[i].sigla_provincia == 'PZ') {
      var dataRilevamento = getDataFromString(jsonProvince
      [i].data);
      labeldata.push(getDateIta(dataRilevamento));
      totale_casiPz.push(jsonProvince[i].totale_casi);
    }

    if (jsonProvince[i].sigla_provincia == 'MT') {
      var dataRilevamento = getDataFromString(jsonProvince
      [i].data);
      totale_casiMt.push(jsonProvince[i].totale_casi);
    }

  }
  renderChartLinePz(labeldata, totale_casiPz, totale_casiMt);

}

function elaboraDatiDeceduti() {
  var jsonDeceduti = getDatiDecedutiTrend();
  var labeldata = [];
  var giorniArrayTemp = jsonDeceduti.giorno;
  var deceduti = jsonDeceduti.decessi;

  for (var i = 0; i < giorniArrayTemp.length; i++) {
    var dataString = getDataFromString(giorniArrayTemp[i]);
    labeldata.push(getDateIta(dataString));
  }
  renderChartDeceduti(labeldata, deceduti);

}


// trend deceduti
function renderChartDeceduti(labeldata, deceduti) {
  var ctx = document.getElementById("deceduti").getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labeldata,
      datasets: [{
        label: 'Deceduti',
        data: deceduti,
        borderColor: "#1e17cf",
        options: options
      }]
    },
  });
}

// dati generali
function renderChartLine1(labeldata, tamponi, totale_attualmente_positivi, variazione_totale_positivi) {
  var ctx = document.getElementById("generale").getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labeldata,
      datasets: [{
        label: 'Tamponi',
        data: tamponi,
        borderColor: "#8e5ea2",
        options: options
      }, {
        label: 'Attualmente positivi',
        data: totale_attualmente_positivi,
        borderColor: "#1e17cf",
        options: options
      },]
    },
  });
}

function renderChartLine2(labeldata, terapia_intensiva, deceduti) {
  var ctx = document.getElementById("generale2").getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labeldata,
      datasets: [{
        label: 'Terapia intensiva',
        data: terapia_intensiva,
        borderColor: "#3e95cd",
        options: options
      }, {
        label: 'Deceduti',
        data: deceduti,
        borderColor: "#FF0000",
        options: options
      }]
    },
  });
}


function renderChartLine3(labeldata, variazione_totale_positivi, nuovi_positivi) {
  var ctx = document.getElementById("generale3").getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labeldata,
      datasets: [{
        label: 'Variazione totale positivi',
        data: variazione_totale_positivi,
        borderColor: "#3e95cd",
        options: options
      }, {
        label: 'Nuovi positivi',
        data: nuovi_positivi,
        borderColor: "#FF0000",
        options: options
      }]
    },
  });
}

// dati provincia pz
function renderChartLinePz(labeldata, totale_casiPz, totale_casiMt) {
  var ctx = document.getElementById("potenza_matera").getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labeldata,
      datasets: [{
        label: 'Totale casi PZ',
        data: totale_casiPz,
        borderColor: "#ff0000",
        options: options
      },{
        label: 'Totale casi MT',
        data: totale_casiMt,
        borderColor: "#0000FF",
        options: options
      }]
    },
  });
}

function renderGraficoRegioneBasilicata(labeldata, terapia_intensiva, tamponi, totale_casi) {
  var ctx = document.getElementById("basilicata").getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labeldata,
      datasets: [{
        label: 'Terapia intensiva',
        data: terapia_intensiva,
        borderColor: "#ff0000",
        backgroundColor: "#ff0000"
      }, {
        label: 'Num. tamponi',
        data: tamponi,
        borderColor: "#009933",
        backgroundColor: "#009933"
      }, {
        label: 'Casi totali',
        data: totale_casi,
        borderColor: "#3333cc",
        backgroundColor: "#3333cc"
      }]
    },
  });
}
