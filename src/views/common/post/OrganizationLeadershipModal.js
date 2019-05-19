import React, {Component} from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {DefaultOrganIcon} from "src/images/icons"
import {Link} from "react-router-dom"


class OrganizationLeadershipModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      level: 1,
      jobTypes: [],
      jobTitle: "",
      jobExpertise: "",
      jobStatus: "",
      post: "",
    }
  }

  static proptypes = {
    toggle: PropTypes.func.isRequired,
    modalIsOpen: PropTypes.bool.isRequired,
  }

  checkJobType(jobTypeText) {
    console.log(jobTypeText)
    let {jobTypes} = this.state
    let index = jobTypes.indexOf(jobTypeText)
    if (index < 0) {
      let arr = jobTypes
      arr.push(jobTypeText)
      this.setState({...this.state, jobTypes: arr.slice()})
    }
    else {
      let arr = jobTypes
      arr.splice(index, 1)
      this.setState({...this.state, jobTypes: arr.slice()})
    }
  }

  currentLevel() {
    switch (this.state.level) {
      case 1:
        let {jobTypes, jobTitle} = this.state
        return (
            <React.Fragment>
              <div className="organization-leadership-header">
                ارسال پست موقعیت شغلی
              </div>

              <div className="organization-leadership-body">
                <label>
                  عنوان شغلی
                  <span className={"secondary-color"}> * </span>
                </label>
                <input type={"text"} className="organization-leadership-job-input" placeholder={"عنوان شغلی"}
                       onChange={(e) => this.setState({...this.state, jobTitle: e.target.value})} defaultValue={jobTitle}/>
                <div className="organization-leadership-job-desc">
                  مثال:<br/>
                  - برنامه نویس<br/>
                  - طراح گرافیک<br/>
                  - کارشناس بازاریابی<br/>
                  - کارشناس تولید محتوا<br/>
                  - مدیر پروژه<br/>
                  - مدیر محصول<br/>
                  - پژوهشگر<br/>
                </div>
                <div>
                  <div style={{marginBottom: "10px", marginTop: "20px"}}>
                    نوع همکاری
                  </div>
                  <div className="organization-leadership-hashtags-container">
                    <div className={jobTypes.indexOf("تمام‌وقت") < 0 ?
                        "organization-leadership-job-hashtags" : "organization-leadership-job-hashtags-selected"}
                         onClick={(e) => this.checkJobType(e.target.innerText.trim())}>
                      تمام‌وقت
                    </div>
                    <div className={jobTypes.indexOf("پاره‌وقت") < 0 ?
                        "organization-leadership-job-hashtags" : "organization-leadership-job-hashtags-selected"}
                         onClick={(e) => this.checkJobType(e.target.innerText.trim())}>
                      پاره‌وقت
                    </div>
                    <div className={jobTypes.indexOf("کارآموز") < 0 ?
                        "organization-leadership-job-hashtags" : "organization-leadership-job-hashtags-selected"}
                         onClick={(e) => this.checkJobType(e.target.innerText.trim())}>
                      کارآموز
                    </div>
                    <div className={jobTypes.indexOf("فریلنس") < 0 ?
                        "organization-leadership-job-hashtags" : "organization-leadership-job-hashtags-selected"}
                         onClick={(e) => this.checkJobType(e.target.innerText.trim())}>
                      فریلنس
                    </div>
                    <div className={jobTypes.indexOf("هم‌تیمی/هم‌بنیان‌گذار") < 0 ?
                        "organization-leadership-job-hashtags" : "organization-leadership-job-hashtags-selected"}
                         onClick={(e) => this.checkJobType(e.target.innerText.trim())}>
                      هم‌تیمی/هم‌بنیان‌گذار
                    </div>
                    <div className={jobTypes.indexOf("پروژه‌ای") < 0 ?
                        "organization-leadership-job-hashtags" : "organization-leadership-job-hashtags-selected"}
                         onClick={(e) => this.checkJobType(e.target.innerText.trim())}>
                      پروژه‌ای
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
        )
      case 2:
        let {jobExpertise} = this.state
        return (
            <React.Fragment>
              <div className="organization-leadership-header">
                ارسال پست موقعیت شغلی
              </div>

              <div className="organization-leadership-body">
                <label>
                  تخصص‌های مورد نظر
                  <span className={"secondary-color"}> * </span>
                </label>
                <textarea className="organization-leadership-expertise-input" placeholder={"تخصص‌های مورد نظر"} key={1}
                          onChange={(e) => this.setState({...this.state, jobExpertise: e.target.value})} defaultValue={jobExpertise}/>
                <div className="organization-leadership-job-desc">
                  مثال:<br/>
                  - آشنایی یا تسلط به زبان برنامه‌نویسی<br/>
                  - آشنایی یا تسلط به نرم‌افزار<br/>
                  - آشنایی با متدولوژی اسکرام<br/>
                  - تحصیلات آکادمیک<br/>
                  - زبان خارجی<br/>
                </div>
              </div>
            </React.Fragment>
        )
      case 3:
        let {jobStatus} = this.state
        return (
            <React.Fragment>
              <div className="organization-leadership-header">
                ارسال پست موقعیت شغلی
              </div>

              <div className="organization-leadership-body">
                <label>
                  شرایط عمومی
                  <span className={"secondary-color"}> * </span>
                </label>
                <textarea className="organization-leadership-expertise-input" placeholder={"شرایط عمومی"} key={2}
                          onChange={(e) => this.setState({...this.state, jobStatus: e.target.value})} defaultValue={jobStatus}/>
                <div className="organization-leadership-job-desc">
                  مثال:<br/>
                  - محدودۀ جغرافیایی و ساعت کاری<br/>
                  - وضعیت نظام‌وظیفه<br/>
                  - علائق و روحیات<br/>
                  - حدود دستمزد<br/>
                  - محدودۀ سنی<br/>
                  - وضعیت بیمه<br/>
                  - راه ارتباطی<br/>
                  - جنسیت<br/>
                </div>
              </div>
            </React.Fragment>
        )
      case 4:
        let {post} = this.state
        let {files, clientIdentity} = this.props
        return (
            <React.Fragment>
              <div className="organization-leadership-header">
                ارسال پست موقعیت شغلی
              </div>

              <div className="organization-leadership-body">
                <label>
                  پیش نمایش
                  <span className={"secondary-color"}> * </span>
                </label>
                <div style={{position: "relative"}}>
                  <div className="organization-leadership-post-view-header">
                    <Link to={`/organization/${clientIdentity.id}`}>
                      <div className="organization-leadership-post-view-picture-con">
                        {
                          clientIdentity && clientIdentity.profile_media ?
                              <img alt="" className="organization-leadership-post-view-picture" src={files[clientIdentity.profile_media].file}/>
                              : <DefaultOrganIcon className="organization-leadership-post-view-picture"/>
                        }
                      </div>
                    </Link>
                    <div className="organization-leadership-post-view-info">
                      <div className="organization-leadership-post-view-name">
                        {
                          clientIdentity.official_name ? clientIdentity.official_name
                              : clientIdentity.nike_name ? clientIdentity.nike_name
                              : clientIdentity.username
                        }
                      </div>
                      <div className="organization-leadership-post-view-date">
                        همین الان
                      </div>
                    </div>
                  </div>
                  <textarea className="organization-leadership-post-view-input"
                            onChange={(e) => this.setState({...this.state, post: e.target.value})}
                            defaultValue={post.replace(new RegExp(",", "g"), "،").replace(new RegExp("  ", "g"), " ")}/>
                </div>
                <div className="organization-leadership-job-desc">
                  میتوانید متن پست را به دلخواه ویرایش کنید.<br/>
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
              <div className="org-leadership-next-button" onClick={() => this.setState({...this.state, level: ++level})}>
                ذخیره و ادامه
              </div>
              <div className="org-leadership-previous-button" onClick={() => toggle()}>
                لغو
              </div>
            </React.Fragment>
        )
      case 2:
        return (
            <React.Fragment>
              <div className="org-leadership-next-button" onClick={() => this.setState({...this.state, level: ++level})}>
                ذخیره و ادامه
              </div>
              <div className="org-leadership-previous-button" onClick={() => this.setState({...this.state, level: --level})}>
                قبلی
              </div>
            </React.Fragment>
        )
      case 3:
        let {jobTypes, jobTitle, jobExpertise, jobStatus} = this.state
        let {clientIdentity} = this.props
        return (
            <React.Fragment>
              <div className="org-leadership-next-button"
                   onClick={() => this.setState({
                     ...this.state,
                     post:
                         `شرکت ${clientIdentity.official_name ? clientIdentity.official_name : clientIdentity.nike_name ? clientIdentity.nike_name : clientIdentity.username} از میان واجدین شرایط ${jobTitle} ${jobTypes.length > 0 ? jobTypes.length === 1 ? jobTypes[0] : jobTypes.map(p => " " + p) : ""} جذب می‌کند.
تخصص های مورد نیاز:
${jobExpertise}
شرایط عمومی:
${jobStatus}`,
                     level: ++level,
                   })}>
                ذخیره و ادامه
              </div>
              <div className="org-leadership-previous-button" onClick={() => this.setState({...this.state, level: --level})}>
                قبلی
              </div>
            </React.Fragment>
        )
      case 4:
        return (
            <React.Fragment>
              <div className="org-leadership-next-button" onClick={() => this.setState({...this.state, level: 1}, toggle())}>
                ذخیره
              </div>
              <div className="org-leadership-previous-button" onClick={() => this.setState({...this.state, level: --level})}>
                قبلی
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
        <React.Fragment>
          <div className={modalIsOpen ? "organization-leadership-bg" : "organization-leadership-bg-out"}>
            {
              modalIsOpen ?
                  <React.Fragment>
                    <div className="organization-leadership-container">
                      <div className="organization-leadership-elements">
                        {this.currentLevel()}
                      </div>
                    </div>
                    <div className="organization-leadership-footer">
                      {this.currentFooter()}
                    </div>
                  </React.Fragment>
                  : null
            }
          </div>
        </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  const clientId = state.auth.client.identity.content
  const clientIdentity = state.identities.list[clientId]

  return {
    clientIdentity: clientIdentity,
    files: state.common.file.list,
  }
}

export default connect(mapStateToProps)(OrganizationLeadershipModal)