import * as React from "react"
import {PureComponent} from "react"
import OrganizationLeadershipModal from "../post/OrganizationLeadershipModal"

export default class OrganizationLeadershipCard extends PureComponent {
  constructor() {
    super()
    this.state = {
      modalIsOpen: false,
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

  toggle = (e) => {
    e && e.stopPropagation()
    e && e.preventDefault()
    this.setState({...this.state, modalIsOpen: !this.state.modalIsOpen}, () => {
      this.state.modalIsOpen ? document.body.style.overflowY = "hidden" : document.body.style.overflowY = "auto"
    })
  }

  showModal(e, ref) {
    e && e.stopPropagation()
    e && e.preventDefault()
    ref && ref.className === "organization-leadership-card-checkbox" &&
    this.setState({...this.state, modalIsOpen: !this.state.modalIsOpen}, () => {
      this.state.modalIsOpen ? document.body.style.overflowY = "hidden" : document.body.style.overflowY = "auto"
    })
  }

  static changeCheckState(ref) {
    ref && ref.className === "organization-leadership-card-checkbox" ?
        ref.className = "organization-leadership-card-checkbox-done"
        : ref.className = "organization-leadership-card-checkbox"
  }

  render = () => (
      <div className="org-leadership-card">
        <OrganizationLeadershipModal modalIsOpen={this.state.modalIsOpen} toggle={this.toggle}/>
        <div className='bee-text'>از کجا شروع کنم؟</div>
        <div className='bee-close'>✕</div>
        <div className='organization-leadership-card-checkboxes'>
          <form>
            <label ref={e => (this.hire = e)} className='organization-leadership-card-checkbox'>
              <div className="organization-leadership-card-checkbox-title">
                <input type="checkbox" name="kind" onChange={() => OrganizationLeadershipCard.changeCheckState(this.hire)}/>
                <span className='checkmark'/>
                <span>استخدام نیرو</span>
                <div className="org-leadership-button" onClick={(e) => this.showModal(e, this.hire)}>
                  ارسال پست
                </div>
              </div>
              <div className="organization-leadership-card-checkbox-description">
                چه موقعیت های شغلی در مجموعه‌تان دارید و دنبال چه کسی هستید؟
              </div>
            </label>
            <label ref={e => (this.question = e)} className='organization-leadership-card-checkbox-done'>
              <div className="organization-leadership-card-checkbox-title">
                {/*<input type="checkbox" name="kind" onChange={() => OrganizationLeadershipCard.changeCheckState(this.question)}/>*/}
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
            <label ref={e => (this.fund = e)} className='organization-leadership-card-checkbox-done'>
              <div className="organization-leadership-card-checkbox-title">
                {/*<input type="checkbox" name="kind" onChange={() => OrganizationLeadershipCard.changeCheckState(this.fund)}/>*/}
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