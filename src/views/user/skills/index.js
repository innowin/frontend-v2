/*global __*/
import React,{Component} from "react";
import PropTypes from 'prop-types';
import {
	VerifyWrapper,
	ListGroup
	} from "../../common/cards/Frames";
import {UserSkillView} from "./view";
import {REST_URL as url, SOCKET as socket} from "../../../consts/URLS"
import {REST_REQUEST} from "../../../consts/Events"

//TODO amir #5  get data with SOCKET and review component
export class UserSkills extends Component {
	constructor(props) {
		super(props);
		this.state = {error: null, edit: false, isLoading: false, skills:[]};
	}

	static propTypes = {
		updateUser: PropTypes.func.isRequired,
		userId: PropTypes.string.isRequired,
	};

	componentDidMount(){
		const {userId } = this.props;
		const emitting = () => {
			const newState = {...this.state, isLoading: true};
			this.setState(newState);
			socket.emit(REST_REQUEST,
				{
					method: "get",
					url: `${url}/users/skills/?skill_user=${userId}`,
					result: `UserSkills-get/${userId}`,
					token: "",
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

	showEdit = () => {
			this.setState({...this.state, edit: true});
	};
	hideEdit = () => {
			this.setState({...this.state, edit: false});
	};
	_deleteTag(element,index){

	}
	_addTag(tagName){

	}

	render() {
		const {skills, edit, isLoading, error} = this.state;
		const skillsView = skills.map((skill,index)=>{
			return <UserSkillView skill={skill}
			 key={index}
			 edit={edit}
			 showEdit={this.showEdit}
			 addTag={this._addTag}
			 deleteTag={this.deleteTag}/>
		})
		return(
			<VerifyWrapper isLoading={isLoading} error={error}>
				{
					<ListGroup>
						{skillsView}
					</ListGroup>
				}
			</VerifyWrapper>

		)
	}
}

export default UserSkills;
