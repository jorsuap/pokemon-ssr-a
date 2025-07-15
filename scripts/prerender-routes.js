const TOTAL_POKEMONS = 151;
const TOTAL_PAGES = 10;

(async () => {
  const fs = require('fs');
  const pokemonsId = Array.from({ length: TOTAL_POKEMONS }, (_, i) => i + 1);

  //pokemons por id
  let fileContent = pokemonsId.map((pokemon) => `/pokemons/${pokemon}`).join('\n');

  //pokemons por pagina
  for (let i = 1; i <= TOTAL_PAGES; i++) {
    fileContent += `\n/pokemons/page/${i}`;
  }

  //pokemon por nombre
  const pokemonList = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMONS}`)
    .then(res => res.json());

  fileContent += `\n`;
  fileContent += pokemonList.results.map((pokemon) => `/pokemon/${pokemon.name}`).join('\n');

  fs.writeFileSync('routes.txt', fileContent);
  console.log('routes.txt created');
})();