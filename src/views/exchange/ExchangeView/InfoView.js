import React, {Component} from "react"
import {Info, Ticket, QuestionMark,} from "src/images/icons"
import DefaultUserIcon from "../../../images/defaults/defaultUser_svg"
import {bindActionCreators} from "redux"
import educationActions from "src/redux/actions/educationActions"
import connect from "react-redux/es/connect/connect"
import {getMessages} from "src/redux/selectors/translateSelector"
import {VerifyWrapper} from "../../common/cards/Frames"

class InfoView extends Component {
  componentDidMount() {
    const {owner, actions} = this.props
    const profile = owner.profile.content.profile_user
    console.log("PROFILE INFO")
    console.log(profile)
    actions.getEducationsByUserId({userId: profile.id})
  }

  render() {
    const {currentExchange, owner, education, translate} = this.props
    const profile = owner.profile.content.profile_user
    const media = owner.profile.content.profile_media
    if (profile)
      if (education[profile.id]) {
        console.log("EDUCATION")
        console.log(education)
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
                    <div className={"info-exchange-owner-image-frame"}>
                      {media !== null ? <img alt={"تصویر پروفایل"}
                                             src={media.file}
                                             width={"55px"} height={"55px"}
                                             className={"post-user-picture"}/>
                          : <DefaultUserIcon
                              height={"55px"} width={"55px"} className={"post-user-picture"}/>}
                    </div>
                    <div className={"info-exchange-owner-image-frame-sibling"}>
                      <div className={"info-exchange-username"}> {profile.first_name || profile.last_name !== null ?
                          profile.first_name + " " + profile.last_name : profile.username} </div>
                      <div className={"info-exchange-education"}>
                        <span> {education[profile.id].grade} </span>
                        <span> {education[profile.id].field_of_study} </span><span> {translate["Of"]} </span>
                        <span> {education[profile.id].university} </span>
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

                </div>
              </div>
            </div>
        )
      }
      else return <VerifyWrapper isLoading={true} error={false}/>
    else return <VerifyWrapper isLoading={true} error={false}/>
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
