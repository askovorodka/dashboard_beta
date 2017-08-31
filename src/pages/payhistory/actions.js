import axios from 'axios'
import {debitListUrl} from '../../config';

export function getPayHistory (token, date) {

  return dispatch => {
    dispatch({
      type: 'GET_PAYHISTORY',
      payload: axios.get(debitListUrl, {
        params: date,
        headers: { 'Authorization': 'Bearer '+token }
      })
      .then(function (response) {
        return Promise.resolve(response.data);
      })
      .catch(function (error) {
        return Promise.reject(error);
      })
    })
  }
  
}