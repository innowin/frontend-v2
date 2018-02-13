import React , {Component} from 'react';
import TopBar from "../bars/TopBar";
import ChatBar from '../bars/ChatBar';
import HomeSideBar from './home/HomeSideBar';
import {SOCKET as socket , REST_URL as url } from "../../consts/URLS";
import {TOKEN as token} from "src/consts/data";
import {REST_REQUEST} from 'src/consts/Events';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeExchangeId : null
		}
	}
	
	componentDidMount(){
		socket.on('EXCHANGE-LIST-POSTS',(res) => {
			alert('result');
			console.log(res);
		})
	}
	componentWillUnmount () {
		socket.off('EXCHANGE-LIST-POSTS',(res) => {
			alert('result')
		})
	}
	
	_set_Active_Exchange_ID (id) {
		this.setState({...this.state , activeExchangeId : id})
	}
	
	_get_posts = (exchangeId) => {
		const {activeExchangeId} = this.state;
		if(exchangeId !== activeExchangeId) {
			this._set_Active_Exchange_ID (exchangeId)
		}
		(exchangeId !== activeExchangeId) && socket.emit(REST_REQUEST , {
			method: 'get',
			url: url+`/base/posts/?post_parent=${exchangeId}`,
			result: 'EXCHANGE-LIST-POSTS',
			token,
		})
	};
	
	render () {
		const {handleSignOut} = this.props;
		return (
				<div className="home-wrapper">
					<TopBar  handleSignOut={handleSignOut}/>
					<main>
						<div className="col-md-2 col-sm-1 -right-sidebar-wrapper">
							<HomeSideBar get_posts={this._get_posts}/>
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