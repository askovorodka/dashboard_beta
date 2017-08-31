import { Link } from 'react-router'
import { connect } from 'react-redux'
import * as Actions from './actions.js'
import { bindActionCreators } from 'redux'

import './index.scss'

class FeedBack extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			textValue: '',
			formSuccess: false
		}
	}
	textChange(e){
		this.setState({
			textValue: e.target.value
		});
	}
	sendForm(){
		if(!this.props.feedback.isSending){
			this.props.actions.sendFeedback(this.props.token, this.state.textValue)
			console.log(this.props)
			this.setState({
				textValue: '',
			});
		}
	}

	render() {

		const feedback = this.props.feedback
		let textBtn = 'Отправить'
		if(feedback.isSending) textBtn = 'Отправляется'
		if(feedback.formSuccess) textBtn = 'Отправлено'

		return (
			<div className="fB">
				<textarea 
					placeholder="Опиши проблему" 
					value={this.state.textValue} 
					onChange={this.textChange.bind(this)}
				/>
				<div className="fB_resRow">
					<button className="btn btn-orange" onClick={this.sendForm.bind(this)}>{textBtn}</button>
					<div className={"fB_resRow_mess fB_resRow_mess-"+feedback.formSuccess}>
						<div className="fB_resRow_mess_ic"></div>
						<div>Ваше сообщение отправлено</div>
					</div>
				</div>
				<br />
				<div className="fB_error">{feedback.errorMsg}</div>
			</div>
		);
	}
}

export default connect(
	state => ({ 
		feedback : state.feedback
	}),
	dispatch => ({ actions: bindActionCreators(Actions, dispatch) })  
)(FeedBack)