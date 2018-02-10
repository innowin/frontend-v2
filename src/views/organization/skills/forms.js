/*global __*/
import React, {Component} from "react"
import PropTypes from "prop-types"
import {TextareaInput} from "src/views/common/inputs/TextareaInput"
import {TextInput} from "src/views/common/inputs/TextInput"
import {updateSkill} from "../../../crud/organization/skills"
import {Confirm} from "../../common/cards/Confirm";
import {REST_URL as url, SOCKET as socket} from "../../../consts/URLS"
import {TOKEN} from "../../../consts/data"
import {REST_REQUEST} from "../../../consts/Events"

export class SkillForm extends Component {
	static propTypes = {
		onSubmit: PropTypes.func.isRequired,
		skill: PropTypes.object,
	};

	getValues = () => {
		return {
			delete_flag: false, //TODO amir :what is delete_flag
			title: this.titleInput.getValue(),
			text: this.descriptionInput.getValue()
		}
	};

  formValidate = () => {
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

	render() {
			const {organization} = this.props;
			const skill = this.props.skill || {picture: null};
			return <form onSubmit={this.props.onSubmit}>
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
					{this.props.children}
				</div>
			</form>
	}
}


export class SkillCreateForm extends Component {

	static propTypes = {
			create: PropTypes.func.isRequired,
			hideEdit: PropTypes.func.isRequired
	};

	save = () => {
			const formValues = this.refs.form.getValues();
			const { hideEdit} = this.props;
			return this.props.create(formValues, hideEdit);
	};

	onSubmit = (e) => {
			e.preventDefault();
			if (this.refs.form.formValidate()) {
				this.save();
			}
	};

	render() {
			const {} = this.props;
			return (
				<SkillForm onSubmit={this.onSubmit} ref="form">
						<div className="col-12 d-flex justify-content-end">
								<button type="button" className="btn btn-secondary mr-2" onClick={this.props.hideEdit}>
										{__('Cancel')}
								</button>
								<button type="submit" className="btn btn-success">{__('Create')}</button>
						</div>
				</SkillForm>
			)
	}
}
export class SkillEditForm extends Component {
	state = {
			confirm: false,
	};

	static propTypes = {
			update: PropTypes.func.isRequired,
			remove: PropTypes.func.isRequired,
			hideEdit: PropTypes.func.isRequired,
			skill: PropTypes.object.isRequired,
	};

	showConfirm = () => {
			this.setState({confirm: true})
	};

	cancelConfirm = () => {
		this.setState({confirm: false})
	};

	remove = () => {
		const{hideEdit} = this.props;
		const skillId = this.props.skill.id;
		return this.props.remove(skillId,hideEdit)
	};

	save = () => {//(formValues, skillId, updateStateForView, hideEdit
		const {skill,updateStateForView,hideEdit} = this.props;
		const skillId = skill.id;
		const formValues = this.refs.form.getValues();
		return this.props.update(formValues, skillId, updateStateForView, hideEdit)
	};

	onSubmit = (e) => {
		e.preventDefault();
		this.save();
	};

	render() {
		const {confirm} = this.state;
		if (confirm) {
				return <Confirm cancelRemoving={this.cancelConfirm} remove={this.remove}/>;
		}

		const {skill} = this.props;
		return <SkillForm onSubmit={this.onSubmit} ref="form" skill={skill} >
				<div className="col-12 d-flex justify-content-end">
						<button type="button" className="btn btn-outline-danger mr-auto" onClick={this.showConfirm}>
								{__('Delete')}
						</button>
						<button type="button" className="btn btn-secondary mr-2" onClick={this.props.hideEdit}>
								{__('Cancel')}
						</button>
						<button type="submit" className="btn btn-success">{__('Save')}</button>
				</div>
		</SkillForm>;
	}
}
