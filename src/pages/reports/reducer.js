const initialState = {
    isLoading: false,
    items: [],
    count: 0
}

const reportsReducer = function (state = initialState, action) {
    switch (action.type)
    {
        case 'GET_REPORTS_FULFILLED':
            return Object.assign({}, state, {
                isLoading: false,
                items: action.payload.result.items,
                count: action.payload.result.count
            })
    }
    return state
}

export default reportsReducer