//@flow
import * as React from 'react'
import {FrameCard, CategoryTitle, VerifyWrapper} from "../../common/cards/Frames"
import {ListGroup} from '../../common/cards/Frames'
import {OrganizationInfoEditForm, OrganizationMembersEditForm} from './Forms'
import {
  OrganizationInfoItemWrapper,
  OrganizationInfoView,
  OrganizationMembersView,
  OrganizationMembersWrapper
} from "./Views"
import OrganizationActions from 'src/redux/actions/organizationActions'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {getMessages} from "src/redux/selectors/translateSelector"
import {TranslatorType} from "src/consts/flowTypes/common/commonTypes"


type OrganizationInfoProps = {
  organizationId: number,
  actions: Object,
  organization: Object
}

export class OrganizationInfo extends React.Component<OrganizationInfoProps, { edit: boolean }> {

  constructor(props: OrganizationInfoProps) {
    super(props);
    this.state = {error: false, edit: false, isLoading: false}
  }

  _showEdit = () => {
    this.setState({...this.state, edit: true});
  };

  _hideEdit = () => {
    this.setState({...this.state, edit: false});
  };

  componentDidMount() {
    const {organizationId} = this.props;
    const {getOrganizationByOrganId} = this.props.actions;
    // getOrganizationByOrganId(organizationId)
  }

  render() {
    const {edit} = this.state;
    const {organization} = this.props
    const {isLoading, error} = organization
    return (
      <VerifyWrapper isLoading={isLoading} error={error == null ? false : true}>
        {
          (edit) ? (
            <OrganizationInfoItemWrapper>
              <OrganizationInfoEditForm
                organization={organization}
                hideEdit={this._hideEdit}
                actions={this.props.actions}
              />
            </OrganizationInfoItemWrapper>
          ) : (
            <OrganizationInfoView organization={organization} showEdit={this._showEdit}/>
          )
        }
      </VerifyWrapper>
    )
  }
}


type OrganizationMembersProps = {
  organizationId: number,
  members: Object,
  actions: Object,
  error: String
}

export class OrganizationMembers extends React.Component<OrganizationMembersProps, { edit: boolean }> {
  static defaultProps = {
    members: {
      isLoading: false,
      list: []
    }
  }

  constructor(props: OrganizationMembersProps) {
    super(props);
    this.state = {edit: false}
  }

  _showEdit = () => {
    this.setState({...this.state, edit: true});
  };

  _hideEdit = () => {
    this.setState({...this.state, edit: false});
  };

  componentDidMount() {
    const {organizationId, members} = this.props;
    const {getOrganizationMembers} = this.props.actions;
    getOrganizationMembers(organizationId)

  }

  render() {
    const {edit} = this.state;
    const {members, error} = this.props;
    return (
      <VerifyWrapper isLoading={members.isLoading} error={error}>
        {
          (edit) ? (
            <OrganizationMembersWrapper>
              <OrganizationMembersEditForm
                members={members.content}
                hideEdit={this._hideEdit}
                actions={this.props.actions}
              />
            </OrganizationMembersWrapper>
          ) : (
            <OrganizationMembersView members={members.content} showEdit={null}/>
          )
        }
      </VerifyWrapper>
    )

  }
}


type organizationBasicInformationProps = {
  organizationId: number,
  organization: Object,
  translate:TranslatorType,
  actions: Object,
  organs: Array<Object>,
  organ: Object,
}

export class organizationBasicInformation extends React.Component<organizationBasicInformationProps> {
  componentDidMount() {
  }

  render() {
    const {organizationId, organization, translate} = this.props;
    const {getOrganizationByOrganId, getOrganizationMembers} = this.props.actions;
    return (
      <div>
        <CategoryTitle
          title={translate['Basic information']}
          createForm={true}
        />
        <FrameCard>
          <ListGroup>
            <OrganizationInfo
              actions={this.props.actions}
              organizationId={organizationId}
              organization={organization}
            />
            <OrganizationMembers
              members={this.props.organization.staff}
              actions={this.props.actions}
              organizationId={organizationId}
            />
          </ListGroup>
        </FrameCard>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  organs: state.organs,
  translate: getMessages(state)
})
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getOrganizationByOrganId: OrganizationActions.getOrganizationByOrganId,
    getOrganizationMembers: OrganizationActions.getOrganizationMembers,
    updateOrganization: OrganizationActions.updateOrganization,
    getOrgStaff: OrganizationActions.getOrgStaff,

  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(organizationBasicInformation)