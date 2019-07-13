import React, {PureComponent} from "react"
import RightArrowSvg from "src/images/common/right_arrow_svg"
import {UploadIcon} from "src/images/icons"
import {REST_URL} from "src/consts/URLS"
import urls from "src/consts/URLS"
import axios from "axios"
import MyDatePicker from "../DatePicker"

let successes = 0
let errors = 0

class FahadEventPageOne extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      orgType: "public",
      orgJob: [],
      isKnowledgeBase: false,

      organization_name: "",
      organization_brand_name: "",
      organization_title: "",
      organization_description: "",
      organization_registration_number: "",
      organization_registration_date: "",
      organization_registration_description: "",
      organization_knowledge_base_date: "",
      organization_phone_number: "",
      organization_website: "",
      organization_telegram: "",
      organization_instagram: "",
      organization_email: "",
      organization_address: "",
      organization_activities_category: "",
      organization_abilities: "",
      organization_colleagues: "",
      organization_experiences: "",
      organization_certificates: "",
      organization_honors: "",

      error: false,
      validationError: false,
      serverError: false,
    }
  }

  componentDidMount() {
    if (document.body.clientWidth > 480)
      window.scrollTo({top: 0, behavior: "smooth"})
  }

  componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
    let {verification} = nextProps
    if (verification === 0) {
      this.checkValidations()
    }
  }

  checkValidations() {
    let {
      orgType,
      orgJob,
      isKnowledgeBase,

      organization_name,
      organization_brand_name,
      organization_title,
      organization_description,
      organization_registration_number,
      organization_registration_date,
      organization_registration_description,
      organization_knowledge_base_date,
      organization_phone_number,
      organization_website,
      organization_telegram,
      organization_instagram,
      organization_email,
      organization_address,
      organization_activities_category,
      organization_abilities,
      organization_colleagues,
      organization_experiences,
      organization_certificates,
      organization_honors,
    } = this.state

    if (
        organization_name.length >= 2 &&
        organization_brand_name.length >= 2 &&
        organization_title.length >= 2 &&
        organization_description.length >= 2 &&
        organization_phone_number.length === 11 &&
        organization_address.length > 2 &&
        orgJob.length >= 1 &&
        organization_activities_category.length >= 2 &&
        organization_abilities.length >= 2
    ) {
      successes = 0
      this.sendData(2, organization_name)
      this.sendData(7, organization_brand_name)
      this.sendData(8, organization_title)
      this.sendData(26, organization_description)
      this.sendData(9, orgType)
      this.sendData(10, organization_registration_number)
      this.sendData(32, organization_registration_date)
      this.sendData(11, organization_registration_description)
      this.sendData(13, isKnowledgeBase)
      this.sendData(33, organization_knowledge_base_date)
      this.sendData(17, organization_phone_number)
      this.sendData(18, organization_website)
      this.sendData(20, organization_telegram)
      this.sendData(19, organization_instagram)
      this.sendData(21, organization_email)
      this.sendData(22, organization_address)
      this.sendData(24, organization_activities_category)
      this.sendData(23, orgJob)
      this.sendData(27, organization_abilities)
      this.sendData(28, organization_colleagues)
      this.sendData(29, organization_experiences)
      this.sendData(30, organization_certificates)
      this.sendData(31, organization_honors)
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
          entry_value: fieldData ? fieldId === 23 || fieldId === 13 ? JSON.stringify(fieldData) : fieldData : "",
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
          successes === 23 ? _nextLevel() : errors > 0 && this.serverError()
        })
        .catch((err) => {
          console.log(fieldId, err)
          console.log(fieldData)
          errors++
        })
  }


  setOrgType(orgType) {
    this.setState({...this.state, orgType: orgType})
  }

  setKnowledgeBase(e) {
    this.setState({...this.state, isKnowledgeBase: e.target.checked})
  }

  setOrgJob(job) {
    let {orgJob} = this.state
    let jobs = [...orgJob]
    orgJob.indexOf(job) >= 0 ? jobs.splice(orgJob.indexOf(job), 1) : jobs.push(job)
    this.setState({...this.state, orgJob: jobs})
  }

  setOrgPrivateDate(e) {
    this.setState({...this.state, organization_registration_date: e})
  }

  setOrgKnowledgeBaseDate(e) {
    this.setState({...this.state, organization_knowledge_base_date: e})
  }

  serverError() {
    let modalCon = document.getElementById("fahadModalContainerDiv")
    modalCon.scrollTo({top: 0, behavior: "smooth"})
    this.setState({...this.state, serverError: true})
    const {_changeIsLoading} = this.props
    _changeIsLoading()
  }

  render() {
    let {orgType, isKnowledgeBase, organization_registration_date, organization_knowledge_base_date, validationError, serverError} = this.state
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
              نام مجموعه
              <span className={"secondary-color"}> * </span>
            </label>
            <input type={"text"} className="organization-leadership-job-input" placeholder={"نام ثبتی کامل مجموعه"} maxLength="50"
                   title="حداقل 2 کاراکتر، حداکثر 50"
                   onChange={(e) => this.setState({...this.state, organization_name: e.target.value})}/>

            <label>
              نام برند
              <span className={"secondary-color"}> * </span>
            </label>
            <input type={"text"} className="organization-leadership-job-input" placeholder={"نام برند مجموعه"} maxLength="50"
                   title="حداقل 2 کاراکتر، حداکثر 50"
                   onChange={(e) => this.setState({...this.state, organization_brand_name: e.target.value})}/>

            <label>
              شعار مجموعه
              <span className={"secondary-color"}> * </span>
            </label>
            <input type={"text"} className="organization-leadership-job-input" placeholder={"شعار مجموعه"} maxLength="150"
                   title="حداقل 2 کاراکتر، حداکثر 150"
                   onChange={(e) => this.setState({...this.state, organization_title: e.target.value})}/>

            <label>
              معرفی مختصر مجموعه
              <span className={"secondary-color"}> * </span>
            </label>
            <textarea className="organization-leadership-expertise-input" maxLength="700" title="حداقل 2 کاراکتر، حداکثر 700"
                      placeholder={"شرکت پایاپژوهان علم و صنعت، ارائۀ خدمات مانیتورینگ و ابزاردقیق"}
                      onChange={(e) => this.setState({...this.state, organization_description: e.target.value})}/>

            <label>
              نوع ثبتی مجموعه
            </label>
            <div className='event-reg-modal-checkbox-cont' onClick={() => this.setOrgType("public")} style={{marginTop: "15px"}}>
              <div className={orgType === "public" ? "event-reg-modal-checkbox-selected" : "event-reg-modal-checkbox"}/>
              <div className='event-reg-modal-checkbox-title'>سهامی عام</div>
            </div>
            <div className='event-reg-modal-checkbox-cont' onClick={() => this.setOrgType("private")}>
              <div className={orgType === "private" ? "event-reg-modal-checkbox-selected" : "event-reg-modal-checkbox"}/>
              <div className='event-reg-modal-checkbox-title'>سهامی خاص</div>
            </div>
            <div className='event-reg-modal-checkbox-cont' onClick={() => this.setOrgType("limited")}>
              <div className={orgType === "limited" ? "event-reg-modal-checkbox-selected" : "event-reg-modal-checkbox"}/>
              <div className='event-reg-modal-checkbox-title'>مسئولیت محدود</div>
            </div>
            <div className='event-reg-modal-checkbox-cont' onClick={() => this.setOrgType("cooperative")}>
              <div className={orgType === "cooperative" ? "event-reg-modal-checkbox-selected" : "event-reg-modal-checkbox"}/>
              <div className='event-reg-modal-checkbox-title'>تعاونی</div>
            </div>
            <div className='event-reg-modal-checkbox-cont' onClick={() => this.setOrgType("other")}>
              <div className={orgType === "other" ? "event-reg-modal-checkbox-selected" : "event-reg-modal-checkbox"}/>
              <div className='event-reg-modal-checkbox-title'>سایر</div>
            </div>
            <div className='event-reg-modal-checkbox-cont' onClick={() => this.setOrgType("none")}>
              <div className={orgType === "none" ? "event-reg-modal-checkbox-selected" : "event-reg-modal-checkbox"}/>
              <div className='event-reg-modal-checkbox-title'>در حال حاضر هویت حقوقی مجموعه ثبت نشده است</div>
            </div>

            {
              orgType === "private" ?
                  <div className="selective-inputs-container">
                    <label>
                      شمارۀ ثبت
                    </label>
                    <input type={"text"} className="organization-leadership-job-input"
                           placeholder={"شمارۀ ثبت در اداره ثبت شرکت ها و موسسات تجاری و غیر تجاری"}
                           onChange={(e) => this.setState({...this.state, organization_registration_number: e.target.value})}/>
                    <label>
                      تاریخ ثبت
                    </label>
                    <MyDatePicker className='organization-leadership-job-input' defaultValue={organization_registration_date}
                                  getValue={e => this.setOrgPrivateDate(e)} placeHolder={"تاریخ ثبت"}/>
                    {/*<input type={"date"} className="organization-leadership-job-input"*/}
                    {/*       onChange={(e) => this.setState({...this.state, organization_registration_date: e.target.value})}/>*/}
                  </div> : null
            }
            {
              orgType === "other" ?
                  <div className="selective-inputs-container">
                    <label>
                      توضیح
                    </label>
                    <input type={"text"} className="organization-leadership-job-input"
                           onChange={(e) => this.setState({...this.state, organization_registration_description: e.target.value})}/>
                  </div> : null
            }

            <div className='fahad-modal-card-checkboxes'>
              <form>
                <label className='fahad-modal-card-checkbox'>
                  <div className="organization-leadership-card-checkbox-title">
                    <input type="checkbox" name="kind" onChange={(e) => this.setKnowledgeBase(e)}/>
                    <span className='checkmark'/>
                    <span>دارای گواهی دانش‌بنیان</span>
                  </div>
                </label>
              </form>
            </div>

            {
              isKnowledgeBase ?
                  <div className="selective-inputs-container">
                    <label>
                      تاریخ اعتبار گواهی دانش‌بنیان
                    </label>
                    <MyDatePicker className='organization-leadership-job-input' defaultValue={organization_knowledge_base_date}
                                  getValue={e => this.setOrgKnowledgeBaseDate(e)} placeHolder={"تاریخ اعتبار گواهی دانش‌بنیان"}/>
                    {/*<input type={"date"} className="organization-leadership-job-input"*/}
                    {/*       onChange={(e) => this.setState({...this.state, organization_knowledge_base_date: e.target.value})}/>*/}
                  </div> : null
            }

            <label>
              تصویر لوگو
              <span className={"secondary-color"}> * </span>
            </label>
            <div className="fahad-modal-upload-svg-con"><UploadIcon className="fahad-modal-upload-svg"/></div>

            <label>
              بارگزاری کاتالوگ مجموعه
            </label>
            <div className="fahad-modal-upload-svg-con"><UploadIcon className="fahad-modal-upload-svg"/></div>

            <label>
              شمارۀ تماس
              <span className={"secondary-color"}> * </span>
            </label>
            <input type={"text"} className="organization-leadership-job-input" placeholder={"شمارۀ تماس مجموعه"} maxLength="11" title="11 کاراکتر"
                   onChange={(e) => this.setState({...this.state, organization_phone_number: e.target.value})}/>

            <label>
              وبسایت
            </label>
            <input type={"text"} className="organization-leadership-job-input" placeholder={"وبسایت"} maxLength="50"
                   onChange={(e) => this.setState({...this.state, organization_website: e.target.value})}/>

            <label>
              تلگرام
            </label>
            <input type={"text"} className="organization-leadership-job-input" placeholder={"تلگرام"} maxLength="50"
                   onChange={(e) => this.setState({...this.state, organization_telegram: e.target.value})}/>

            <label>
              اینستاگرام
            </label>
            <input type={"text"} className="organization-leadership-job-input" placeholder={"اینستاگرام"} maxLength="50"
                   onChange={(e) => this.setState({...this.state, organization_instagram: e.target.value})}/>

            <label>
              ایمیل
            </label>
            <input type={"email"} className="organization-leadership-job-input" placeholder={"ایمیل"} maxLength="50"
                   onChange={(e) => this.setState({...this.state, organization_email: e.target.value})}/>

            <label>
              آدرس
              <span className={"secondary-color"}> * </span>
            </label>
            <input type={"email"} className="organization-leadership-job-input" placeholder={"آدرس دفتر مرکزی"} maxLength="150"
                   title="حداقل 2 کاراکتر، حداکثر 150"
                   onChange={(e) => this.setState({...this.state, organization_address: e.target.value})}/>

            <div className='fahad-modal-card-checkboxes'>
              <label title="حداقل یک مورد را انتخاب کنید">
                زمینۀ فعالیت
                <span className={"secondary-color"}> * </span>
              </label>
              <form>
                <label className='fahad-modal-card-checkbox'>
                  <div className="organization-leadership-card-checkbox-title">
                    <input type="checkbox" name="kind" onChange={() => this.setOrgJob("تولیدی، خدمات صنعتی و آزمایشگاهی")}/>
                    <span className='checkmark'/>
                    <span>تولیدی، خدمات صنعتی و آزمایشگاهی</span>
                  </div>
                </label>
                <label className='fahad-modal-card-checkbox'>
                  <div className="organization-leadership-card-checkbox-title">
                    <input type="checkbox" name="kind" onChange={() => this.setOrgJob("خدمات بازار و بازرگانی")}/>
                    <span className='checkmark'/>
                    <span>خدمات بازار و بازرگانی</span>
                  </div>
                </label>
                <label className='fahad-modal-card-checkbox'>
                  <div className="organization-leadership-card-checkbox-title">
                    <input type="checkbox" name="kind" onChange={() => this.setOrgJob("خدمات رسانه‌ای و تولید محتوا")}/>
                    <span className='checkmark'/>
                    <span>خدمات رسانه‌ای و تولید محتوا</span>
                  </div>
                </label>
                <label className='fahad-modal-card-checkbox'>
                  <div className="organization-leadership-card-checkbox-title">
                    <input type="checkbox" name="kind" onChange={() => this.setOrgJob("خدمات منابع انسانی")}/>
                    <span className='checkmark'/>
                    <span>خدمات منابع انسانی</span>
                  </div>
                </label>
                <label className='fahad-modal-card-checkbox'>
                  <div className="organization-leadership-card-checkbox-title">
                    <input type="checkbox" name="kind" onChange={() => this.setOrgJob("خدمات شتاب‌دهی، مالی و سرمایه‌گذاری")}/>
                    <span className='checkmark'/>
                    <span>خدمات شتاب‌دهی، مالی و سرمایه‌گذاری</span>
                  </div>
                </label>
                <label className='fahad-modal-card-checkbox'>
                  <div className="organization-leadership-card-checkbox-title">
                    <input type="checkbox" name="kind" onChange={() => this.setOrgJob("خدمات حقوقی")}/>
                    <span className='checkmark'/>
                    <span>خدمات حقوقی</span>
                  </div>
                </label>
                <label className='fahad-modal-card-checkbox'>
                  <div className="organization-leadership-card-checkbox-title">
                    <input type="checkbox" name="kind" onChange={() => this.setOrgJob("سامانه‌های نوآوری بازار")}/>
                    <span className='checkmark'/>
                    <span>سامانه‌های نوآوری بازار</span>
                  </div>
                </label>
              </form>
            </div>

            <label>
              دستۀ فعالیت
              <span className={"secondary-color"}> * </span>
            </label>
            <input type={"email"} className="organization-leadership-job-input" placeholder={"دستۀ فعالیت"} maxLength="50"
                   title="حداقل 2 کاراکتر، حداکثر 50"
                   onChange={(e) => this.setState({...this.state, organization_activities_category: e.target.value})}/>

            <label>
              توانمندی‌ها و خدمات مجموعه
              <span className={"secondary-color"}> * </span>
            </label>
            <textarea className="organization-leadership-expertise-input" placeholder={"توانمندی‌ها و خدمات اصلی قابل ارائه توسط مجموعه بیان شود"}
                      maxLength="700" title="حداقل 2 کاراکتر، حداکثر 700"
                      onChange={(e) => this.setState({...this.state, organization_abilities: e.target.value})}/>

            <label>
              همکاران و شرکای بین‌المللی
            </label>
            <textarea className="organization-leadership-expertise-input" placeholder={"همکاران و شرکای بین‌المللی"} maxLength="700"
                      onChange={(e) => this.setState({...this.state, organization_colleagues: e.target.value})}/>

            <label>
              سوابق و تجارب بین‌المللی
            </label>
            <textarea className="organization-leadership-expertise-input" placeholder={"سوابق و تجارب بین‌المللی"} maxLength="700"
                      onChange={(e) => this.setState({...this.state, organization_experiences: e.target.value})}/>

            <label>
              مجوزها و تأییدیه‌ها
            </label>
            <textarea className="organization-leadership-expertise-input" placeholder={"مجوزها و تأییدیه‌ها"} maxLength="700"
                      onChange={(e) => this.setState({...this.state, organization_certificates: e.target.value})}/>

            <label>
              مستندات مجوزها و تأییدیه‌ها
            </label>
            <div className="fahad-modal-upload-svg-con"><UploadIcon className="fahad-modal-upload-svg"/></div>

            <label>
              افتخارات
            </label>
            <textarea className="organization-leadership-expertise-input" placeholder={"افتخارات"} maxLength="700"
                      onChange={(e) => this.setState({...this.state, organization_honors: e.target.value})}/>

          </div>
        </React.Fragment>
    )
  }
}

export default FahadEventPageOne
