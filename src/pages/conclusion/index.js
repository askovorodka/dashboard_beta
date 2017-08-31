import { connect } from 'react-redux'
import * as Actions from './actions.js'
import { bindActionCreators } from 'redux'
import MarkInput from 'react-text-mask'
import { translate } from 'react-i18next'
import './index.scss'

const currency = [
  {'value': 'RUB', 'label': 'RUB'},
  {'value': 'USD', 'label': 'USD'},
]
const PAYMENT_SYSTEM_YANDEX = 'yandex'
const PAYMENT_SYSTEM_WEBMONEY = 'webmoney';
const PAYMENT_SYSTEM_QIWI   =   'qiwi';

const paymentSystems = [
    {'value': PAYMENT_SYSTEM_WEBMONEY, 'label': 'Webmoney'},
    {'value': PAYMENT_SYSTEM_YANDEX, 'label': 'Yandex'},
    {'value': PAYMENT_SYSTEM_QIWI, 'label': 'Qiwi'},
];

function MarkInputYandex(props) {
    return <MarkInput mask={[/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/]} onChange={props.onChangeHundler} value={props.value} placeholder={props.t('payment_number')} />
}

function MarkInputWebmoney(props) {
    return <MarkInput mask={[/[A-Za-z]/,'-',/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/]} onChange={props.onChangeHundler} value={props.value} placeholder={props.t('payment_number')} />
}

function MarkInputQiwi(props) {
    return <MarkInput mask={[/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/]} onChange={props.onChangeHundler} value={props.value} placeholder={props.t('payment_number')} />
}

class Conclusion extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      currency: 'RUB',
      textarea: '',
      paymentSystem: '',
      paymentDestination: '',
      amount: '',
      formSuccess: false
    }
    this.paymentSystemChange = this.paymentSystemChange.bind(this);
    this.paymentDestinationChange = this.paymentDestinationChange.bind(this);
  }
  sendForm() {
    if(!this.props.conclusion.isSending){
      this.props.actions.sendConclusion(this.props.token, {
          'amount': this.state.amount,
          'currency': this.state.currency,
          'note': this.state.textarea,
          'payment_system': this.state.paymentSystem,
          'payment_destination': this.state.paymentDestination.replace(/\-/,''),
      })
      this.setState({
        textarea: '',
        amount: '',
        paymentSystem: '',
        paymentDestination: '',
      });

    }
  }
  amountChange(e, val) {
    this.setState({
      amount: val
    })
  }
  curChange(newVal) {
    this.setState({
      currency: newVal.value
    })
  }
  textChange(e){
    this.setState({
      textarea: e.target.value
    })
  }
  paymentSystemChange(newVal){
    this.setState({
        paymentSystem: newVal.value,
        paymentDestination: '',
    })
  }
  paymentDestinationChange(e){
    this.setState({
        paymentDestination: e.target.value,
    })
  }
  render() {

    const conclusion = this.props.conclusion
    let textBtn = this.props.t('submit_case')
    if(conclusion.isSending) textBtn = this.props.t('submit_in_process')
    if(conclusion.formSuccess) textBtn = this.props.t('your_case_is_submit')

    let paymentSystemInp = ''
    if (this.state.paymentSystem == PAYMENT_SYSTEM_YANDEX){
        paymentSystemInp = <MarkInputYandex onChangeHundler={this.paymentDestinationChange} value={this.state.paymentDestination} t={this.props.t}/>
    } else if (this.state.paymentSystem == PAYMENT_SYSTEM_WEBMONEY) {
        paymentSystemInp = <MarkInputWebmoney onChangeHundler={this.paymentDestinationChange} value={this.state.paymentDestination} t={this.props.t}/>
    } else if (this.state.paymentSystem == PAYMENT_SYSTEM_QIWI) {
        paymentSystemInp = <MarkInputQiwi onChangeHundler={this.paymentDestinationChange} value={this.state.paymentDestination} t={this.props.t}/>
    }

    return (
      <div className="concl">
        <div className='concl_row'>
          <NumberFormat thousandSeparator={true} value={this.state.amount} placeholder={this.props.t('enter_amount')} onChange={this.amountChange.bind(this)}/>
          <Select 
            name="currency"
            options={currency}
            clearable={false}
            searchable={false}
            value={this.state.currency}
            placeholder={this.props.t('select_currency')}
            onChange={this.curChange.bind(this)}
          />
        </div>
        <Select
            name="paymentSystem"
            options={paymentSystems}
            searchable={false}
            clearable={false}
            placeholder={this.props.t('select_payment_system')}
            value={this.state.paymentSystem}
            onChange={this.paymentSystemChange}
        />

        <div className='concl_row'>
            {paymentSystemInp}
        </div>

        <textarea
          placeholder={this.props.t('enter_payment_destination')}
          value={this.state.textarea} 
          onChange={this.textChange.bind(this)}
        />
        <div className="concl_resRow">
          <button className="btn btn-orange" onClick={this.sendForm.bind(this)}>{textBtn}</button>
          <div className={"fB_resRow_mess fB_resRow_mess-"+conclusion.formSuccess}>
            <div className="fB_resRow_mess_ic"></div>
            <div>{this.props.t('your_case_is_submit')}</div>
          </div>
        </div>
        <br />
        <div className="fB_error">{conclusion.errorMsg}</div>
      </div>
    )
  }
}

export default connect(
  state => ({ 
    conclusion : state.conclusion
  }),
  dispatch => ({ actions: bindActionCreators(Actions, dispatch) })  
)(translate(['conclusion'])(Conclusion))