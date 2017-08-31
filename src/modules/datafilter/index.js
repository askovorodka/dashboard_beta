import { connect } from 'react-redux'
import DatePicker from 'react-datepicker'
import moment_ru from 'moment/locale/ru.js'
import { translate } from 'react-i18next'
import * as Actions from './actions';
import { bindActionCreators } from 'redux'

import './index.scss'
import 'react-datepicker/dist/react-datepicker.css'

moment.updateLocale('ru', moment_ru);

class DataFilter extends React.Component{
	constructor() {
		super();
		this.state = {
			open: false,
		}
	}

	componentWillMount() {
		this.setState({
			startDate: this.props.date.startDate, 
  		finishDate: this.props.date.finishDate
		})
	}
	openDate() {
		this.setState({open: true})
	}
	saveDate() {
		this.setState({open: false})
		this.props.actions.changeDate({
			startDate: this.state.startDate,
			finishDate: this.state.finishDate
		})
	}
	chageMyDate(parStart, parFinish) {
		this.setState({
			open: !this.state.open,
			startDate: parStart,
			finishDate: parFinish
		})
		this.props.actions.changeDate({
      startDate: parStart,
			finishDate: parFinish
    });
	}
	changeDate(data, e) {
    this.setState(
    	{[data+'Date']: e}
    )
	}
  setMyDate (period) {
    const parStart = moment().set({hour:0,minute:0,second:0,millisecond:0});
    const parFinish = moment().set({hour:23,minute:59,second:59,millisecond:0});
  	switch (period){
  		case 'month':
  			this.chageMyDate(parStart.subtract(1, 'months'), parFinish)
  			break;
  		case 'week':
  			this.chageMyDate(parStart.subtract(7, 'days'), parFinish)
  			break;
  		case 'yesterday':
  			this.chageMyDate(parStart.subtract(1, 'days'), parFinish.subtract(1, 'days'))
  			break;
  		case 'today':
  			this.chageMyDate(parStart, parFinish)
  			break;
  	}
  }

	render() {	
		const {t} = this.props
		const {startDate, finishDate} = this.state
    const startUserDate = startDate.format("DD MMM YYYY").replace('.', '');
    const finishUserDate = finishDate.format("DD MMM YYYY").replace('.', '');

		return (
			<div className="dateFilter" >
				<div className={"dateFilter_res dateFilter_res-"+this.state.open} onClick={this.openDate.bind(this)}>
					{startUserDate} - {finishUserDate}
				</div>
				<div className={"dateFilter_chang dateFilter_chang-"+this.state.open}>
					<div className="dateFilter_chang_save btn btn-orange" onClick={this.saveDate.bind(this)}>{t('save')}</div>
					<div className="dateFilter_chang_dates">
						<DatePicker
			        selected={startDate}
			        dateFormat="DD/MM/YYYY"
			        onChange={this.changeDate.bind(this, 'start')} />
			      <DatePicker
			        selected={finishDate}
			        dateFormat="DD/MM/YYYY"
			        onChange={this.changeDate.bind(this, 'finish')} />
					</div>
					<div className="dateFilter_chang_period">
						<div onClick={() => this.setMyDate('month')}>{t('dates.month')}</div>
						<div onClick={() => this.setMyDate('week')}>{t('dates.week')}</div>
						<div onClick={() => this.setMyDate('yesterday')}>{t('dates.yesterday')}</div>
						<div onClick={() => this.setMyDate('today')}>{t('dates.today')}</div>
					</div>
				</div>
			</div>
		)
	}
}

export default connect(
  state => ({ date: state.date }),
  dispatch => ({actions: bindActionCreators(Actions, dispatch)})
)(translate(['common'])(DataFilter))