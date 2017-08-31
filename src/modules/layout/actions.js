import axios from 'axios'
import {headUrl} from '../../config'

export function getUserInfo (token) {
  return dispatch => {
    dispatch({
      type: 'GET_LAYOUT',
      payload: axios.get(headUrl, {
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

