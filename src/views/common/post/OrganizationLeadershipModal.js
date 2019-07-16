import React, {PureComponent} from "react"
import exchangeActions from "src/redux/actions/exchangeActions"
import ExchangeMembershipActions from "src/redux/actions/commonActions/exchangeMembershipActions"
import PostActions from "src/redux/actions/commonActions/postActions"
import * as PropTypes from "prop-types"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {DefaultOrganIcon} from "src/images/icons"
import {Link} from "react-router-dom"
import constants from "src/consts/constants"
import {getMessages} from "src/redux/selectors/translateSelector"
import setExchangeActions from "src/redux/actions/user/setSelectedExchangeAction"
import likeActions from "src/redux/actions/commonActions/likeActions"
import {exchangeMemberships} from "src/redux/selectors/common/exchanges/ExchangeMemberships"
import {clientMemberships} from "src/redux/selectors/common/exchanges/ClientMemberships"
import {getAllOfExchanges} from "src/redux/selectors/common/exchanges/GetAllExchanges"

class OrganizationLeadershipModal extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      level: 1,
      jobTypes: [],
      jobTitle: "",
      jobExpertise: "",
      jobStatus: "",
      post: "",
      selectedExchanges: ["31953"],
    }
  }

  static proptypes = {
    toggle: PropTypes.func.isRequired,
    modalIsOpen: PropTypes.bool.isRequired,
  }

  componentDidMount() {
    const {actions} = this.props
    const {getExchangeById} = actions
    getExchangeById(19510, true)
    getExchangeById(5044, true)
    getExchangeById(4642, true)
    getExchangeById(31953, true)
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

  checkExchange(exchangeId) {
    console.log(exchangeId)
    let {selectedExchanges} = this.state
    let index = selectedExchanges.indexOf(exchangeId)
    if (index < 0) {
      let arr = selectedExchanges
      arr.push(exchangeId)
      this.setState({...this.state, selectedExchanges: arr.slice()})
    }
    else {
      let arr = selectedExchanges
      arr.splice(index, 1)
      this.setState({...this.state, selectedExchanges: arr.slice()})
    }
  }

  createLeadershipPost() {
    let {clientIdentity, toggle, actions, exchangeMemberships, clientExchangeMembership} = this.props
    let {post, jobTitle, jobTypes, selectedExchanges} = this.state
    let {createPost, followExchange} = actions
    let followedExchanges = []
    let firstExchange = 0

    clientExchangeMembership.forEach(id => {
      followedExchanges.push(exchangeMemberships[id].exchange_identity_related_exchange.toString())
    })

    selectedExchanges.forEach(exId => {
      let formValues = {
        files_count: 0,
        post_description: post,
        post_parent: parseInt(exId, 10),
        post_related_identity: clientIdentity.id,
        post_title: "موقعیت شغلی: " + jobTitle + " " + jobTypes.map(p => p),
        post_type: "demand",
      }
      let postParentId = parseInt(exId, 10)
      let postParentType = "exchange"
      createPost({formValues, postParentId, postParentType, postFileIds: []})
    })
    this.setState({...this.state, level: 1}, toggle())

    setTimeout(() => {
      selectedExchanges.forEach((exId, index) => {
        if (index === 0) {
          firstExchange = parseInt(exId, 10)
        }
        if (followedExchanges.indexOf(exId) < 0)
          followExchange({identityId: clientIdentity.id, exchangeIdentity: parseInt(exId, 10)})
      })
    }, 300)

    setTimeout(() => {
      this.props.actions.setExchange(firstExchange)
    }, 500)
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
        let {clientIdentity} = this.props
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
                    <Link to={clientIdentity.identity_type === constants.USER_TYPES.ORG ?
                        `/organization/${clientIdentity.id}` : `/user/${clientIdentity.id}`}>
                      <div className="organization-leadership-post-view-picture-con">
                        {
                          clientIdentity && clientIdentity.profile_media ?
                              <img alt="" className="organization-leadership-post-view-picture" src={clientIdentity.profile_media.file}/>
                              : <DefaultOrganIcon className="organization-leadership-post-view-picture"/>
                        }
                      </div>
                    </Link>
                    <div className="organization-leadership-post-view-info">
                      <div className="organization-leadership-post-view-name">
                        {
                          clientIdentity.official_name ? clientIdentity.official_name
                              : clientIdentity.nike_name ? clientIdentity.nike_name
                              : clientIdentity.first_name ? clientIdentity.first_name + " " + clientIdentity.last_name
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
                            defaultValue={post.replace(new RegExp(",", "g"), "،").replace(new RegExp(" {2}", "g"), " ")}/>
                </div>
                <div className="organization-leadership-job-desc">
                  میتوانید متن پست را به دلخواه ویرایش کنید.<br/>
                </div>
              </div>
            </React.Fragment>
        )
      case 5:
        let {selectedExchanges} = this.state
        let {exchanges, clientExchangeMembership, exchangeMemberships} = this.props
        return (
            <React.Fragment>
              <div className="organization-leadership-header">
                ارسال پست موقعیت شغلی
              </div>

              <div className="organization-leadership-body">
                <label>
                  ارسال در پنجره‌های
                  <span className={"secondary-color"}> * </span>
                  <div className="organization-leadership-exchange-container">
                    {selectedExchanges.map((p, inx) =>
                        <div key={`${p}${inx}.`}
                             className="organization-leadership-job-hashtags-selected"
                             onClick={() => this.checkExchange(p.toString())}>
                          {exchanges[p] && exchanges[p].name} &nbsp; ✕
                        </div>,
                    )}
                  </div>
                </label>
                <label>
                  پنجره های پیشنهادی برای ارسال موقعیت شغلی
                  <div className="organization-leadership-exchange-container">
                    <div className={selectedExchanges.indexOf("31953") < 0 ?
                        "organization-leadership-job-hashtags" : "organization-leadership-job-hashtags-selected"}
                         onClick={() => this.checkExchange("31953")}>
                      {exchanges[31953] && exchanges[31953].name}
                    </div>
                    <div className={selectedExchanges.indexOf("4642") < 0 ?
                        "organization-leadership-job-hashtags" : "organization-leadership-job-hashtags-selected"}
                         onClick={() => this.checkExchange("4642")}>
                      {exchanges[4642] && exchanges[4642].name}
                    </div>
                    <div className={selectedExchanges.indexOf("5044") < 0 ?
                        "organization-leadership-job-hashtags" : "organization-leadership-job-hashtags-selected"}
                         onClick={() => this.checkExchange("5044")}>
                      {exchanges[5044] && exchanges[5044].name}
                    </div>
                    <div className={selectedExchanges.indexOf("19510") < 0 ?
                        "organization-leadership-job-hashtags" : "organization-leadership-job-hashtags-selected"}
                         onClick={() => this.checkExchange("19510")}>
                      {exchanges[19510] && exchanges[19510].name}
                    </div>
                    {clientExchangeMembership.map((p, inx) =>
                        (
                            exchangeMemberships[p].exchange_identity_related_exchange.toString() !== "31953" &&
                            exchangeMemberships[p].exchange_identity_related_exchange.toString() !== "4642" &&
                            exchangeMemberships[p].exchange_identity_related_exchange.toString() !== "5044" &&
                            exchangeMemberships[p].exchange_identity_related_exchange.toString() !== "19510"
                        ) &&
                        <div key={`${p}${inx}`}
                             className={selectedExchanges.indexOf(exchangeMemberships[p].exchange_identity_related_exchange.toString()) < 0 ?
                                 "organization-leadership-job-hashtags" : "organization-leadership-job-hashtags-selected"}
                             onClick={() => this.checkExchange(exchangeMemberships[p].exchange_identity_related_exchange.toString())}>
                          {exchangeMemberships[p] && exchanges[exchangeMemberships[p].exchange_identity_related_exchange].name}
                        </div>,
                    )}
                  </div>
                </label>
              </div>
            </React.Fragment>
        )
      default:
        return null
    }
  }

  currentFooter() {
    let {level, jobTypes, jobTitle, jobExpertise, jobStatus} = this.state
    let {toggle, translate} = this.props
    switch (level) {
      case 1:
        return (
            <React.Fragment>
              <div className={jobTitle.length > 2 ? "org-leadership-next-button" : "org-leadership-hidden-button"}
                   onClick={() => jobTitle.length > 2 && this.setState({...this.state, level: ++level})}>
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
              <div className={jobExpertise.length > 2 ? "org-leadership-next-button" : "org-leadership-hidden-button"}
                   onClick={() => jobExpertise.length > 2 && this.setState({...this.state, level: ++level})}>
                ذخیره و ادامه
              </div>
              <div className="org-leadership-previous-button" onClick={() => this.setState({...this.state, level: --level})}>
                قبلی
              </div>
            </React.Fragment>
        )
      case 3:
        let {clientIdentity} = this.props
        return (
            <React.Fragment>
              <div className={jobStatus.length > 2 ? "org-leadership-next-button" : "org-leadership-hidden-button"}
                   onClick={() => jobStatus.length > 2 && this.setState({
                     ...this.state,
                     post:
                         `${translate[clientIdentity.identity_type]} ${clientIdentity.official_name ? clientIdentity.official_name : clientIdentity.nike_name ? clientIdentity.nike_name : clientIdentity.username} از میان واجدین شرایط ${jobTitle} ${jobTypes.length > 0 ? jobTypes.length === 1 ? jobTypes[0] : jobTypes.map(p => " " + p) : ""} جذب می‌کند.
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
        let {post} = this.state
        return (
            <React.Fragment>
              <div className={post.length > 3 ? "org-leadership-next-button" : "org-leadership-hidden-button"}
                   onClick={() => post.length > 3 && this.setState({...this.state, level: ++level})}>
                ذخیره و ادامه
              </div>
              <div className="org-leadership-previous-button" onClick={() => this.setState({...this.state, level: --level})}>
                قبلی
              </div>
            </React.Fragment>
        )
      case 5:
        let {selectedExchanges} = this.state
        return (
            <React.Fragment>
              <div className={selectedExchanges.length > 0 ? "org-leadership-next-button" : "org-leadership-hidden-button"}
                   onClick={() => selectedExchanges.length > 0 && this.createLeadershipPost()}>
                ارسال
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
    )
  }
}

const mapStateToProps = state => {
  const clientId = state.auth.client.identity.content
  const clientIdentity = state.identities.list[clientId]

  return {
    clientIdentity,
    clientExchangeMembership: clientMemberships(state),
    exchanges: getAllOfExchanges(state),
    exchangeMemberships: exchangeMemberships(state),
    translate: getMessages(state),
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    createPost: PostActions.createPost,
    getExchangeById: exchangeActions.getExchangeByExId,
    followExchange: ExchangeMembershipActions.createExchangeMembership,
    setExchange: setExchangeActions.setSelectedExchange,
    createLike: likeActions.createLike,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationLeadershipModal)