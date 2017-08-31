import { NavLink, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Loader from '../../modules/loader'
import * as Actions from './actions'
import { Scrollbars } from 'react-custom-scrollbars'
import DatePicker from 'react-datepicker'
import {originDomain} from '../../config'
import {reportFilePrefix} from '../../config'
import { translate } from 'react-i18next'
import './index.scss'
import moment from 'moment'

function StatusItem(props) {
    return <option value={props.value}>{props.text}</option>;
}

const statuses = [
    {value : 'all', text: 'All'},
    {value : 'new', text: 'New'},
    {value : 'completed', text: 'Completed'},
    {value : 'pending', text: 'Pending'},
    {value : 'error_bot', text: 'Error bot'},
    {value : 'error_inventory', text: 'Error inventory'},
    {value : 'sending_trade', text: 'Sending trade'},
    ];
class StatusComponent extends React.Component{
    constructor(){
        super();
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event){
        return this.props.handleChange(event.target.value);
    }
    render(){
        const items = statuses.map((status) => <StatusItem key={['status', status.value].join('_')}  value={status.value} text={status.text}/>);
        return(
            <select onChange={this.handleChange}>
                {items}
            </select>
        )
    }
}

class ReportForm extends React.Component{
    constructor(){
        super();

        this.state = {
            startDate: moment().subtract(1,'months'),
            endDate: moment(),
            currency: 'RUB',
            status: statuses[0].value || 'all',
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
        this.lastUpdatedHandle = this.lastUpdatedHandle.bind(this);
        this.handleChangeStatus = this.handleChangeStatus.bind(this);

    }

    lastUpdatedHandle(){
        this.props.lastUpdatedHandle();
    }

    handleSubmit(event){
        event.preventDefault();
        const parameters = {};
        parameters.date_from = this.state.startDate.format("YYYY-MM-DD");
        parameters.date_to = this.state.endDate.format("YYYY-MM-DD");
        parameters.currency = this.state.currency;
        parameters.limit = 0;
        parameters.status = this.state.status;
        this.props.actions.createReport(this.props.token, parameters);
        setTimeout(this.lastUpdatedHandle, 2000);
    }

    handleChangeStart(date){
        this.setState({
            startDate: date
        })
    }

    handleChangeEnd(date){
        this.setState({
            endDate: date
        })
    }

    handleChangeStatus(status){
        this.setState({
            status: status
        })
    }

    render(){

        return (
            <div className="createReport">
                <div className="trans_search">
                <form method="post" onSubmit={this.handleSubmit}>

                    <label className="trans_search_label">{this.props.translate('filter_date_from')}:</label>
                     <DatePicker
                     selected={this.state.startDate}
                     selectsStart
                     startDate={this.state.startDate}
                     endDate={this.state.endDate}
                     onChange={this.handleChangeStart}
                     />
                     <label className="trans_search_label">{this.props.translate('filter_date_to')}:</label>
                     <DatePicker
                     selected={this.state.endDate}
                     selectsEnd
                     startDate={this.state.startDate}
                     endDate={this.state.endDate}
                     onChange={this.handleChangeEnd}
                     />

                    <label className="trans_search_label">{this.props.translate('transaction_status')}:</label>
                    <StatusComponent handleChange={this.handleChangeStatus}/>
                    <button type="submit" className="btn btn-orange">{this.props.translate('create_report')}</button>
                </form>
                </div>
            </div>
        )
    }
}

class Reports extends React.Component{
    constructor(){
        super();
        this.state = {
            offset: 0,
            lastUpdated: new Date().getTime()
        }

        this.getReport = this.getReport.bind(this);
        this.setLastUpdated = this.setLastUpdated.bind(this);
    }

    componentDidMount() {
        this.getUpdated();
    }

    getUpdated(){
        this.props.actions.getReports(this.props.token);
    }

    setLastUpdated(){
        this.getUpdated();
        this.setState({
            lastUpdated: new Date().getTime(),
        })
    }

    getReport(event){
        event.preventDefault();
        const
            fileLink = event.target.href,
            fileName = fileLink;
        this.props.actions.getFile(this.props.token, fileLink, fileName);
    }

    render(){

        const items = '';
        if (typeof this.props.reports.items == 'object')
        {
            if (Object.keys(this.props.reports.items).length)
            {
                const items = this.props.reports.items.map(
                    function(item){
                        var title = item.file,
                            fileUrl = reportFilePrefix + item.file;
                        return (
                            <div key={item.id} className="trans_i report_item">
                                <div className="trans_i_item">{item.id}</div>
                                <div className="trans_i_item">{item.created}</div>
                                <div className="trans_it_item">
                                    <a href={fileUrl}>{this.props.t('download_report')} (.xlsx)</a>
                                </div>
                            </div>
                        )
                    }.bind(this)
                )

                return (
                    <div className="trans">
                        <ReportForm
                            actions={this.props.actions}
                            token={this.props.token}
                            lastUpdatedHandle={this.setLastUpdated}
                            date={this.props.date}
                            translate={this.props.t}
                        />
                        <div className="trans_count">{this.props.reports.count} {this.props.t('reports')}</div>
                        <Scrollbars>
                            <div className="trans_its">
                                {items}
                            </div>
                        </Scrollbars>
                    </div>
                    )

            }
        }

        return (
            <div className="trans">
                <ReportForm
                    actions={this.props.actions}
                    token={this.props.token}
                    lastUpdatedHandle={this.setLastUpdated}
                    translate={this.props.t}
                />
            </div>
        )
    }
}

Reports.propTypes = {
    reports: React.PropTypes.shape({
        items: React.PropTypes.array,
        isLoading: React.PropTypes.bool
    })
};

export default connect(
    state => ({
        reports: state.reports,
    }),
    dispatch => ({
        actions: bindActionCreators(Actions, dispatch)
    })
)(translate(['reports'])(Reports))