/*global __*/
//@flow
import * as React from 'react'
import PropTypes from "prop-types";
import {CheckBox} from "../../common/inputs/CheckBox";
import {Confirm} from "../../common/cards/Confirm";
import {SelectComponent} from '../../common/SelectComponent';
import {TextareaInput} from "../../common/inputs/TextareaInput";
import {TextInput} from "../../common/inputs/TextInput";
import {FileInput} from "src/views/common/inputs/FileInput";

type AbilityFormProps = { 
    onSubmit: Function,
    ability: Object,
    children : React.Node
}
export class AbilityForm extends React.Component<AbilityFormProps,{ability:Object}>{
    abilityTitleInput : any;
    abilityDescriptionInput: any;

	constructor(props:AbilityFormProps){
		super(props);
		this.state = {...this.state, ability:props.ability}
	}	
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

type AbilityCreateFormProps = {
    create: Function,
    hideCreateForm: Function
}
export class AbilityCreateForm extends React.Component<AbilityCreateFormProps> {
	form: any;
    _save = () => {
        const {create, hideCreateForm} = this.props;
        const formValues = this.form._getValues();
        return create(formValues, hideCreateForm);
    };

    _onSubmit = (e:SyntheticEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (this.form._formValidate()) {
            this._save()
        }
        return false;
    };

    render() {
        const {hideCreateForm} = this.props;
        return <AbilityForm ability = {{}} onSubmit={this._onSubmit} ref={form => {
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
type AbilityEditFormProps = { 
    update: Function,
    remove: Function,
    hideEdit: Function,
    ability: Object,
    updateStateForView : Function
}
export class AbilityEditForm extends React.Component<AbilityEditFormProps,{confirm:boolean}> {
    form: any;
    constructor(props:AbilityEditFormProps) {
        super(props);
        this.state = {...this.state, confirm: false};
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

    _onSubmit = (e: SyntheticEvent<HTMLButtonElement>) => {
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