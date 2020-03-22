
var url =  "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale.json";
var data_aggiornamento;

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

$( document ).ready(function() {

	var d = new Date();
	$("#dataAgg").text(getDateIta(d));

	var jsonResult = "";

	$.ajax({
	  dataType: "json",
	  url: url,
	   async : false,
	  data: jsonResult,
	  success: function(data) {
		   jsonResult = data;
		},
		error:function(e) {
		  console.log("errore: "+e);
		}
	});


	var labeldata = [];
	var tamponi = [];
	var terapia_intensiva = [];
	var deceduti = [];
	var totale_attualmente_positivi = [];

	for(var i =0; i < jsonResult.length; i++){
		var dataRilevamento = getDataFromString(jsonResult[i].data);
		labeldata.push(getDateIta(dataRilevamento));
		tamponi.push(jsonResult[i].tamponi);
		terapia_intensiva.push(jsonResult[i].terapia_intensiva);
		deceduti.push(jsonResult[i].deceduti);
		totale_attualmente_positivi.push(jsonResult[i].totale_attualmente_positivi);
	}

	renderChartLine(labeldata, tamponi, terapia_intensiva, deceduti, totale_attualmente_positivi);
	renderChartBar(labeldata, tamponi, terapia_intensiva, deceduti, totale_attualmente_positivi);

});





function renderChartLine(labeldata, tamponi, terapia_intensiva, deceduti, totale_attualmente_positivi) {
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
            },{
				label: 'Terapia intensiva',
                data: terapia_intensiva,
				borderColor: "#3e95cd",
				options: options
			},{
				 label: 'Deceduti',
                data: deceduti,
				borderColor: "#FF0000",
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

// function renderChartBar(labeldata, tamponi, terapia_intensiva, deceduti, totale_attualmente_positivi) {
//     var ctx = document.getElementById("generale_bar").getContext('2d');
//     var myObjBar = new Chart(ctx, {
//         type: 'horizontalBar',
//         data: {
//             labels: labeldata,
//             datasets: [{
//                 label: 'Tamponi',
//                 data: tamponi,
// 				borderColor: "#8e5ea2",
// 				barPercentage: 0.5,
// 				barThickness: 6,
// 				maxBarThickness: 8,
// 				minBarLength: 2,
//             },{
// 				label: 'Terapia intensiva',
//                 data: terapia_intensiva,
// 				borderColor: "#3e95cd",
// 				barPercentage: 0.5,
// 				barThickness: 6,
// 				maxBarThickness: 8,
// 				minBarLength: 2,

// 			},{
// 				 label: 'Deceduti',
//                 data: deceduti,
// 				borderColor: "#FF0000",
// 				barPercentage: 0.5,
// 				barThickness: 6,
// 				maxBarThickness: 8,
// 				minBarLength: 2,
// 			}, {
// 				label: 'Attualmente positivi',
//                 data: totale_attualmente_positivi,
// 				borderColor: "#1e17cf",
// 				barPercentage: 0.5,
// 				barThickness: 6,
// 				maxBarThickness: 8,
// 				minBarLength: 2,
// 			}]
//         },
//     });
// }


function getDateIta(d) {
	return d.getDate() + "/" + (d.getMonth()+1) + "/" + d.getFullYear();
}

function getDataFromString(stringDate) {
	return new Date(stringDate);
}
