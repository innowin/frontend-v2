import React, {Component} from "react"
import RightArrowSvg from "src/images/common/right_arrow_svg"
import axios from "axios"
import urls, {REST_URL} from "src/consts/URLS"

let successes = 0
let errors = 0

class FahadEventPageThree extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ceo_name: "",
      ceo_phone_number: "",
      ceo_social_phone_number: "",
      ceo_office_number: "",
      ceo_email: "",
      bod_name: "",
      bod_phone_number: "",
      bod_post: "",
      bod_office_number: "",
      bod_email: "",

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
    let {
      ceo_name,
      ceo_phone_number,
      ceo_social_phone_number,
      ceo_office_number,
      ceo_email,
      bod_name,
      bod_phone_number,
      bod_post,
      bod_office_number,
      bod_email,
    } = this.state

    if (
        ceo_name.length >= 2 &&
        ceo_phone_number.length === 11 &&
        ceo_social_phone_number.length === 11 &&
        ceo_office_number.length === 11 &&
        ceo_email.length >= 2 &&
        bod_name.length >= 2 &&
        bod_phone_number.length === 11 &&
        bod_post.length >= 2 &&
        bod_office_number.length === 11 &&
        bod_email.length >= 2
    ) {
      successes = 0
      errors = 0
      this.sendData(54, ceo_name)
      this.sendData(55, ceo_phone_number)
      this.sendData(56, ceo_social_phone_number)
      this.sendData(57, ceo_office_number)
      this.sendData(58, ceo_email)
      this.sendData(59, bod_name)
      this.sendData(60, bod_phone_number)
      this.sendData(61, bod_post)
      this.sendData(62, bod_office_number)
      this.sendData(63, bod_email)
    }
    else {
      let modalCon = document.getElementById("fahadModalContainerDiv")
      modalCon.scrollTo({top: 0, behavior: "smooth"})
      this.setState({...this.state, validationError: true},
          this.props._changeIsLoading(),
      )
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
          console.log(response)
          response.statusText === "Created" && successes++
          // eslint-disable-next-line no-unused-expressions
          successes === 10 ? _nextLevel() : errors > 0 && this.serverError()
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

  render() {
    let {validationError, serverError} = this.state
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

            <label>
              نام مدیرعامل
              <span className={"secondary-color"}> * </span>
            </label>
            <input type={"text"} className="organization-leadership-job-input" placeholder={"نام مدیرعامل"}
                   maxLength="50" title="حداقل 2 کاراکتر، حداکثر 50" onChange={(e) => this.setState({...this.state, ceo_name: e.target.value})}/>

            <label>
              شمارۀ همراه
              <span className={"secondary-color"}> * </span>
            </label>
            <input type={"text"} className="organization-leadership-job-input" placeholder={"شمارۀ همراه مدیرعامل"}
                   maxLength="11" title="11 کاراکتر" onChange={(e) => this.setState({...this.state, ceo_phone_number: e.target.value})}/>

            <label>
              شماره در پیام‌رسان
              <span className={"secondary-color"}> * </span>
            </label>
            <input type={"text"} className="organization-leadership-job-input" placeholder={"شمارۀ همراه مدیرعامل در پیام‌رسان‌ها"}
                   maxLength="11" title="11 کاراکتر" onChange={(e) => this.setState({...this.state, ceo_social_phone_number: e.target.value})}/>

            <label>
              شمارۀ مستقیم دفتر
              <span className={"secondary-color"}> * </span>
            </label>
            <input type={"text"} className="organization-leadership-job-input" placeholder={"شمارۀ مستقیم دفتر مدیرعامل"}
                   maxLength="11" title="11 کاراکتر" onChange={(e) => this.setState({...this.state, ceo_office_number: e.target.value})}/>

            <label>
              ایمیل
              <span className={"secondary-color"}> * </span>
            </label>
            <input type={"text"} className="organization-leadership-job-input" placeholder={"آدرس ایمیل مدیرعامل"}
                   maxLength="50" title="حداقل 2 کاراکتر، حداکثر 50" onChange={(e) => this.setState({...this.state, ceo_email: e.target.value})}/>

            <label>
              نام عضو هیئت مدیره
              <span className={"secondary-color"}> * </span>
            </label>
            <input type={"text"} className="organization-leadership-job-input" placeholder={"نام عضو هیئت مدیره"}
                   maxLength="50" title="حداقل 2 کاراکتر، حداکثر 50" onChange={(e) => this.setState({...this.state, bod_name: e.target.value})}/>

            <label>
              شمارۀ همراه
              <span className={"secondary-color"}> * </span>
            </label>
            <input type={"text"} className="organization-leadership-job-input" placeholder={"شمارۀ همراه عضو هیئت مدیره"}
                   maxLength="11" title="11 کاراکتر" onChange={(e) => this.setState({...this.state, bod_phone_number: e.target.value})}/>

            <label>
              سمت در مجموعه
              <span className={"secondary-color"}> * </span>
            </label>
            <input type={"text"} className="organization-leadership-job-input" placeholder={"سمت در مجموعه"}
                   maxLength="50" title="حداقل 2 کاراکتر، حداکثر 50" onChange={(e) => this.setState({...this.state, bod_post: e.target.value})}/>

            <label>
              شمارۀ مستقیم دفتر
              <span className={"secondary-color"}> * </span>
            </label>
            <input type={"text"} className="organization-leadership-job-input" placeholder={"شمارۀ مستقیم دفتر عضو هیئت مدیره"}
                   maxLength="11" title="11 کاراکتر" onChange={(e) => this.setState({...this.state, bod_office_number: e.target.value})}/>

            <label>
              ایمیل
              <span className={"secondary-color"}> * </span>
            </label>
            <input type={"text"} className="organization-leadership-job-input" placeholder={"آدرس ایمیل عضو هیئت مدیره"}
                   maxLength="50" title="حداقل 2 کاراکتر، حداکثر 50" onChange={(e) => this.setState({...this.state, bod_email: e.target.value})}/>

          </div>

        </React.Fragment>
    )
  }
}

export default FahadEventPageThree