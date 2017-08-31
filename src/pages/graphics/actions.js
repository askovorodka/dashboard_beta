import axios from 'axios'
import {graphicsUrl} from '../../config';

export function getGraphData (token, date, group, currency) {
  return {
    type: 'GET_GRAPHDATA',
    payload: axios.get(graphicsUrl, {
      params: {
        date_from: date.date_from, 
        date_to: date.date_to, 
        group_by: group,
        limit: 3000,
        currency: currency
      },
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

export function changeGraphGroup (period) {
  return dispatch => {
    dispatch({
      type: 'CHANGE_PERIOD',
      payload: period
    })
  }
}

export function changeGraphCur (cur) {
  return dispatch => {
    dispatch({
      type: 'CHANGE_CURRENCY',
      payload: cur
    })
  }
}

export function changeGraphData (chart) {
  return dispatch => {
    dispatch({
      type: 'CHANGE_CHART',
      payload: chart
    })
  }
}

export function delGraphData () {
  return dispatch => {
    dispatch({
      type: 'DEL_GRAPHDATA'
    })
  }
}