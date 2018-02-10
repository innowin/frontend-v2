import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {SkillEditForm} from './forms';
import {ItemHeader, ItemWrapper} from "../../common/cards/Frames";
import {skillIcon, starIcon} from "src/images/icons";

export const SkillItemWrapper = ({children}) => {
	return <ItemWrapper icon={skillIcon}>{children}</ItemWrapper>;
};

export class SkillView extends Component {
	static propTypes = {
		showEdit: PropTypes.func.isRequired,
		skill: PropTypes.object.isRequired,
	};

	render() {
		const {skill, showEdit} = this.props;
		return (
			<div className="descriptionBox">
				<h6>{skill.title}</h6>
				<p className="skillDescription">
					{skill.text}
				</p>
			</div>
		)
	}
}


export class Skill extends Component {
	constructor(props){
		super(props);
		const {skill} = props;
		this.state = {edit: false, skill:skill};
	}
	componentWillReceiveProps(props){
		const {skill} = props;
		this.setState({...this.state, skill:skill})
	}

	static propTypes = {
		updateSkill: PropTypes.func.isRequired,
		deleteSkill: PropTypes.func.isRequired,
		skill: PropTypes.object.isRequired,
		updateStateForView:PropTypes.func.isRequired
	};

	showEdit = () => {
		this.setState({edit: true});
	};

	hideEdit = () => {
		this.setState({edit: false});
	};

	updateStateForView = (res, error,isLoading) =>{
		const {updateStateForView} = this.props;
		this.setState({...this.state,skill:res })
	}

	render() {
		const {skill} = this.state;
		if (this.state.edit) {
			return <SkillItemWrapper>
				<SkillEditForm
					skill = {skill}
					hideEdit = {this.hideEdit}
					updateStateForView = {this.updateStateForView}
					remove = {this.props.deleteSkill}
					update = {this.props.updateSkill}
				/>
			</SkillItemWrapper>;
		}
		return <SkillView skill={skill} showEdit={this.showEdit}/>;
	}
}
