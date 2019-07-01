// @flow
import * as React from "react"
import * as PropTypes from 'prop-types'

import BiographyEditForm from './BiographyEditForm'
import BiographyView from './BiographyView'
import type {organizationType} from "src/consts/flowTypes/organization/organization"

//OrganizationInfo flowTypes
type OrganizationInfoProps = {|
  organizationId: number,
  translate: {},
  actions: {|
    updateOrganizationByOrganizationId: Function,
  |},
  organization: organizationType,
|}
type OrganizationInfoState = {
  error: boolean,
  edit: boolean,
}

class Biography extends React.Component<OrganizationInfoProps, OrganizationInfoState> {
  constructor(props: OrganizationInfoProps) {
    super(props)
    this.state = {error: false, edit: false}
  }

  static propTypes = {
    organizationId: PropTypes.number.isRequired,
    translate: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
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
        <React.Fragment>
            {(edit) ? (
                <BiographyEditForm
                    organization={organization}
                    hideEdit={this._hideEdit}
                    translate={translate}
                    actions={actions}
                />
            ) : (
                <BiographyView organization={organization} translate={translate} showEdit={this._showEdit}/>
            )
            }
        </React.Fragment>
    )
  }
}

export default Biography