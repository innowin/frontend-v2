import * as React from "react"
import {EventBanner} from "src/images/icons"
import {PureComponent} from 'react'
import FahadEventModal from "./FahadEventModal"

export default class FahadEventCard extends PureComponent {
  constructor() {
    super()
    this.state = {
      modalIsOpen: false
    }
  }

  toggle = (e) => {
    e && e.stopPropagation()
    e && e.preventDefault()
    this.setState({...this.state, modalIsOpen: !this.state.modalIsOpen}, () => {
      this.state.modalIsOpen ? document.body.style.overflowY = "hidden" : document.body.style.overflowY = "auto"
    })
  }

  render = () => (
      <div className="event-card">
        <FahadEventModal modalIsOpen={this.state.modalIsOpen} toggle={this.toggle}/>
        <div className="close-button">✕</div>
        <div className="image"><EventBanner/></div>
        <div className="text">
          <div className="title">رویداد علمی شبکه همکاری نخبگان فحاد</div>
          <div className="description">برای ثبت نام در شبکهٔ همکاری نخبگان علمی فناوری از اینجا اقدام کنید.</div>
        </div>
        <div className="button event-opener" onClick={this.toggle}>ثبت نام رایگان</div>
      </div>
  )
}