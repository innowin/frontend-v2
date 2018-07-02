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
	getOrganization:Function
}
export class OrganizationInfo extends React.Component<OrganizationInfoProps,{organization: Object, error: boolean, edit: boolean, isLoading: boolean}> {
	
	constructor(props:OrganizationInfoProps) {
		super(props);
		this.state = {organization: {}, error: false, edit: false, isLoading: false}
	}
	
	_showEdit = () => {
		this.setState({...this.state, edit: true});
	};
	
	_hideEdit = () => {
		this.setState({...this.state, edit: false});
	};
	
	_updateStateForView = (res:Object, error:boolean, isLoading:boolean) => {
		this.setState({...this.state, organization: res, error: error, isLoading});
	};
	
	componentDidMount() {
		const {organizationId,getOrganization} = this.props;
		getOrganization(organizationId)
	}
	
	render() {
		const {organization, edit, isLoading, error} = this.state;
		return (
				<VerifyWrapper isLoading={isLoading} error={error}>
					{
						(edit) ? (
								<OrganizationInfoItemWrapper>
									<OrganizationInfoEditForm
											organization={organization}
											hideEdit={this._hideEdit}
											updateStateForView={this._updateStateForView}
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
	organizationId:number
}
export class OrganizationMembers extends React.Component<OrganizationMembersProps,{members:Array<Object>, error: boolean, edit: boolean, isLoading: boolean}> {
	constructor(props:OrganizationMembersProps) {
		super(props);
		this.state = {members: [], error: false, edit: false, isLoading: false}
	}

	_showEdit = () => {
		this.setState({...this.state, edit: true});
	};
	
	_hideEdit = () => {
		this.setState({...this.state, edit: false});
	};
	
	_updateStateForView = (res:Array<Object>, error:boolean, isLoading:boolean) => {
		this.setState({...this.state, members: res, error: error, isLoading: isLoading});
	};
	
	componentDidMount() {
		const {organizationId} = this.props;
		const emitting = () => {
			this.setState({...this.state, isLoading: true});
			socket.emit(REST_REQUEST,
					{
						method: "get",
						url: `${url}/organizations/staff/?staff_organization=${organizationId}`,
						result: `OrganizationMembers-get/${organizationId}`,
						token: TOKEN
					}
			);
		};
		
		emitting();
		
		socket.on(`OrganizationMembers-get/${organizationId}`, (res) => {
			if (res.detail) {
				this.setState({...this.state, error: res.detail, isLoading: false});
			}
			this.setState({...this.state, members: res, isLoading: false});
		});
	}
	
	render() {
		const {members, edit, isLoading, error} = this.state;
		return (
				<VerifyWrapper isLoading={isLoading} error={error}>
					{
						(edit) ? (
								<OrganizationMembersWrapper>
									<OrganizationMembersEditForm
											members={members}
											hideEdit={this._hideEdit}
											updateStateForView={this._updateStateForView}
									/>
								</OrganizationMembersWrapper>
						) : (
								<OrganizationMembersView members={members} showEdit={this._showEdit}/>
						)
					}
				</VerifyWrapper>
		)
		
	}
}
type organizationBasicInformationProps ={
	organizationId: number,
	actions:Object
}
export class organizationBasicInformation extends React.Component<organizationBasicInformationProps> {

	render() {
		// const {match} = this.props;
		// const {params} = match;
		// const {id} = params;
		const {organizationId} = this.props;
		const {getOrganization} = this.props.actions;
		return (
				<div>
					<CategoryTitle
							title={__('Basic information')}
							createForm={true}
					/>
					<FrameCard>
						<ListGroup>
							<OrganizationInfo getOrganization = {getOrganization} organizationId={organizationId}/>
							<OrganizationMembers organizationId={organizationId}/>
						</ListGroup>
					</FrameCard>
				</div>
		)
	}
}

const mapStateToProps = (state) => {
	console.log(state)
}
const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({
		getOrganization: OrganizationActions.getOrganization ,
	}, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(organizationBasicInformation)