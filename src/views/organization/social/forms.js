/*global __*/
import React, {Component} from "react";
import PropTypes from "prop-types";
import {CheckBox} from "../../common/inputs/CheckBox";
import {Confirm} from "../../common/cards/Confirm";
import {SelectComponent} from '../../common/SelectComponent';
import {TextareaInput} from "../../common/inputs/TextareaInput";
import {TextInput} from "../../common/inputs/TextInput";
import {FileInput} from "src/views/common/inputs/FileInput";


export class SocialForm extends Component {
	constructor(props){
        super(props);
        let tags = [];
        if(props.Social){
            tags = props.Social.tag;
        }
		this.state = { Social:props.Social ,tag:tags}
	}
	static propTypes = {
			onSubmit: PropTypes.func.isRequired,
			Social: PropTypes.object,
	};
	
	_deleteTag(tagIndex){
		const {Social, tag} = this.state;
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
            title: this.SocialTitleInput.getValue(),
            description: this.SocialDescriptionInput.getValue(),
            tag:this.state.tag
        };
    };

    _formValidate = () => {
        let result = true;
        const validates = [
            this.SocialTitleInput.validate(),
            this.SocialDescriptionInput.validate(),
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
                const Social = this.props.Social || {tag:this.state.tag};
				const tags = Social.tag.map((tag,index)=>{
					return(
						<div className="tagEdit m-1">
							<button className="tagCross btn btn-danger btn-sm" onClick={()=>{this._deleteTag(index)}}>x</button>
							<span class="badge badge-secondary SocialTag m-1">{tag}</span>
						</div>
			)
				});
        return (
            <form onSubmit={onSubmit} className="row w-100">
                <div className="descriptionBox">
									<TextInput
										name="title"
										label={__('Title') + ": "}
										value={Social.title}
										ref={SocialTitleInput => {this.SocialTitleInput = SocialTitleInput}}
									/>
									<TextareaInput
										name="description"
										label={__('Description') + ": "}
										value={Social.description}
										ref={SocialDescriptionInput => {this.SocialDescriptionInput = SocialDescriptionInput}}
									/>
									<div className="SocialTags m-1" name="tags" ref={(input)=>{this.tags = input;}} >
										{tags}
									</div>
									<div className="SocialAddTagInput">
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


export class SocialCreateForm extends Component {

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
        return <SocialForm onSubmit={this._onSubmit} ref={form => {
            this.form = form
        }}>
            <div className="col-12 d-flex justify-content-end">
                <button type="button" className="btn btn-secondary mr-2" onClick={hideCreateForm}>
                    {__('Cancel')}
                </button>
                <button type="submit" className="btn btn-success">{__('Create')}</button>
            </div>
        </SocialForm>;
    }
}
export class SocialEditForm extends Component {

    static propTypes = {
        update: PropTypes.func.isRequired,
        remove: PropTypes.func.isRequired,
        hideEdit: PropTypes.func.isRequired,
        Social: PropTypes.object.isRequired,
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
        const {Social, updateStateForView, hideEdit} = this.props;
        return this.props.remove(Social.id, updateStateForView, hideEdit)
    };

    _save = () => {
        const {Social, updateStateForView, hideEdit} = this.props;
        const SocialId = Social.id;
        const formValues = this.form._getValues();
        return this.props.update(formValues, SocialId, updateStateForView, hideEdit)
    };

    _onSubmit = (e) => {
        e.preventDefault();
        this._save();
    };

    render() {
        const {confirm} = this.state;
        const {hideEdit, Social} = this.props;
        if (confirm) {
            return <Confirm cancelRemoving={this._cancelConfirm} remove={this._remove}/>;
        }
        return <SocialForm onSubmit={this._onSubmit} Social={Social}
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
        </SocialForm>;
    }
}