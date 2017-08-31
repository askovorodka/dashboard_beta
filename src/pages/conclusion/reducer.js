const initialState = {
	errorMsg: '',
	formSuccess: false,
	isSending: false,
}

export default function feedback(state = initialState, action){
  switch(action.type){

    case 'CONCLUSION_SEND_PENDING':
      return Object.assign({}, state, {
        isSending: true
      });
    case 'CONCLUSION_SEND_FULFILLED':
      if(action.payload.status == 'fail') {
        return Object.assign({}, state, {
          isSending: false,
          textValue: '',
          errorMsg: action.payload.message
        });
      }
      else{
        return Object.assign({}, state, {
          isSending: false,
          formSuccess: true,
          textValue: '',
          errorMsg: ''
        });
      }
    case 'CONCLUSION_SEND_REJECTED':
      return Object.assign({}, state, {
        isSending: false, 
        errorMsg: 'Ошибка сервера, попробуйте отправить позже'
      });

    default:
      return state;
  }
}