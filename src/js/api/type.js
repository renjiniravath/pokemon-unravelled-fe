import fetch from './handler'

export const getTypeList = () => {
  return fetch({
    method: 'GET',
    url: '/types',
  })
}
