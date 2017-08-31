const initialState = {
  startDate: moment().set({hour:0,minute:0,second:0,millisecond:0}).subtract(1, 'months'), 
  finishDate: moment().set({hour:23,minute:59,second:59,millisecond:0})
}

export default function dateReducer (state = initialState, action) {
  switch (action.type) {
    case 'DATE_CHANGE':
      return Object.assign({}, state, action.payload)
  }

  return state
}