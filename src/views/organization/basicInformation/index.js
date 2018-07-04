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
export class OrganizationInfo extends React.Component<OrganizationInfoProps,{ error: boolean, edit: boolean, isLoading: boolean}> {
	
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
	
	// _updateStateForView = (res:Object, error:boolean, isLoading:boolean) => {
	// 	this.setState({...this.state, error: error, isLoading});
	// };
	
	componentDidMount() {
		const {organizationId} = this.props;
		const {getOrganization} = this.props.actions;
		getOrganization(organizationId)
	}
	
	render() {
		const {edit, isLoading, error} = this.state;
		const {organization} = this.props
		return (
				<VerifyWrapper isLoading={isLoading} error={error}>
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
											members={members.list}
											hideEdit={this._hideEdit}
											actions={this.props.actions}
									/>
								</OrganizationMembersWrapper>
						) : (
								<OrganizationMembersView members={members.list} showEdit={this._showEdit}/>
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
}
export class organizationBasicInformation extends React.Component<organizationBasicInformationProps> {

	render() {
		const {organizationId, organization} = this.props;
		const {getOrganization, getOrganizationMembers} = this.props.actions;
		return (
				<div>
					<CategoryTitle
							title={__('Basic information')}
							createForm={true}
					/>
					<FrameCard>
						<ListGroup>
							<OrganizationInfo actions = {this.props.actions} organizationId={organizationId} organization={organization}/>
							<OrganizationMembers members ={this.props.organization.members} actions ={this.props.actions} organizationId={organizationId}/>
						</ListGroup>
					</FrameCard>
				</div>
		)
	}
}

const mapStateToProps = (state) => ({
	organization:state.organization,
})
const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({
		getOrganization: OrganizationActions.getOrganization ,
		getOrganizationMembers: OrganizationActions.getOrganizationMembers,
		updateOrganization: OrganizationActions.updateOrganization,

	}, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(organizationBasicInformation)