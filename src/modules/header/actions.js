import { steamStatusUrl } from '../../config'

export function changeLang(lang) {
  return dispatch => {
    dispatch({
      type: 'LANG_CHANGE',
      payload: lang
    })
  }
}

export function getSteamStatus() {
    return {
        type: 'GET_STEAM_STATUS',
        payload: axios.get(steamStatusUrl,{
            headers: {'X-Requested-With': 'XMLHttpRequest'}
        }).then(function (response) {
            return Promise.resolve(response.data);
        }).catch(function (error) {
            return Promise.reject(error);
        })
    }
}