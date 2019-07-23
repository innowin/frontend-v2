import React, {PureComponent} from "react"
import RightArrowSvg from "src/images/common/right_arrow_svg"
import {CheckSvg, UploadIcon} from "src/images/icons"
import {REST_URL} from "src/consts/URLS"
import urls from "src/consts/URLS"
import axios from "axios"
import MyDatePicker from "../DatePicker"
import numberCorrection from "src/helpers/numberCorrection"
import FahadCurrentLevel from "./FahadCurrentLevel"

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
      organization_activities_category: "زیست فناوری",
      organization_abilities: "",
      organization_colleagues: "",
      organization_experiences: "",
      organization_certificates: "",
      organization_honors: "",

      selectedLogo: "",
      selectedCatalog: "",
      selectedCertificate: "",

      error: false,
      validationError: false,
      serverError: false,
    }
  }

  componentDidMount() {
    if (document.body.clientWidth > 480)
      window.scrollTo({top: 0, behavior: "smooth"})
    setTimeout(() => {
      this.getData(2, "organization_name")
      this.getData(7, "organization_brand_name")
      this.getData(8, "organization_title")
      this.getData(26, "organization_description")
      this.getData(9, "orgType")
      this.getData(10, "organization_registration_number")
      this.getData(32, "organization_registration_date")
      this.getData(11, "organization_registration_description")
      this.getData(13, "isKnowledgeBase")
      this.getData(33, "organization_knowledge_base_date")
      this.getData(17, "organization_phone_number")
      this.getData(18, "organization_website")
      this.getData(20, "organization_telegram")
      this.getData(19, "organization_instagram")
      this.getData(21, "organization_email")
      this.getData(22, "organization_address")
      this.getData(24, "organization_activities_category")
      this.getData(23, "orgJob")
      this.getData(27, "organization_abilities")
      this.getData(28, "organization_colleagues")
      this.getData(29, "organization_experiences")
      this.getData(30, "organization_certificates")
      this.getData(31, "organization_honors")

      this.getData(15, "selectedLogo")
      this.getData(16, "selectedCatalog")
      this.getData(25, "selectedCertificate")

    }, 100)
  }

  componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
    let {verification} = nextProps
    if (verification === 0) {
      this.checkValidations()
    }
  }

  componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
    let {selectedLogo, selectedCatalog, selectedCertificate} = this.state
    if (!this.props.uploading) {
      if (selectedLogo === -1 || selectedCatalog === -1 || selectedCertificate === -1) {
        this.props._changeUploading(true)
      }
    }
    else if (this.props.uploading) {
      if (selectedLogo !== -1 && selectedCatalog !== -1 && selectedCertificate !== -1) {
        this.props._changeUploading(false)
      }
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
      selectedLogo,
      selectedCatalog,
      selectedCertificate,
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
        organization_abilities.length >= 2 &&
        selectedLogo !== ""
    ) {
      successes = 0
      errors = 0
      this.sendData(2, organization_name)
      this.sendData(7, organization_brand_name)
      this.sendData(8, organization_title)
      this.sendData(26, organization_description)
      this.sendData(9, orgType)
      this.sendData(10, numberCorrection(organization_registration_number))
      this.sendData(32, organization_registration_date)
      this.sendData(11, organization_registration_description)
      this.sendData(13, isKnowledgeBase)
      this.sendData(33, organization_knowledge_base_date)
      this.sendData(17, numberCorrection(organization_phone_number))
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

      this.sendData(15, selectedLogo)
      this.sendData(16, selectedCatalog)
      this.sendData(25, selectedCertificate)
    }
    else {
      let modalCon = document.getElementById("fahadModalContainerDiv")
      modalCon.scrollTo({top: 0, behavior: "smooth"})
      this.setState(
          {
            ...this.state,
            validationError: true,

            organization_name_error: !(organization_name.length >= 2),
            organization_brand_name_error: !(organization_brand_name.length >= 2),
            organization_title_error: !(organization_title.length >= 2),
            organization_description_error: !(organization_description.length >= 2),
            organization_phone_number_error: !(organization_phone_number.length === 11),
            organization_address_error: !(organization_address.length > 2),
            orgJob_error: !(orgJob.length >= 1),
            organization_activities_category_error: !(organization_activities_category.length >= 2),
            organization_abilities_error: !(organization_abilities.length >= 2),
            selectedLogo_error: !(selectedLogo !== ""),
          },
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
          successes === 26 ? _nextLevel() : errors > 0 && this.serverError()
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
            fieldId === 23 ?
                this.setState({...this.state, [fieldData]: JSON.parse(response.data.results[0].entry_value)})
                : this.setState({...this.state, [fieldData]: response.data.results[0].entry_value})
          }
        })
        .catch((err) => {
          console.log(fieldId, err)
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

  uploadHandler(file, variable) {
    const {token, clientIdentityId} = this.props
    this.setState({...this.state, [variable]: -1}
        , () => {
          if (file) {
            let form = new FormData()
            form.append("file", file)
            form.append("uploader", clientIdentityId)
            axios.post(
                REST_URL + "/" + urls.COMMON.FILE + "/",
                form,
                {
                  headers: {
                    "Authorization": `JWT ${token}`,
                  },
                })
                .then((response) => {
                  if (response.statusText === "Created") {
                    this.setState({...this.state, [variable]: response.data.file})
                    console.log("Uploaded")
                  }
                })
                .catch((err) => {
                  console.log(err)
                })
          }
        })
  }

  render() {
    let {
      orgType, isKnowledgeBase, organization_registration_date, organization_knowledge_base_date, validationError, serverError,
      selectedLogo, selectedCatalog, selectedCertificate,

      orgJob,
      organization_name,
      organization_brand_name,
      organization_title,
      organization_description,
      organization_registration_number,
      organization_registration_description,
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

      organization_name_error,
      organization_brand_name_error,
      organization_title_error,
      organization_description_error,
      organization_phone_number_error,
      organization_address_error,
      orgJob_error,
      organization_activities_category_error,
      organization_abilities_error,
      selectedLogo_error,
    } = this.state
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
            <FahadCurrentLevel level={1}/>
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
            <input type={"text"} className={`organization-leadership-job-input ${organization_name_error && "input-red-error"}`}
                   placeholder={"نام ثبتی کامل مجموعه"}
                   maxLength="50" title="حداقل 2 کاراکتر، حداکثر 50" defaultValue={organization_name}
                   onChange={(e) => this.setState({...this.state, organization_name: e.target.value})}/>

            <label>
              نام برند
              <span className={"secondary-color"}> * </span>
            </label>
            <input type={"text"} className={`organization-leadership-job-input ${organization_brand_name_error && "input-red-error"}`}
                   placeholder={"نام برند مجموعه"} maxLength="50"
                   title="حداقل 2 کاراکتر، حداکثر 50" defaultValue={organization_brand_name}
                   onChange={(e) => this.setState({...this.state, organization_brand_name: e.target.value})}/>

            <label>
              شعار مجموعه
              <span className={"secondary-color"}> * </span>
            </label>
            <input type={"text"} className={`organization-leadership-job-input ${organization_title_error && "input-red-error"}`}
                   placeholder={"شعار مجموعه"} maxLength="150"
                   title="حداقل 2 کاراکتر، حداکثر 150" defaultValue={organization_title}
                   onChange={(e) => this.setState({...this.state, organization_title: e.target.value})}/>

            <label>
              معرفی مختصر مجموعه
              <span className={"secondary-color"}> * </span>
            </label>
            <textarea className={`organization-leadership-expertise-input ${organization_description_error && "input-red-error"}`}
                      maxLength="700" title="حداقل 2 کاراکتر، حداکثر 700"
                      placeholder={"شرکت پایاپژوهان علم و صنعت، ارائۀ خدمات مانیتورینگ و ابزاردقیق"}
                      name="organization_description" value={organization_description}
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
                    <input type={"number"} className="organization-leadership-job-input"
                           placeholder={"شمارۀ ثبت در اداره ثبت شرکت ها و موسسات تجاری و غیر تجاری"} defaultValue={organization_registration_number}
                           onChange={(e) => this.setState({...this.state, organization_registration_number: e.target.value})}/>
                    <label>
                      تاریخ ثبت
                    </label>
                    <MyDatePicker className='organization-leadership-job-input' defaultValue={organization_registration_date}
                                  getValue={e => this.setOrgPrivateDate(e)} placeHolder={"تاریخ ثبت"}/>
                  </div> : null
            }
            {
              orgType === "other" ?
                  <div className="selective-inputs-container">
                    <label>
                      توضیح
                    </label>
                    <input type={"text"} className="organization-leadership-job-input" defaultValue={organization_registration_description}
                           onChange={(e) => this.setState({...this.state, organization_registration_description: e.target.value})}/>
                  </div> : null
            }

            <div className='fahad-modal-card-checkboxes'>
              <form>
                <label className='fahad-modal-card-checkbox'>
                  <div className="organization-leadership-card-checkbox-title">
                    <input type="checkbox" name="kind" onChange={(e) => this.setKnowledgeBase(e)} checked={isKnowledgeBase}/>
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
                  </div> : null
            }

            <label>
              تصویر لوگو
              <span className={"secondary-color"}> * </span>
            </label>
            <div className={`fahad-modal-upload-svg-con ${selectedLogo_error && "input-red-error"}`}>
              {selectedLogo && selectedLogo !== "" ?
                  <img src={selectedLogo} alt="" className="fahad-modal-upload-svg-logo"/>
                  :
                  <UploadIcon className="fahad-modal-upload-svg"/>
              }
              <input type="file" accept=".png,.jpg,.jpeg" onChange={(e => this.uploadHandler(e.currentTarget.files[0], "selectedLogo"))}/>
            </div>

            <label>
              بارگزاری کاتالوگ مجموعه
            </label>
            <div className="fahad-modal-upload-svg-con">
              {selectedCatalog && selectedCatalog !== "" ?
                  <div style={{paddingTop: "5px"}}>
                    <CheckSvg className="fahad-modal-check-svg"/>
                  </div>
                  :
                  <UploadIcon className="fahad-modal-upload-svg"/>
              }
              <input type="file" onChange={(e => this.uploadHandler(e.currentTarget.files[0], "selectedCatalog"))}/>
            </div>

            <label>
              شمارۀ تماس
              <span className={"secondary-color"}> * </span>
            </label>
            <input type={"text"} className={`organization-leadership-job-input ${organization_phone_number_error && "input-red-error"}`}
                   placeholder={"02188884453"} maxLength="11" title="11 کاراکتر"
                   defaultValue={organization_phone_number}
                   onChange={(e) => this.setState({...this.state, organization_phone_number: e.target.value})}/>

            <label>
              وبسایت
            </label>
            <input type={"text"} className="organization-leadership-job-input" placeholder={"وبسایت"} maxLength="50"
                   defaultValue={organization_website}
                   onChange={(e) => this.setState({...this.state, organization_website: e.target.value})}/>

            <label>
              تلگرام
            </label>
            <input type={"text"} className="organization-leadership-job-input" placeholder={"تلگرام"} maxLength="50"
                   defaultValue={organization_telegram}
                   onChange={(e) => this.setState({...this.state, organization_telegram: e.target.value})}/>

            <label>
              اینستاگرام
            </label>
            <input type={"text"} className="organization-leadership-job-input" placeholder={"اینستاگرام"} maxLength="50"
                   defaultValue={organization_instagram}
                   onChange={(e) => this.setState({...this.state, organization_instagram: e.target.value})}/>

            <label>
              ایمیل
            </label>
            <input type={"email"} className="organization-leadership-job-input" placeholder={"ایمیل"} maxLength="50"
                   defaultValue={organization_email}
                   onChange={(e) => this.setState({...this.state, organization_email: e.target.value})}/>

            <label>
              آدرس
              <span className={"secondary-color"}> * </span>
            </label>
            <input type={"email"} className={`organization-leadership-job-input ${organization_address_error && "input-red-error"}`}
                   placeholder={"آدرس دفتر مرکزی"} maxLength="150"
                   title="حداقل 2 کاراکتر، حداکثر 150" defaultValue={organization_address}
                   onChange={(e) => this.setState({...this.state, organization_address: e.target.value})}/>

            <div className='fahad-modal-card-checkboxes'>
              <label title="حداقل یک مورد را انتخاب کنید">
                زمینۀ فعالیت
                <span className={"secondary-color"}> * </span>
              </label>
              <div className={orgJob_error ? "validation-error-fahad" : "validation-error-fahad-hide"}>
                حداقل یک زمینه فعالیت را انتخاب کنید
              </div>
              <form>
                <label className='fahad-modal-card-checkbox'>
                  <div className="organization-leadership-card-checkbox-title">
                    <input type="checkbox" name="kind" checked={orgJob.indexOf("تولیدی، خدمات صنعتی و آزمایشگاهی") >= 0}
                           onChange={() => this.setOrgJob("تولیدی، خدمات صنعتی و آزمایشگاهی")}/>
                    <span className='checkmark'/>
                    <span>تولیدی، خدمات صنعتی و آزمایشگاهی</span>
                  </div>
                </label>
                <label className='fahad-modal-card-checkbox'>
                  <div className="organization-leadership-card-checkbox-title">
                    <input type="checkbox" name="kind" checked={orgJob.indexOf("خدمات بازار و بازرگانی") >= 0}
                           onChange={() => this.setOrgJob("خدمات بازار و بازرگانی")}/>
                    <span className='checkmark'/>
                    <span>خدمات بازار و بازرگانی</span>
                  </div>
                </label>
                <label className='fahad-modal-card-checkbox'>
                  <div className="organization-leadership-card-checkbox-title">
                    <input type="checkbox" name="kind" checked={orgJob.indexOf("خدمات رسانه‌ای و تولید محتوا") >= 0}
                           onChange={() => this.setOrgJob("خدمات رسانه‌ای و تولید محتوا")}/>
                    <span className='checkmark'/>
                    <span>خدمات رسانه‌ای و تولید محتوا</span>
                  </div>
                </label>
                <label className='fahad-modal-card-checkbox'>
                  <div className="organization-leadership-card-checkbox-title">
                    <input type="checkbox" name="kind" checked={orgJob.indexOf("خدمات منابع انسانی") >= 0}
                           onChange={() => this.setOrgJob("خدمات منابع انسانی")}/>
                    <span className='checkmark'/>
                    <span>خدمات منابع انسانی</span>
                  </div>
                </label>
                <label className='fahad-modal-card-checkbox'>
                  <div className="organization-leadership-card-checkbox-title">
                    <input type="checkbox" name="kind" checked={orgJob.indexOf("خدمات شتاب‌دهی، مالی و سرمایه‌گذاری") >= 0}
                           onChange={() => this.setOrgJob("خدمات شتاب‌دهی، مالی و سرمایه‌گذاری")}/>
                    <span className='checkmark'/>
                    <span>خدمات شتاب‌دهی، مالی و سرمایه‌گذاری</span>
                  </div>
                </label>
                <label className='fahad-modal-card-checkbox'>
                  <div className="organization-leadership-card-checkbox-title">
                    <input type="checkbox" name="kind" checked={orgJob.indexOf("خدمات حقوقی") >= 0}
                           onChange={() => this.setOrgJob("خدمات حقوقی")}/>
                    <span className='checkmark'/>
                    <span>خدمات حقوقی</span>
                  </div>
                </label>
                <label className='fahad-modal-card-checkbox'>
                  <div className="organization-leadership-card-checkbox-title">
                    <input type="checkbox" name="kind" checked={orgJob.indexOf("سامانه‌های نوآوری بازار") >= 0}
                           onChange={() => this.setOrgJob("سامانه‌های نوآوری بازار")}/>
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
            <input type={"email"} className={`organization-leadership-job-input ${organization_activities_category_error && "input-red-error"}`}
                   placeholder={"دستۀ فعالیت"}
                   maxLength="50" title="حداقل 2 کاراکتر، حداکثر 50"
                   defaultValue={organization_activities_category === "" ? "زیست فناوری" : organization_activities_category}
                   onChange={(e) => this.setState({...this.state, organization_activities_category: e.target.value})}/>

            <label>
              توانمندی‌ها و خدمات مجموعه
              <span className={"secondary-color"}> * </span>
            </label>
            <textarea className={`organization-leadership-expertise-input ${organization_abilities_error && "input-red-error"}`}
                      placeholder={"توانمندی‌ها و خدمات اصلی قابل ارائه توسط مجموعه بیان شود"}
                      maxLength="700" title="حداقل 2 کاراکتر، حداکثر 700" name="organization_abilities" value={organization_abilities}
                      onChange={(e) => this.setState({...this.state, organization_abilities: e.target.value})}/>

            <label>
              همکاران و شرکای بین‌المللی
            </label>
            <textarea className="organization-leadership-expertise-input" placeholder={"همکاران و شرکای بین‌المللی"} maxLength="700"
                      name="organization_colleagues" value={organization_colleagues}
                      onChange={(e) => this.setState({...this.state, organization_colleagues: e.target.value})}/>

            <label>
              سوابق و تجارب بین‌المللی
            </label>
            <textarea className="organization-leadership-expertise-input" placeholder={"سوابق و تجارب بین‌المللی"} maxLength="700"
                      name="organization_experiences" value={organization_experiences}
                      onChange={(e) => this.setState({...this.state, organization_experiences: e.target.value})}/>

            <label>
              مجوزها و تأییدیه‌ها
            </label>
            <textarea className="organization-leadership-expertise-input" placeholder={"مجوزها و تأییدیه‌ها"} maxLength="700"
                      name="organization_certificates" value={organization_certificates}
                      onChange={(e) => this.setState({...this.state, organization_certificates: e.target.value})}/>

            <label>
              مستندات مجوزها و تأییدیه‌ها
            </label>
            <div className="fahad-modal-upload-svg-con">
              {selectedCertificate && selectedCertificate !== "" ?
                  <div style={{paddingTop: "5px"}}>
                    <CheckSvg className="fahad-modal-check-svg"/>
                  </div>
                  :
                  <UploadIcon className="fahad-modal-upload-svg"/>
              }
              <input type="file" onChange={(e => this.uploadHandler(e.currentTarget.files[0], "selectedCertificate"))}/>
            </div>

            <label>
              افتخارات
            </label>
            <textarea className="organization-leadership-expertise-input" placeholder={"افتخارات"} maxLength="700"
                      name="organization_honors" value={organization_honors}
                      onChange={(e) => this.setState({...this.state, organization_honors: e.target.value})}/>
          </div>
        </React.Fragment>
    )
  }
}

export default FahadEventPageOne
