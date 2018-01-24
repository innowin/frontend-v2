/*global __*/
import React ,{Component} from 'react'
import Messages from './Messages'


const data = [
		{
			name: 'علی رسولی',
			user_id: 23,
			image_url: 'https://randomuser.me/api/portraits/med/men/37.jpg',
			create_date: '20080915T155300+0500',
		},
];
class ChatWrapper extends Component {
	constructor(props){
		super(props);
		this.state = {
			show: false,
		}
	}
	
	_handleToggle = () => {
		const {show} = this.state;
		this.setState({
				...this.state,
			show: !show
			})
	};
	
	render (){
		const {show} = this.state;
		return (
				<div className="chat-wrapper">
					<div className="chat-list">
						<div className="search-box"><input ref={search => (this.search = search)} placeholder={__("search")}/><span className="fa fa-search"></span></div>
						<div className="messages-wrapper">
							<button onClick={this._handleToggle}>
								show list
							</button>
							<Messages  in={show} data={data}/>
						</div>
					</div>
					<div className="chat-item" >
						<h1>chat item</h1>
					</div>
				</div>
		)
	}
}

export default ChatWrapper;