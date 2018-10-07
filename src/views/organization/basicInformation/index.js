//@flow
import * as React from 'react'
import {FrameCard, CategoryTitle} from "../../common/cards/Frames"
import {ListGroup} from '../../common/cards/Frames'
import BasicInfo from './BasicInfo'
import OrganizationMembers from './OrganizationMembers'
import OrganizationActions from 'src/redux/actions/organization/organizationActions'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {getMessages} from "src/redux/selectors/translateSelector"
import {TranslatorType} from "src/consts/flowTypes/common/commonTypes"
import Biography from "./Biography"
import ContactInfo from "./ContactInfo"
import PrivateInfo from './PrivateInfo'
import CheckOwner from "../../common/CheckOwner"


type organizationBasicInformationProps = {
  organizationId: number,
  organization: Object,
  translate:TranslatorType,
  actions: Object,
  organ: Object,
}

class OrganizationBasicInformation extends React.Component<organizationBasicInformationProps> {
  componentDidMount() {
  }

  render() {
    const {organizationId, organization, translate, actions} = this.props;
    const {getOrganizationByOrganId, getOrganizationMembers} = this.props.actions;
    return (
      <div>
        <CategoryTitle
          title={translate['Basic information']}
        />
        <FrameCard>
          <ListGroup>
            <BasicInfo actions={actions} organizationId={organizationId} organization={organization} translate={translate} isLoading={organization.isLoading}/>
            <Biography actions={actions} organizationId={organizationId} organization={organization} translate={translate} isLoading={organization.isLoading}/>
            <ContactInfo actions={actions} organizationId={organizationId} organization={organization} translate={translate} isLoading={organization.isLoading}/>
            <CheckOwner id={organizationId}>
              <PrivateInfo actions={actions} organizationId={organizationId} organization={organization} translate={translate} isLoading={organization.isLoading}/>
            </CheckOwner>
            {/*<OrganizationMembers*/}
              {/*members={this.props.organization.staff}*/}
              {/*actions={this.props.actions}*/}
              {/*organizationId={organizationId}*/}
            {/*/>*/}
          </ListGroup>
        </FrameCard>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  translate: getMessages(state)
})
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getOrganizationByOrganId: OrganizationActions.getOrganizationByOrganId,
    getOrganizationMembers: OrganizationActions.getOrganizationMembers,
    getOrgStaff: OrganizationActions.getOrgStaff,
    updateOrganizationByOrganizationId: OrganizationActions.updateOrganization,
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(OrganizationBasicInformation )