/*global __*/
import React,{Component} from 'react';
import PropTypes from "prop-types";

export class UserSkillView extends Component {
	static propTypes={
		skill: PropTypes.object.isRequired,
		edit: PropTypes.bool.isRequired,
		showEdit: PropTypes.func.isRequired
	}
	constructor(props){
		super(props);
	}

	render(){
		const {skill,edit,showEdit} = this.props;
		const tags = skill.tags.map((tag,index)=>{
			if(edit){
				<span class="badge badge-secondary skillTag m-1">{tag.name}<span className="tagCross" onClick={this.deleteTag.bind(this,index)}>X</span></span>
			}else{
				return
				<span class="badge badge-secondary skillTag m-1">{tag.name}</span>
			}

		})
		if(edit){
			return (
				<div className="descriptionBox">
					<input type="text" className="h6 form-control" value={skill.title} name="title"></input>
					<textarea className="skillDescription form-control" name="description">
						{skill.description}
					</textarea>
					<div className="skillTags" name="tags" ref={(input)=>{this.tags = input;}} >
						{tags}
					</div>
					<input type="button" className="form-control" value={__('Add Tag')} onClick={this.addTag} />
					<input type="text" className="form-control" name="tagName"  ref={(input)=>{this.tagname = input;}}> </input>
				</div>
			)
		}else{
			return (
				<div className="descriptionBox">
					<h6>{skill.title}</h6>
					<p className="skillDescription">
						{skill.description}
					</p>
					<div className="skillTags">
						{tags}
					</div>
				</div>
			)
		}

	}
};
