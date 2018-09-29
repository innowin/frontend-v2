// @flow
import * as React from "react"
import {connect} from "react-redux"

import {getMessages} from "../../../redux/selectors/translateSelector"
import {CategoryTitle, FrameCard, ListGroup} from "../../common/cards/Frames";

import EducationInfoContainer from './EducationInfoContainer'
import ResearchesInfoContainer from "./ResearchesInfoContainer";

// flow type of WorkExperiences
type PropsEducations = {
  userId: number,
  translate: { [string]: string },
}

const Educations = (props: PropsEducations) => {
    const {translate, userId} = props
    return (
        <div>
          <CategoryTitle
              title={translate['Educations']}
          />
          <FrameCard>
            <ListGroup>
              <EducationInfoContainer userId={userId} translate={translate}/>
              <ResearchesInfoContainer userId={userId} translate={translate}/>
            </ListGroup>
          </FrameCard>
        </div>
    )
}


const mapStateToProps = (state, props) => {
  return {
    translate: getMessages(state),
  }
}

export default connect(mapStateToProps)(Educations)