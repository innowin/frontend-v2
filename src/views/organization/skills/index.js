/*global __*/
import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Skill, SkillItemWrapper} from "./view";
import {SkillCreateForm} from "./forms";
import {FrameCard, CategoryTitle, ListGroup, VerifyWrapper} from "../../common/cards/Frames";
import {createSkill, deleteSkill, updateSkill} from '../../../crud/organization/skills.js';
import {REST_URL as url, SOCKET as socket} from "../../../consts/URLS"
import {REST_REQUEST} from "../../../consts/Events"
import {TOKEN} from "src/consts/data"

export class SkillContainer extends Component {
	constructor(props){
		super(props);
		this.state= {skill:{}};
	}
	componentWillReceiveProps(props){
			const {skill} = props;
			this.setState ({...this.state ,skill:skill || {}});
	}
	delete_ = (skillId, hideEdit) => {	
		const {organizationId, updateStateForView} = this.props;
		updateStateForView(null,null,true);
		return deleteSkill(skillId, organizationId,()=>{
			updateStateForView(null,false);
		},hideEdit,organizationId);
	};
	update_ = (formValues, skillId, updateStateForView, hideEdit) => {//formValues, careerId, updateStateForView, hideEdit
		updateStateForView(null,null,true);
		return updateSkill(formValues,skillId, updateStateForView, hideEdit);
	};
	_updateStateForView = (res, error, isLoading) => {
		const {updateStateForView} = this.props;
		updateStateForView({error:error,isLoading:isLoading});
		this.setState({...this.state, skill:res, error:error, isLoading:isLoading});
	};

	render() {
		const {skill} = this.state;
		return <Skill
			skill={skill}
			updateStateForView={this._updateStateForView}
			deleteSkill={this.delete_}
			updateSkill={this.update_}
		/>;
	}
}

export class SkillList extends Component {
	static propTypes = {
			hideCreateForm: PropTypes.func.isRequired,
			createForm: PropTypes.bool.isRequired,
	};

	create = (formValues,hideEdit) => {
			const {organizationId, skillId, updateStateForView} = this.props;
			return createSkill(formValues, updateStateForView, hideEdit, organizationId);
	};

	render() {
		const {  organizationId, createForm, updateStateForView} = this.props;
		var {skills} = this.props ;
		return <ListGroup>
			{createForm &&
			<SkillItemWrapper>
					<SkillCreateForm hideEdit={this.props.hideCreateForm} create={this.create} />
			</SkillItemWrapper>}
			{
				skills.map(skill => <SkillContainer
					skill={skill}
					updateStateForView = {updateStateForView}
					organizationId={organizationId}
					key={skill.id}
				/>)
			}
		</ListGroup>;
	}
}

export class Skills extends Component {

	constructor(props){
		super(props);
		this.state = {createForm: false,skills:{}, edit:false, isLoading:false, error:null, skills:[]};
	}
	static propTypes = {
		organizationId: PropTypes.string.isRequired
	};

	componentDidMount(){
		const {organizationId } = this.props;
		const emitting = () => {
			const newState = {...this.state, isLoading: true};
			this.setState(newState);
			socket.emit(REST_REQUEST,
				{
					method: "get",
					url: `${url}/organizations/abilities/?ability_organization=${organizationId}`,
					result: `OrganizationAbilities-get/${organizationId}`,
					token: TOKEN,
				}
			);

			socket.emit(REST_REQUEST,
        {
          method: "get",
          url: `${url}/organizations/${organizationId}/`,
          result: `organization-Abilities-get/${organizationId}`,
          token: TOKEN
        }
			);
			
		};

		emitting();

		socket.on(`OrganizationAbilities-get/${organizationId}`, (res) => {
			if (res.detail) {
				const newState = {...this.state, error: res.detail, isLoading: false};
				this.setState(newState);
			}else{
				const newState = {...this.state, skills: res instanceof Array ? res : [], isLoading: false};
				this.setState(newState);
			}

		});
		socket.on(`organization-Abilities-get/${organizationId}`, (res) => {
			if (res.detail) {
				const newState = {...this.state, error: res.detail, isLoading: false};
				this.setState(newState);
			} else {
				const newState = {...this.state, organization: res, isLoading: false};
				this.setState(newState);
			}
		});

		
	}
	showCreateForm = () => {
			this.setState({createForm: true});
	};
	hideCreateForm = () => {
			this.setState({createForm: false});
	};
	updateStateForView = (error,isLoading) =>{
		this.setState({...this.state, error:error, isLoading:isLoading})
	}

	render() {
		const {  organizationId} = this.props;
		const {createForm, skills, isLoading, error} = this.state;
		return (
		<VerifyWrapper isLoading={isLoading} error={error}>
			{
				<div>
					<CategoryTitle
						title={__('Skills')}
						showCreateForm={this.showCreateForm}
						createForm={createForm}
					/>
					<FrameCard>
						<SkillList
							updateStateForView={this.updateStateForView}
							skills={skills}
							organizationId={organizationId}
							createForm={createForm}
							hideCreateForm={this.hideCreateForm}
						/>
					</FrameCard>
				</div>
			}
		</VerifyWrapper>
		)
	}
}
export default Skills;