import i18n from '../../i18n';
import { connect } from 'react-redux'
import * as Actions from './actions'
import { bindActionCreators } from 'redux'
import {logoutAndRedirect} from '../auth/actions';
import './index.scss';


class Header extends React.Component {

	shouldComponentUpdate(nextProps, nextState) {
		return (nextProps.name != this.props.name || nextProps.lang !== this.props.lang) ? true : false
	}

	toggleLng = (lng) => {
		this.props.actions.changeLang(lng)
		i18n.changeLanguage(lng)
	}

    componentDidMount(){
        this.props.actions.getSteamStatus();
	}

	render() {

		return (
			<div className="head">
				<div className="head_wrap">
					<div className="head_logo">
						<svg version="1.1" xmlns="http://www.w3.org/2000/svg"	viewBox="0 0 171.1 46.9">
							<path className="st0" d="M73.9,38.8h27.8l8.9,8.2V0L73.9,38.8z M101.4,31.2h-9.1l9.1-10V31.2z"/>
							<polyline className="st1" points="110.5,28.7 101.4,21.2 110.6,0 110.5,28.7 		"/>
							<polyline className="st1" points="73.9,38.8 110.6,28.7 101.6,38.8 73.9,38.8 		"/>
							<path className="st2" d="M128.6,18.9l-0.2,4.9h-0.9c-3.4,0-5.3,1.8-5.3,5.8v4.8h-4.9V19h4.9V22c1.1-1.8,2.8-3.2,5.3-3.2C128,18.8,128.3,18.8,128.6,18.9z"/>
							<path className="st2" d="M145.1,28h-11.3c0.4,1.8,1.7,3,3.3,3c1.1,0,2.5-0.3,3.3-1.8l4.4,0.9c-1.3,3.3-4.1,4.8-7.6,4.8c-4.4,0-8.1-3.3-8.1-8.2c0-4.8,3.7-8.2,8.2-8.2c4.4,0,7.9,3.1,7.9,8.2V28z M133.9,25h6.3c-0.5-1.7-1.7-2.4-3.1-2.4C135.8,22.5,134.4,23.4,133.9,25z"/>
							<path className="st2" d="M163.2,34.4h-4.9v-1.2c-1.2,1.1-2.8,1.7-4.8,1.7c-4.1,0-7.5-3.3-7.5-8.2c0-4.8,3.4-8.2,7.5-8.2c2,0,3.6,0.6,4.8,1.7V19h4.9V34.4z M158.3,26.7c0-2.4-1.8-4-3.8-4c-2.1,0-3.7,1.6-3.7,4c0,2.4,1.6,4,3.7,4C156.5,30.7,158.3,29.1,158.3,26.7z"/>
							<path className="st2" d="M166.2,34.4V12.3h4.9v22.1H166.2z"/>
							<path className="st2" d="M4.8,29.5c0.2,1.3,1.4,1.8,2.7,1.8c1.3,0,2-0.6,2-1.2c0-0.5-0.4-0.9-1.5-1.1l-3.1-0.6c-2.8-0.5-4.5-2-4.5-4.5c0-3.1,2.7-5.2,6.6-5.2c3.8,0,6.4,1.7,7,4.4l-4.5,0.9c-0.2-0.9-1.1-1.8-2.6-1.8c-1.3,0-1.7,0.6-1.7,1.2c0,0.4,0.2,0.9,1.2,1.1l3.6,0.7c2.9,0.6,4.2,2.4,4.2,4.6c0,3.4-2.9,5.2-7,5.2c-3.6,0-6.7-1.3-7.2-4.5L4.8,29.5z"/>
							<path className="st2" d="M26.9,34.5l-5-5.5h-0.9v5.5h-4.9v-22h4.9v11.9h0.7l4.9-5.2h5.9l-6.7,7.3l7.4,8H26.9z"/>
							<path className="st2" d="M39.8,14.6c0,1.6-1.2,2.7-2.8,2.7c-1.7,0-2.8-1.2-2.8-2.7c0-1.5,1.2-2.8,2.8-2.8C38.6,11.8,39.8,13.1,39.8,14.6z M34.5,34.5V19.1h4.9v15.3H34.5z"/>
							<path className="st2" d="M58.1,25v9.4h-4.9v-8.4c0-1.8-1.1-3-2.6-3c-1.9,0-3.2,1.3-3.2,4.3v7.1h-4.9V19.1h4.9v1.5c1.2-1.2,2.8-1.9,4.7-1.9C55.8,18.7,58.1,21.2,58.1,25z"/>
							<path className="st2" d="M64.6,29.5c0.2,1.3,1.4,1.8,2.7,1.8c1.3,0,2-0.6,2-1.2c0-0.5-0.4-0.9-1.5-1.1l-3.1-0.6c-2.8-0.5-4.5-2-4.5-4.5c0-3.1,2.7-5.2,6.6-5.2c3.8,0,6.4,1.7,7,4.4l-4.5,0.9c-0.2-0.9-1.1-1.8-2.6-1.8c-1.3,0-1.7,0.6-1.7,1.2c0,0.4,0.2,0.9,1.2,1.1l3.6,0.7c2.9,0.6,4.2,2.4,4.2,4.6c0,3.4-2.9,5.2-7,5.2c-3.6,0-6.7-1.3-7.2-4.5L64.6,29.5z"/>
						</svg>
					</div>
					<div>
						<div className="head_lang">
							<div onClick={() => this.toggleLng('ru')} className={(i18n.language === 'ru') && 'head_lang-disable'}>RU</div>
        					<div onClick={() => this.toggleLng('en')} className={(i18n.language === 'en') && 'head_lang-disable'}>EN</div>
							<div onClick={() => this.toggleLng('cn')} className={(i18n.language === 'cn') && 'head_lang-disable'}>CN</div>
						</div>
						<div className="head_steam">
							<div className={"head_steam_circle head_steam_circle-" + this.props.lang.steam_status.status}></div>
							<div className="head_steam_text" title={this.props.lang.steam_status.message}>{this.props.lang.steam_status.message}</div>
						</div>
						<div className="head_user">
							<div className="head_user_ic">
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
							<div className="head_user_name">{this.props.name}</div>
							<div className="head_user_logout" onClick={this.props.logout}></div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(
  state => ({ lang: state.lang, steam_status: state.steam_status }),
  dispatch => ({
	  actions: bindActionCreators(Actions, dispatch),
      logout: () => {
          dispatch(logoutAndRedirect())
      }
  })
)(Header)