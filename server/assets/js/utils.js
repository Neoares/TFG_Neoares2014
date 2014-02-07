function formValues(data){
    var splits = data.split('&');
    var hash = [];
    console.log(splits.length);
    for (i = 0; i < splits.length; i++)
    {
        var iSplit = splits[i].split('=');
        hash[iSplit[0]] = iSplit[1];
    }
    return hash;
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}



exports.formValues = formValues;
exports.sleep = sleep;