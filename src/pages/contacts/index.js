import { Link } from 'react-router'

import './index.scss'

export default class Contacts extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="contacts">
				<div className="contacts_phone">+7 (999) 255 17 85</div>
				<div className="contacts_email">chief.support@cases4real.com</div>
			</div>
		);
	}
}