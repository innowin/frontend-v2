/*global __*/
import React, {Component} from "react"
import PropTypes from "prop-types"
import {TextareaInput} from "src/views/common/inputs/TextareaInput"
import {TextInput} from "src/views/common/inputs/TextInput"
import {updateSkill} from "../../../crud/organization/skills"
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
			text: this.descriptionInput.getValue()
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
						name="text"
						label={__('Description') + ": "}
						value={skill.text}
						ref={descriptionInput => {this.descriptionInput = descriptionInput}}
					/>
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