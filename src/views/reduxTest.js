import React, {Component} from 'react'
import AuthActions from 'src/redux/actions/authActions'
import client from 'src/consts/client'
import TestActions from 'src/redux/actions/testActions'
import {bindActionCreators} from 'redux'
import {connect } from 'react-redux'

class ReduxTest extends Component {
	componentDidMount(){
		console.log('props are: ',this.props);
		console.log('client cookies check',client.isAuthenticated())
	}
	
	_handleClick = (e) => {
		const {actions:{add, subtract , signin}} = this.props;
		if(e.target.dataset.action === 'ASC') {
			add(1)
		} else if(e.target.dataset.action === 'DSC') {
			subtract(1)
		} else if (e.target.dataset.action === 'SIGNIN'){
			signin('pedram','DaneshBoom','true')
		}
	};
	
	render(){
		return(
				<div>
					<h1>I am Redux Test</h1>
					<pre>{JSON.stringify(this.props,null,2)}</pre>
					<button data-action="ASC" className="btn btn-outline-primary" onClick={this._handleClick}>+</button>
					<button className="btn btn-outline-primary" data-action="DSC" onClick={this._handleClick}>-</button>
					<button className="btn btn-outline-primary" data-action="SIGNIN" onClick={this._handleClick}>sign in</button>
				</div>
		)
	}
}

const mapStateToProps = (state , ownProps) => ({
	number: state.test.result,
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({subtract:TestActions.subtractNumber , add:TestActions.addNumber, signin: AuthActions.signIn},dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ReduxTest)