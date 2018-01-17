/*global __*/
import React, {Component} from "react"
import PropTypes from "prop-types"
import {TextareaInput} from "src/views/common/inputs/TextareaInput"
import {TextInput} from "src/views/common/inputs/TextInput"
import {updateSkill} from "../../../crud/user/skills"
import {REST_URL as url, SOCKET as socket} from "../../../consts/URLS"
import {TOKEN} from "../../../consts/data"
import {REST_REQUEST} from "../../../consts/Events"

export class SkillInfoForm extends Component {
	constructor(props){
		super(props);
		this.state={error:false,isLoading:false, skill:props.skill}
	}
	static propTypes = {
		updateStateForView: PropTypes.func.isRequired,
		hideEdit : PropTypes.func.isRequired,
		skillIndex:PropTypes.number.isRequired,
		skill:PropTypes.object.isRequired
	};

	_getValues = () => {
		return {
			delete_flag: false, //TODO amir :what is delete_flag
			title: this.titleInput.getValue(),
			tag: this.state.skill.tag,
			description: this.descriptionInput.getValue()
		}
	};

  _formValidate = () => {
		let result = true;
		const validates = [
			this.titleInput.validate(),
			this.descriptionInput.validate()
		];
		for (let i = 0; i < validates.length; i++) {
			if (validates[i]) {
				result = false;
				break;
			}
		}
		return result
	};

	_deleteTag(tagIndex,skillIndex,proxy){
		const {skill} = this.state;
		skill.tag.splice(tagIndex,1);
		this.setState({...this.state, skill:skill})
	}

	_addTag(tag,skillIndex){
		const {skill} = this.state;
		skill.tag.push(tag);
		this.setState({...this.state, skill:skill})
	}
	_updateStateForView(skill, error , loading){
		const {updateStateForView,skillIndex} = this.props;
		updateStateForView(skill, skillIndex, error, loading);
	}
	_onSubmit = (e) => {
		e.preventDefault();
		const { hideEdit} = this.props;
		if (this._formValidate()) {
			updateSkill(this._getValues(),this.state.skill.id,this._updateStateForView.bind(this),hideEdit);
		}
		return false;
	};

	render() {
		//Todo keep ltr
		const skill = this.props.skill || {};
		const {hideEdit, skillIndex} = this.props;

		const tags = skill.tag.map((tag,index)=>{
				return (
				<div className="tagEdit m-1">
					<button className="tagCross btn btn-danger btn-sm" onClick={()=>{this._deleteTag(index,skillIndex)}}>x</button>
					<span class="badge badge-secondary skillTag m-1">{tag}</span>
				</div>
				)
		})

		return (
			<form onSubmit={this._onSubmit}>
				<div className="descriptionBox">
					<TextInput
						name="title"
						label={__('Title') + ": "}
						value={skill.title}
						ref={titleInput => {this.titleInput = titleInput}}
					/>
					<TextareaInput
						name="description"
						label={__('Description') + ": "}
						value={skill.description}
						ref={descriptionInput => {this.descriptionInput = descriptionInput}}
					/>
					<div className="skillTags m-1" name="tags" ref={(input)=>{this.tags = input;}} >
						{tags}
					</div>
					<div className="skillAddTagInput">
						<input type="button" className="btn btn-primary m-2" value={__('Add Tag')} onClick={()=>{this._addTag(this.refs.tagname,skillIndex)}} />
						<TextInput
							name="tagName"
							label={__('Tag Name') + ": "}
							ref={tagNameInput => {this.tagNameInput = tagNameInput}}
						/>
					</div>
					<button type="button" className="btn btn-secondary mr-2" onClick={hideEdit}>
						{__('Cancel')}
					</button>
					<button type="submit" className="btn btn-success">{__('Save')}</button>
				</div>
			</form>
		)
	}
}
export default SkillInfoForm;