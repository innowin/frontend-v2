import React, {Component} from "react"
import NewRightArrowSvg from "../../../../images/common/new_right_arrow"
import RightArrowSvg from "../../../../images/common/right_arrow_svg"

class FahadEventModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      level: 1,
    }
  }

  currentLevel() {
    let {level} = this.state
    switch (level) {
      case 1:
        return (
            <React.Fragment>
              <div className="event-reg-modal-header">
                فحاد
                &nbsp;&nbsp;&nbsp;
                <RightArrowSvg className="small-event-arrow"/>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <b>
                  ثبت نام رویداد زیست‌فناوری
                </b>
              </div>

              <div className="event-reg-modal-body">

                <label>
                  نام مجموعه
                  <span className={"secondary-color"}> * </span>
                </label>
                <input type={"text"} className="organization-leadership-job-input" placeholder={"نام ثبتی کامل مجموعه"}/>

                <label>
                  نام برند
                </label>
                <input type={"text"} className="organization-leadership-job-input" placeholder={"نام برند مجموعه"}/>

                <label>
                  شعار مجموعه
                </label>
                <input type={"text"} className="organization-leadership-job-input" placeholder={"شعار مجموعه"}/>

                <label>
                  معرفی مختصر مجموعه
                </label>
                <textarea className="organization-leadership-expertise-input"
                          placeholder={"شرکت پایاپژوهان علم و صنعت، ارائۀ خدمات مانیتورینگ و ابزاردقیق"}/>

                <label>
                  نوع ثبتی مجموعه
                </label>
                <div className='event-reg-modal-checkbox-cont' onClick={() => this._setPrice("specified")}  style={{marginTop: "15px"}}>
                  <div className={true === "specified" ? "event-reg-modal-checkbox-selected" : "event-reg-modal-checkbox"}/>
                  <div className='event-reg-modal-checkbox-title'>سهامی عام</div>
                </div>
                <div className='event-reg-modal-checkbox-cont' onClick={() => this._setPrice("call")}>
                  <div className={true !== "specified" ? "event-reg-modal-checkbox-selected" : "event-reg-modal-checkbox"}/>
                  <div className='event-reg-modal-checkbox-title'>سهامی خاص</div>
                </div>

              </div>
            </React.Fragment>
        )
      default:
        return null
    }
  }

  currentFooter() {
    let {level} = this.state
    let {toggle} = this.props
    switch (level) {
      case 1:
        return (
            <React.Fragment>
              <div className={true ? "org-leadership-next-button" : "org-leadership-hidden-button"}
                   onClick={() => true && this.setState({...this.state, level: ++level})}>
                ذخیره و ادامه
              </div>
              <div className="org-leadership-previous-button" onClick={() => toggle()}>
                لغو
              </div>
            </React.Fragment>
        )
      default:
        return null
    }
  }

  render() {
    let {modalIsOpen} = this.props
    return (
        <div className={modalIsOpen ? "organization-leadership-bg" : "organization-leadership-bg-out"}>
          {modalIsOpen ?
              <React.Fragment>
                <div className="organization-leadership-container">
                  <div className="event-reg-modal-elements">
                    {this.currentLevel()}
                  </div>
                </div>
                <div className="organization-leadership-footer">
                  {this.currentFooter()}
                </div>
              </React.Fragment>
              : null}
        </div>
    )
  }
}

export default FahadEventModal