// @flow
import * as React from "react"
import {ClipLoader} from "react-spinners"
import {Component} from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {getMessages} from "src/redux/selectors/translateSelector"
import {Link} from "react-router-dom"
import checkOwner from "../../common/CheckOwner"
import exchangeActions from "../../../redux/actions/exchangeActions"
import {getFiles} from "src/redux/actions/commonActions/fileActions"
// import {bindActionCreators} from "redux"
// import educationActions from "src/redux/actions/user/educationActions"
// import {VerifyWrapper} from "../../common/cards/Frames"
// import getUserAction from "../../../redux/actions/user/getUserActions"
// import exchangeActions from "../../../redux/actions/exchangeActions"

type props = {
  actions: {
    editExchange: Function,
  },
  educations: Object,
  exchangeId: number,
  exchanges: Object,
  translate: { [string]: string },
  identities: Object,
}

type state = {
  editBio: boolean,
  editSocial: boolean,
  exchangeBio: string,
}

class InfoView extends Component<props, state> {
  constructor(props) {
    super(props)
    this.state = {
      editBio: false,
      editSocial: false,
      exchangeBio: ""
    }
  }

  componentDidMount() {
    let {exchanges, exchangeId, actions} = this.props
    const currentExchange = exchanges[exchangeId]
    if (currentExchange && currentExchange.owner && currentExchange.owner.profile_media) {
      actions.getFiles(currentExchange.owner.profile_media)
    }
    if (document.body.clientWidth > 480)
      window.scrollTo({top: 0, behavior: "smooth"})
  }

  _handleEditBioView() {
    let {editBio} = this.state
    let {exchanges, exchangeId} = this.props
    const currentExchange = exchanges[exchangeId]
    this.setState({...this.state, editBio: !editBio, exchangeBio: currentExchange.biography})
  }

  _handleEditBio() {
    let {editBio, exchangeBio} = this.state
    let {actions, exchangeId} = this.props
    let {editExchange} = actions

    const self: any = this

    if (exchangeBio.length < 100) {
      self.bioError.className = "info-body-bio-text-area-error-hide"
      let formValues = {
        exchange_id: exchangeId,
        exchange_biography: exchangeBio
      }
      editExchange(formValues)
      this.setState({...this.state, editBio: !editBio})
    }
    else {
      self.bioError.className = "info-body-bio-text-area-error"
    }
  }

  _handleEditSocialView() {
    let {editSocial} = this.state
    // let {exchanges, exchangeId} = this.props
    // const currentExchange = exchanges[exchangeId].exchange.content
    this.setState({...this.state, editSocial: !editSocial})
  }

  _handleEditSocial() {
    let {editSocial} = this.state
    // let {actions, exchangeId} = this.props
    // let {editExchange} = actions

    // if (exchangeBio.length < 100) {
    //   this.bioError.className = "info-body-bio-text-area-error-hide"
    //   let formValues = {
    //     exchange_id: exchangeId,
    //     exchange_biography: exchangeBio,
    //   }
    //   editExchange(formValues)
    this.setState({...this.state, editSocial: !editSocial})
    // } else {
    //   this.bioError.className = "info-body-bio-text-area-error"
    // }
  }

