// @flow
import * as React from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"

import ProductInfoContainer from './ProductInfoContainer'
import SkillInfoContainer from './SkillInfoContainer'
import {CategoryTitle, FrameCard, ListGroup} from "../cards/Frames"
import {getMessages} from "../../../redux/selectors/translateSelector"

type PropsSkills = {
  ownerId: number,
  translate: { [string]: string },
  identityType: string,
  identityId: number,
}

const Contributions = (props: PropsSkills) => {
  const {translate, ownerId, identityType, identityId} = props

  return (
      <div>
        <CategoryTitle
            title={translate['Contributions']}
        />
        <FrameCard>
          <ListGroup>
            <ProductInfoContainer
              ownerId={ownerId}
              translate={translate}
              identityType={identityType}
              identityId={identityId}
            />
            <SkillInfoContainer
              userId={ownerId}
              translate={translate}
            />
          </ListGroup>
        </FrameCard>
      </div>
  )
}

Contributions.propTypes = {
  ownerId: PropTypes.number.isRequired,
  translate: PropTypes.object.isRequired,
  identityType: PropTypes.string.isRequired,
  identityId: PropTypes.number.isRequired,
}
const mapStateToProps = state => ({
  translate: getMessages(state)
})

export default connect(mapStateToProps)(Contributions)