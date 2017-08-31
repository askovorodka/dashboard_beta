import axios from 'axios'
import {depositUrl} from '../../config';

export function getTransaction (token, id) {
  return {
    type: 'GET_TRANSACTION',
    payload: axios.get(depositUrl+'/'+id, {
      headers: { 'Authorization': 'Bearer '+token }
    })
      .then(function (response) {
        return Promise.resolve(response.data);
      })
      .catch(function (error) {
        return Promise.reject(error);
      })
  }
}

export function clearTransaction () {
  return {
    type: 'CLEAR_TRANSACTION'
  }
}