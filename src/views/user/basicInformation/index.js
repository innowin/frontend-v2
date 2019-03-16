// @flow
import * as React from 'react'
import {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {FrameCard, ListGroup} from 'src/views/common/cards/Frames'
import {getMessages} from 'src/redux/selectors/translateSelector'
import {BasicInfo} from './BasicInfo'
import {ContactInfo} from './ContactInfo'
import {PrivateInfo} from './PrivateInfo'
import {LinkInfo} from './LinkInfo'
import type {
  userProfileType,
  userType,
} from 'src/consts/flowTypes/user/basicInformation'
import CheckOwner from '../../common/CheckOwner'

//UserBasicInformation flowTypes
type UserBasicInformationProps = {
  userId: number,
  translate: { [string]: string },
  profile: userProfileType,
  user: userType,
}

export class UserBasicInformation extends Component<UserBasicInformationProps> {

  static propTypes = {
    userId: PropTypes.number.isRequired,
    translate: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  }

  render() {
    const {userId, translate, user} = this.props
    return (
        <div>
          {/*<CategoryTitle*/}
          {/*title={translate['Basic information']}*/}
          {/*/>*/}
          <FrameCard>
            <ListGroup>
              <BasicInfo {...{userId}} translate={translate} user={user}/>
              <ContactInfo {...{userId}} translate={translate} user={user}/>
              <LinkInfo {...{userId}} translate={translate} user={user}/>
              <CheckOwner id={userId}>
                <PrivateInfo {...{userId}} user={user} translate={translate}/>
              </CheckOwner>
            </ListGroup>
          </FrameCard>
        </div>
    )
  }
}

const mapStateToProps = state => ({
  translate: getMessages(state),
})
export default connect(mapStateToProps)(UserBasicInformation)

