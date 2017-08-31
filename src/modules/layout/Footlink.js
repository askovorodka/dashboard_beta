import { NavLink } from 'react-router-dom'
import { translate } from 'react-i18next'
import createBrowserHistory from 'history/createBrowserHistory'

class FootLink extends React.Component {

	render() {
		const {t} = this.props
		const pathname = createBrowserHistory().location.pathname

		const fLink = 
			(pathname == '/faq' || pathname == '/contacts') ? <NavLink to="/feedback" activeClassName="active">{t('report problem')}</NavLink> 
			: (pathname == '/feedback') ? null 
			: <NavLink to="/faq" className="tLt_menu_a" activeClassName="active">{t('support center')}</NavLink>

		return fLink
	}

}

export default translate(['common'])(FootLink)