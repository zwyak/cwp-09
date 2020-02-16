const Promise = require('bluebird');
const axios = require('axios');

const getPromise = (url, id) => {
    return new Promise((resolve, reject) => {
      const pokemon = axios.get(`${url}${id}`);
      resolve(pokemon);
    });
}

const getPromiseLimit = (url, offset, limit) => {
    return new Promise((resolve, reject) => {
      const pokemon = axios.get(`${url}?offset=${offset}&limit=${limit}`);
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
Promise.all([getPromiseLimit('https://pokeapi.co/api/v2/pokemon/', 0, 10),
             getPromiseLimit('https://pokeapi.co/api/v2/pokemon/', 10, 10),
             getPromiseLimit('https://pokeapi.co/api/v2/pokemon/', 20, 10)])
    .then((res) => {
      res.forEach((item, i) => {
        item.data.results.forEach((p, j) => {
          console.log(`${i+1}-${j+1} : ${p.name}`);
        });
      });
    })
    .catch(e => {
      console.log('error: ', e);
    });

//use Promise.any
Promise.any([getPromise('https://pokeapi.co/api/v2/pokemon/', 1),
            getPromise('https://pokeapi.co/api/v2/pokemon/', 4),
            getPromise('https://pokeapi.co/api/v2/pokemon/', 7)])
      .then((result) =>{
        console.log(`ANY ${result.data.name}`);
      })
      .catch(e => {
        console.log('error: ', e);
      });

//use Promise.props
Promise.props({pokemons: getPromiseLimit('https://pokeapi.co/api/v2/pokemon/', 0, 10),
              items: getPromiseLimit('https://pokeapi.co/api/v2/item/', 0, 10),
              locations: getPromiseLimit('https://pokeapi.co/api/v2/location/', 0, 10)})
      .then((res) =>{
        res.pokemons.data.results.forEach((item, i) => {
          console.log(`Props pokemons: ${i+1} - ${item.name}`);
        });

        res.items.data.results.forEach((item, i) => {
          console.log(`Props items: ${i+1} - ${item.name}`);
        });

        res.locations.data.results.forEach((item, i) => {
          console.log(`Props locations: ${i+1} - ${item.name}`);
        });
      })
      .catch(e => {
        console.log('error: ', e);
      });

//use Promise.map
let berries = [];
axios.get('https://pokeapi.co/api/v2/berry/?offset=0&limit=4')
  .then((res) => {
    berries = res.data.results;
  })
  .then(() =>{
    Promise.map(berries, (berry) => {
      return axios.get(berry.url);
    }).then( (res) => {
      res.forEach((item, i) => {
        console.log(`Berry name: ${item.data.name}, Berry size: ${item.data.size}`);
      });
    });
  })
  .catch((error) => {
    console.log(error);
  });
