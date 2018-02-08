/*global __*/
import React, {Component} from "react"
import PropTypes from "prop-types"
import {ArrayInput} from "src/views/common/inputs/ArrayInput"
import {CustomArrayInput} from "src/views/common/inputs/CustomArrayInput"
import {CustomInput} from "src/views/common/inputs/CustomInput"
import {DateInput} from "src/views/common/inputs/DateInput"
import {EmailInput} from "src/views/common/inputs/EmailInput"
import {outputComponent} from "src/views/common/OutputComponent"
import {PhoneInput} from "src/views/common/inputs/PhoneInput"
import {TextareaInput} from "src/views/common/inputs/TextareaInput"
import {TextInput} from "src/views/common/inputs/TextInput"
import {updateOrganization} from "src/crud/organization/basicInformation"
import {OrganizationMembers} from "./index";

export class OrganizationMembersForm extends Component {
	static propTypes = {
		onSubmit: PropTypes.func.isRequired,
		profile: PropTypes.object,
	};

	_getValues = () => {
		return {
			birth_date: this.birthDateInput.getValue(),
			national_code: this.nationalCodeInput.getValue(),
			mobile: this.mobileInput.getValue(),
			phone: this.phoneInput.getValue(),
			fax: this.faxInput.getValue(),
			public_email: this.publicEmailInput.getValue(),
			telegram_account: this.telegramAccountInput.getValue(),
			web_site: this.webSiteInput.getValue(),
			description: this.descriptionInput.getValue(),
		}
	};

	_formValidate = () => {
		let result = true;
		const validates = [
			this.birthDateInput.validate(),
			this.nationalCodeInput.validate(),
			this.mobileInput.validate(),
			this.phoneInput.validate(),
			this.faxInput.validate(),
			this.publicEmailInput.validate(),
			this.telegramAccountInput.validate(),
			this.webSiteInput.validate(),
			this.descriptionInput.validate(),
		];
		for (let i = 0; i < validates.length; i++) {
			if (validates[i]) {
				result = false;
				break;
			}
		}
		return result
	};

	_nationalCodeValidate = (value, final) => {
		if (final && value && !/^\d{10}$/.test(value)) {
			return __('National code must be 10 digit ');
		} else {
			return false
		}
	};

	render() {
		//Todo keep ltr
		const members = this.props.members || {};
		return (
				<form onSubmit={this.props.onSubmit}>
					this is form of members
				</form>
		)
	}
}


export class OrganizationMembersEditForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			confirm: false
		}
	}

	static propTypes = {
		hideEdit: PropTypes.func.isRequired,
		updateStateForView: PropTypes.func.isRequired,
		profile: PropTypes.object.isRequired,
	};

	_save = (updateStateForView, hideEdit) => {
		const profileId = this.props.profile.id;
		const formValues = this.form._getValues();
		return updateOrganization(formValues, profileId, updateStateForView,  hideEdit)
	};

	_onSubmit = (e) => {
		e.preventDefault();
		const {updateStateForView, hideEdit} = this.props;
		if (this.form._formValidate()) {
			this._save(updateStateForView, hideEdit)
		}
		return false;
	};

	render() {
		const {profile} = this.props;
		return (
				<OrganizationMembersForm onSubmit={this._onSubmit} ref={form => {this.form = form}} profile={profile}>
					<div className="col-12 d-flex justify-content-end">
						<button type="button" className="btn btn-secondary mr-2" onClick={this.props.hideEdit}>
							{__('Cancel')}
						</button>
						<button type="submit" className="btn btn-success">{__('Save')}</button>
					</div>
				</OrganizationMembersForm>
		)
	}
}


export class OrganizationInfoForm extends Component {
	static propTypes = {
		onSubmit: PropTypes.func.isRequired,
		organization: PropTypes.object,
	};
	
	_getValues = () => {
		return {
			username: this.usernameInput.getValue(),
			official_name: this.officialNameInput.getValue(),
			national_name: this.nationalCodeInput.getValue(),
			country: this.countryInput.getValue(),
			province: this.provinceInput.getValue(),
			city: this.cityInput.getValue(),
		}
	};
	
	_formValidate = () => {
		let result = true;
		const validates = [
			this.usernameInput.validate(),
			this.officialNameInput.validate(),
			this.nationalCodeInput.validate(),
			this.countryInput.validate(),
			this.provinceInput.validate(),
			this.cityInput.validate(),
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
		const organization = this.props.organization || {};
		return (
				<form onSubmit={this.props.onSubmit}>
					<div className="row">
						<TextInput
								name="username"
								label={__('Username') + ": "}
								value={organization.username}
								ref={usernameInput => {
									this.usernameInput = usernameInput
								}}
						/>
						<TextInput
								name="officialName"
								label={__('Official name') + ": "}
								value={organization.official_name}
								ref={officialNameInput => {
									this.officialNameInput = officialNameInput
								}}
						/>
						<TextInput
								name="nationalCode"
								label={__('National code') + ": "}
								value={organization.national_code}
								ref={nationalCodeInput => {
									this.nationalCodeInput = nationalCodeInput
								}}
						/>
						<TextInput
								name="country"
								label={__('Country') + ": "}
								value={organization.country}
								ref={countryInput => {
									this.countryInput = countryInput
								}}
						/>
						<TextInput
								name="province"
								label={__('Province') + ": "}
								value={organization.province}
								ref={provinceInput => {
									this.provinceInput = provinceInput
								}}
						/>
						<TextInput
								name="city"
								label={__('City') + ": "}
								value={organization.city}
								ref={cityInput => {
									this.cityInput = cityInput
								}}
						/>

						{this.props.children}
					</div>
				</form>
		)
	}
}


export class OrganizationInfoEditForm extends Component {
	constructor(props) {
		super(props);
		this.state = {confirm: false}
	}
	
	static propTypes = {
		hideEdit: PropTypes.func.isRequired,
		updateStateForView: PropTypes.func.isRequired,
		organization: PropTypes.object.isRequired
	};
	
	_save = (updateStateForView, hideEdit) => {
		const organizationId = this.props.organization.id;
		const formValues = this.form._getValues();
		//console.error('hi',formValues, organizationId, updateStateForView, hideEdit);
		return updateOrganization(formValues, organizationId, updateStateForView, hideEdit)
	};
	
	_onSubmit = (e) => {
		const {updateStateForView, hideEdit} = this.props;
		e.preventDefault();
		if (this.form._formValidate()) {
			this._save(updateStateForView, hideEdit)
		}
		return false;
	};
	
	render() {
		const {organization} = this.props;
		return (
				<OrganizationInfoForm onSubmit={this._onSubmit} ref={form => {
					this.form = form
				}} organization={organization}>
					<div className="col-12 d-flex justify-content-end">
						<button type="button" className="btn btn-secondary mr-2" onClick={this.props.hideEdit}>
							{__('Cancel')}
						</button>
						<button type="submit" className="btn btn-success">{__('Save')}</button>
					</div>
				</OrganizationInfoForm>
		)
	}
}


