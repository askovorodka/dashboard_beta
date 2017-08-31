export function changeDate(newDate) {
  return dispatch => {
    dispatch({
      type: 'DATE_CHANGE',
      payload: newDate
    })
  }
}