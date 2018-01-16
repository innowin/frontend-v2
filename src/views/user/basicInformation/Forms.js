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
import {updateProfile, updateUser} from "../../../crud/user/user"

export class ProfileInfoForm extends Component {
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
    const profile = this.props.profile || {};
    return (
      <form onSubmit={this.props.onSubmit}>
        <div className="row">
          <DateInput
            name="birthDate"
            label={__('BirthDate') + ": "}
            value={profile.birth_date}
            ref={birthDateInput => {this.birthDateInput = birthDateInput}}
            showDay={true}
          />
          <TextInput
            name="nationalCode"
            label={__('National code') + ": "}
            value={profile.national_code}
            ref={nationalCodeInput => {this.nationalCodeInput = nationalCodeInput}}
            customValidate={this._nationalCodeValidate}
          />
          <CustomArrayInput
            label={__('Mobile') + ": "}
            value={profile.mobile}
            ref={mobileInput => {this.mobileInput = mobileInput}}
            inputComponent={PhoneInput}
            outputComponent={outputComponent}
          />
          <CustomArrayInput
            label={__('Phone') + ": "}
            value={profile.phone}
            ref={phoneInput => {this.phoneInput = phoneInput}}
            inputComponent={PhoneInput}
            outputComponent={outputComponent}
          />
          <CustomInput
            label={__('Fax') + ": "}
            value={profile.fax}
            ref={faxInput => {this.faxInput = faxInput}}
            inputComponent={PhoneInput}
          />
          {/*TODO EMAIL INPUT*/}
          <EmailInput
            label={__('Public email') + ": "}
            value={profile.public_email}
            ref={publicEmailInput => {this.publicEmailInput = publicEmailInput}}
          />
          {/*TODO TELEGRAM INPUT*/}
          <TextInput
            name="telegramAccount"
            label={__('Telegram account') + ": "}
            value={profile.telegram_account}
            ref={telegramAccountInput => {this.telegramAccountInput = telegramAccountInput}}
          />
          {/*TODO WEB INPUT*/}
          <ArrayInput
            name="webSite"
            label={__('Website') + ": "}
            placeholder={__('www...')}
            value={profile.web_site}
            ref={webSiteInput => {this.webSiteInput = webSiteInput}}
          />
          <TextareaInput
            name="description"
            label={__('Description') + ": "}
            value={profile.description}
            ref={descriptionInput => {this.descriptionInput = descriptionInput}}
          />
          {this.props.children}
        </div>
      </form>
    )
  }
}


export class ProfileInfoEditForm extends Component {
  state = {confirm: false};

  static propTypes = {
    hideEdit: PropTypes.func.isRequired,
    updateStateForView: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
  };

  _save = (updateStateForView, hideEdit) => {
    const profileId = this.props.profile.id;
    const formValues = this.form._getValues();
    return updateProfile(formValues, profileId, updateStateForView,  hideEdit)
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
      <ProfileInfoForm onSubmit={this._onSubmit} ref={form => {this.form = form}} profile={profile}>
        <div className="col-12 d-flex justify-content-end">
          <button type="button" className="btn btn-secondary mr-2" onClick={this.props.hideEdit}>
            {__('Cancel')}
          </button>
          <button type="submit" className="btn btn-success">{__('Save')}</button>
        </div>
      </ProfileInfoForm>
    )
  }
}


export class UserInfoForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    user: PropTypes.object,
  };

  _getValues = () => {
    return {
      username: this.usernameInput.getValue(),
      first_name: this.firstNameInput.getValue(),
      last_name: this.lastNameInput.getValue(),
      email: this.emailInput.getValue()
    }
  };

  _formValidate = () => {
    let result = true;
    const validates = [
      this.usernameInput.validate(),
      this.firstNameInput.validate(),
      this.lastNameInput.validate(),
      this.emailInput.validate()
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
    const user = this.props.user || {};
    return (
      <form onSubmit={this.props.onSubmit}>
        <div className="row">
          <TextInput
            name="username"
            label={__('Username') + ": "}
            value={user.username}
            ref={usernameInput => {this.usernameInput = usernameInput}}
          />
          <TextInput
            name="firstName"
            label={__('First name') + ": "}
            value={user.first_name}
            ref={firstNameInput => {this.firstNameInput = firstNameInput}}
          />
          <TextInput
            name="lastName"
            label={__('Last name') + ": "}
            value={user.last_name}
            ref={lastNameInput => {this.lastNameInput = lastNameInput}}
          />
          {/*TODO EMAIL INPUT*/}
          <EmailInput
            label={__('Email') + ": "}
            value={user.email}
            ref={emailInput => {this.emailInput = emailInput}}
          />
          {this.props.children}
        </div>
      </form>
    )
  }
}


export class UserInfoEditForm extends Component {
  constructor(props){
    super(props);
    this.state={confirm: false}
  }

  static propTypes = {
    hideEdit: PropTypes.func.isRequired,
    updateStateForView: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
  };

  _save = (updateStateForView, hideEdit) => {
    const userId = this.props.user.id;
    const formValues = this.form._getValues();
    return updateUser(formValues, userId, updateStateForView, hideEdit)
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
    const {user} = this.props;
    return (
      <UserInfoForm onSubmit={this._onSubmit} ref={form => {this.form = form}} user={user}>
        <div className="col-12 d-flex justify-content-end">
          <button type="button" className="btn btn-secondary mr-2" onClick={this.props.hideEdit}>
            {__('Cancel')}
          </button>
          <button type="submit" className="btn btn-success">{__('Save')}</button>
        </div>
      </UserInfoForm>
    )
  }
}


