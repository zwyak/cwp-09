const Promise = require('bluebird');
const axios = require('axios');

axios.get('https://pokeapi.co/api/v2/pokemon/42')
  .then(function (response) {
    console.log(`Name: ${response.data.name} Height: ${response.data.height} Weight: ${response.data.weight}`);
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
  });
