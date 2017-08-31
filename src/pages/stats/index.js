import * as Actions from './actions'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import Loader from '../../modules/loader'
import { Scrollbars } from 'react-custom-scrollbars'
import { translate } from 'react-i18next'
import './index.scss'

const DOTA_KEY = 'dota';
const CSGO_KEY = 'csgo';

function SubmenuItem(props) {
	return (
		<label onClick={props.handleClick} className={props.class}>{props.title}</label>
	)
}

function Submenu(props) {
	return (
		<div className="stats_i_label">
			<SubmenuItem handleClick={props.handleClickShowPayment} title={props.translator('payment')} class={props.showContent == 'payment' ? 'active' : ''}/>
			<SubmenuItem handleClick={props.handleClickShowUsers} title={props.translator('user_actions')}  class={props.showContent == 'users' ? 'active' : ''}/>
			<SubmenuItem handleClick={props.handleClickShowCsgo} title={props.translator(CSGO_KEY)} class={props.showContent == CSGO_KEY ? 'active' : ''}/>
			<SubmenuItem handleClick={props.handleClickShowDota} title={props.translator(DOTA_KEY)} class={props.showContent == DOTA_KEY ? 'active' : ''}/>
		</div>
    )
}

class Stats extends React.Component {

	constructor() {
		super();
		this.state = {
			showContent: 'payment',
		}

		this.handleClickShowPayment = this.handleClickShowPayment.bind(this);
		this.handleClickShowUsers = this.handleClickShowUsers.bind(this);
		this.handleClickShowCsgo = this.handleClickShowCsgo.bind(this);
		this.handleClickShowDota = this.handleClickShowDota.bind(this);

	}

	dateFor(date) {
		return {
			date_from: date.startDate.format(), 
			date_to: date.finishDate.format()
		}
	}

	getStats(parameters) {
		this.props.actions.getStats(this.props.token, this.dateFor(parameters));
	}

	componentDidMount() {
		this.getStats(this.props.date)
	}

	handleClickShowPayment(event){
		this.setState({
			showContent:'payment'
		})
	}

	handleClickShowUsers(event){
		this.setState({
			showContent:'users'
		})
	}

	handleClickShowCsgo(event){
		this.setState({
			showContent: CSGO_KEY
		})
	}

	handleClickShowDota(event){
		this.setState({
			showContent: DOTA_KEY
		})
	}

	shouldComponentUpdate(nextProps, nextState, nextContext) {
		if(!moment(nextProps.date.startDate).isSame(this.props.date.startDate) 
			|| !moment(nextProps.date.finishDate).isSame(this.props.date.finishDate)){
			this.getStats(nextProps.date)
		}

		return (nextProps.stats !== this.props.stats
		 || nextProps.lang !== this.props.lang
		 || nextState.showContent !== this.state.showContent
		) ?  true : false;		
	}

	// componentWillUnmount() {
	// 	this.props.delStats()
	// }

