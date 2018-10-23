// @flow
import * as React from 'react'
import PropTypes from "prop-types"

import UserSquare from '../../../common/components/UserSquare'

type ContentUserProps = {
  translate: { [string]: string },
}

const ExtendRelationsUsers = (props: ContentUserProps) => {
  const {translate} = props

  return (
      <div className='extend-relations-users-container'>
        <h5 className='users-text'>{translate['You can follow users']}</h5>
        <div className='users-container'>
          <div className='user-container'><UserSquare followed={true} translate={translate}/></div>
          <div className='user-container'><UserSquare translate={translate}/></div>
          <div className='user-container'><UserSquare followed={true} translate={translate}/></div>
          <div className='user-container'><UserSquare translate={translate}/></div>
          <div className='user-container'><UserSquare translate={translate}/></div>
          <div className='user-container'><UserSquare translate={translate}/></div>
          <div className='user-container'><UserSquare translate={translate}/></div>
          <div className='user-container'><UserSquare translate={translate}/></div>
          <div className='user-container'><UserSquare translate={translate}/></div>
          <div className='user-container'><UserSquare translate={translate}/></div>
          <div className='user-container'><UserSquare translate={translate}/></div>
          <div className='user-container'><UserSquare translate={translate}/></div>
          <div className='user-container'><UserSquare translate={translate}/></div>
          <div className='user-container'><UserSquare translate={translate}/></div>
          <div className='user-container'><UserSquare translate={translate}/></div>
        </div>
      </div>
  )
}

ExtendRelationsUsers.propTypes = {
  translate: PropTypes.object.isRequired,
}

export default ExtendRelationsUsers