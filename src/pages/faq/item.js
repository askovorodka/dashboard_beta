import React from 'react'
import Collapse from 'react-collapse'

export default class Faq extends React.Component{
	constructor() {
		super();
		this.state = {
			selected: false,
		};
	}

	onClick(id){
		const selected = (this.state.selected ? false : true);
		this.setState({selected: selected});
	}

	render() {
		const answer = this.props.data.answer;
		const queston = this.props.data.queston;
		const isOpen = this.state.selected;

		return (
			<div className={"faq_i faq_i-" + isOpen} onClick={this.onClick.bind(this)}>
				<div className="faq_i_ic"></div>
				<div className="faq_i_ques">{queston}</div>
				<Collapse isOpened={isOpen}>
					<div className="faq_i_answ">{answer}</div>
				</Collapse>
			</div>
		);
	}
}