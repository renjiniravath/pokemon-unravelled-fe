import axios from 'axios';
import {
  API_ROOT
} from '../config';

export default function fetch(options) {
  return new Promise((resolve, reject) => {
    axios({
      url: API_ROOT + options.url,
      method: options.method,
      params: options.params,
      data: options.body,
    }).then((response) => {
      resolve(response.data)
    }).catch((e) => {
      if (e.status === 401) {
        window.location.href = "/login";
      }
      reject(e);
    })
  })
}
