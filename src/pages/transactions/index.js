import { NavLink, Switch, Route } from 'react-router-dom'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from './actions'
import Loader from '../../modules/loader'
import Select from 'react-select';
// Be sure to include styles at some point, probably during your bootstrapping
import 'react-select/dist/react-select.css';
import { translate } from 'react-i18next'
import { Scrollbars } from 'react-custom-scrollbars';
import './index.scss'

class Transactions extends React.Component{
	constructor() {
		super();

		this.state = {
			offset: 0,
			clientHeight: 0,
			scrollHeight: 0,
			orderId: null,
			filterTipe1: true,
			filterTipe2: true,
			filterTipe3: true,
			filterPriceVal: '',
			filterCountItemsVal: '',
			priceSelect: '=',
			countItemsSelect: '=',
			filterParams: []
		}
	}
	buildAsArray(params) {
		const as = []
		if(params.filterTipe1) {as.push(1)}
		if(params.filterTipe2) {as.push(2)}
		if(params.filterTipe3) {as.push(3)}
		return as
	}
	shouldComponentUpdate(nextProps, nextState) {
		if(!moment(nextProps.date.startDate).isSame(this.props.date.startDate) 
			|| !moment(nextProps.date.finishDate).isSame(this.props.date.finishDate)
			){
			const as = this.buildAsArray(nextState)
			this.getTransactions(nextProps.date, nextState.offset, as)
		}
		if(nextState.filterTipe1 !== this.state.filterTipe1
			|| nextState.filterTipe2 !== this.state.filterTipe2
			|| nextState.filterTipe3 !== this.state.filterTipe3
		){
			const as = this.buildAsArray(nextState)
			this.getTransactions(nextProps.date, nextState.offset, as)
		}
		return (
			nextProps.transactions !== this.props.transactions
			|| this.state.orderId !== nextState.orderId
			|| this.state.filterTipe1 !== nextState.filterTipe1
			|| this.state.filterTipe2 !== nextState.filterTipe2
			|| this.state.filterTipe3 !== nextState.filterTipe3
			|| nextProps.lang !== this.props.lang
			|| nextState.priceSelect !== this.state.priceSelect
			|| nextState.countItemsSelect !== this.state.countItemsSelect
			|| nextState.filterPriceVal !== this.state.filterPriceVal
			|| nextState.filterCountItemsVal !== this.state.filterCountItemsVal
		) ?  true : false;		
	}

	dateFor(date) {
		return {
			date_from: date.startDate.format(), 
			date_to: date.finishDate.format()
		}
	}

	getTransactionsAgain() {
		if(!this.props.transactions.isLoadingAgain) {
			const {filterParams, offset} = this.state
			const as = this.buildAsArray(this.state)
			this.props.actions.getTransactions(this.props.token, this.dateFor(this.props.date), offset, undefined, as, filterParams)
			this.setState({
				offset: offset + 30
			})
		}
	}
	getTransactions(date, offset, activeStatuses) {
		const as = (activeStatuses) ? activeStatuses : undefined
		if(!this.props.transactions.isLoading) {
			this.props.actions.getTransactions(this.props.token, this.dateFor(date), 0, this.state.orderId, as)
			this.setState({
				offset: this.state.offset + 30
			})
		}
	}
	getTransactionsById = (order_id) => {
		let orderId;
		if (order_id !== undefined && order_id === 0) {
			orderId = order_id
			this.setState({
				orderId: 0
			})
		} else { orderId = this.state.orderId }

		if(!this.props.transactions.isLoading) {
			this.props.actions.getTransactions(this.props.token, this.dateFor(this.props.date), 0, orderId, this.buildAsArray(this.state))
			this.setState({
				offset: this.state.offset + 30
			})
		}
	}

	componentDidMount() {
		this.getTransactions(this.props.date, this.state.offset)
	}
	dateFormat(d){
		return moment(d).format("DD MMM YYYY H:mm:ss").replace('.', '')
	}
	itemStyle(st) {
		return {
			borderColor : (st == 'completed') ? '#67af55' :
			(st == 'error_inventory' || st == 'error_bot' || st == 'error_pushback') ? '#c01f36'
			: '#edb140' 
		}
	}

