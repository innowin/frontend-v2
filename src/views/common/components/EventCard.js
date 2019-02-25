import * as React from 'react'
import {Component} from 'react'
import {EventBanner} from 'src/images/icons'
import EventModal from 'src/views/pages/modal/eventModal'

export default class EventCard extends Component {
	constructor () {
		super()
		this.state = {
			modalIsOpen : false,
		}
	}
	
	componentDidMount () : void {
		if (this.state.modalIsOpen && document.body)  {
			document.body.style.overflow = "auto hidden"
		} else {
			document.body.style.overflow = "auto"
		}
	}
	
	_toggle = (e) => {
		e && e.stopPropagation();
		this.setState({...this.state, modalIsOpen: !this.state.modalIsOpen},() => {
			this.state.modalIsOpen ? document.body.style.overflowY = "hidden" : document.body.style.overflowY = "auto"
		})
	}
	
	render = () => (
			<div className="event-card">
				<EventModal isOpen={this.state.modalIsOpen} toggle={this._toggle}/>
				<div className="close-button">✕</div>
				<div className="image"><EventBanner/></div>
				<div className="text">
					<div className="title">رویداد علمی شبکه همکاری نخبگان فحاد</div>
					<div className="description">برای ثبت نام در شبکهٔ همکاری نخبگان علمی فناوری از اینجا اقدام کنید.</div>
				</div>
				<div className="button event-opener" onClick={this._toggle}>ثبت نام رایگان</div>
			</div>
	)
}