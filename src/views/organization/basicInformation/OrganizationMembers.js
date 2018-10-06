// @flow
import * as React from "react";
import {VerifyWrapper} from "../../common/cards/Frames";
import {OrganizationMembersView, OrganizationMembersWrapper} from "./Views";
import {OrganizationMembersEditForm} from "./Forms";

type OrganizationMembersProps = {
  organizationId: number,
  members: Object,
  actions: Object,
  error: String
}

class OrganizationMembers extends React.Component<OrganizationMembersProps, { edit: boolean }> {
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

export default OrganizationMembers