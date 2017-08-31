import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Loader from '../../modules/loader'
import * as Actions from './actions'
import { ItemModal } from './itemModal'
import { modal } from 'react-redux-modal'
import './index.scss'

class Transaction extends React.Component {
  constructor () {
    super()
  }

  addModal (item) {
    modal.add(ItemModal, {
      size: 'medium',
      closeOnOutsideClick: true,
      hideTitleBar: true,
      hideCloseButton: false,
      item: item
    })
  }

  render () {
    const it = this.props.transaction
    console.log(it)

    if (Object.keys(it).length != 0) {
      const price = (it.currency == 'RUB') ? it.value + ' Р' : '$' + it.value

      const status = (it.status == 'completed') ? 'Выполнено' : (it.status == 'error_inventory' || it.status == 'error_bot' || it.status == 'error_pushback') ? 'Ошибка'
        : 'В процессе'

      const statusS = {
        color: (it.status == 'completed') ? '#67af55' : (it.status == 'error_inventory' || it.status == 'error_bot' || it.status == 'error_pushback') ? '#c01f36'
          : '#edb140'
      }

      const note = (it.note !== null) ? <div className="trans_it_note">
        <div className="trans_it_note_zag">Заметка</div>
        <div className="trans_it_note_text">{it.note}</div>
      </div>
        : null

      return (
        <div className="trans_it">
          <div className="trans_it_zag">Информация о транзакции</div>
          <div className="trans_it_params">
            <div>
              <div>Сумма</div>
              <div>{price}</div>
            </div>
            <div>
              <div>Номер</div>
              <div>{it.trade_hash}</div>
            </div>
            <div>
              <div>Статус</div>
              <div style={statusS}>{status}</div>
            </div>
            <div>
              <div>Дата</div>
              <div>{moment().format('DD MMMM YYYY')}</div>
            </div>
            <div>
              <div>ID</div>
              <div>{it.id}</div>
            </div>
            <div>
              <div>ORDER ID</div>
              <div>{it.order_id}</div>
            </div>
            <div>
              <div>STEAM ID</div>
              <div>{it.steam_id === null ? '----' : it.steam_id}</div>
            </div>
            <div>
              <div>TRADE OFFER ID</div>
              <div>{it.trade_offer_id}</div>
            </div>
          </div>
          {note}
          <div className="trans_it_elems">
            <div className="trans_it_elems_zag">{Object.keys(it.items).length} <span>предметов</span></div>
            <div className="trans_it_elems_its">
              {Object.keys(it.items).map(key => (
                <div className="trans_it_elems_its_i" key={key} onClick={e => this.addModal(it.items[key])}>
                  <div className="trans_it_elems_its_i_name">{it.items[key].market_name}</div>
                  <div
                    className={'trans_it_elems_its_i_circle trans_it_elems_its_i_circle-' + it.items[key].type}></div>
                  <img className="trans_it_elems_its_i_img" src={it.items[key].icon_url}/>
                  <div className="trans_it_elems_its_i_price">{it.items[key].price_raw} Р</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }
    else {
      return (
        <Loader />
      )
    }
  }

  componentDidMount () {
    const id = this.props.match.params.id
    this.props.actions.getTransaction(this.props.token, id)
  }

  componentWillUnmount () {
    this.props.actions.clearTransaction()
  }

}

export default connect(
  state => ({
    transaction: state.transaction,
    transactions: state.transactions
  }),
  dispatch => ({
    actions: bindActionCreators(Actions, dispatch)
  })
)(Transaction)