	render() {
		const stats = this.props.stats;
		let showContent;
		const {t} = this.props

        if (stats.isLoading) {
			return (
				<Loader />
			)
		}
		else{

            const suffix = (it) => {
				if(it) return <sup> {it}</sup>
				else return null
			}
			const dir = (persent) =>{
				if(persent > 0) return '+'
				else return null
			}

			const dataRUB = this.props.stats.data['RUB'];
			const dataUSD = this.props.stats.data['USD'];
			const statsRUB = this.props.stats.data['BY_STATUSES']['RUB'];
			const statsUSD = this.props.stats.data['BY_STATUSES']['USD'];
			const CSGO_STATS = this.props.stats.data[CSGO_KEY];
            const DOTA_STATS = this.props.stats.data[DOTA_KEY];

            if (this.state.showContent == CSGO_KEY)
			{
                if (typeof CSGO_STATS['RUB'] == 'undefined') {
                    CSGO_STATS['RUB'] = {sum_value:0, unique_users:0, average_check:0};
                }
                if (typeof CSGO_STATS['USD'] == 'undefined') {
                    CSGO_STATS['USD'] = {sum_value:0, unique_users:0, average_check:0};
                }

                showContent = (
					<div className="stats">
						<div className="stats_i">
							<div className="stats_i_name">{t('credited')}</div>
							<div className="stats_i_count"><NumberFormat value={CSGO_STATS['RUB'].sum_value} displayType={'text'} thousandSeparator={' '}  /> {suffix('Р')}</div>
							<div className="stats_i_percent stats_i_percent-true">+15%</div>
						</div>
						<div className="stats_i">
							<div className="stats_i_name">{t('the man paid')}</div>
							<div className="stats_i_count"><NumberFormat value={CSGO_STATS['RUB'].unique_users} displayType={'text'} thousandSeparator={' '}  /> {suffix(false)}</div>
							<div className="stats_i_percent stats_i_percent-false">-15%</div>
						</div>
						<div className="stats_i">
							<div className="stats_i_name">{t('average check')}</div>
							<div className="stats_i_count"><NumberFormat value={CSGO_STATS['RUB'].average_check} displayType={'text'} thousandSeparator={' '}  /> {suffix('Р')}</div>
							<div className="stats_i_percent stats_i_percent-true">+15%</div>
						</div>

						<div className="stats_i">
							<div className="stats_i_name">{t('credited')}</div>
							<div className="stats_i_count"><NumberFormat value={CSGO_STATS['USD'].sum_value} displayType={'text'} thousandSeparator={' '}  /> {suffix('$')}</div>
							<div className="stats_i_percent stats_i_percent-true">+15%</div>
						</div>
						<div className="stats_i">
							<div className="stats_i_name">{t('the man paid')}</div>
							<div className="stats_i_count"><NumberFormat value={CSGO_STATS['USD'].unique_users} displayType={'text'} thousandSeparator={' '}  /> {suffix(false)}</div>
							<div className="stats_i_percent stats_i_percent-false">-15%</div>
						</div>
						<div className="stats_i">
							<div className="stats_i_name">{t('average check')}</div>
							<div className="stats_i_count"><NumberFormat value={CSGO_STATS['USD'].average_check} displayType={'text'} thousandSeparator={' '}  /> {suffix('$')}</div>
							<div className="stats_i_percent stats_i_percent-true">+15%</div>
						</div>
					</div>
				)
			}

			if (this.state.showContent == DOTA_KEY)
			{
				if (typeof DOTA_STATS['RUB'] == 'undefined') {
					DOTA_STATS['RUB'] = {sum_value:0, unique_users:0, average_check:0};
				}
                if (typeof DOTA_STATS['USD'] == 'undefined') {
                    DOTA_STATS['USD'] = {sum_value:0, unique_users:0, average_check:0};
                }

				showContent = (
					<div className="stats">
						<div className="stats_i">
							<div className="stats_i_name">{t('credited')}</div>
							<div className="stats_i_count"><NumberFormat value={DOTA_STATS['RUB'].sum_value} displayType={'text'} thousandSeparator={' '}  /> {suffix('Р')}</div>
							<div className="stats_i_percent stats_i_percent-true">+15%</div>
						</div>
						<div className="stats_i">
							<div className="stats_i_name">{t('the man paid')}</div>
							<div className="stats_i_count"><NumberFormat value={DOTA_STATS['RUB'].unique_users} displayType={'text'} thousandSeparator={' '}  /> {suffix(false)}</div>
							<div className="stats_i_percent stats_i_percent-false">-15%</div>
						</div>
						<div className="stats_i">
							<div className="stats_i_name">{t('average check')}</div>
							<div className="stats_i_count"><NumberFormat value={DOTA_STATS['RUB'].average_check} displayType={'text'} thousandSeparator={' '}  /> {suffix('Р')}</div>
							<div className="stats_i_percent stats_i_percent-true">+15%</div>
						</div>

						<div className="stats_i">
							<div className="stats_i_name">{t('credited')}</div>
							<div className="stats_i_count"><NumberFormat value={DOTA_STATS['USD'].sum_value} displayType={'text'} thousandSeparator={' '}  /> {suffix('$')}</div>
							<div className="stats_i_percent stats_i_percent-true">+15%</div>
						</div>
						<div className="stats_i">
							<div className="stats_i_name">{t('the man paid')}</div>
							<div className="stats_i_count"><NumberFormat value={DOTA_STATS['USD'].unique_users} displayType={'text'} thousandSeparator={' '}  /> {suffix(false)}</div>
							<div className="stats_i_percent stats_i_percent-false">-15%</div>
						</div>
						<div className="stats_i">
							<div className="stats_i_name">{t('average check')}</div>
							<div className="stats_i_count"><NumberFormat value={DOTA_STATS['USD'].average_check} displayType={'text'} thousandSeparator={' '}  /> {suffix('$')}</div>
							<div className="stats_i_percent stats_i_percent-true">+15%</div>
						</div>
					</div>
				)
			}

			if (this.state.showContent == 'payment')
			{
				showContent = (
					<div className="stats">
						<div className="stats_i">
							<div className="stats_i_name">{t('credited')}</div>
							<div className="stats_i_count"><NumberFormat value={dataRUB.sum_value} displayType={'text'} thousandSeparator={' '}  /> {suffix('Р')}</div>
							<div className="stats_i_percent stats_i_percent-true">+15%</div>
						</div>
						<div className="stats_i">
							<div className="stats_i_name">{t('the man paid')}</div>
							<div className="stats_i_count"><NumberFormat value={dataRUB.unique_users} displayType={'text'} thousandSeparator={' '}  /> {suffix(false)}</div>
							<div className="stats_i_percent stats_i_percent-false">-15%</div>
						</div>
						<div className="stats_i">
							<div className="stats_i_name">{t('average check')}</div>
							<div className="stats_i_count"><NumberFormat value={dataRUB.average_check} displayType={'text'} thousandSeparator={' '}  /> {suffix('Р')}</div>
							<div className="stats_i_percent stats_i_percent-true">+15%</div>
						</div>
						<div className="stats_i">
							<div className="stats_i_name">{t('credited')}</div>
							<div className="stats_i_count"><NumberFormat value={dataUSD.sum_value} displayType={'text'} thousandSeparator={' '}  /> {suffix('$')}</div>
							<div className="stats_i_percent stats_i_percent-true">+15%</div>
						</div>
						<div className="stats_i">
							<div className="stats_i_name">{t('the man paid')}</div>
							<div className="stats_i_count"><NumberFormat value={dataUSD.unique_users} displayType={'text'} thousandSeparator={' '}  /> {suffix(false)}</div>
							<div className="stats_i_percent stats_i_percent-false">-15%</div>
						</div>
						<div className="stats_i">
							<div className="stats_i_name">{t('average check')}</div>
							<div className="stats_i_count"><NumberFormat value={dataUSD.average_check} displayType={'text'} thousandSeparator={' '}  /> {suffix('$')}</div>
							<div className="stats_i_percent stats_i_percent-true">+15%</div>
						</div>
					</div>

                )
			}

			if (this.state.showContent == 'users')
			{
				let successRUB = 0,
					waitingRUB = 0,
					failedRUB = 0,
					successUSD = 0,
                    waitingUSD = 0,
                    failedUSD = 0;

				if (statsRUB.all_count > 0)
				{
                    successRUB = statsRUB.success_count * 100 / statsRUB.all_count;
                    waitingRUB = statsRUB.wait_count * 100 / statsRUB.all_count;
                    failedRUB = statsRUB.fail_count * 100 / statsRUB.all_count;
                    successRUB = successRUB.toFixed(0);
                    waitingRUB = waitingRUB.toFixed(0);
                    failedRUB = failedRUB.toFixed(0);
				}

                if (statsUSD.all_count > 0)
                {
                    successUSD = statsUSD.success_count * 100 / statsUSD.all_count;
                    waitingUSD = statsUSD.wait_count * 100 / statsUSD.all_count;
                    failedUSD = statsUSD.fail_count * 100 / statsUSD.all_count;
                    successUSD = successUSD.toFixed(0);
                    waitingUSD = waitingUSD.toFixed(0);
                    failedUSD = failedUSD.toFixed(0);
                }

                showContent = (
					<div className="stats">

						<div className="stats_i success">
							<div className="stats_i_name">{t('success')}, Р</div>
							<div className="stats_i_count">{successRUB} % </div>
							<div className="stats_i_percent stats_i_percent-true">+15%</div>
						</div>

						<div className="stats_i waiting">
							<div className="stats_i_name">{t('waiting')}, Р</div>
							<div className="stats_i_count">{waitingRUB} %</div>
							<div className="stats_i_percent stats_i_percent-true">+15%</div>
						</div>

						<div className="stats_i failed">
							<div className="stats_i_name">{t('failed')}, Р</div>
							<div className="stats_i_count">{failedRUB} %</div>
							<div className="stats_i_percent stats_i_percent-true">+15%</div>
						</div>


						<div className="stats_i success">
							<div className="stats_i_name">{t('success')}, $</div>
							<div className="stats_i_count">{successUSD} %</div>
							<div className="stats_i_percent stats_i_percent-true">+15%</div>
						</div>

						<div className="stats_i waiting">
							<div className="stats_i_name">{t('waiting')}, $</div>
							<div className="stats_i_count">{waitingUSD} %</div>
							<div className="stats_i_percent stats_i_percent-true">+15%</div>
						</div>

						<div className="stats_i failed">
							<div className="stats_i_name">{t('failed')}, $</div>
							<div className="stats_i_count">{failedUSD} %</div>
							<div className="stats_i_percent stats_i_percent-true">+15%</div>
						</div>

					</div>
				)

			}

            return (
				<Scrollbars>
					<div className="stats_i_label">
						<Submenu
							handleClickShowPayment={this.handleClickShowPayment}
							handleClickShowUsers={this.handleClickShowUsers}
							handleClickShowCsgo={this.handleClickShowCsgo}
							handleClickShowDota={this.handleClickShowDota}
							showContent={this.state.showContent}
							translator={t}
						/>
					</div>

					{showContent}

				</Scrollbars>
			)
		}	
	}
}


export default connect(
	state => ({
		stats : state.stats,
		date: state.date,
		lang: state.lang,
		showContent: state.showContent,
	}),
	dispatch => ({ 
		actions: bindActionCreators(Actions, dispatch), 
	})
)(translate(['stats'])(Stats))