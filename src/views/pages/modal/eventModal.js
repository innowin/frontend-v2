import * as React from 'react'
import {Component} from 'react'
import Modal from './modal'
import EventsList from './EventsModal/EventsList'
import EventPersonForm from './EventsModal/EventPersonForm'
import EventOrganForm from './EventsModal/EventOrganForm'

class EventModal extends Component {
  state = {
    events: {
      "12681": {
        "id": 12681,
        "title": "نمایشگاه تهران",
        "detail": [["مکان","ایران"],["زمان","امروز"]],
        "showDetails": false
      },
      "12841": {
        "id": 12841,
        "title": "نمایشگاه ایران",
        "detail": [["مکان","تهران"],["زمان","فردا"]],
        "showDetails": false
      },
    },
    activeState: 0,
  }
  
  _toggle = (e) => {
    e.stopPropagation();
    this.props.toggle()
  }
  
  render = () => {
    const {activeState, events} = this.state
    return (
        <React.Fragment>
          <Modal open={this.props.isOpen} closer={this._toggle}>
            <div className="event-modal">
              {activeState === 0 ?
                  <EventsList events={events}/>
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