const initialState = {
  isLoading: false,
  data: {
    RUB: {
      sum_value: 0,
      unique_users: 0,
      average_check: 0,
      currency: "RUB"
    },
    USD: {
      sum_value: 0,
      unique_users: 0,
      average_check: 0,
      currency: "USD"
    },
    BY_STATUSES:{
      RUB:{
        all_count: 0,
        success_count:0,
        fail_count: 0,
        wait_count: 0,
      },
      USD: {
          all_count: 0,
          success_count: 0,
          fail_count: 0,
          wait_count: 0,
      }
    }
  }
}

const statsReducer = function (state = initialState, action) {
  switch (action.type) {

    case 'GET_STATS_PENDING':
      return Object.assign({}, state, {isLoading: true} )
    case 'GET_STATS_FULFILLED':
      var result = (action.payload.result instanceof Array) ? initialState.data : action.payload.result

      result.RUB = (result.RUB === undefined) ? initialState.data.RUB : result.RUB
      result.USD = (result.USD === undefined) ? initialState.data.USD : result.USD

      return Object.assign({}, state, {isLoading: false, data: result} )

    case 'GET_STATS_REJECTED':
      return state

  }

  return state
}

export default statsReducer