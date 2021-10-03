//Init
let ethAddress = "";
let gifDiv ;
let tbody ;
let makeRowEntry = (assImg, assName, assFloor) =>`<tr><th> <img height="50" src="${assImg}"/></th><th>${assName}</th><th>${assFloor}</th></tr>`;

function parseData(collecs){
  let uiData = collecs.map(item => ({
    collecName :item.slug, 
    collecImg : item.image_url,
    collecFlPrice : item.stats.floor_price
  })).sort((a, b) => parseFloat(b.collecFlPrice) - parseFloat(a.collecFlPrice));

  // sort by price

  let dataHtml =  `<tr><th>Image</th><th>Collection Name</th><th>Floor Price ETH</th></tr>`;
  // add to html
  uiData.forEach(colele => {
    dataHtml = dataHtml + makeRowEntry(colele.collecImg,colele.collecName,colele.collecFlPrice);
  });
 console.log(dataHtml);
 tbody.innerHTML = dataHtml;

}

//get all assets from address
function get_floors() {

  //ethadd
  ethAddress = document.getElementById("ethAddressInput").value;

  console.log("Getting assets for : " + ethAddress);

  // get all assets
  var requestOptions = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    }
  };
  fetch("https://api.opensea.io/api/v1/collections?asset_owner=" + ethAddress + "&offset=0&limit=300", requestOptions)
    .then(response => response.json())
    .then(result => parseData(result))
    .catch(error => console.log('error', error));

}

function setgif(url){
  gifDiv.innerHTML = `<img src="${url}"/>`;

}

// doc ready attach events
document.addEventListener("DOMContentLoaded", function () {

  tbody = document.getElementById("floortable");
  gifDiv = document.getElementById("gifs");
 
  document.body.addEventListener('keyup', function(event){
    if(event.key === 'Enter'){
      get_floors()
    }
  })

  var requestOptions = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    }
  };
  let random = Math.floor(Math.random()*250)+1;
  fetch("https://api.giphy.com/v1/gifs/search?q=Not gonna make it&offset="+ random +"&rating=pg&api_key=8jsnBo9dDCBW3d7lCTTKxCSmz7MMwtEy&limit=1", requestOptions)
    .then(response => response.json())
    .then(result => setgif(result.data[0].images.downsized_medium.url))
    .catch(error => console.log('error', error));


});