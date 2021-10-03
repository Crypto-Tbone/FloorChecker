//Init
let ethAddress = "";


//get floors
function get_floors(){
  //ethadd
  ethAddress = document.getElementById("ethAddressInput").value;

  console.log("Getting assets for : "+ ethAddress);

  // get all assets
  var requestOptions = {
    method: 'GET'
  };
  fetch("https://api.opensea.io/api/v1/assets?owner="+ ethAddress +"&order_direction=desc&offset=0&limit=20", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

  } 



// doc ready attach events
document.addEventListener("DOMContentLoaded", function() {

    // get floor prices func
    document.getElementById("getFloors").onclick = function() {get_floors()};

  });


