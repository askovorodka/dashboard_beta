const initialState = {
  lang: '',
  steam_status: ''
}

export default function langChange (state = initialState, action) {
  switch (action.type) {
    case 'LANG_CHANGE':
      return Object.assign({}, state, {lang: action.payload})
    case 'GET_STEAM_STATUS_FULFILLED':
      return Object.assign({}, state, {steam_status: action.payload})

  }
  return state
}