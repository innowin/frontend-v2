import React, {Component} from "react"
import RightArrowSvg from "src/images/common/right_arrow_svg"

const memberType = {
  fullName: "",
  phoneNumber: null,
  socialNumber: null,
  rule: "",
}

class FahadEventPageFive extends Component {
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

            <label>
              فرصت‌های همکاری در حوزۀ سرمایه
            </label>
            <textarea className="organization-leadership-expertise-input"/>

            <label>
              فرصت‌های همکاری در حوزۀ بازار و بازرگانی
            </label>
            <textarea className="organization-leadership-expertise-input"/>

            <label>
              فرصت‌های همکاری در حوزۀ منابع انسانی
            </label>
            <textarea className="organization-leadership-expertise-input"/>

            <label>
              فرصت‌های همکاری در حوزۀ تحقیق و توسعه
            </label>
            <textarea className="organization-leadership-expertise-input"/>

            <label>
              فرصت‌های همکاری در حوزۀ تامین
            </label>
            <textarea className="organization-leadership-expertise-input"/>

            <label>
              فرصت‌های همکاری در حوزۀ رسانه
            </label>
            <textarea className="organization-leadership-expertise-input"/>

            <label>
              فرصت‌های همکاری در حوزۀ پایان‌نامه و پروژه
            </label>
            <textarea className="organization-leadership-expertise-input"/>

            <label>
              سایر فرصت‌های همکاری
            </label>
            <textarea className="organization-leadership-expertise-input"/>

          </div>

        </React.Fragment>
    )
  }
}

export default FahadEventPageFive