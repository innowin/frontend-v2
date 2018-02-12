import React , {Component} from 'react';
import TopBar from "../bars/TopBar";
import ChatBar from '../bars/ChatBar';
import HomeSideBar from './home/HomeSideBar';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
		
		}
	}
	render () {
		const {handleSignOut} = this.props;
		return (
				<div className="home-wrapper">
					<TopBar  handleSignOut={handleSignOut}/>
					<main>
						<div className="col-md-2 col-sm-1 -right-sidebar-wrapper">
							<HomeSideBar>
							
							</HomeSideBar>
						</div>
						<div className="col-md-8 col-sm-10  -content-wrapper">
						
						
						
						</div>
						<div className="col-md-2 col-sm-1 -left-sidebar-wrapper">
							<ChatBar />
						</div>
					</main>
				</div>
		)
	}
}

export default Home;