import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from './actions'
import Loader from '../../modules/loader'
import { translate } from 'react-i18next'

class Legend extends React.Component {

	updateDataset(i) { 
		let c = this.props.chart.chart;
    let meta = c.getDatasetMeta(i);

    meta.hidden = meta.hidden === null? !c.data.datasets[i].hidden : null;

    c.update();

    this.props.actions.changeGraphData(c)
  }

	changeCur() {
		const {
			currency
		} = this.props.chart
		const curVal = (currency === 'RUB') ? 'USD' : 'RUB'
		this.props.actions.changeGraphCur(curVal)
	}

	render() {
		const {
			currency
		} = this.props.chart
		const curClass = (currency === 'RUB') ? 'graph_cur-rub' : 'graph_cur-usd'
		if(Object.keys(this.props.chart.chart).length != 0){
			let chart = this.props.chart.chart

			const its = chart.data.datasets.map((it, i) => {
				let style = {
		      color: it.borderColor
		    }
		    const hid = (chart.getDatasetMeta(i).hidden) ? 'graph_filter_it-hid' : '';
				return (
					<div key={i} className={"graph_filter_it "+hid} style={style} onClick={() => this.updateDataset(i)}>
						{this.props.t(it.label)}
					</div>
				)
			})
			return (
				<div>
					<div className="graph_filter">
						{its}
					</div>
					<div className={`graph_cur ${curClass}`} onClick={this.changeCur.bind(this)}>
						<div>RUB</div>
						<div>USD</div>
					</div>
				</div>
			)
		}
		else{
			return (
				<Loader />
			)
		}
	}
}

export default connect(
	state => ({
		chart: state.graphics,
	}),
	dispatch => ({
		actions: bindActionCreators(Actions, dispatch) 
	})
)(translate(['graphics'])(Legend))