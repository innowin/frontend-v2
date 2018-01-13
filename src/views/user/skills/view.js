/*global __*/
import React, {Component} from 'react';
import PropTypes from "prop-types";
import {userInfoIcon} from "src/images/icons"
import {
		ItemHeader,
		ItemWrapper,
		ListGroup
} from "../../common/cards/Frames";

export const UserView =({showEdit,skill})=> {
		const tags = skill.tags.map((tag,index)=>{
			return <span class="badge badge-secondary skillTag m-1">{tag.name}</span>
		})
		// TODO keep ltr
			return (
				<div className="descriptionBox" showEdit={showEdit}>
					<h6>{skill.title}</h6>
					<p className="skillDescription">
						{skill.description}
					</p>
					<div className="skillTags">
						{tags}
					</div>
				</div>
			)
};
UserView.propTypes={
	showEdit: PropTypes.func.isRequired,
	skill: PropTypes.object.isRequired,
}

export class UserInfo extends Component {
		state = {edit: false};
		showEdit = () => {
				this.setState({edit: true});
		};
		hideEdit = () => {
				this.setState({edit: false});
		};

		render() {
			const {User, updateUser} = this.props;
			const skills = User.skills.map((skill,index)=>{
				return <UserView skill={skill.node} key={index} showEdit={this.showEdit}/>
			})
			return (
				<div>
				{skills}
				</div>
			)
		}
}
UserInfo.propTypes = {
	updateUser: PropTypes.func.isRequired,
	User: PropTypes.object.isRequired,
};

export const UserSkills = ({updateUser,User}) => {
	return (
	<ListGroup>
		<UserInfo {...{User}} {...{updateUser}} />
	</ListGroup>
	)
};

UserSkills.propTypes = {
	updateUser: PropTypes.func.isRequired,
	User: PropTypes.object.isRequired,
	allUsers: PropTypes.array,
}
