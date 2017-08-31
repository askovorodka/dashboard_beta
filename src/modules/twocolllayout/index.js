import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { translate } from 'react-i18next'
import './index.scss'

class TwoCollLayout extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {

		const childrenWithProps = React.Children.map(this.props.children, (child) => (
  			React.cloneElement(child, {token: this.props.token})
  		))

		const path = this.props.path

		const menu = (path == '/faq' || path == '/contacts' || path == '/feedback') ? { 
					'faq': 'FAQ', 
					'contacts': this.props.t('contacts')
				} : { 
					'conclusion': this.props.t('transfer'),
					'pay-history': this.props.t('transfer_history')
				}

		return (
			<div className="tLt">
				<div className="tLt_menu">
					<ul>
						{Object.keys(menu).map( (key, index) => (
							<li key={index}><NavLink to={"/"+key} className="tLt_menu_a" activeClassName="tLt_menu_a-active">{menu[key]}</NavLink></li>
						))}
		      </ul>
				</div>
				<div className="tLt_body">
					<div className="tLt_body_title"><NavLink to="/faq" className="tLt_menu_a" activeClassName="tLt_menu_a-active">FAQ</NavLink></div>
					{childrenWithProps}
				</div>
			</div>
		);
	}
}

export default connect(
    state => ({
        twocollLayout : state.twocollLayout
    }),
)(translate(['common'])(TwoCollLayout))