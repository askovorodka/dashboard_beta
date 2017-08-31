const initialState = {
	errorMsg: '',
	formSuccess: false,
	isSending: false
}

export default function feedback(state = initialState, action){
  switch(action.type){

    case 'FEEDBACK_SEND_PENDING':
      return Object.assign({}, state, {
        isSending: true
      });
    case 'FEEDBACK_SEND_FULFILLED':
      return Object.assign({}, state, {
        isSending: false,
        formSuccess: true,
        textValue: '',
        errorMsg: ''
      });
    case 'FEEDBACK_SEND_REJECTED':
      return Object.assign({}, state, {
        isSending: false, 
        errorMsg: 'Ошибка сервера, попробуйте отправить позже'
      });

    default:
      return state;
  }
}