import React , {Component} from 'react';
import TopBar from "../bars/TopBar";

class Home extends Component {
	render () {
		const {handleSignOut} = this.props;
		return (
				<div>
					<TopBar  handleSignOut={handleSignOut}/>
					<h1> Home </h1>
				</div>
		)
	}
}

export default Home;