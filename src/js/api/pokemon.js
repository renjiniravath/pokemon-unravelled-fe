import fetch from './handler';

export const getPokemonList = (params) => {
  return fetch({
    method: 'GET',
    url: '/pokemon',
    params,
  })
};

export const getPokemonDetails = (pokeId, genId) => {
  return fetch({
    method: 'GET',
    url: `/pokemon/${pokeId}/generation/${genId}`,
  })
}

export const getGenerationsApplicable = (id) => {
  return fetch({
    method: 'GET',
    url: `/pokemon/${id}/generations`,
  })
}
