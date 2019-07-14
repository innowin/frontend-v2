import React, {Component} from "react"
import RightArrowSvg from "src/images/common/right_arrow_svg"
import {CancelSvg, CheckSvg} from "src/images/icons"
import axios from "axios"
import urls, {REST_URL} from "../../../../consts/URLS"

let successes = 0
let errors = 0

class FahadEventPageFive extends Component {
  constructor(props) {
    super(props)
    this.state = {
      partnership_in_fund: "",
      partnership_in_market: "",
      partnership_in_hr: "",
      partnership_in_develop: "",
      partnership_in_supply: "",
      partnership_in_media: "",
      partnership_in_project: "",
      partnership_in_other: "",

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
      partnership_in_fund,
      partnership_in_market,
      partnership_in_hr,
      partnership_in_develop,
      partnership_in_supply,
      partnership_in_media,
      partnership_in_project,
      partnership_in_other,
    } = this.state

    successes = 0
    errors = 0
    this.sendData(64, partnership_in_fund)
    this.sendData(65, partnership_in_market)
    this.sendData(66, partnership_in_hr)
    this.sendData(67, partnership_in_develop)
    this.sendData(68, partnership_in_supply)
    this.sendData(69, partnership_in_media)
    this.sendData(70, partnership_in_project)
    this.sendData(71, partnership_in_other)
  }

  sendData(fieldId, fieldData) {
    const {token, clientIdentityId} = this.props

    axios.post(REST_URL + "/" + urls.FORMS + "/",
        JSON.stringify({
          entry_value: fieldData ? fieldId === 37 || fieldId === 35 ? JSON.stringify(fieldData) : fieldData : "",
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
          successes === 8 ? _nextLevel() : errors > 0 && this.serverError()
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
    let {serverError} = this.state
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

            <div className={serverError ? "validation-error-fahad" : "validation-error-fahad-hide"}>
              مشکل برقراری ارتباط با سرور، لطفاً اینترنت خود را برسی کنید و دوباره تلاش کنید
            </div>


            <p style={{marginBottom: "25px"}}>
              پیشنهادات می‌بایست عملیاتی و آمادۀ عقد قرارداد همکاری توسط مجموعه با ذکر جزییات (عدد، رقم و سایر پارامتر های مهم) باشد.
            </p>

            <div style={{marginBottom: "25px"}}>
              <div className="fahad-modal-cancel-check-con">
                <CancelSvg className="fahad-modal-cancel-svg"/>
                <div className="fahad-modal-cancel-check-text">نمونۀ بد:</div>
              </div>
              <div style={{margin: "10px 25px"}}>
                علاقه‌مند به جذب سرمایه‌گذار
              </div>

              <div className="fahad-modal-cancel-check-con">
                <CheckSvg className="fahad-modal-check-svg"/>
                <div className="fahad-modal-cancel-check-text">نمونۀ صحیح:</div>
              </div>
              <div style={{margin: "10px 25px"}}>
                نیازمند سرمایه‌گذاری به ارزش 500 میلیون تومان تا 3 میلیارد تومان در قالب مشارکتی مدنی/تأسیس شرکت مشترک جهت راه‌اندازی خط تولید پرینتر
                های سه بعدی
              </div>
            </div>


            <div style={{marginBottom: "25px"}}>
              <div className="fahad-modal-cancel-check-con">
                <CancelSvg className="fahad-modal-cancel-svg"/>
                <div className="fahad-modal-cancel-check-text">نمونۀ بد:</div>
              </div>
              <div style={{margin: "10px 25px"}}>
                نیازمند جذب نیروی برق
              </div>

              <div className="fahad-modal-cancel-check-con">
                <CheckSvg className="fahad-modal-check-svg"/>
                <div className="fahad-modal-cancel-check-text">نمونۀ صحیح:</div>
              </div>
              <div style={{margin: "10px 25px"}}>
                نیازمند به جذب دو نفر در رشتۀ برق، خانم و آقا، ساکن تهران، در مقطع تحصیلی کارشناسی، در قالب اعطای تسهیلات نظام‌وظیفه، با پرداخت ساعتی
              </div>
            </div>

            <label>
              فرصت‌های همکاری در حوزۀ سرمایه
            </label>
            <textarea className="organization-leadership-expertise-input" maxLength="700" title="حداکثر 700 کاراکتر"
                      onChange={(e) => this.setState({...this.state, partnership_in_fund: e.target.value})}/>

            <label>
              فرصت‌های همکاری در حوزۀ بازار و بازرگانی
            </label>
            <textarea className="organization-leadership-expertise-input" maxLength="700" title="حداکثر 700 کاراکتر"
                      onChange={(e) => this.setState({...this.state, partnership_in_market: e.target.value})}/>

            <label>
              فرصت‌های همکاری در حوزۀ منابع انسانی
            </label>
            <textarea className="organization-leadership-expertise-input" maxLength="700" title="حداکثر 700 کاراکتر"
                      onChange={(e) => this.setState({...this.state, partnership_in_hr: e.target.value})}/>

            <label>
              فرصت‌های همکاری در حوزۀ تحقیق و توسعه
            </label>
            <textarea className="organization-leadership-expertise-input" maxLength="700" title="حداکثر 700 کاراکتر"
                      onChange={(e) => this.setState({...this.state, partnership_in_develop: e.target.value})}/>

            <label>
              فرصت‌های همکاری در حوزۀ تامین
            </label>
            <textarea className="organization-leadership-expertise-input" maxLength="700" title="حداکثر 700 کاراکتر"
                      onChange={(e) => this.setState({...this.state, partnership_in_supply: e.target.value})}/>

            <label>
              فرصت‌های همکاری در حوزۀ رسانه
            </label>
            <textarea className="organization-leadership-expertise-input" maxLength="700" title="حداکثر 700 کاراکتر"
                      onChange={(e) => this.setState({...this.state, partnership_in_media: e.target.value})}/>

            <label>
              فرصت‌های همکاری در حوزۀ پایان‌نامه و پروژه
            </label>
            <textarea className="organization-leadership-expertise-input" maxLength="700" title="حداکثر 700 کاراکتر"
                      onChange={(e) => this.setState({...this.state, partnership_in_project: e.target.value})}/>

            <label>
              سایر فرصت‌های همکاری
            </label>
            <textarea className="organization-leadership-expertise-input" maxLength="700" title="حداکثر 700 کاراکتر"
                      onChange={(e) => this.setState({...this.state, partnership_in_other: e.target.value})}/>

          </div>

        </React.Fragment>
    )
  }
}

export default FahadEventPageFive