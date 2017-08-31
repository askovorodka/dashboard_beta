const initialState = {
  token: null,
  isAuthenticated: false,
  isAuthenticating: false,
  statusText: null
}

export default function auth(state = initialState, action){
  switch(action.type){

    case 'LOGIN_USER_REQUEST':
      return Object.assign({}, state, {
        'isAuthenticating': true,
        'statusText': null
      });
    case 'LOGIN_USER_SUCCESS':
      return Object.assign({}, state, {
        'isAuthenticating': false,
        'isAuthenticated': true,
        'token': action.payload.token,
        'statusText': 'You have been successfully logged in.'
      });

    case 'LOGIN_USER_FAILURE':
      return Object.assign({}, state, {
        'isAuthenticating': false,
        'isAuthenticated': false,
        'token': null,
        'statusText': `Authentication Error: ${action.payload.status} ${action.payload.statusText}`
      });
    case 'LOGOUT_USER':
      return Object.assign({}, state, {
        'isAuthenticated': false,
        'token': null,
        'statusText': 'You have been successfully logged out.'
      });

    case 'OUTDATE_TOKEN':
      return Object.assign({}, state, {
        'isAuthenticated': false,
        'token': null,
        'statusText': 'You token is out of date'
      });

    // as always, on default do nothing
    default:
      return state;
  }
}
