// @flow
import * as React from 'react'
import PropTypes from 'prop-types'
import FontAwesome from "react-fontawesome"

type UserSquareProps = {
  translate: {[string]: string}
}
const UserSquare = (props: UserSquareProps) => {
  const {translate} = props
  const followed = true
  return (
      <div className={followed ? 'user-square user-square-followed' : 'user-square'}>
        {followed
            ? <p className='followed-text'>{translate['Followed']}</p>
            : <FontAwesome name='plus' className='pulse follow-plus'/>
        }
        <img alt='user-profile' src='http://restful.daneshboom.ir/media/8b01985545aa46f3b292e992abb8f881.jpg' className='user-image'/>
        <div className='user-detail-container'>
          <p className='user-square-name'>نام فرد</p>
          <p className='user-square-desc'>نام فرد</p>
        </div>
      </div>
  )
}

UserSquare.PropTypes = {
  translate: PropTypes.object.isRequired,
}
export default UserSquare