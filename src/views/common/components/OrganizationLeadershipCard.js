import * as React from "react"
import {Component} from "react"
import OrganizationLeadershipModal from "../post/OrganizationLeadershipModal"

export default class OrganizationLeadershipCard extends Component {
  constructor() {
    super()
    this.state = {
      modalIsOpen: false
    }
  }

  componentDidMount(): void {
    if (this.state.modalIsOpen && document.body) {
      document.body.style.overflow = "auto hidden"
    }
    else {
      document.body.style.overflow = "auto"
    }
  }

  _toggle = (e) => {
    e && e.stopPropagation()
    this.setState({...this.state, modalIsOpen: !this.state.modalIsOpen}, () => {
      this.state.modalIsOpen ? document.body.style.overflowY = "hidden" : document.body.style.overflowY = "auto"
    })
  }

  render = () => (
      <div className="org-leadership-card">
        <OrganizationLeadershipModal modalIsOpen={this.state.modalIsOpen} toggle={this._toggle}/>
        <div className='bee-text'>از کجا شروع کنم؟</div>
        <div className='bee-close'>✕</div>
        <div className='organization-leadership-card-checkboxes'>
          <form>
            <label className='organization-leadership-card-checkbox'>
              <div className="organization-leadership-card-checkbox-title">
                <input type="checkbox" name="kind"/>
                <span className='checkmark'/>
                <span>استخدام نیرو</span>
                <div className="org-leadership-button" onClick={this._toggle}>
                  ارسال پست
                </div>
              </div>
              <div className="organization-leadership-card-checkbox-description">
                چه موقعیت های شغلی در مجموعه‌تان دارید و دنبال چه کسی هستید؟
              </div>
            </label>
            <label className='organization-leadership-card-checkbox'>
              <div className="organization-leadership-card-checkbox-title">
                <input type="checkbox" name="kind"/>
                <span className='checkmark'/>
                <span>سوال، مشورت</span>
                <div className="org-leadership-button" onClick={(e) => e.preventDefault()}>
                  ارسال پست
                </div>
              </div>
              <div className="organization-leadership-card-checkbox-description">
                منتور ها شما را راهنمایی خواهند کرد.
              </div>
            </label>
            <label className='organization-leadership-card-checkbox'>
              <div className="organization-leadership-card-checkbox-title">
                <input type="checkbox" name="kind"/>
                <span className='checkmark'/>
                <span>جذب سرمایه</span>
                <div className="org-leadership-button" onClick={(e) => e.preventDefault()}>
                  ارسال پست
                </div>
              </div>
              <div className="organization-leadership-card-checkbox-description">
                تیم و محصول خود را به سرمایه‌گذارها معرفی کنید.
              </div>
            </label>
          </form>
        </div>
      </div>
  )
}