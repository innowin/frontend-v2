/*global __*/
import React,{Component} from 'react';
import PropTypes from "prop-types";
import {
	ItemWrapper
} from '../../common/cards/Frames';
import {
	userInfoIcon
} from '../../../images/icons';


export class UserSkillView extends Component {
	static propTypes={
		skill: PropTypes.object.isRequired,
		edit: PropTypes.bool.isRequired,
		showEdit: PropTypes.func.isRequired,
		skillIndex:PropTypes.number.isRequired
	}
	constructor(props){
		super(props);
	}

	render(){
		const {skill, showEdit} = this.props;
		const tags = skill.tag.map((tag,index)=>{
{/*<<<<<<< HEAD*/}
			return(<span className="badge badge-secondary skillTag m-1">{tag}</span>)
		});
					// <div className="descriptionBox">
					// 	<input type="text" className="h6 form-control" value={skill.title} name="title"></input>
					// 	<textarea className="skillDescription form-control" name="description">
					// 		{skill.description}
					// 	</textarea>
					// 	<div className="skillTags m-1" name="tags" ref={(input)=>{this.tags = input;}} >
					// 		{tags}
					// 	</div>
					// 	<div className="skillAddTagInput">
					// 		<input type="button" className="btn btn-primary m-2" value={__('Add Tag')} onClick={()=>{addTag(this.tagname,skillIndex)}} />
					// 		<input type="text" className="form-control m-1" name="tagName"  placeholder={__('Tag Name')} ref={(input)=>{this.tagname = input;}}/>
					// 	</div>
					// </div>

// =======
//       if(edit){
//       return (
//       <span class="badge badge-secondary skillTag m-1">
//       {tag}
//       <span className="tagCross" onClick={this.deleteTag.bind(this,index)}>X</span>
//       </span>
//       )
//     }else{
//       return(
//       <span class="badge badge-secondary skillTag m-1">{tag}</span>)
//     }
//
//     });
//     if(edit){
//       return (
//       <div className="descriptionBox">
//       <input type="text" className="h6 form-control" value={skill.title} name="title"></input>
//       <textarea className="skillDescription form-control" name="description">
//       {skill.description}
//       </textarea>
//       <div className="skillTags" name="tags" ref={(input)=>{this.tags = input;}} >
//       {tags}
//       </div>
//       <input type="button" className="form-control" value={__('Add Tag')} onClick={this.addTag} />
//       <input type="text" className="form-control" name="tagName"  ref={(input)=>{this.tagname = input;}}> </input>
//       </div>
//       )
//     }else{
//       >>>>>>> premaster
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
