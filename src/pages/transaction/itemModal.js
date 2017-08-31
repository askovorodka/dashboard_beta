import React from 'react'
import './itemModal.scss'

export class ItemModal extends React.Component {
    constructor (props) {
        super(props)
    }

    removeThisModal () {
        this.props.removeModal()
    }

    componentWillMount () {
        //todo формировать image url на клиенте
        this.props.item.displayImage = this.props.item.icon_url.replace('/100x100', '/300x300')
    }

    render () {
        return (
            <div className="item-modal-component">
                <p>
                    {this.props.item.market_name} {this.props.item.price} Р
                </p>
                <img src={this.props.item.displayImage}/>
            </div>
        )
    }
}