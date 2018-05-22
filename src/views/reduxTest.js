import React, {Component} from 'react'
import {connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import TestActions from 'src/redux/actions/testActions'
import * as client from '../consts/client'

class ReduxTest extends Component {
	componentDidMount(){
		console.log('props are: ',this.props);
		console.log('client cookies check',client.isAuthenticated())
	}
	
	_handleClick = (e) => {
		(e.target.dataset.action === 'ASC') ?
				this.props.actions.add(1) :
				this.props.actions.subtract(1)
	};
	
	render(){
		return(
				<div>
					<h1>I am Redux Test</h1>
					<h2>{JSON.stringify(this.props,null,2)}</h2>
					<button data-action="ASC" className="btn btn-outline-primary" onClick={this._handleClick}>+</button><button className="btn btn-outline-primary" data-action="DSC" onClick={this._handleClick}>-</button>
				</div>
		)
	}
}

const mapStateToProps = (state , ownProps) => ({
	number: state.test.result,
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({subtract:TestActions.subtractNumber , add:TestActions.addNumber},dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ReduxTest)