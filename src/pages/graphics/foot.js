import Loader from '../../modules/loader'

import {connect} from 'react-redux'
import { translate } from 'react-i18next'
import './index.scss'

class GraphicsFoot extends React.Component {
  
	render() {
		const gr = this.props.graphics
		const cur = (gr.currency === 'RUB') ? 'Р' : '$'
		if(gr.ready && gr.items.length > 0) {

			let dohod = 0,
					check = 0,
					users = 0;

			for (var i = 0; i < gr.items.length; i++) {
				dohod += parseInt(gr.items[i].sum_value);
				check += parseInt(gr.items[i].average_check);
				users += parseInt(gr.items[i].unique_users);
			}

			return (
				<div className="graph_foot">
					<div className="graph_ind">
						<div className="graph_ind_pers graph_ind_pers_income"></div>
						<div>
							<div className="graph_ind_name">{this.props.t('income')}</div>
							<div className="graph_ind_val"><NumberFormat value={dohod} displayType={'text'} thousandSeparator={' '}  /> {cur}</div>
						</div>
					</div>
					<div className="graph_ind">
						<div className="graph_ind_pers graph_ind_pers_average_ckeck"></div>
						<div>
							<div className="graph_ind_name">{this.props.t('average_check')}</div>
							<div className="graph_ind_val"><NumberFormat value={check} displayType={'text'} thousandSeparator={' '}  /> {cur}</div>
						</div>
					</div>
					<div className="graph_ind">
						<div className="graph_ind_pers graph_ind_pers_uniq_users"></div>
						<div>
							<div className="graph_ind_name">{this.props.t('unique_users')}</div>
							<div className="graph_ind_val"><NumberFormat value={users} displayType={'text'} thousandSeparator={' '}  /> </div>
						</div>
					</div>
				</div>
			)		
		}
		else{
			return null
		}
	}

}

export default connect(
	state => ({
		graphics: state.graphics
	})
)(translate(['graphics'])(GraphicsFoot))
