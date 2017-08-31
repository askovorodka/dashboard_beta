import {feedUrl} from '../../config';

export function sendFeedback (token, msg) {
  return {
    type: 'FEEDBACK_SEND',
    payload: axios.post(
      feedUrl, 
      {message: msg}, 
      {headers: { 'Authorization': 'Bearer '+token }})
      .then(function (response) {
        return Promise.resolve(response.data);
      })
      .catch(function (error) {
        return Promise.reject(error);
      })
  }
}