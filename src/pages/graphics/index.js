import Line from './line'
import Legend from './legend'
import Group from './group'
import GraphicsFoot from './foot'
import Loader from '../../modules/loader'

import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from './actions'

import './index.scss'

class Graphics extends React.Component {
  
	shouldComponentUpdate(nextProps, nextState) {
		return (nextProps.graphics.data !== this.props.graphics.data
		) ?  true : false;
	}
	
	render() {

		const gr = this.props.graphics

		return (
			<div className="graph">
				
				<Legend data={this.state}/>

				<Line token={this.props.token}/>

				<Group />

				<GraphicsFoot />
			</div>
		)		
	}

	componentWillUnmount() {
		this.props.actions.delGraphData()
	}

}

export default connect(
	state => ({
		graphics: state.graphics
	}),
	dispatch => ({
		actions: bindActionCreators(Actions, dispatch) 
	})
	
)(Graphics)