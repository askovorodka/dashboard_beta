import { NavLink } from 'react-router-dom'
import { translate } from 'react-i18next'
import './index.scss'

class BodyMenu extends React.Component{
	render() {
		const { t } = this.props
		return (
			<div>
			<ul className="bodyMenu">
				<li><NavLink to="/" className="bodyMenu_a" exact activeClassName="bodyMenu_a-active">{t('menu.statistics')}</NavLink></li>
				<li><NavLink to="/transactions" className="bodyMenu_a" activeClassName="bodyMenu_a-active">{t('menu.transactions')}</NavLink></li>
				<li><NavLink to="/graphics" className="bodyMenu_a" activeClassName="bodyMenu_a-active">{t('menu.graphics')}</NavLink></li>
				<li><NavLink to="/reports" className="bodyMenu_a" activeClassName="bodyMenu_a-active">{t('menu.reports')}</NavLink></li>
			</ul>
			</div>
		);
	}
}

export default translate(['common'])(BodyMenu)