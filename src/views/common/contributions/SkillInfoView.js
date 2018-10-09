// @flow
import * as React from "react"

import BookmarkIcon from "../../../images/product/bookmark"
import CheckOwner from "../CheckOwner"
import PropTypes from "prop-types"
import type {skillType} from "../../../consts/flowTypes/user/others"
import {EditIcon} from "../../../images/icons"

type PropsSkillInfoView = {
  userId: number,
  skill: skillType,
  showEdit: Function,
}

const SkillInfoView = (props: PropsSkillInfoView) => {
  const {userId, skill, showEdit} = props

  return (
      <div className='contribution-view-container skill-view-container'>
        <CheckOwner id={userId}>
          <div className="contribution-edit -item-edit-btn pulse" onClick={showEdit}>
            <EditIcon/>
          </div>
        </CheckOwner>
        <div className='contribution-title-container'>
          <BookmarkIcon className='contribution-bookmark skill-bookmark'/>
          <p className='contribution-title'>{skill.title}</p>
        </div>
        <p className="skill-description">
          {skill.description}
        </p>
        <div className="skill-tags">
          {skill.tag.map((tag, index) => <span className="badge badge-secondary skill-tag">{tag}</span>)}
        </div>
      </div>
  )
}

SkillInfoView.propTypes = {
  userId: PropTypes.number.isRequired,
  skill: PropTypes.object.isRequired,
  showEdit: PropTypes.func.isRequired,
}

export default SkillInfoView