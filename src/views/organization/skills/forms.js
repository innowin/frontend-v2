/*global __*/
import React, {Component} from "react";
import PropTypes from "prop-types";
import {CheckBox} from "../../common/inputs/CheckBox";
import {Confirm} from "../../common/cards/Confirm";
import {SelectComponent} from '../../common/SelectComponent';
import {TextareaInput} from "../../common/inputs/TextareaInput";
import {TextInput} from "../../common/inputs/TextInput";
import {FileInput} from "src/views/common/inputs/FileInput";


export class AbilityForm extends Component {
	constructor(props){
		super(props);
		this.state = { ability:props.ability}
	}
	static propTypes = {
			onSubmit: PropTypes.func.isRequired,
			ability: PropTypes.object,
	};
	
    _getValues = () => {
        return {
            title: this.abilityTitleInput.getValue(),
            text: this.abilityDescriptionInput.getValue(),
        };
    };

    _formValidate = () => {
        let result = true;
        const validates = [
            this.abilityTitleInput.validate(),
            this.abilityDescriptionInput.validate(),
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
				const ability = this.props.ability || {};
        return (
            <form onSubmit={onSubmit} className="row w-100">
                <div className="descriptionBox">
									<TextInput
										name="title"
										label={__('Title') + ": "}
										value={ability.title}
										ref={abilityTitleInput => {this.abilityTitleInput = abilityTitleInput}}
									/>
									<TextareaInput
										name="description"
										label={__('Description') + ": "}
										value={ability.text}
										ref={abilityDescriptionInput => {this.abilityDescriptionInput = abilityDescriptionInput}}
									/>
								</div>
                {this.props.children}
            </form>
        )
    }
}


export class AbilityCreateForm extends Component {

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
        return <AbilityForm onSubmit={this._onSubmit} ref={form => {
            this.form = form
        }}>
            <div className="col-12 d-flex justify-content-end">
                <button type="button" className="btn btn-secondary mr-2" onClick={hideCreateForm}>
                    {__('Cancel')}
                </button>
                <button type="submit" className="btn btn-success">{__('Create')}</button>
            </div>
        </AbilityForm>;
    }
}
export class AbilityEditForm extends Component {

    static propTypes = {
        update: PropTypes.func.isRequired,
        remove: PropTypes.func.isRequired,
        hideEdit: PropTypes.func.isRequired,
        ability: PropTypes.object.isRequired,
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
        const {ability, updateStateForView, hideEdit} = this.props;
        return this.props.remove(ability.id, updateStateForView, hideEdit)
    };

    _save = () => {
        const {ability, updateStateForView, hideEdit} = this.props;
        const abilityId = ability.id;
        const formValues = this.form._getValues();
        return this.props.update(formValues, abilityId, updateStateForView, hideEdit)
    };

    _onSubmit = (e) => {
        e.preventDefault();
        this._save();
    };

    render() {
        const {confirm} = this.state;
        const {hideEdit, ability} = this.props;
        if (confirm) {
            return <Confirm cancelRemoving={this._cancelConfirm} remove={this._remove}/>;
        }
        return <AbilityForm onSubmit={this._onSubmit} ability={ability}
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
        </AbilityForm>;
    }
}