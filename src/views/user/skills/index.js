/*global __*/
import React,{Component} from "react";
import PropTypes from 'prop-types';
import {
	VerifyWrapper,
	ListGroup,
	FrameCard,
	ItemWrapper,
	ItemHeader
	} from "../../common/cards/Frames";
import {
	userInfoIcon
} from '../../../images/icons';

import {UserSkillView} from "./view";
import {REST_URL as url, SOCKET as socket} from "../../../consts/URLS"
import {TOKEN} from "../../../consts/data"
import {REST_REQUEST} from "../../../consts/Events"
import SkillInfoForm from './forms';


//TODO amir #5  get data with SOCKET and review component
export class UserSkills extends Component {
	constructor(props) {
		super(props);
		console.log("constructor: Skill index")
		this.state = {error: null, edit: false, isLoading: false, skills:[]};

	}

	static propTypes = {
		updateUser: PropTypes.func.isRequired,
		userId: PropTypes.string.isRequired,
	};

	componentDidMount(){
		console.log("ComponentDidMount: Skill index")
		const {userId } = this.props;
		const emitting = () => {
			const newState = {...this.state, isLoading: true};
			this.setState(newState);
			socket.emit(REST_REQUEST,
				{
					method: "get",
					url: `${url}/users/skills/?skill_user=${userId}`,
					result: `UserSkills-get/${userId}`,
					token: TOKEN,
				}
			);
		};

		emitting();

		socket.on(`UserSkills-get/${userId}`, (res) => {
			if (res.detail) {
				const newState = {...this.state, error: res.detail, isLoading: false};
				this.setState(newState);
			}else{
				const newState = {...this.state, skills: res, isLoading: false};
				this.setState(newState);
			}
		});
	}

	_showEdit = () => {
			this.setState({...this.state, edit: true});
	};
	_hideEdit = () => {
			this.setState({...this.state, edit: false});
	};

	_updateStateForView = (res,skillIndex, error, isLoading) => {
		const {skills} = this.state;
		skills[skillIndex] = res;
		this.setState({...this.state, skills:skills, error:error, isLoading:isLoading});
	};

	render() {
		const {skills, edit, isLoading, error} = this.state;

		const skillsView = skills.map((skill,index)=>{
			return( (!edit) ?
			<UserSkillView
				skill={skill}
				key={index}
				skillIndex={index}
				showEdit={this._showEdit}
			/> :
			<SkillInfoForm
				skillIndex ={index}
				skill = {skill}
				hideEdit={this._hideEdit}
				updateStateForView ={this._updateStateForView}
			/>)
		});

		return(
			<VerifyWrapper isLoading={isLoading} error={error}>
				{

					<FrameCard>
						<ItemWrapper icon={userInfoIcon}>
							<ItemHeader title={__('User info')} showEdit={this._showEdit}/>
							<ListGroup>
								{skillsView}
							</ListGroup>
						</ItemWrapper>
					</FrameCard>
				}
			</VerifyWrapper>

		)
	}
}

export default UserSkills;
