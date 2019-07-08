import React, {Component} from "react"
import RightArrowSvg from "src/images/common/right_arrow_svg"

const memberType = {
  fullName: "",
  phoneNumber: null,
  socialNumber: null,
  rule: "",
}

class FahadEventPageFour extends Component {
  constructor(props) {
    super(props)
    this.state = {
      members: [
        {
          fullName: "",
          phoneNumber: null,
          socialNumber: null,
          rule: "",
        },
      ],
    }
  }

  componentDidMount() {
    if (document.body.clientWidth > 480)
      window.scrollTo({top: 0, behavior: "smooth"})
  }

  addMember() {
    let {members} = this.state
    let newMembers = members
    newMembers.push(memberType)
    this.setState({...this.state, members: newMembers})
  }

  deleteMember() {
    let {members} = this.state
    let newMembers = members
    newMembers.pop()
    this.setState({...this.state, members: newMembers})
  }

  render() {
    let {members} = this.state
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

            {
              members.map((member, inx) =>
                  <div key={inx} style={{marginBottom: "20px"}}>
                    <p style={{marginBottom: "15px"}}><b>مشخصات شرکت کننده {inx + 1}</b></p>
                    <label>
                      نام و نام خانوادگی
                    </label>
                    <input type={"text"} className="organization-leadership-job-input"/>

                    <label>
                      شمارۀ همراه
                    </label>
                    <input type={"text"} className="organization-leadership-job-input"/>

                    <label>
                      شماره در پیام‌رسان
                    </label>
                    <input type={"text"} className="organization-leadership-job-input"/>

                    <label>
                      سمت در مجموعه
                    </label>
                    <input type={"text"} className="organization-leadership-job-input"/>
                  </div>,
              )
            }

            <div className="fahad-modal-increase-decrease-con">
              <div className="organization-leadership-job-hashtags" onClick={() => this.addMember()}>
                + افزودن شرکت‌کنندۀ دیگر
              </div>
              {members.length > 0 &&
              <div className="organization-leadership-job-hashtags" onClick={() => this.deleteMember()}>
                - کاهش شرکت‌کنندۀ
              </div>}
            </div>

          </div>

        </React.Fragment>
    )
  }
}

export default FahadEventPageFour