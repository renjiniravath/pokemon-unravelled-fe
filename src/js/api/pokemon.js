import fetch from './handler';

export const getPokemonList = (params) => {
  return fetch({
    method: 'GET',
    url: '/pokemon',
    params,
  })
};

export const getPokemonDetails = (id) => {
  return fetch({
    method: 'GET',
    url: `/pokemon/${id}`,
  })
}