  render() {
    const {/*educations, files,*/ translate, exchanges, exchangeId} = this.props
    const {editBio, exchangeBio, editSocial} = this.state
    if (exchanges[exchangeId] && exchanges[exchangeId].owner) {
      const currentExchange = exchanges[exchangeId]
      console.log("currentExchange", currentExchange)
      const ownerId = parseInt(currentExchange.owner.id, 10)
      const owner = exchanges[exchangeId].owner
      // const ownerEducations = Object.values(educations).filter(p => p.education_related_identity === ownerId)
      // console.log("ownerEducations", ownerEducations)
      if (owner) {
        return (
            <div>
              <div className="info-frame">
                <div className="info-header">
                  {/*
                  <Info width="22px" height="22px"
                        containerClass={"svg-container-info-view"}
                        svgClass={"svg-info-view"}/>
*/}
                  <span>معرفی</span>
                  {
                    checkOwner({
                      id: ownerId,
                      children: <a className={editBio ? "info-header-edit-bio-text-hide" : "info-header-edit-bio-text"}
                                   onClick={() => this._handleEditBioView()}> ویرایش </a>
                    })
                  }

                </div>
                <div className="info-body">
                  {editBio ?
                      <div>
                        <textarea className="info-body-bio-text-area" placeholder="معرفی‌نامه پنجره"
                                  defaultValue={exchangeBio !== "" ? exchangeBio : currentExchange && currentExchange.biography}
                                  onChange={(e) => this.setState({...this.state, exchangeBio: e.target.value})}/>
                        <div className={"info-body-bio-text-area-error-hide"} ref={e => this.bioError = e}>
                          {translate["Biography Length is Illegal"]}
                        </div>
                        <button className="info-confirm-button" onClick={() => this._handleEditBio()}>
                          {translate["Confirm"]}
                        </button>
                        <button className="info-cancel-button" onClick={() => this._handleEditBioView()}>
                          {translate["Cancel"]}
                        </button>
                        <div style={{clear: "both"}}/>
                      </div>
                      :
                      currentExchange && (currentExchange.biography === "" || currentExchange.biography === null) ?
                          "بدون معرفی‌نامه" : currentExchange.biography
                  }
                </div>
              </div>

              <div className={"info-frame"}>
                <div className={"info-header"}>
                  {/*
                  <Ticket width="22px" height="22px"
                          containerClass={"svg-container-info-view"}
                          svgClass={"svg-info-view"}/>
*/}
                  <span>مشخصات</span>
                  {
                    checkOwner({
                      id: ownerId,
                      children: <a className={editSocial ? "info-header-edit-bio-text-hide" : "info-header-edit-bio-text"}
                                   onClick={() => console.log("Handle Edit This One")}> ویرایش </a>
                    })
                  }
                </div>
                <div className="info-body">
                  <div className="product-attributes-cont">
                    <div className="product-attributes-title">
                      کارگزار
                    </div>
                    <div className="product-attributes-value">
                      <Link to={owner.identity_type === "user" ? `/user/${owner.id}` : `/organization/${owner.id}`}>
                        {owner.first_name !== "" || owner.last_name !== "" ?
                            owner.first_name + " " + owner.last_name : owner.username}
                      </Link>
                    </div>
                  </div>
                  <div className="product-attributes-cont">
                    <div className="product-attributes-title">
                      وبسایت
                    </div>
                    <div className="product-attributes-value">
                      {currentExchange && currentExchange.link ? currentExchange.link : <div> &nbsp; </div>}
                    </div>
                  </div>
                  <div className="product-attributes-cont">
                    <div className="product-attributes-title">
                      تعداد عرضه
                    </div>
                    <div className="product-attributes-value">
                      {currentExchange && currentExchange.supply_count}
                    </div>
                  </div>
                  <div className="product-attributes-cont">
                    <div className="product-attributes-title">
                      تعداد تقاضا
                    </div>
                    <div className="product-attributes-value">
                      {currentExchange && currentExchange.demand_count}
                    </div>
                  </div>
                  <div className="product-attributes-cont">
                    <div className="product-attributes-title">
                      تعداد پست‌ها
                    </div>
                    <div className="product-attributes-value">
                      {currentExchange && currentExchange.post_count}
                    </div>
                  </div>
                  {/*<div className={"info-exchange-owner-frame"}>
                    <Link to={owner.identity_type === "user" ? `/user/${owner.id}` : `/organization/${owner.id}`}>
                      <div className={"info-exchange-owner-image-frame"}>
                        {owner.profile_media !== null ?
                            <div className='rounded-circle-info-parent' ref={e => this.scroll = e}
                                 onLoad={() => this.scroll.scrollLeft = 10}>
                              <img alt={"تصویر پروفایل"}
                                   src={files[owner.profile_media] && files[owner.profile_media].file}
                                   height={"60px"}
                                   className={"post-user-picture"}/>
                            </div>
                            : <DefaultUserIcon
                                height={"55px"} width={"55px"} className={"post-user-picture"}/>}
                      </div>
                    </Link>
                    <div className={"info-exchange-owner-image-frame-sibling"}>
                      <div className={"info-exchange-username"}> {owner.first_name !== "" || owner.last_name !== "" ?
                          owner.first_name + " " + owner.last_name : owner.username} </div>
                      <div className={"info-exchange-education"}>
                        {ownerEducations.map((p, inx) => <div key={inx}> -
                          <span> {" مقطع " + translate[p.grade]} </span>
                          <span> {" رشته " + p.field_of_study} </span>
                          <span> {translate["Of"]} </span>
                          <span> {" دانشگاه " + p.university} </span>
                        </div>)}
                      </div>
                    </div>
                  </div>*/}
                </div>
              </div>

              {/*<div className={"info-frame"}>*/}
              {/*<div className={"info-header"}>*/}
              {/*<QuestionMark width="22px" height="22px"*/}
              {/*containerClass={"svg-container-info-view"}*/}
              {/*svgClass={"svg-info-view"}/> /!* TODO Add svg for Label ( Hashtags ) *!/*/}
              {/*<span>برچسب</span>*/}
              {/*</div>*/}
              {/*<div className={"info-body"}>*/}

              {/*</div>*/}
              {/*</div>*/}

              <div className={"info-frame"}>
                <div className={"info-header"}>
                  {/*
                  <QuestionMark width="22px" height="22px"
                                containerClass={"svg-container-info-view"}
                                svgClass={"svg-info-view"}/>
*/}
                  <span>زمینۀ فعالیت پنجره</span>
                  {
                    checkOwner({
                      id: ownerId,
                      children: <a className={editSocial ? "info-header-edit-bio-text-hide" : "info-header-edit-bio-text"}
                                   onClick={() => console.log("Handle Edit This Too")}> ویرایش </a>
                    })
                  }
                </div>
                <div className={"info-body"}>
                  {currentExchange && currentExchange.exchange_hashtag && currentExchange.exchange_hashtag.length > 0 ?
                      currentExchange.exchange_hashtag.map((p) => <div className="exchange-hashtags">{p}</div>)
                      : <div>
                        <div className="exchange-hashtags">
                          پیدا کردن هم‌درس
                        </div>
                        <div className="exchange-hashtags">
                          تأمین نیروی انسانی
                        </div>
                        <div className="exchange-hashtags">
                          تأمین سرمایه
                        </div>
                        <div className="exchange-hashtags">
                          آموزش
                        </div>
                        <div className="exchange-hashtags">
                          فضای کاری
                        </div>
                      </div>
                  }
                  {/*
                  {editSocial ?
                      <div>
                        <div>
                          <div className={"info-social"}>
                            <i className={"fa fa-telegram"}/>
                            <div className={"info-social-text"}>
                              تلگرام:
                            </div>
                          </div>


                          <div className={"info-social"}>
                            <i className={"fa fa-instagram"}/>
                            <div className={"info-social-text"}>
                              اینستاگرام:
                            </div>
                          </div>

                          <div className={"info-social"}>
                            <i className={"fa fa-linkedin"}/>
                            <div className={"info-social-text"}>
                              لینکدین:
                            </div>
                          </div>

                          <div className={"info-social"}>
                            <i className={"fa fa-twitter"}/>
                            <div className={"info-social-text"}>
                              توییتر:
                            </div>
                          </div>

                          <div className={"info-social"}>
                            <i className={"fa fa-link"}/>
                            <div className={"info-social-text"}>
                              وبسایت:
                            </div>
                          </div>
                        </div>
                        <button className="info-confirm-button" onClick={() => this._handleEditSocial()}>
                          {translate["Confirm"]}
                        </button>
                        <button className="info-cancel-button" onClick={() => this._handleEditSocialView()}>
                          {translate["Cancel"]}
                        </button>
                        <div style={{clear: "both"}}/>
                      </div>
                      :
                      <div>
                        <div className={"info-social"}>
                          <i className={"fa fa-telegram"}/>
                          <div className={"info-social-text"}>
                            تلگرام:
                          </div>
                          <div className="info-social-text-address">
                            https://www.telegram.me/
                          </div>
                        </div>

                        <div className={"info-social"}>
                          <i className={"fa fa-instagram"}/>
                          <div className={"info-social-text"}>
                            اینستاگرام:
                          </div>
                          <div className="info-social-text-address">
                            https://www.instagram.com/
                          </div>
                        </div>

                        <div className={"info-social"}>
                          <i className={"fa fa-linkedin"}/>
                          <div className={"info-social-text"}>
                            لینکدین:
                          </div>
                          <div className="info-social-text-address">
                            https://www.linkedin.com/in/
                          </div>
                        </div>

                        <div className={"info-social"}>
                          <i className={"fa fa-twitter"}/>
                          <div className={"info-social-text"}>
                            توییتر:
                          </div>
                          <div className="info-social-text-address">
                            https://twitter.com/
                          </div>
                        </div>

                        <div className={"info-social"}>
                          <i className={"fa fa-link"}/>
                          <div className={"info-social-text"}>
                            وبسایت:
                          </div>
                        </div>
                      </div>
                  }
*/}
                </div>
              </div>
            </div>
        )
      }
      else return <div className={"info-loading"}>
        <ClipLoader color="#C2B9BD" size={45} margin="4px" loading={true}/>
      </div>
    }
    else return <div className={"info-loading"}>
      <ClipLoader color="#C2B9BD" size={45} margin="4px" loading={true}/>
    </div>
  }
}

const mapStateToProps = (state) => ({
  educations: state.education.list,
  exchanges: state.exchanges.list,
  identities: state.identities.list,
  translate: getMessages(state),
  files: state.common.file.list
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    editExchange: exchangeActions.editExchange,
    getFiles
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(InfoView)
