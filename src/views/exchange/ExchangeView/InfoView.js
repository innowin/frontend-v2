// @flow
import * as React from "react"
import {ClipLoader} from "react-spinners"
import {Component} from "react"
import {connect} from "react-redux"
import {getMessages} from "src/redux/selectors/translateSelector"
import {Info, Ticket, QuestionMark, DefaultUserIcon} from "src/images/icons"
import {Link} from "react-router-dom"
// import {bindActionCreators} from "redux"
// import educationActions from "src/redux/actions/user/educationActions"
// import {VerifyWrapper} from "../../common/cards/Frames"
// import getUserAction from "../../../redux/actions/user/getUserActions"
// import exchangeActions from "../../../redux/actions/exchangeActions"

type props = {
  educations: Object,
  exchangeId: number,
  exchanges: Object,
  translate: { [string]: string },
  users: Object,
}

class InfoView extends Component<props> {
  componentDidMount() {
    window.scrollTo({
      top: 0
    })
  }

  render() {
    const {educations, users, translate, exchanges, exchangeId} = this.props
    if (exchanges[exchangeId] && exchanges[exchangeId].exchange.content && exchanges[exchangeId].exchange.content.owner) {
      const currentExchange = exchanges[exchangeId].exchange.content
      const ownerId = parseInt(currentExchange.owner.identity_user, 10) // only users, should organization be check to
      if (users[ownerId].profile && users[ownerId].profile.content && users[ownerId].educations.content) {
        const ownerProfile = users[ownerId] && users[ownerId].profile.content.profile_user
        const ownerMedia = users[ownerId] && users[ownerId].profile.content.profile_media
        const ownerEducations = users[ownerId] && users[ownerId].educations.content
        return (
            <div>
              <div className={"info-frame"}>
                <div className={"info-header"}>
                  <Info width="22px" height="22px"
                        containerClass={"svg-container-info-view"}
                        svgClass={"svg-info-view"}/>
                  <span>معرفی</span>
                </div>
                <div className={"info-body"}>
                  {currentExchange.description}
                </div>
              </div>

              <div className={"info-frame"}>
                <div className={"info-header"}>
                  <Ticket width="22px" height="22px"
                          containerClass={"svg-container-info-view"}
                          svgClass={"svg-info-view"}/>
                  <span>کارگزار</span>
                </div>
                <div className={"info-body"}>
                  <div className={"info-exchange-owner-frame"}>
                    <Link to={`/user/${ownerProfile && ownerProfile.id}`}>
                      <div className={"info-exchange-owner-image-frame"}>
                        {ownerMedia && ownerMedia !== null ? <div className='rounded-circle-info-parent' ref={e => this.scroll = e}
                                                                  onLoad={() => this.scroll.scrollLeft = 10}><img alt={"تصویر پروفایل"}
                                                                                                                  src={ownerMedia.file}
                                                                                                                  height={"60px"}
                                                                                                                  className={"post-user-picture"}/>
                            </div>
                            : <DefaultUserIcon
                                height={"55px"} width={"55px"} className={"post-user-picture"}/>}
                      </div>
                    </Link>
                    <div className={"info-exchange-owner-image-frame-sibling"}>
                      <div className={"info-exchange-username"}> {ownerProfile ? ownerProfile.first_name || ownerProfile.last_name !== "" ?
                          ownerProfile.first_name + " " + ownerProfile.last_name : ownerProfile.username : null} </div>
                      <div className={"info-exchange-education"}>
                        {ownerEducations.map((p, inx) => <div key={inx}> -
                          <span> {!educations[p] ? "مقطع" : translate[educations[p].grade]} </span>
                          <span> {!educations[p] ? "رشته" : educations[p].field_of_study} </span>
                          <span> {translate["Of"]} </span>
                          <span> {!educations[p] ? "دانشگاه" : educations[p].university} </span>
                        </div>)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={"info-frame"}>
                <div className={"info-header"}>
                  <QuestionMark width="22px" height="22px"
                                containerClass={"svg-container-info-view"}
                                svgClass={"svg-info-view"}/> {/* TODO Add svg for Label ( Hashtags ) */}
                  <span>برچسب</span>
                </div>
                <div className={"info-body"}>

                </div>
              </div>

              <div className={"info-frame"}>
                <div className={"info-header"}>
                  <QuestionMark width="22px" height="22px"
                                containerClass={"svg-container-info-view"}
                                svgClass={"svg-info-view"}/> {/* TODO:Abel Add svg for Links ( link link :| ) */}
                  <span>پیوند</span>
                </div>
                <div className={"info-body"}>
             <span>
             <div className={"info-social"}>
             <i className={"fa fa-telegram"}/>
             <span className={"info-social-text"}>
             تلگرام:
             </span>
             <div className={"info-social-text-address"}>
             <div style={{display: "inline-block", width: "140px"}}>{/* TODO:Abel delete inline styles after back-end links fixed */}
             http://www.telegram.me/
             </div>
             <input className={"info-social-text-address-input"} style={{width: "calc(100% - 140px)"}} type={"text"}/>
             </div>
             </div>
             </span>

                  <div className={"info-social"}>
                    <i className={"fa fa-instagram"}/>
                    <span className={"info-social-text"}>
             اینستاگرام:
             </span>
                    <div className={"info-social-text-address"}>
                      <div style={{display: "inline-block", width: "160px"}}>
                        https://www.instagram.com/
                      </div>
                      <input className={"info-social-text-address-input"} style={{width: "calc(100% - 160px)"}} type={"text"}/>
                    </div>
                  </div>

                  <div className={"info-social"}>
                    <i className={"fa fa-linkedin"}/>
                    <span className={"info-social-text"}>
             لینکدین:
             </span>
                    <div className={"info-social-text-address"}>
                      <div style={{display: "inline-block", width: "160px"}}>
                        https://www.linkedin.com/in/
                      </div>
                      <input className={"info-social-text-address-input"} style={{width: "calc(100% - 160px)"}} type={"text"}/>
                    </div>
                  </div>

                  <span>
             <div className={"info-social"}>
             <i className={"fa fa-youtube-play youtube"}/>
             <span className={"info-social-text"}>
             یوتیوب:
             </span>
             <div className={"info-social-text-address"}>
             <div style={{display: "inline-block", width: "195px"}}>
             https://www.youtube.com/channel/
             </div>
             <input className={"info-social-text-address-input"} style={{width: "calc(100% - 195px)"}} type={"text"}/></div>
             </div>
             </span>

                  <div className={"info-social"}>
                    <i className={"fa fa-link"}/>
                    <span className={"info-social-text"}>
             وبسایت:
             </span> <span className={"info-social-text-address"}>
             <input className={"info-social-text-address-input"} placeholder={"آدرس سایت شما"}
                    type={"text"}/></span>
                  </div>
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
  users: state.users.list,
  translate: getMessages(state)
})

// const mapDispatchToProps = (dispatch) => ({
//   actions: bindActionCreators({
//     getEducationsByUserId: educationActions.getEducationByUserId,
//     getUserProfile: getUserAction.getProfileByUserId,
//   }, dispatch)
// })

export default connect(mapStateToProps, null)(InfoView)
