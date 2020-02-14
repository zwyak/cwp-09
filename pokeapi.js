const Promise = require('bluebird');
const axios = require('axios');
//get pokemon by id=42
axios.get('https://pokeapi.co/api/v2/pokemon/42')
  .then(function (response) {
    console.log(`Name: ${response.data.name} Height: ${response.data.height} Weight: ${response.data.weight}`);
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
  });

//get 30 pokemons by Promise.all
let p1 = new Promise((resolve, reject) =>{
  for (var i = 1; i < 11; i++) {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
      .then(function (response) {
        console.log(`1-Name: ${response.data.name}`);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
      });
  }
});


let p2 = new Promise((resolve, reject) =>{
  for (var i = 11; i < 21; i++) {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
      .then(function (response) {
        console.log(`2-Name: ${response.data.name}`);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
      });
  }
});

let p3 = new Promise((resolve, reject) =>{
  for (var i = 21; i < 31; i++) {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
      .then(function (response) {
        console.log(`3-Name: ${response.data.name}`);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
      });
  }
});

Promise.all([p1, p2, p3]).then(function() {});
