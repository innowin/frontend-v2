/*global __*/
import React, {Component} from "react";
import PropTypes from "prop-types";
import {CheckBox} from "../../common/inputs/CheckBox";
import {Confirm} from "../../common/cards/Confirm";
import {SelectComponent} from '../../common/SelectComponent';
import {TextareaInput} from "../../common/inputs/TextareaInput";
import {TextInput} from "../../common/inputs/TextInput";
import {FileInput} from "src/views/common/inputs/FileInput";


export class SkillForm extends Component {
	constructor(props){
        super(props);
        let tags = [];
        if(props.skill){
            tags = props.skill.tag;
        }
		this.state = { skill:props.skill ,tag:tags}
	}
	static propTypes = {
			onSubmit: PropTypes.func.isRequired,
			skill: PropTypes.object,
	};
	
	_deleteTag(tagIndex){
		const {skill, tag} = this.state;
		tag.splice(tagIndex,1);
		this.setState({...this.state, tag:tag})
	}

	_addTag(tagInput){
        const { tag} = this.state;
        tag.push(tagInput.getValue())
		this.setState({...this.state, tag:tag})
	}

    _getValues = () => {
        return {
            title: this.skillTitleInput.getValue(),
            description: this.skillDescriptionInput.getValue(),
            tag:this.state.tag
        };
    };

    _formValidate = () => {
        let result = true;
        const validates = [
            this.skillTitleInput.validate(),
            this.skillDescriptionInput.validate(),
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
        const {onSubmit} = this.props;
                const skill = this.props.skill || {tag:this.state.tag};
				const tags = skill.tag.map((tag,index)=>{
					return(
						<div className="tagEdit m-1">
							<button className="tagCross btn btn-danger btn-sm" onClick={()=>{this._deleteTag(index)}}>x</button>
							<span class="badge badge-secondary skillTag m-1">{tag}</span>
						</div>
			)
				});
        return (
            <form onSubmit={onSubmit} className="row w-100">
                <div className="descriptionBox">
									<TextInput
										name="title"
										label={__('Title') + ": "}
										value={skill.title}
										ref={skillTitleInput => {this.skillTitleInput = skillTitleInput}}
									/>
									<TextareaInput
										name="description"
										label={__('Description') + ": "}
										value={skill.description}
										ref={skillDescriptionInput => {this.skillDescriptionInput = skillDescriptionInput}}
									/>
									<div className="skillTags m-1" name="tags" ref={(input)=>{this.tags = input;}} >
										{tags}
									</div>
									<div className="skillAddTagInput">
										<input type="button" className="btn btn-primary m-2" value={__('Add Tag')} onClick={()=>{this._addTag(this.tagNameInput)}} />
										<TextInput
											name="tagName"
											label={__('Tag Name') + ": "}
											ref={tagNameInput => {this.tagNameInput = tagNameInput}}
										/>
									</div>
								</div>
                {this.props.children}
            </form>
        )
    }
}


export class SkillCreateForm extends Component {

    static propTypes = {
        create: PropTypes.func.isRequired,
        hideCreateForm: PropTypes.func.isRequired
    };

		
		
    _save = () => {
        const {create, hideCreateForm} = this.props;
        const formValues = this.form._getValues();
        return create(formValues, hideCreateForm);
    };

    _onSubmit = (e) => {
        e.preventDefault();
        if (this.form._formValidate()) {
            this._save()
        }
        return false;
    };

    render() {
        const {hideCreateForm} = this.props;
        return <SkillForm onSubmit={this._onSubmit} ref={form => {
            this.form = form
        }}>
            <div className="col-12 d-flex justify-content-end">
                <button type="button" className="btn btn-secondary mr-2" onClick={hideCreateForm}>
                    {__('Cancel')}
                </button>
                <button type="submit" className="btn btn-success">{__('Create')}</button>
            </div>
        </SkillForm>;
    }
}
export class SkillEditForm extends Component {

    static propTypes = {
        update: PropTypes.func.isRequired,
        remove: PropTypes.func.isRequired,
        hideEdit: PropTypes.func.isRequired,
        skill: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {confirm: false};
    }

    _showConfirm = () => {
        this.setState({confirm: true})
    };

    _cancelConfirm = () => {
        this.setState({confirm: false})
    };

    _remove = () => {
        const {skill, updateStateForView, hideEdit} = this.props;
        return this.props.remove(skill.id, updateStateForView, hideEdit)
    };

    _save = () => {
        const {skill, updateStateForView, hideEdit} = this.props;
        const skillId = skill.id;
        const formValues = this.form._getValues();
        return this.props.update(formValues, skillId, updateStateForView, hideEdit)
    };

    _onSubmit = (e) => {
        e.preventDefault();
        this._save();
    };

    render() {
        const {confirm} = this.state;
        const {hideEdit, skill} = this.props;
        if (confirm) {
            return <Confirm cancelRemoving={this._cancelConfirm} remove={this._remove}/>;
        }
        return <SkillForm onSubmit={this._onSubmit} skill={skill}
                         ref={form => {
                             this.form = form
                         }}>
            <div className="col-12 d-flex justify-content-end">
                <button type="button" className="btn btn-outline-danger mr-auto" onClick={this._showConfirm}>
                    {__('Delete')}
                </button>
                <button type="button" className="btn btn-secondary mr-2" onClick={hideEdit}>
                    {__('Cancel')}
                </button>
                <button type="submit" className="btn btn-success">{__('Save')}</button>
            </div>
        </SkillForm>;
    }
}