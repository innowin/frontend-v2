import PropTypes from "prop-types";
import {CategoryTitle, FrameCard, ListGroup} from "../../common/cards/Frames";
import {getMessages} from "../../../redux/selectors/translateSelector";
import connect from "react-redux/es/connect/connect";
import * as React from "react";
import SkillInfoContainer from './SkillInfoContainer'

type PropsSkills = {
  userId: number,
  translate: { [string]: string }
}

const Contributions = (props: PropsSkills) => {
  const {translate, userId} = props

  return (
      <div>
        <CategoryTitle
            title={translate['Contributions']}
        />
        <FrameCard>
          <ListGroup>
            <SkillInfoContainer userId={userId} translate={translate}/>
          </ListGroup>
        </FrameCard>
      </div>
  )
}

Contributions.propTypes = {
  userId: PropTypes.string.isRequired,
  translate: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  translate: getMessages(state)
})

export default connect(mapStateToProps)(Contributions)