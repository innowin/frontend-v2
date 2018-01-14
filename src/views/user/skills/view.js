/*global __*/
import React, {Component} from 'react';
import PropTypes from "prop-types";
import {userInfoIcon} from "src/images/icons"


export const UserSkillView =({showEdit,skill})=> {
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
UserSkillView.propTypes={
	showEdit: PropTypes.func.isRequired,
	skill: PropTypes.object.isRequired,
}