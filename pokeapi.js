const Promise = require('bluebird');
const axios = require('axios');

const getPromise = (url, i) => {
    return new Promise((resolve, reject) => {
      const pokemon = axios.get(`${url}${i}`);
      resolve(pokemon);
    });
}

//get pokemon by id=42
axios.get('https://pokeapi.co/api/v2/pokemon/42')
  .then((response) => {
    console.log(`Name: ${response.data.name} Height: ${response.data.height} Weight: ${response.data.weight}`);
  })
  .catch((error) => {
    console.log(error);
  });

//use Promise.all
let promises = [];

for (let i = 1; i < 4; i++) {
  let pokemons = [];
  for (let j = 1; j < 11; j++) {
    pokemons.push(getPromise('https://pokeapi.co/api/v2/pokemon/', i * j));
  }
  promises.push(pokemons);
}

Promise.all(promises.map(Promise.all.bind(Promise)))
    .then((result) => {
      result.forEach((item, i) => {
        item.forEach((p, j) => {
          console.log(`ALL ${i}-${j}: ${p.data.name}`);
        });
      });
    })
    .catch(e => {
      console.log('error: ', e);
    });

//use Promise.any

Promise.any([getPromise('https://pokeapi.co/api/v2/pokemon/', 1), getPromise('https://pokeapi.co/api/v2/pokemon/', 4), getPromise('https://pokeapi.co/api/v2/pokemon/', 7)])
      .then((result) =>{
        console.log(`ANY ${result.data.name}`);
      })
      .catch(e => {
        console.log('error: ', e);
      });

//use Promise.props
let poks = [];
let items = [];
let locations = [];

for (var i = 1; i < 11; i++){
  poks.push(getPromise('https://pokeapi.co/api/v2/pokemon/', i));
}

for (var i = 1; i < 11; i++){
  items.push(getPromise('https://pokeapi.co/api/v2/item/', i));
}

for (var i = 1; i < 11; i++){
  locations.push(getPromise('https://pokeapi.co/api/v2/location/', i));
}

Promise.props({pokemons: poks[0], items: items[0], locations: locations[0]})
      .then((result) =>{
        console.log(result.pokemons, result.items, result.locations);
      })
      .catch(e => {
        console.log('error: ', e);
      });
