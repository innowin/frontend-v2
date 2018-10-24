// @flow
import * as React from 'react'
import PropTypes from "prop-types"
import FontAwesome from "react-fontawesome"

import {TickSvgIcon, OnePersonSvg, SocialPersonSvg, DefaultUserIcon} from "src/images/icons";
import constants from "../../../../consts/constants";

type ContentUserProps = {
  translate: { [string]: string },
  changeType: Function,
  type: string,
}

const ContentUser = (props: ContentUserProps) => {
  const {translate, changeType, type} = props

  return (
      <div className='user-modal-container'>
        <div className='user-type-container'>
          <div className='row-user-part label-part'>
            <FontAwesome name='circle' className='required-icon'/>
            <h5 className='label-user-text'>{translate['User type']}</h5>
          </div>
          <div className='row-user-part'>
            <div
                className={type === constants.USER_TYPES.PERSON
                    ? 'pulse user-type user-type-active'
                    : 'pulse user-type'
                }
                onClick={() => changeType(constants.USER_TYPES.PERSON)}>
              {type === constants.USER_TYPES.PERSON && <TickSvgIcon className='active-user-type-tick'/>}
              <OnePersonSvg className={type === constants.USER_TYPES.PERSON
                  ? 'one-person-icon one-person-icon-active'
                  : 'one-person-icon'
              }/>
              <span>{translate['Person']}</span>
            </div>
          </div>
          <div className='row-user-part'>
            <div
                className={type === constants.USER_TYPES.ORG
                    ? 'pulse user-type user-type-active'
                    : 'pulse user-type'
                }
                onClick={() => changeType(constants.USER_TYPES.ORG)}>
              {type === constants.USER_TYPES.ORG && <TickSvgIcon className='active-user-type-tick'/>}
              <SocialPersonSvg className={type === constants.USER_TYPES.ORG
                  ? 'social-person-icon social-person-icon-active'
                  : 'social-person-icon'
              }/>
              <span>{translate['Organ']}</span>
            </div>
          </div>
        </div>
        <div className='user-type-container profile-part-container'>
          <div className='row-user-part label-part profile-part'>
            <h5 className='label-user-text label-user-text-profile'>{translate['Profile Picture']}</h5>
          </div>
          <div className='row-user-part'>
            <div className='pulse user-profile-container'>
              <DefaultUserIcon className='user-profile'/>
              <div className='select-text'>{translate['Select']}</div>
            </div>
          </div>
        </div>
        <div className='user-type-container'>
          <div className='row-user-part label-part'>
            <FontAwesome name='circle' className='required-icon'/>
            <h5 className='label-user-text'>{translate['Username']}</h5>
          </div>
          <div className='username-input-container'>
            <input className='settingModal-menu-general-input' placeholder={translate['Username']}/>
            <p className='validation-text'>{translate['Username validation error text']}</p>
          </div>
        </div>
      </div>
  )
}

ContentUser.propTypes = {
  translate: PropTypes.object.isRequired,
  changeType: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
}

export default ContentUser