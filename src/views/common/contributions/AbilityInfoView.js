// @flow
import * as React from "react"
import CheckOwner from "../CheckOwner"
import * as PropTypes from 'prop-types'
import type {AbilityType} from "src/consts/flowTypes/organization/ability"
import {EditIcon} from "src/images/icons"

type PropsAbilityInfoView = {
  organizationId: number,
  ability: AbilityType,
  showEdit: Function,
}

const AbilityInfoView = (props: PropsAbilityInfoView) => {
  const {organizationId, ability, showEdit} = props

  return (
      <div className='contribution-view-container ability-view-container'>
        <CheckOwner id={organizationId}>
          <div className="contribution-edit -item-edit-btn pulse" onClick={showEdit}>
            <EditIcon/>
          </div>
        </CheckOwner>
        <div className='contribution-title-container'>
          <p className='contribution-title'>{ability.title}</p>
        </div>
        <p className="skill-description">
          {ability.text}
        </p>
      </div>
  )
}

AbilityInfoView.propTypes = {
  organizationId: PropTypes.number.isRequired,
  ability: PropTypes.object.isRequired,
  showEdit: PropTypes.func.isRequired,
}

export default AbilityInfoView