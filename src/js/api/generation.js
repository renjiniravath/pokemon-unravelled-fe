import fetch from "./handler";

export const listGenerations = () => {
  return fetch({
    method: 'GET',
    url: '/generations'
  })
}
