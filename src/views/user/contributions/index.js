import PropTypes from "prop-types";
import {CategoryTitle, FrameCard, ListGroup} from "../../common/cards/Frames";
import {getMessages} from "../../../redux/selectors/translateSelector";
import connect from "react-redux/es/connect/connect";
import * as React from "react";
import SkillInfoContainer from './SkillInfoContainer'
import ProductInfoContainer from './ProductInfoContainer'

type PropsSkills = {
  userId: number,
  translate: { [string]: string },
  identityType: string,
  identityId: number,
}

const Contributions = (props: PropsSkills) => {
  const {translate, userId, identityType, identityId} = props

  return (
      <div>
        <CategoryTitle
            title={translate['Contributions']}
        />
        <FrameCard>
          <ListGroup>
            <ProductInfoContainer userId={userId} translate={translate} identityType={identityType} identityId={identityId}/>
            <SkillInfoContainer userId={userId} translate={translate}/>
          </ListGroup>
        </FrameCard>
      </div>
  )
}

Contributions.propTypes = {
  userId: PropTypes.number.isRequired,
  translate: PropTypes.object.isRequired,
  identityType: PropTypes.string.isRequired,
  identityId: PropTypes.number.isRequired,
}
const mapStateToProps = state => ({
  translate: getMessages(state)
})

export default connect(mapStateToProps)(Contributions)