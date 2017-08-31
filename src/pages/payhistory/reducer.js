const initialState = {
  isLoading: false,
  data: [
    {
      'id': 1,
      'created': moment(),
      'currency': 'RUB',
      'amount': 120,
      'status': 'completed'
    }
  ]
}

const payHistoryReducer = function (state = initialState, action) {
  switch (action.type) {

    case 'GET_PAYHISTORY_PENDING':
      return Object.assign({}, state, {isLoading: true} )
    case 'GET_PAYHISTORY_FULFILLED':
      return Object.assign({}, state, {isLoading: false, data: action.payload.result} )

    case 'GET_PAYHISTORY_REJECTED':
      return Object.assign({}, state, {isLoading: false, data: initialState.data} )

    // case 'GET_PAYHISTORY_REJECTED':
    //   return state

  }

  return state
}

export default payHistoryReducer