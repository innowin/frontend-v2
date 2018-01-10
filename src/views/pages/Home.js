<<<<<<< HEAD
import React from 'react';
const Home = () => {
  return (
      <h1> Home </h1>
  )
=======
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
>>>>>>> 20bd563af6349c2ad269f7c17cefa980263c9146
}

export default Home;