	declOfNum(number) {  
    	const cases = [2, 0, 1, 1, 1, 2];
    	return [this.props.t('items0'), this.props.t('items1'), this.props.t('items2')][ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
	}

	handleScrollStop(e) {
		if(this.state.clientHeight > (e.scrollHeight - e.scrollTop - 30)) {
			this.getTransactionsAgain()
		}
	}
	handleUpdate(e){
		this.setState({
			clientHeight: e.clientHeight,
			scrollHeight: e.scrollHeight
		})
	}

	filterTipeChange(e) {
    const t = e.target;
    this.setState({
      [t.name]: !this.state[t.name]
    });
  }

	changeSelect (name, val) {
		this.setState({
			[name]: val.value
		})
	}

	changeInpFilt (name, e) {
		this.setState({
			[name]: e.target.value
		})
	}

	filterAction (t) {
		const {
			filterPriceVal,
			filterCountItemsVal,
			priceSelect,
			countItemsSelect,
			orderId
		} = this.state
		if (t) {
			let filterParams = []
			if(filterPriceVal != ''){
				filterParams.push({'price' : priceSelect + filterPriceVal})
			}
			if(filterCountItemsVal != ''){
				filterParams.push({'countItems' : countItemsSelect + filterCountItemsVal})
			}
			if(filterParams.length > 0) {
				this.setState({
					filterParams: filterParams
				})
				this.props.actions.getTransactions(this.props.token, this.dateFor(this.props.date), 0, orderId, this.buildAsArray(this.state), filterParams)
			}
		}
		else{
			this.setState({
				filterParams: [],
				filterPriceVal: '',
				filterCountItemsVal: ''
			})
			this.props.actions.getTransactions(this.props.token, this.dateFor(this.props.date), 0, orderId, this.buildAsArray(this.state))
		}
	}

	render() {
		const {
			filterTipe1,
			filterTipe2,
			filterTipe3,
			orderId,
			priceSelect,
			countItemsSelect,
			filterPriceVal,
			filterCountItemsVal,
		} = this.state
		const {
			t,
			transactions
		} = this.props
		const filterHidden = (orderId > 0) ? 'trans_filter-hidden' : ''

		const search = (
			<div className="trans_search">
				<label className="trans_search_label">Order ID</label>
				<NumberFormat format="#########" value={this.state.orderId} onChange={(e, value) => {this.setState({orderId: value})}}/>
				<button className="btn btn-orange" onClick={this.getTransactionsById.bind(this)}>{t('to find')}</button>
				<button className="btn btn-orange" onClick={() => this.getTransactionsById(0)}>{t('clear')}</button>
			</div>
		)

		const filter = (
			<div className={`trans_filter ${filterHidden}`}>
				<div className="trans_filter_label">{t('by status')}:</div>
				<input type="checkbox" name="filterTipe1" id="tf_1" checked={filterTipe1} onChange={this.filterTipeChange.bind(this)}/>
				<label htmlFor="tf_1">{t('success')}</label>
				<input type="checkbox" name="filterTipe2" id="tf_2" checked={filterTipe2} onChange={this.filterTipeChange.bind(this)}/>
				<label htmlFor="tf_2">{t('not completed')}</label>
				<input type="checkbox" name="filterTipe3" id="tf_3" checked={filterTipe3} onChange={this.filterTipeChange.bind(this)}/>
				<label htmlFor="tf_3">{t('error')}</label>
			</div>
		)

		if (transactions.isLoading) {
			return (
				<div className="trans">
					{search}
					{filter}
					<div className="trans_count">{transactions.count} {t('transactions')}</div>
					<Loader />
				</div>
			)
		}
		else if(Object.keys(transactions.items).length != 0) {

			const price = (cur) => (cur === 'RUB') ? {suffix: 'Р'} : {prefix: '$'}

			const its = transactions.items.map((it) => 
				<NavLink key={it.id} className="trans_i" style={this.itemStyle(it.status)} to={'/transactions/' + it.id} >
					<div>
						<div className="trans_i_price"><NumberFormat {...price(it.currency)} value={parseFloat(it.value)} displayType='text'  thousandSeparator={' '} /></div>
						<div className="trans_i_date"><span className="gray">{this.dateFormat(it.created.date)}</span></div>
					</div>
					<div className="trans_i_count">{Object.keys(it.items).length} <span className="gray">{this.declOfNum(Object.keys(it.items).length)}</span></div>
					<div className="trans_i_id"><span className="gray">ID</span> {it.id}</div>
					<div className="trans_i_orderId"><span className="gray">ORDER ID</span>	{it.order_id}</div>
					<div className={"trans_i_status trans_i_status-"+it.status}></div>
				</NavLink>
			)
			const selectOptions = []
			const opt = ['=', '!=', '<', '>', '<=', '>=']
			opt.map((val) => {
				selectOptions.push({
					value: val,
					label: val
				})
			})

			return (
				<div className="trans">
					{search}
					{filter}
					<div className="trans_count">{transactions.count} {this.props.t('menu.transactions')}</div>
					<div className="trans_filterParams">
						<div>
							<input type="text" placeholder={t('by price')}
										 value={filterPriceVal} onChange={this.changeInpFilt.bind(this, 'filterPriceVal')}/>
							<Select
								name="priceSelect"
								value={priceSelect}
								options={selectOptions}
								clearable={false}
								onChange={this.changeSelect.bind(this, 'priceSelect')}
							/>
						</div>
						<div>
							<input type="text" placeholder={t('by count')}
										 value={filterCountItemsVal} onChange={this.changeInpFilt.bind(this, 'filterCountItemsVal')}/>
							<Select
								name="countItemsSelect"
								value={countItemsSelect}
								options={selectOptions}
								clearable={false}
								onChange={this.changeSelect.bind(this, 'countItemsSelect')}
							/>
						</div>
						<div></div>
						<div className="trans_filterParams_right">
							<button className="btn btn-orange" onClick={this.filterAction.bind(this, true)}>{t('to find')}</button>
						</div>
						<div className="trans_filterParams_right">
							<button className="btn btn-orange" onClick={this.filterAction.bind(this, false)}>{t('clear')}</button>
						</div>
					</div>
					<Scrollbars 
						onScrollFrame={this.handleScrollStop.bind(this)}
						onUpdate={this.handleUpdate.bind(this)}
						>
						<div className="trans_its">
							{its}
						</div>
					</Scrollbars>
				</div>
			)
		}
		else {
			return (
				<div className="trans">
					{search}
					<div className="trans_count">{transactions.count} транзакций</div>
					<div>Данные за текущий период отсутствуют. Пожалуйста, выберите другой период</div>
				</div>
			)
		}

		
	}
	componentWillUnmount() {
		this.props.actions.delTransactions()
	}
}

Transactions.propTypes = {
	transactions: React.PropTypes.shape({
    items: React.PropTypes.array,
    isLoading: React.PropTypes.bool
  })
};

export default connect(
	state => ({
		date: state.date,
		transactions: state.transactions,
		lang: state.lang
	}),
	dispatch => ({
		actions: bindActionCreators(Actions, dispatch) 
	})
	
)(translate(['common'])(Transactions))