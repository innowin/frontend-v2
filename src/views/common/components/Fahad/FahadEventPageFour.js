import React, {Component} from "react"
import RightArrowSvg from "src/images/common/right_arrow_svg"
import axios from "axios"
import urls, {REST_URL} from "src/consts/URLS"
import numberCorrection from "src/helpers/numberCorrection"

let successes = 0
let errors = 0

class FahadEventPageFour extends Component {
  constructor(props) {
    super(props)
    this.state = {
      members: [],

      ceo_name: "",
      ceo_phone_number: "",
      ceo_social_phone_number: "",
      bod_name: "",
      bod_phone_number: "",
      bod_post: "",

      validationError: false,
      serverError: false,
    }
  }

  componentDidMount() {
    if (document.body.clientWidth > 480) {
      let modalCon = document.getElementById("fahadModalContainerDiv")
      modalCon.scrollTo({top: 0, behavior: "smooth"})
    }
    setTimeout(() => {
      this.getData(54, "ceo_name")
      this.getData(55, "ceo_phone_number")
      this.getData(56, "ceo_social_phone_number")
      this.getData(59, "bod_name")
      this.getData(60, "bod_phone_number")
      this.getData(61, "bod_post")
    }, 100)
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
          this.sendData(74 + index * 4, numberCorrection(member.phoneNumber))
          this.sendData(75 + index * 4, numberCorrection(member.socialNumber))
          this.sendData(76 + index * 4, member.rule)
        }
        else {
          console.log(member)
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

  getData(fieldId, fieldData) {
    const {token} = this.props

    axios.get(REST_URL + "/" + urls.FORMS + "/?entry_field=" + fieldId,
        {
          headers: {
            "Authorization": `JWT ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response)
          if (response.statusText === "OK") {
            this.setState({...this.state, [fieldData]: response.data.results[0].entry_value})
          }
        })
        .catch((err) => {
          console.log(fieldId, err)
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
    let {
      members,
      ceo_name,
      ceo_phone_number,
      ceo_social_phone_number,
      bod_name,
      bod_phone_number,
      bod_post,
    } = this.state
    let newMembers = members
    newMembers.length === 0 ?
        newMembers.push({
          fullName: ceo_name,
          phoneNumber: ceo_phone_number,
          socialNumber: ceo_social_phone_number,
          rule: "مدیرعامل",
        })
        : newMembers.push({
          fullName: bod_name,
          phoneNumber: bod_phone_number,
          socialNumber: bod_phone_number,
          rule: bod_post,
        })
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
                           defaultValue={member.fullName}
                           onChange={(e) => this.setMemberInfo(e.target.value, inx, "fullName")}/>

                    <label>
                      شمارۀ همراه
                      <span className={"secondary-color"}> * </span>
                    </label>
                    <input type={"text"} className="organization-leadership-job-input" maxLength="11" title="11 کاراکتر"
                           defaultValue={member.phoneNumber}
                           onChange={(e) => this.setMemberInfo(e.target.value, inx, "phoneNumber")}/>

                    <label>
                      شماره در پیام‌رسان
                      <span className={"secondary-color"}> * </span>
                    </label>
                    <input type={"text"} className="organization-leadership-job-input" maxLength="11" title="11 کاراکتر"
                           defaultValue={member.socialNumber}
                           onChange={(e) => this.setMemberInfo(e.target.value, inx, "socialNumber")}/>

                    <label>
                      سمت در مجموعه
                      <span className={"secondary-color"}> * </span>
                    </label>
                    <input type={"text"} className="organization-leadership-job-input" maxLength="50" title="حداقل 2 کاراکتر، حداکثر 50"
                           defaultValue={member.rule}
                           onChange={(e) => this.setMemberInfo(e.target.value, inx, "rule")}/>
                  </div>,
              )
            }

            <div className="fahad-modal-increase-decrease-con">
              {members.length < 2 &&
              <div className="organization-leadership-job-hashtags" onClick={() => this.addMember()}>
                + افزودن شرکت‌کنندۀ
              </div>}
              {members.length > 0 &&
              <div className="organization-leadership-job-hashtags" onClick={() => this.deleteMember()}>
                - حذف شرکت‌کنندۀ
              </div>}
            </div>

          </div>

        </React.Fragment>
    )
  }
}

export default FahadEventPageFour