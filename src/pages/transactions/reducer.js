const initialState = {
  isLoading: false,
  isLoadingAgain: false,
  count: 0,
  items: []
}

const transactionsReducer = function (state = initialState, action) {

  switch (action.type) {
    case 'GET_TRANSACTIONS_PENDING':
      return Object.assign({}, state, {isLoading: true})
    case 'GET_TRANSACTIONS_FULFILLED':
      return Object.assign({}, state, {isLoading: false, isLoadingAgain: false, items: action.payload.result.items, count: action.payload.result.count})
    case 'GET_TRANSACTIONS_OFFSET_PENDING':
      return Object.assign({}, state, {isLoadingAgain: true})
    case 'GET_TRANSACTIONS_OFFSET_FULFILLED':
      return Object.assign({}, state, {isLoadingAgain: false, items: state.items.concat(action.payload.result.items), count: action.payload.result.count})
    case 'DEL_TRANSACTIONS':
      return Object.assign({}, state, {isLoading: false, items: []})

  }

  return state
}

export default transactionsReducer