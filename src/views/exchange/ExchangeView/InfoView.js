import React from "react"
import {Info, Ticket, QuestionMark,} from "src/images/icons"
import DefaultUserIcon from "../../../images/defaults/defaultUser_svg"
import {bindActionCreators} from "redux"
import educationActions from "src/redux/actions/educationActions"
import connect from "react-redux/es/connect/connect"


const InfoView = props => {
  const {currentExchange, owner} = props
  const profile = owner.profile.content.profile_user
  const media = owner.profile.content.profile_media
  props.actions.getEducationsByUserId({userId: profile.id})
  const {educations} = props
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
              {media !== null ? <img alt={"تصویر پروفایل"}
                                     src={media.file}
                                     width={"55px"} height={"55px"}
                                     className={"post-user-picture"}/>
                  : <DefaultUserIcon
                      height={"55px"} width={"55px"} className={"post-user-picture"}/>}
              <span
                  className={"info-exchange-username"}> {profile.first_name || profile.last_name !== null ?
                  profile.first_name + " " + profile.last_name : profile.username} </span>
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

const mapStateToProps = (state) => ({
  educations: state.users.educations,
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    getEducationsByUserId: educationActions.getEducationByUserId,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(InfoView)
