import * as Actions from './actions'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import Loader from '../../modules/loader'
import './index.scss'

class payHistory extends React.Component {

	dateFor(date) {
		return {
			date_from: date.startDate.format(), 
			date_to: date.finishDate.format()
		}
	}

	getPayHistory(date) {
		this.props.actions.getPayHistory(this.props.token, this.dateFor(date));
	}

	componentDidMount() {
		this.getPayHistory(this.props.date)
	}

	shouldComponentUpdate(nextProps, nextState) {
		if(!moment(nextProps.date.startDate).isSame(this.props.date.startDate) 
			|| !moment(nextProps.date.finishDate).isSame(this.props.date.finishDate)){
			this.getStats(nextProps.date)
		}
		return (nextProps.payhistory !== this.props.payhistory
		) ?  true : false;		
	}

	dateFormat(d){
		return moment(d).format("DD MMM YYYY").replace('.', '')
	}

	render () {

		const payhistory = this.props.payhistory;
		const status = (st) =>
			(st == 'new') ? 'новый' :
			(st == 'pending') ? 'в обработке' :
			(st == 'competed') ? 'выполнен' :
			(st == 'reject') ? 'отклонен' : null

		if (payhistory.isLoading) {
			return (
				<Loader />
			)
		}
		else{

			const its = payhistory.data.map((it) => 
				<div className="pHistory_i" key={it.id}>
					<div className="pHistory_i_id"><span className="gray">ID</span> {it.id}</div>
					<div className="pHistory_i_date"><span className="gray">{this.dateFormat(it.created)}</span></div>
					<div className="pHistory_i_price"><NumberFormat value={parseFloat(it.amount)} displayType='text'  thousandSeparator={' '} prefix={'$'} suffix={'Р'} /></div>
					<div className={"pHistory_i_status pHistory_i_status-"+it.status}>{status(it.status)}</div>
				</div>
			)

			return (
				<div className="pHistory">
					{its}
				</div>
			)
		}
	}
}

export default connect(
	state => ({payhistory : state.payhistory, date: state.date}),
	dispatch => ({ 
		actions: bindActionCreators(Actions, dispatch), 
	})
)(payHistory)