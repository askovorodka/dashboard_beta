const initialState = {
  user: {
    id: 0,
    integration_name: 'Cases4Real',
    balance: {
      RUB: 0,
      USD: 0
    }
  }
}

const layoutReducer = function (state = initialState, action) {
  switch (action.type) {
    case 'GET_LAYOUT_FULFILLED':

      const res = action.payload.result;

      if(res.balance.RUB == undefined) {res.balance.RUB = initialState.user.balance.RUB}
      if(res.balance.USD == undefined) {res.balance.USD = initialState.user.balance.USD}

      return Object.assign({}, state, { user: res })
  }

  return state
}

export default layoutReducer