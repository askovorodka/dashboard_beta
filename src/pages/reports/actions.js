import axios from 'axios'
import fileDownload from 'react-file-download'
import {reportsUrl} from '../../config'
import {reportCreateUrl} from '../../config'
import queryString from 'query-string'

export function createReport(token, parameters) {
    const url = reportCreateUrl + '?' + queryString.stringify(parameters);
    return {
        type: 'SET_REPORT_CREATE',
        payload: axios.get(url, {
            headers: { 'Authorization': 'Bearer '+token }
        }).then(function (response) {
            return Promise.resolve(response);
        }).catch(function (error) {
            return Promise.reject(error);
        })
    }
}

export function getFile(token, fileLink, fileName) {
    return {
        type: 'GET_REPORT_FILE',
        payload: axios.get(fileLink,{
            headers: { 'Authorization': 'Bearer '+token }
        }).then(function (response) {
            fileDownload(response.data, fileName);
        }).catch(function (error) {
            return Promise.reject(error);
        })
    }
}

export function getReports(token) {
    return {
        type: 'GET_REPORTS',
        payload: axios.get(reportsUrl,{
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
