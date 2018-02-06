/*global __*/
import React, {Component} from "react"
import PropTypes from "prop-types"
import {FrameCard, CategoryTitle, VerifyWrapper} from "../../common/cards/Frames"
import {ListGroup} from '../../common/cards/Frames'
import {OrganizationInfoEditForm , OrganizationMembersEditForm} from './Forms'
import {REST_REQUEST} from "../../../consts/Events"
import {REST_URL as url, SOCKET as socket} from "../../../consts/URLS"
import {TOKEN} from "src/consts/data"
import {OrganizationInfoItemWrapper, OrganizationInfoView, OrganizationMembersView, OrganizationMembersWrapper} from "./Views"
import {Organization} from "../../Organization";


export class OrganizationInfo extends Component {
	
	constructor(props) {
		super(props);
		this.state = {organization: {}, error: null, edit: false, isLoading: false}
	}
	
	static propTypes = {
		organizationId: PropTypes.string.isRequired,
	};
	
	_showEdit = () => {
		this.setState({...this.state, edit: true});
	};
	
	_hideEdit = () => {
		this.setState({...this.state, edit: false});
	};
	
	_updateStateForView = (res, error, isLoading) => {
		this.setState({...this.state, organization: res, error: error, isLoading});
	};
	
	componentDidMount() {
		const {organizationId} = this.props;
		const emitting = () => {
			const newState = {...this.state, isLoading: true};
			this.setState(newState);
			socket.emit(REST_REQUEST,
					{
						method: "get",
						url: `${url}/organizations/${organizationId}/`,
						result: `OrganizationInfo-get/${organizationId}`,
						token: TOKEN,
					}
			);
		};
		
		emitting();
		
		socket.on(`OrganizationInfo-get/${organizationId}`, (res) => {
			if (res.detail) {
				const newState = {...this.state, error: res.detail, isLoading: false};
				this.setState(newState);
			}
			const newState = {...this.state, organization: res, isLoading: false};
			this.setState(newState);
		});
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

export class OrganizationMembers extends Component {
	constructor(props) {
		super(props);
		this.state = {members: [], error: null, edit: false, isLoading: false}
	}
	
	static propTypes = {
		organizationId: PropTypes.string.isRequired,
	};
	
	_showEdit = () => {
		this.setState({...this.state, edit: true});
	};
	
	_hideEdit = () => {
		this.setState({...this.state, edit: false});
	};
	
	_updateStateForView = (res, error, isLoading) => {
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
			console.log('ID is ',organizationId,'in response' , res);
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

export default class organizationBasicInformation extends Component {
	static propTypes = {
		organizationId: PropTypes.string.isRequired,
	};
	
	render() {
		const {match} = this.props;
		const {params} = match;
		const {id} = params;
		return (
				<div>
					<CategoryTitle
							title={__('Basic information')}
							createForm={true}
					/>
					<FrameCard>
						<ListGroup>
							<OrganizationInfo organizationId={id}/>
							<OrganizationMembers organizationId={id}/>
						</ListGroup>
					</FrameCard>
				</div>
		)
	}
}

