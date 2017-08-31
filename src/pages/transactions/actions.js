import axios from 'axios'
import {depositListUrl} from '../../config';

export function getTransactions (token, date, offset, orderId, activeStatuses, filterParams) {
  const order_id = (orderId > 0) ? orderId : null
  const type = (offset === 0) ? 'GET_TRANSACTIONS' : 'GET_TRANSACTIONS_OFFSET'
  const as = (activeStatuses !== undefined) ? activeStatuses : [1,2,3]

  let params = {
    date_from: date.date_from, 
    date_to: date.date_to, 
    offset: offset,
    order_id,
    limit: 30,
    activeStatuses: as
  }
  if(filterParams !== undefined && filterParams.length > 0) {
    filterParams.map(val => {
      params = Object.assign(params, val)
    })
  }
  return {
    type: type,
    payload: axios.get(depositListUrl, {
      params: params,
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

export function delTransactions () {
  return {
    type: 'DEL_TRANSACTIONS'
  }
}