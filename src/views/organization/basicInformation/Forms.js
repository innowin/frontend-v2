/*global __*/
//@flow 
import * as React from 'react'
import PropTypes from "prop-types"
import {TextInput} from "src/views/common/inputs/TextInput"
// import {updateOrganization} from "src/crud/organization/basicInformation"
import {OrganizationMember} from './Views'



type OrganizationMembersFormProps = {
	onSubmit:Function,
	members: Array<Object>,
	children: React.Node
}
export class OrganizationMembersForm extends React.Component<OrganizationMembersFormProps> {
	birthDateInput:any;
	nationalCodeInput:any;
	mobileInput:any;
	phoneInput:any;
	faxInput:any;
	publicEmailInput:any;
	telegramAccountInput:any;
	webSiteInput:any;
	descriptionInput:any;
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

	_nationalCodeValidate = (value:string, final:string) => {
		if (final && value && !/^\d{10}$/.test(value)) {
			return __('National code must be 10 digit ');
		} else {
			return false
		}
	};

	render() {
		//Todo pedram : delete and create functionality should be added
		const members = this.props.members || [{}];
		return (
				<form onSubmit={this.props.onSubmit}>
					<div className="members-wrapper">
						{
							members.map((member)=>{
								return (
										<OrganizationMember key={member.id} jobTitle={member.position} firstName={member.staff_user.first_name} lastName={member.staff_user.last_name} isEdit userID={member.staff_user.id}/>
								)})
						}
					</div>
					<div className="add-member">
						<button className='btn btn-primary'>{__('Add')}</button>
					</div>
					<div>{this.props.children}</div>
				</form>
		)
	}
}

type OrganizationMembersEditFormProps = {
	hideEdit: Function,
	// updateStateForView: Function,
	members: Array<Object>,
	profile?:Object,
	actions:Object
}
export class OrganizationMembersEditForm extends React.Component<OrganizationMembersEditFormProps,{confirm: boolean}> {
	form:any;
	constructor(props:OrganizationMembersEditFormProps) {
		super(props);
		this.state = {
			confirm: false
		}
	}

	_save = ( hideEdit:Function) => {
		const profileId = this.props.profile.id;
		const formValues = this.form._getValues();
		formValues.profileId = profileId;
		const {updateOrganization} = this.props.actions;
		updateOrganization(formValues, profileId)
	};

	_onSubmit = (e:SyntheticEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const {hideEdit} = this.props;
		if (this.form._formValidate()) {
			this._save( hideEdit)
		}
		return false;
	};

	render() {
		const {members} = this.props;
		return (
				<OrganizationMembersForm onSubmit={this._onSubmit} ref={form => {this.form = form}} members={members}>
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

type OrganizationInfoFormProps = {
	onSubmit: Function,
	organization: Object,
	children : React.Node
}
export class OrganizationInfoForm extends React.Component<OrganizationInfoFormProps> {
	usernameInput:any;
	officialNameInput:any;
	nationalCodeInput:any;
	countryInput:any;
	provinceInput:any;
	cityInput:any;
	
	_getValues = () => {
		return {
			username: this.usernameInput.getValue(),
			official_name: this.officialNameInput.getValue(),
      national_code: this.nationalCodeInput.getValue(),
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

type OrganizationInfoEditFormProps = { 
	hideEdit: Function,
	// updateStateForView: Function,
	organization: Object,
	actions:Object
}
export class OrganizationInfoEditForm extends React.Component<OrganizationInfoEditFormProps,{confirm: boolean}> {
	form:any;
	constructor(props:OrganizationInfoEditFormProps) {
		super(props);
		this.state = {confirm: false}
	}
	
	_save = ( hideEdit:Function) => {
		const organizationId = this.props.organization.id;
		const formValues = this.form._getValues();
		const {updateOrganization} = this.props.actions;
		updateOrganization(formValues, organizationId, hideEdit)
	};
	
	_onSubmit = (e:SyntheticEvent<HTMLButtonElement>) => {
		const { hideEdit} = this.props;
		e.preventDefault();
		if (this.form._formValidate()) {
			this._save( hideEdit)
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


