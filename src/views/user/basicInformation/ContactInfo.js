// @flow
import * as React from "react"
import connect from "react-redux/es/connect/connect"
import * as PropTypes from 'prop-types'

import {ItemWrapper, VerifyWrapper} from "../../common/cards/Frames"
import ContactInfoView from './ContactInfoView'
import {InformationIcon} from "src/images/icons"
import {ContactInfoEditForm} from "./ContactInfoEditForm"
import {bindActionCreators} from "redux";
import updateUserByUserIdAction from '../../../redux/actions/user/updateUserByUserIdAction'

//ContactInfo flowTypes
type ContactInfoProps = {
  userId: number,
  translate: {},
  profile: {},
  isLoading: boolean,
  actions: {},
}
type ContactInfoState = {
  error: boolean,
  edit: boolean,
}

class ContactInfo extends React.Component<ContactInfoProps, ContactInfoState> {
  constructor(props: ContactInfoProps) {
    super(props)
    this.state = {error: false, edit: false, isLoading: false}

  }

  static propTypes = {
    userId: PropTypes.number.isRequired,
    translate: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired,
  }

  _showEdit = () => {
    this.setState({...this.state, edit: true})
  }

  _hideEdit = () => {
    this.setState({...this.state, edit: false})
  }

  render() {
    const {translate, user, isLoading, actions, userId} = this.props
    const {edit, error} = this.state
    return (
        <VerifyWrapper isLoading={isLoading} error={error}>
          <ItemWrapper icon={<InformationIcon/>}>
          {(edit) ? (
                <ContactInfoEditForm
                    user={user}
                    hideEdit={this._hideEdit}
                    translate={translate}
                    actions={actions}
                    userId={userId}
                />
          ) : (
              <ContactInfoView user={user} showEdit={this._showEdit} translate={translate}/>
          )
          }
          </ItemWrapper>
        </VerifyWrapper>
    )
  }
}

const mapContactInfoDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    updateUserByUserId: updateUserByUserIdAction.updateUser,
  }, dispatch)
})

ContactInfo = connect(null, mapContactInfoDispatchToProps)(ContactInfo)

export {ContactInfo}