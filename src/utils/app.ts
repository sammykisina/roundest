const MAX_DEX_ID = 493;

const getRandomPokemon: (not_this_one?: number) => number = (
  not_this_one?: number
) => {
  const pokedexNumber = Math.floor(Math.random() * MAX_DEX_ID) + 1;

  if (pokedexNumber !== not_this_one) return pokedexNumber;
  return getRandomPokemon(not_this_one);
};

// const getOptionsForVote = () => {
//   const first_id = getRandomPokemon();
//   const second_id = getRandomPokemon(first_id);

//   return [first_id, second_id];
// };

const app_utils = {
  getRandomPokemon,
};

export default app_utils;
