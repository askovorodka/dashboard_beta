import { NavLink, Route } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import './index.scss'

import Header from '../header';
import DataFilter from '../datafilter'
import BodyMenu from '../bodymenu'
import Body from './bodycont'
import FootLink from './Footlink'

import { connect } from 'react-redux'
import {logoutAndRedirect} from '../auth/actions';
import { translate } from 'react-i18next'
import {getUserInfo} from './actions'

class Layout extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.getUserInfo()
	}

	getUserInfo() {this.props.getRealUserInfo(this.props.token)}
	
	render() {

		const user = this.props.layout.user;

		const name = user.integration_name;
		const balance = user.balance;
		const pathname = this.props.location.pathname
		const {t} = this.props

		const Filter = () => {
			if(pathname == '/' || pathname == '/transactions' || pathname == '/graphics'){
				return <DataFilter />
			}
			else{
				return <div className="lt_backBtn" onClick={this.props.history.goBack}></div>
			}
		}

		return (
			<div>
				<Header name={name}/>

				<div className="lt">

					<div className="lt_head">
						<div>
							<div className="lt_head_ic">
								<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.7 18.4">
									<path d="M16.6,14c-0.2-1.1-0.9-2.6-2-4c-0.6-0.9-1.9-2.3-3.4-2.9c0.1-0.1,0.1-0.3,0.2-0.4C11.9,6,12.5,5,12.4,3.8
										c0-0.7-0.3-1.4-0.7-2c-0.3-0.4-0.8-0.8-1.3-1.1C9.9,0.5,9.5,0.3,9.1,0.2C9,0.1,8.3-0.2,7.5,0.2l0,0C7.2,0.3,6.7,0.5,6.3,0.7
										C5.8,1,5.3,1.4,5,1.8c-0.5,0.6-0.7,1.3-0.7,2C4.2,5,4.8,6,5.1,6.7C5.2,6.9,5.3,7,5.4,7.1C3.9,7.7,2.6,9.2,2,10c-1,1.4-1.8,2.9-2,4
										c-0.1,0.7,0.1,1.5,0.6,2.1c0.7,0.8,1.8,1.4,3.4,1.8c1.3,0.3,2.9,0.5,4.3,0.5s3-0.2,4.3-0.5c1.6-0.4,2.7-1,3.4-1.8
										C16.6,15.5,16.8,14.8,16.6,14z M12.5,15.4C11.3,15.8,9.8,16,8.3,16s-3-0.2-4.2-0.6c-1.3-0.4-1.7-0.9-1.7-1c0.3-1.6,2.5-4.6,3.9-5
										c0.8-0.2,1.3-0.6,1.5-1.2c0.4-0.9-0.1-1.8-0.5-2.6C7,5,6.7,4.4,6.7,3.9c0-0.1,0-0.6,0.8-1c0.3-0.2,0.6-0.3,0.9-0.4
										c0.2,0.1,0.5,0.2,0.9,0.4C10,3.3,10,3.7,10,3.9C10,4.4,9.7,5,9.4,5.6C8.9,6.4,8.5,7.2,8.8,8.2c0.2,0.6,0.7,1,1.5,1.2
										c1.4,0.4,3.6,3.5,3.9,5C14.2,14.5,13.8,15,12.5,15.4z"/>
								</svg>
							</div>
							<div className="lt_head_user">
								<div className="lt_head_name">{name}</div>
								<div className="lt_head_id">id{user.id}</div>
							</div>
							<div className="lt_head_logout" onClick={this.props.logout}></div>
						</div>
						<div>
							<div className="lt_head_price"><NumberFormat value={balance.USD} displayType={'text'} thousandSeparator={' '} prefix={'$'} /> | <NumberFormat value={balance.RUB} displayType={'text'} thousandSeparator={' '} suffix={' Р'} /></div>
							<NavLink to="/conclusion" className="lt_head_btn btn btn-orange" activeClassName="active">{t('output')}</NavLink>
						</div>
					</div>

					<div className="lt_body">
						<div className="lt_body_head">
							<BodyMenu />
							<Filter />
						</div>

						<Body children={this.props.children} token={this.props.token}/>

					</div>

					<div className="lt_foot">
						<FootLink />
					</div>
				</div>
			</div>
		);
	}
}


export default connect(
  state => ({ layout: state.layout, token: state.auth.token }),

  dispatch => ({
  	getRealUserInfo: bindActionCreators(getUserInfo, dispatch), 
  	logout: () => {
  		dispatch(logoutAndRedirect())
  	}
  })
)(translate(['common'])(Layout))