import React, {Component} from "react"
import RightArrowSvg from "src/images/common/right_arrow_svg"
import axios from "axios"
import urls, {REST_URL} from "src/consts/URLS"

let successes = 0
let errors = 0

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
          phoneNumber: "",
          socialNumber: "",
          rule: "",
        },
      ],

      validationError: false,
      serverError: false,
    }
  }

  componentDidMount() {
    if (document.body.clientWidth > 480) {
      let modalCon = document.getElementById("fahadModalContainerDiv")
      modalCon.scrollTo({top: 0, behavior: "smooth"})
    }
  }

  componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
    let {verification} = nextProps
    if (verification === 0) {
      this.checkValidations()
    }
  }

  checkValidations() {
    let {members} = this.state
    let {_changeIsLoading, _nextLevel} = this.props

    if (members.length > 0) {
      members.forEach((member, index) => {
        if (
            member.fullName.length >= 2 &&
            member.phoneNumber.length === 11 &&
            member.socialNumber.length === 11 &&
            member.rule.length >= 2
        ) {
          successes = 0
          errors = 0
          this.sendData(73 + index * 4, member.fullName)
          this.sendData(74 + index * 4, member.phoneNumber)
          this.sendData(75 + index * 4, member.socialNumber)
          this.sendData(76 + index * 4, member.rule)
        }
        else {
          let modalCon = document.getElementById("fahadModalContainerDiv")
          modalCon.scrollTo({top: 0, behavior: "smooth"})
          this.setState({...this.state, validationError: true},
              _changeIsLoading(),
          )
        }
      })
    }
    else {
      _changeIsLoading()
      _nextLevel()
    }

  }

  sendData(fieldId, fieldData) {
    const {token, clientIdentityId} = this.props

    axios.post(REST_URL + "/" + urls.FORMS + "/",
        JSON.stringify({
          entry_value: fieldData ? fieldData : "",
          entry_field: fieldId,
          entry_identity: clientIdentityId,
        }),
        {
          headers: {
            "Authorization": `JWT ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          const {_nextLevel} = this.props
          const {members} = this.state
          console.log(response)
          response.statusText === "Created" && successes++
          // eslint-disable-next-line no-unused-expressions
          successes === (members.length * 4) ? _nextLevel() : errors > 0 && this.serverError()
        })
        .catch((err) => {
          console.log(fieldId, err)
          console.log(fieldData)
          errors++
        })
  }

  serverError() {
    let modalCon = document.getElementById("fahadModalContainerDiv")
    modalCon.scrollTo({top: 0, behavior: "smooth"})
    this.setState({...this.state, serverError: true})
    const {_changeIsLoading} = this.props
    _changeIsLoading()
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

  setMemberInfo(data, inx, name) {
    let {members} = this.state
    let membersArr = [...members]
    membersArr[inx][name] = data
    this.setState({...this.state, members: [...membersArr]})
  }

  render() {
    let {members, validationError, serverError} = this.state
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

            <div className={validationError ? "validation-error-fahad" : "validation-error-fahad-hide"}>
              لطفاً فیلد های اجباری را به صورت صحیح پر کنید
            </div>
            <div className={serverError ? "validation-error-fahad" : "validation-error-fahad-hide"}>
              مشکل برقراری ارتباط با سرور، لطفاً اینترنت خود را برسی کنید و دوباره تلاش کنید
            </div>

            {
              members.map((member, inx) =>
                  <div key={inx} style={{marginBottom: "20px"}}>
                    <p style={{marginBottom: "15px"}}><b>مشخصات شرکت کننده {inx + 1}</b></p>
                    <label>
                      نام و نام خانوادگی
                      <span className={"secondary-color"}> * </span>
                    </label>
                    <input type={"text"} className="organization-leadership-job-input" maxLength="50" title="حداقل 2 کاراکتر، حداکثر 50"
                           onChange={(e) => this.setMemberInfo(e.target.value, inx, "fullName")}/>

                    <label>
                      شمارۀ همراه
                      <span className={"secondary-color"}> * </span>
                    </label>
                    <input type={"text"} className="organization-leadership-job-input" maxLength="11" title="11 کاراکتر"
                           onChange={(e) => this.setMemberInfo(e.target.value, inx, "phoneNumber")}/>

                    <label>
                      شماره در پیام‌رسان
                      <span className={"secondary-color"}> * </span>
                    </label>
                    <input type={"text"} className="organization-leadership-job-input" maxLength="11" title="11 کاراکتر"
                           onChange={(e) => this.setMemberInfo(e.target.value, inx, "socialNumber")}/>

                    <label>
                      سمت در مجموعه
                      <span className={"secondary-color"}> * </span>
                    </label>
                    <input type={"text"} className="organization-leadership-job-input" maxLength="50" title="حداقل 2 کاراکتر، حداکثر 50"
                           onChange={(e) => this.setMemberInfo(e.target.value, inx, "rule")}/>
                  </div>,
              )
            }

            <div className="fahad-modal-increase-decrease-con">
              {members.length < 2 &&
              <div className="organization-leadership-job-hashtags" onClick={() => this.addMember()}>
                + افزودن شرکت‌کنندۀ دیگر
              </div>}
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