import React, {Component} from "react"
import {Info, Ticket, QuestionMark} from "src/images/icons"
import DefaultUserIcon from "../../../images/defaults/defaultUser_svg"
import {bindActionCreators} from "redux"
import educationActions from "src/redux/actions/user/educationActions"
import connect from "react-redux/es/connect/connect"
import {getMessages} from "src/redux/selectors/translateSelector"
import {VerifyWrapper} from "../../common/cards/Frames"
import {Link} from "react-router-dom"
import {ClipLoader} from "react-spinners"

class InfoView extends Component {
  componentDidMount() {
    window.scrollTo({
      top: 0
    })
    const {owner, actions} = this.props
    const profile = owner.profile.content.profile_user
    if (profile)
      actions.getEducationsByUserId({userId: profile.id})
  }

  render() {
    const {currentExchange, owner, education, translate} = this.props
    const profile = owner.profile.content.profile_user
    const media = owner.profile.content.profile_media
    let ownerEducations = owner.educations

    if (profile)
      if (!ownerEducations.isLoading) {
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
                  <span>کارگذار</span>
                </div>
                <div className={"info-body"}>
                  <div className={"info-exchange-owner-frame"}>
                    <Link to={`/user/${profile.id}`}>
                      <div className={"info-exchange-owner-image-frame"}>
                        {media !== null ? <div className='rounded-circle-info-parent' ref={e => this.scroll = e}
                                               onLoad={() => this.scroll.scrollLeft = 10}><img alt={"تصویر پروفایل"}
                                                                                               src={media.file}
                                                                                               height={"60px"}
                                                                                               className={"post-user-picture"}/>
                            </div>
                            : <DefaultUserIcon
                                height={"55px"} width={"55px"} className={"post-user-picture"}/>}
                      </div>
                    </Link>
                    <div className={"info-exchange-owner-image-frame-sibling"}>
                      <div className={"info-exchange-username"}> {profile.first_name || profile.last_name !== "" ?
                          profile.first_name + " " + profile.last_name : profile.username} </div>
                      <div className={"info-exchange-education"}>
                        {ownerEducations.content.map((p, inx) => <div key={inx}> -
                          <span> {!education[p] ? "مقطع" : education[p].grade} </span>
                          <span> {!education[p] ? "رشته" : education[p].field_of_study} </span>
                          <span> {translate["Of"]} </span>
                          <span> {!education[p] ? "دانشگاه" : education[p].university} </span>
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
                                svgClass={"svg-info-view"}/> {/* TODO Add svg for Links ( link link :| )*/}
                  <span>پیوند</span>
                </div>
                <div className={"info-body"}>
                  <span>
                    <div className={"info-social"}>
                      <i className={"fa fa-youtube-play youtube"}/>
                      <span className={"info-social-text"}>
                        یوتیوب:
                      </span> <span className={"info-social-text-address"}> https://www.instagram.com/
                      <input className={"info-social-text-address-input"} type={"text"}/></span>
                    </div>
                  </span>

                  <span>
                    <div className={"info-social"}>
                      <i className={"fa fa-telegram"}/>
                      <span className={"info-social-text"}>
                        تلگرام:
                      </span> <span className={"info-social-text-address"}> http://www.telegram.me/
                      <input className={"info-social-text-address-input"} type={"text"}/></span>
                    </div>
                  </span>

                  <div className={"info-social"}>
                    <i className={"fa fa-instagram"}/>
                    <span className={"info-social-text"}>
                        اینستاگرام:
                      </span> <span className={"info-social-text-address"}> https://www.youtube.com/channel/
                    <input className={"info-social-text-address-input"} type={"text"}/></span>
                  </div>

                  <div className={"info-social"}>
                    <i className={"fa fa-linkedin"}/>
                    <span className={"info-social-text"}>
                        لینکدین:
                      </span> <span className={"info-social-text-address"}> https://www.linkedin.com/in/
                    <input className={"info-social-text-address-input"} type={"text"}/></span>
                  </div>

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
      else return <div className={"info-loading"}><ClipLoader color="#C2B9BD" size={45} margin="4px" loading={true}/></div>
    else return <div className={"info-loading"}><ClipLoader color="#C2B9BD" size={45} margin="4px" loading={true}/></div>
  }
}

const mapStateToProps = (state) => ({
  education: state.education.list,
  translate: getMessages(state)
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    getEducationsByUserId: educationActions.getEducationByUserId,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(InfoView)
