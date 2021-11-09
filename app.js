//Init
let ethAddress = "";
let gifDiv;
let loadingImg;
let tbody;
let tValue;


let makeRowEntry = (assImg, assName, assFloor, assCount) => `<tr><th> <img height="50" src="${assImg}"/></th><th><a href="https://opensea.io/collection/${assName}?search[sortAscending]=true&search[sortBy]=PRICE&search[toggles][0]=BUY_NOW" target="_blank">${assName}</a></th><th>${assFloor} (${assCount})</th></tr>`;

function toggleLoading() {
  if (loadingImg.style.display === 'none') {
    loadingImg.style.display = 'block';
  } else if (loadingImg.style.display === 'block') {
    loadingImg.style.display = 'none';
  }
}

function parseData(collecs) {

  Promise.all(
    collecs.map(element =>
      fetch("https://api.opensea.io/api/v1/collection/" + element.slug + "/stats")
      .then(response => response.json())
      .catch(error => console.log('error', error))
    )
  ).then(data => {
    let uiData = [];
    for (i = 0; i < data.length; i++) {
      let clitem = {};
      clitem.collecName = collecs[i].slug;
      clitem.collecImg = collecs[i].image_url;
      clitem.collecFlPrice = data[i].stats.floor_price;
      clitem.collecOwnedCount = collecs[i].owned_asset_count;
      uiData.push(clitem);
    }

    uiData.sort((a, b) => parseFloat(b.collecFlPrice) - parseFloat(a.collecFlPrice));

    let tEValue = 0;

    let dataHtml = `<tr><th>Image</th><th>Collection Name</th><th>ETH Floor Price (Count)</th></tr>`;
    // add to html
    uiData.forEach(colele => {
      tEValue = tEValue + colele.collecFlPrice * colele.collecOwnedCount;
      dataHtml = dataHtml + makeRowEntry(colele.collecImg, colele.collecName, colele.collecFlPrice, colele.collecOwnedCount);
    });

    tValue.innerHTML = tEValue;
    tbody.innerHTML = dataHtml;
    toggleLoading();

  });
}

//get all assets from address
function get_floors() {
  toggleLoading();

  //ethadd
  ethAddress = document.getElementById("ethAddressInput").value;

  console.log("Getting assets for : " + ethAddress);

  //add query to history
  if (history.pushState) {
    let newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + "?q=" + ethAddress;
    window.history.pushState({
      path: newUrl
    }, '', newUrl);
  }



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

function setgif(url) {
  gifDiv.innerHTML = `<img src="${url}"/>`;

}

// doc ready attach events
document.addEventListener("DOMContentLoaded", function () {

  tbody = document.getElementById("floortable");
  gifDiv = document.getElementById("gifs");
  loadingImg = document.getElementById("loading");
  tValue = document.getElementById("totalValue");

  document.body.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
      get_floors()
    }
  })

  //get url from window and search
  if (location.search.split('q=')[1]) {
    document.getElementById("ethAddressInput").value = location.search.split('q=')[1];
    get_floors()
  }

  var requestOptions = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    }
  };
  let random = Math.floor(Math.random() * 250) + 1;
  fetch("https://api.giphy.com/v1/gifs/search?q=Not gonna make it&offset=" + random + "&rating=pg&api_key=8jsnBo9dDCBW3d7lCTTKxCSmz7MMwtEy&limit=1", requestOptions)
    .then(response => response.json())
    .then(result => setgif(result.data[0].images.downsized_medium.url))
    .catch(error => console.log('error', error));


});