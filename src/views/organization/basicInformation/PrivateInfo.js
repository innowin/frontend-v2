// @flow
import * as React from "react"
import PropTypes from "prop-types"

import PrivateInfoEditForm from './PrivateInfoEditForm'
import PrivateInfoView from './PrivateInfoView'
import type {organizationType} from "src/consts/flowTypes/organization/organization"
import {InformationIcon} from "src/images/icons"
import {ItemWrapper} from "src/views/common/cards/Frames"
import {VerifyWrapper} from "src/views/common/cards/Frames"

//OrganizationInfo flowTypes
type OrganizationInfoProps = {|
  organizationId: number,
  translate: {},
  actions: {|
    updateOrganizationByOrganizationId: Function,
  |},
  isLoading: boolean,
  organization: organizationType,
|}
type OrganizationInfoState = {
  error: boolean,
  edit: boolean,
}

class PrivateInfo extends React.Component<OrganizationInfoProps, OrganizationInfoState> {
  constructor(props: OrganizationInfoProps) {
    super(props)
    this.state = {error: false, edit: false}
  }

  static propTypes = {
    organizationId: PropTypes.number.isRequired,
    translate: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    organization: PropTypes.object.isRequired,
  }

  _showEdit = () => {
    this.setState({...this.state, edit: true})
  }

  _hideEdit = () => {
    this.setState({...this.state, edit: false})
  }

  render() {
    const {translate, actions, isLoading, organization} = this.props
    const {edit, error} = this.state
    return (
        <VerifyWrapper isLoading={isLoading} error={error}>
          <ItemWrapper icon={<InformationIcon/>}>
            {(edit) ? (
                <PrivateInfoEditForm
                    organization={organization}
                    hideEdit={this._hideEdit}
                    translate={translate}
                    actions={actions}
                />
            ) : (
                <PrivateInfoView organization={organization} translate={translate} showEdit={this._showEdit}/>
            )
            }
          </ItemWrapper>
        </VerifyWrapper>
    )
  }
}

export default PrivateInfo