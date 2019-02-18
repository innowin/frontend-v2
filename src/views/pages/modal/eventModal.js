import * as React from 'react'
import {Component} from 'react'
import Modal from './modal'

class EventModal extends Component {
	state = {
		formStates: {
			0: {component: "EventsList"},
			1: {component: "EventPersonForm"},
			2: {component: "EventOrganForm"},
		},
		activeState: 0,
	}
	
	_toggle = (e) => {
		e.stopPropagation();
		this.props.toggle()
	}
	
	render = () => {
		const {activeState, formStates} = this.state
		const $component = formStates[activeState].component
		return (
				<React.Fragment>
					<Modal open={this.props.isOpen} closer={this._toggle}>
						<div className="event-modal"><$component /></div>
					</Modal>
				</React.Fragment>
		)
	}
}

export default EventModal