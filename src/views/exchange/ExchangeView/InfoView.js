import React from "react"
import {Info, Ticket,QuestionMark,} from "src/images/icons"


const InfoView = props => {
  const {currentExchange} = props
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

export default InfoView