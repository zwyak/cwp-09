const Promise = require('bluebird');
const axios = require('axios');

//get pokemon by id=42
axios.get('https://pokeapi.co/api/v2/pokemon/42')
  .then((response) => {
    console.log(`Name: ${response.data.name} Height: ${response.data.height} Weight: ${response.data.weight}`);
  })
  .catch((error) => {
    console.log(error);
  });

//use Promise.all
const getPromise = (i) => {
    return new Promise((resolve, reject) => {
      const pokemon = axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
      resolve(pokemon);
    });
}

let promises = [];

for (let i = 1; i < 4; i++) {
  let pokemons = [];
  for (let j = 1; j < 11; j++) {
    pokemons.push(getPromise(i * j));
  }
  promises.push(pokemons);
}

Promise.all(promises.map(Promise.all.bind(Promise)))
    .then((result) => {
      result.forEach((item, i) => {
        item.forEach((p, j) => {
          console.log(`${i}-${j}: ${p.data.name}`);
        });
      });
    })
    .catch(e => {
      console.log('error: ', e);
    });
