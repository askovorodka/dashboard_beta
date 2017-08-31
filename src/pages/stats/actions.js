import axios from 'axios'
import {statUrl} from '../../config';
import { push } from 'react-router-redux'

export function getStats (token, parameters) {

  return dispatch => {
    dispatch({
      type: 'GET_STATS',
      payload: axios.get(statUrl, {
        params: parameters,
        headers: { 'Authorization': 'Bearer ' + token }
      })
      .then(response => {
        return Promise.resolve(response.data);
      })
      .catch(error => {
        console.log('reject STATS')
        // dispatch(push('/login'))
        console.log('dispatch STATS')
        return Promise.reject(error);
      })
    })
  }
  
}

export function delStats () {
  return {
    type: 'DEL_STATS'
  }
}