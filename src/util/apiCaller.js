import fetch from 'isomorphic-fetch';

export const API_URL = process.env.REACT_APP_SERVICE_API || 'https://dummyjson.com';

export default function callApi(endpoint, method = 'get', body) {
  let headers = {};
  headers['content-type'] = 'application/json';
  return fetch(`${API_URL}/${endpoint}`, {
    headers: headers,
    method,
    body: JSON.stringify(body),
    referrer: '',
    referrerPolicy: 'origin-when-cross-origin'
  }).then(response => response.json().then(json => ({ json, response })))
    .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
    .then(
      response => response,
      error => error
    );
}


