/*global __*/
//@flow
import * as React from 'react';
import PropTypes from "prop-types"
import {FrameCard, CategoryTitle, VerifyWrapper} from "../../common/cards/Frames"
import {ListGroup} from '../../common/cards/Frames'
import {OrganizationInfoEditForm , OrganizationMembersEditForm} from './Forms'
import {REST_REQUEST} from "../../../consts/Events"
import {REST_URL as url, SOCKET as socket} from "../../../consts/URLS"
import {TOKEN} from "src/consts/data"
import {OrganizationInfoItemWrapper, OrganizationInfoView, OrganizationMembersView, OrganizationMembersWrapper} from "./Views"
import OrganizationActions from '../../../redux/actions/organizationActions';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
type OrganizationInfoProps = {
	organizationId: number,
	actions: Object,
	organization:Object
}
export class OrganizationInfo extends React.Component<OrganizationInfoProps,{ edit: boolean}> {
	
	constructor(props:OrganizationInfoProps) {
		super(props);
		this.state = { error: false, edit: false, isLoading: false}
	}
	
	_showEdit = () => {
		this.setState({...this.state, edit: true});
	};
	
	_hideEdit = () => {
		this.setState({...this.state, edit: false});
	};
	
	componentDidMount() {
		const {organizationId} = this.props;
		const {getOrganization} = this.props.actions;
		getOrganization(organizationId)
	}
	
	render() {
		const {edit} = this.state;
		const {organization} = this.props
		const { isLoading , error} = organization
		return (
				<VerifyWrapper isLoading={isLoading} error={error.message == null ? false: true}>
					{
						(edit) ? (
								<OrganizationInfoItemWrapper>
									<OrganizationInfoEditForm
											organization={organization.content}
											hideEdit={this._hideEdit}
											actions={this.props.actions}
									/>
								</OrganizationInfoItemWrapper>
						) : (
								<OrganizationInfoView organization={organization.content} showEdit={this._showEdit}/>
						)
					}
				</VerifyWrapper>
		)
	}
}

type OrganizationMembersProps = {
	organizationId:number,
	members:Object,
	actions: Object,
	error:String
}
export class OrganizationMembers extends React.Component<OrganizationMembersProps,{edit: boolean}> {
	static defaultProps = {
		members:{
			isLoading:false,
			list:[]
		}
	}
	constructor(props:OrganizationMembersProps) {
		super(props);
		this.state = { edit: false}
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
								<OrganizationMembersView members={members.content} showEdit={this._showEdit}/>
						)
					}
				</VerifyWrapper>
		)
		
	}
}
type organizationBasicInformationProps ={
	organizationId: number,
	actions:Object,
	organization:Object,
  organObject:Object,
}
export class organizationBasicInformation extends React.Component<organizationBasicInformationProps> {
	componentDidMount(){
		const {organization} = this.props;
		const {getOrgStaff} = this.props.actions
	}
	render() {
		const {organizationId, organization, organObject} = this.props;
		const {getOrganization, getOrganizationMembers} = this.props.actions;
		return (
				<div>
					<CategoryTitle
							title={__('Basic information')}
							createForm={true}
					/>
					<FrameCard>
						<ListGroup>
							<OrganizationInfo actions = {this.props.actions} organizationId={organizationId} organization={organObject}/>
							<OrganizationMembers members ={this.props.organization.staff} actions ={this.props.actions} organizationId={organizationId}/>
						</ListGroup>
					</FrameCard>
				</div>
		)
	}
}

const mapStateToProps = (state) => ({
	organization:state.organization
})
const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({
		getOrganization: OrganizationActions.getOrganization ,
		getOrganizationMembers: OrganizationActions.getOrganizationMembers,
		updateOrganization: OrganizationActions.updateOrganization,
		getOrgStaff : OrganizationActions.getOrgStaff,

	}, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(organizationBasicInformation)