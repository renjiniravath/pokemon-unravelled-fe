let apiRoot;

if (process.env.NODE_ENV === 'production') {
  apiRoot = '**APIROOT**';
} else if (process.env.NODE_ENV === 'development') {
  // apiRoot = 'http://192.168.0.108:8080';
  apiRoot = 'http://localhost:8080'
}

export const API_ROOT = apiRoot;
