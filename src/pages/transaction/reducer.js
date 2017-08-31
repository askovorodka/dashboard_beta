const transactionsReducer = function (state = {}, action) {

  switch (action.type) {

    case 'GET_TRANSACTION_FULFILLED':
      return action.payload.result

    case 'CLEAR_TRANSACTION':
      return {}
  }

  return state
}

export default transactionsReducer