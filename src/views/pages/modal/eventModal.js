import * as React from 'react'
import {Component} from 'react'
import Modal from './modal'
import EventsList from './EventsModal/EventsList'
import EventPersonForm from './EventsModal/EventPersonForm'
import EventOrganForm from './EventsModal/EventOrganForm'

class EventModal extends Component {
	state = {
		activeState: 0,
	}
	
	_toggle = (e) => {
		e.stopPropagation();
		this.props.toggle()
	}
	
	render = () => {
		const {activeState} = this.state
		return (
				<React.Fragment>
					<Modal open={this.props.isOpen} closer={this._toggle}>
						<div className="event-modal">
							{activeState === 0 ?
									<EventsList/>
									: activeState === 1 ?
									<EventPersonForm/>
									: activeState === 2 ?
									<EventOrganForm/>
									: ''
							}
						</div>
					</Modal>
				</React.Fragment>
		)
	}
}

export default EventModal