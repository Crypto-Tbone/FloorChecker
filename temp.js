/* // code for trait level floors Todo
function get_floor_cont(cont_address,tokenId){

   // get floor data
   var requestOptions = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    }
  };
  fetch('https://api.opensea.io/api/v1/asset/'+ cont_address +'/'+tokenId , options)
  .then(response => response.json())
  .then(response => console.log(response.stats.floor_price))
  .catch(err => console.error(err));

}


function parseData(result){

  //filter and map to unique contracts
  let allAssetContracts = result.assets.map(item => ({cont_address:item.asset_contract.address, tokenId:item.token_id }));
  let key = 'cont_address';
  let unq_cont_addresses = [...new Map(allAssetContracts.map(item =>
  [item[key], item])).values()];

  unq_cont_addresses.forEach(get_floor_cont(unq_cont_addresses.cont_address,unq_cont_addresses.tokenId));

}

*/