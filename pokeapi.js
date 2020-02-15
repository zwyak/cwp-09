const Promise = require('bluebird');
const axios = require('axios');

//get pokemon by id=42
axios.get('https://pokeapi.co/api/v2/pokemon/42')
  .then(function (response) {
    console.log(`Name: ${response.data.name} Height: ${response.data.height} Weight: ${response.data.weight}`);
  })
  .catch(function (error) {
    console.log(error);
  });

//use Promise.all
async function getPokemons(idFrom, idTo){
  let pokemons = [];
  for (var i = idFrom; i < idTo; i++) {
    const pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
    pokemons.push(pokemon.data.name);
  }
  return pokemons;
}

Promise.all([getPokemons(1, 11), getPokemons(11, 21), getPokemons(21, 31)]).then(axios.spread(function (first, second, third) {
  console.log(first);
  console.log(second);
  console.log(third);
}));
