import {authUrl} from '../../config';

export function loginUserSuccess(token) {
  localStorage.setItem('token', token);
  return {
    type: 'LOGIN_USER_SUCCESS',
    payload: {
      token: token
    }
  }
}
export function loginUserFailure(error) {
  localStorage.removeItem('token');
  return {
    type: 'LOGIN_USER_FAILURE',
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  }
}
export function loginUserRequest() {
  return {
    type: 'LOGIN_USER_REQUEST'
  }
}
export function logout() {
  localStorage.removeItem('token');
  return {
    type: 'LOGOUT_USER'
  }
}
export function logoutAndRedirect() {
  return (dispatch, state) => {
    dispatch(logout()); 
    // dispatch(pushState(null, '/login'));
  }
}
export function loginUser(username, password, redirect="/") {

	return dispatch => {
		dispatch(loginUserRequest());

    axios.post(authUrl, {
    	username: username, 
    	password: password
    })
    .then(function (response) {
     	try {
        if(response.data.token){
           dispatch(loginUserSuccess(response.data.token));
        }
        else{
          dispatch(loginUserFailure({
            response: {
              status: 403,
              statusText: response.data.message
            }
          }));
        }
        console.log('try');
        console.log(response);
      } catch (e) {
        dispatch(loginUserFailure({
          response: {
            status: 403,
            statusText: 'Invalid token'
          }
        }));
      }
    })
    .catch(function (error) {
      dispatch(loginUserFailure(error));
    })
  }
}