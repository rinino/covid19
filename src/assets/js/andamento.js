
var urlAndamentoNazionale = "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale.json";
var urlProvince = "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-province.json";
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

$(document).ready(function () {
  elaboraDatiAndamentoNazionale();
  elaboraDatiProvinciaPz();

});


function elaboraDatiAndamentoNazionale(){
  var jsonResultAndamentoNazionale = getDatiAndamentoNazionale();
  var labeldata = [];
  var tamponi = [];
  var terapia_intensiva = [];
  var deceduti = [];
  var totale_attualmente_positivi = [];

  for (var i = 0; i < jsonResultAndamentoNazionale
    .length; i++) {
    var dataRilevamento = getDataFromString(jsonResultAndamentoNazionale
    [i].data);
    labeldata.push(getDateIta(dataRilevamento));
    tamponi.push(jsonResultAndamentoNazionale[i].tamponi);
    terapia_intensiva.push(jsonResultAndamentoNazionale[i].terapia_intensiva);
    deceduti.push(jsonResultAndamentoNazionale [i].deceduti);
    totale_attualmente_positivi.push(jsonResultAndamentoNazionale[i].totale_attualmente_positivi);
  }

  renderChartLine1(labeldata, tamponi, totale_attualmente_positivi);
  renderChartLine2(labeldata, terapia_intensiva, deceduti);

}


function elaboraDatiProvinciaPz(){
  var jsonProvince = getDatiProvince();
  var labeldata = [];
  var tamponi = [];
  var terapia_intensiva = [];
  var deceduti = [];
  var totale_attualmente_positivi = [];
  var totale_casi = [];

  for (var i = 0; i < jsonProvince.length; i++) {

    if(jsonProvince[i].sigla_provincia == 'PZ') {
      var dataRilevamento = getDataFromString(jsonProvince
        [i].data);
        labeldata.push(getDateIta(dataRilevamento));
        totale_casi.push(jsonProvince[i].totale_casi);
    }
  }
  renderChartLinePz(labeldata, totale_casi);

}



// dati generali
function renderChartLine1(labeldata, tamponi, totale_attualmente_positivi) {
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
      }]
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


// dati provincia pz

function renderChartLinePz(labeldata, totale_casi) {
  var ctx = document.getElementById("potenza").getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labeldata,
      datasets: [{
        label: 'Totale casi',
        data: totale_casi,
        borderColor: "#8e5ea2",
        options: options
      }]
    },
  });
}


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







function getDateIta(d) {
  return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
}

function getDataFromString(stringDate) {
  return new Date(stringDate);
}
