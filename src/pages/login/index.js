import './index.scss';

import { loginUser } from '../../modules/auth/actions'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'

class Login extends React.Component {
	constructor() {
		super();
		// const redirectRoute = this.props.location.query.next || '/login';
		this.state = {
			// username: 'admin',
			// password: '123123',
			username: '',
			password: '',
			redirectTo: '/',
			redirectToReferrer: false
		}
	}
	componentDidMount() {
		
	}
	changeInput(e) {
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	login(e) {
		e.preventDefault();
    this.props.loginUser(this.state.username, this.state.password, this.state.redirectTo);
	}
	render() {

		const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state

    if (this.props.isAuthenticated) {
      return (
        <Redirect to={from}/>
      )
    }

		return (
			<div className="login">
				<div className="login_big">
					<input 
						onChange={this.changeInput.bind(this)} 
						name="username" 
						id="log" 
						type="text" 
						defaultValue={this.state.username}
						autoComplete="off"/>
					<label className={(this.state.username != '') ? 'mini' : ''} htmlFor="log">LOGIN</label>
				</div>
				<div className="login_big">
					<input 
						onChange={this.changeInput.bind(this)} 
						name="password" 
						id="pass" 
						type="password" 
						defaultValue={this.state.password}
						autoComplete="off"/>
					<label className={(this.state.password != '') ? 'mini' : ''} htmlFor="pass">PASSWORD</label>
				</div>
				<div className="error">{this.props.statusText}</div>
				<button onClick={this.login.bind(this)} className="btn btn-orange">Войти</button>
			</div>
		);
	}
}


export default connect(
	state => ({ 
		isAuthenticated : state.auth.isAuthenticated,
		statusText: state.auth.statusText
	}),
	dispatch => ({ loginUser: bindActionCreators(loginUser, dispatch) })  
)(Login)