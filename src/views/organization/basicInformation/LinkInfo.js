// @flow
import * as React from 'react'
import connect from 'react-redux/es/connect/connect'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import LinkInfoEditForm from './LinkInfoEditForm'
import {InformationIcon} from 'src/images/icons'
import LinkInfoView from './LinkInfoView'
import {VerifyWrapper} from 'src/views/common/cards/Frames'
import {ItemWrapper} from 'src/views/common/cards/Frames'
import type {organizationType} from '../../../consts/flowTypes/organization/organization'
import updateUserByUserIdAction from '../../../redux/actions/user/updateUserByUserIdAction'

//OrganizationInfo flowTypes
type OrganizationInfoProps = {|
  organizationId: number,
  translate: {},
  organization: organizationType,
|}
type OrganizationInfoState = {
  error: boolean,
  edit: boolean,
}

class LinkInfo extends React.Component<OrganizationInfoProps, OrganizationInfoState> {
  constructor(props: OrganizationInfoProps) {
    super(props)
    this.state = {error: false, edit: false}
  }

  static propTypes = {
    organizationId: PropTypes.number.isRequired,
    translate: PropTypes.object.isRequired,
    organization: PropTypes.object.isRequired,
  }

  _showEdit = () => {
    this.setState({...this.state, edit: true})
  }

  _hideEdit = () => {
    this.setState({...this.state, edit: false})
  }

  render() {
    const {translate, actions, isLoading, organization, organizationId} = this.props
    const {edit, error} = this.state
    return (
        <VerifyWrapper isLoading={isLoading} error={error}>
          <ItemWrapper icon={<InformationIcon/>}>
            {(edit) ? (
                <LinkInfoEditForm
                    organization={organization}
                    hideEdit={this._hideEdit}
                    translate={translate}
                    actions={actions}
                    organizationId={organizationId}
                />
            ) : (
                <LinkInfoView organization={organization} translate={translate} showEdit={this._showEdit}/>
            )
            }
          </ItemWrapper>
        </VerifyWrapper>
    )
  }
}

const mapOrganizationInfoDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    updateUserByUserId: updateUserByUserIdAction.updateUser,
  }, dispatch),
})

LinkInfo = connect(null, mapOrganizationInfoDispatchToProps)(LinkInfo)

export {LinkInfo}