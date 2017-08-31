import {debitRequestUrl} from '../../config';

export function sendConclusion (token, msg) {
  return {
    type: 'CONCLUSION_SEND',
    payload: axios.post(
      debitRequestUrl, 
      msg, 
      {headers: { 'Authorization': 'Bearer '+token }})
      .then(function (response) {
        return Promise.resolve(response.data);
      })
      .catch(function (error) {
        return Promise.reject(error);
      })
  }
}