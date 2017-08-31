import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from './actions'
import { translate } from 'react-i18next'

class Group extends React.Component{


	changeGraphGroup(period){
		this.props.actions.changeGraphGroup(period)
	}

	render(){

		const period = this.props.chart.group_by
		const {t} = this.props

		if(Object.keys(this.props.chart.chart).length != 0){
			return (
				<div className="graph_group">
					<div className="graph_group_zag">{t('group by')}:</div>
					<div className="graph_group_its">
						<div className={(period == 'hour') ? 'active' : null} onClick={() => this.changeGraphGroup('hour')}>{t('dates.hour')}</div>
						<div className={(period == 'day') ? 'active' : null} onClick={() => this.changeGraphGroup('day')}>{t('dates.day')}</div>
						<div className={(period == 'month') ? 'active' : null} onClick={() => this.changeGraphGroup('month')}>{t('dates.month')}</div>
						<div className={(period == 'year') ? 'active' : null} onClick={() => this.changeGraphGroup('year')}>{t('dates.year')}</div>
					</div>
				</div>
			)
		}
		else {
			return null
		}
	}
}

export default connect(
	state => ({
		chart: state.graphics,
		lang: state.lang
	}),
	dispatch => ({
		actions: bindActionCreators(Actions, dispatch) 
	})
)(translate(['common'])(Group))