import React ,{Component} from 'react'
import Message from './Message'
import Transition from 'react-transition-group/Transition'
const duration = 300;
const defaultStyle = {
	transition: `opacity ${duration}ms ease-in-out`,
	opacity: 0,
};
const transitionStyles = {
	entering: {opacity: 0},
	entered: {opacity: 1}
};

class Messages extends Component {
	constructor(props){
		super(props);
		this.state = {
		
		}
	}
	
	render() {
		const {in:inProp} = this.props;
		return (
				<div>
					<Transition in={inProp} timeout={duration}>
						{state => (
						<div style={{...defaultStyle, ...transitionStyles[state]}}>
							<Message/>
						</div>)}
					</Transition>
				</div>
		)
	}
}

export default Messages;