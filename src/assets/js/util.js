function getDateIta(d) {
  return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
}

function getDateOraIta(d) {
  return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + " " + d.getHours() +":00";
}

function getDataFromString(stringDate) {
  var def = stringDate.replace(' ', 'T')
  return new Date(def);
}

function formatNumber(num) {
  if (num == null || num == undefined) {
      return "n.d.";
  }
  if (!(num instanceof Array)) {
      num = parseFloat(num);
      var ret = num.toFixed(0);
      return ret.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
  }
}

function calcolaPercentuale(totale, daValutare) {
  var finalValue = daValutare*100 / totale;
  return finalValue.toFixed(2).replace(".", ",");
}
