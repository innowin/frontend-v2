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

  getValues = () => {
    return {
      birth_date: this.refs.birthDateInput.getValue(),
      national_code: this.refs.nationalCodeInput.getValue(),
      mobile: this.refs.mobileInput.getValue(),
      phone: this.refs.phoneInput.getValue(),
      fax: this.refs.faxInput.getValue(),
      public_email: this.refs.publicEmailInput.getValue(),
      telegram_account: this.refs.telegramAccountInput.getValue(),
      web_site: this.refs.webSiteInput.getValue(),
      description: this.refs.descriptionInput.getValue(),
    }
  };

  formValidate = () => {
    let result = true;
    const validates = [
      this.refs.birthDateInput.validate(),
      this.refs.nationalCodeInput.validate(),
      this.refs.mobileInput.validate(),
      this.refs.phoneInput.validate(),
      this.refs.faxInput.validate(),
      this.refs.publicEmailInput.validate(),
      this.refs.telegramAccountInput.validate(),
      this.refs.webSiteInput.validate(),
      this.refs.descriptionInput.validate(),
    ];
    for (let i = 0; i < validates.length; i++) {
      if (validates[i]) {
        result = false;
        break;
      }
    }
    return result
  };

  nationalCodeValidate = (value, final) => {
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
            ref="birthDateInput"
            showDay={true}
          />
          <TextInput
            name="nationalCode"
            label={__('National code') + ": "}
            value={profile.national_code}
            ref="nationalCodeInput"
            customValidate={this.nationalCodeValidate}
          />
          <CustomArrayInput
            label={__('Mobile') + ": "}
            value={profile.mobile}
            ref="mobileInput"
            inputComponent={PhoneInput}
            outputComponent={outputComponent}
          />
          <CustomArrayInput
            label={__('Phone') + ": "}
            value={profile.phone}
            ref="phoneInput"
            inputComponent={PhoneInput}
            outputComponent={outputComponent}
          />
          <CustomInput
            label={__('Fax') + ": "}
            value={profile.fax}
            ref="faxInput"
            inputComponent={PhoneInput}
          />
          {/*TODO EMAIL INPUT*/}
          <EmailInput
            label={__('Public email') + ": "}
            value={profile.public_email}
            ref="publicEmailInput"
          />
          {/*TODO TELEGRAM INPUT*/}
          <TextInput
            name="telegramAccount"
            label={__('Telegram account') + ": "}
            value={profile.telegram_account}
            ref="telegramAccountInput"
          />
          {/*TODO WEB INPUT*/}
          <ArrayInput
            name="webSite"
            label={__('Website') + ": "}
            placeholder={__('www...')}
            value={profile.web_site}
            ref="webSiteInput"
          />
          <TextareaInput
            name="description"
            label={__('Description') + ": "}
            value={profile.description}
            ref="descriptionInput"
          />
          {this.props.children}
        </div>
      </form>
    )
  }
}


export class ProfileInfoEditForm extends Component {
  state = {
    confirm: false,
  };

  static propTypes = {
    hideEdit: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
  };

  save = (hideEditFunc) => {
    const profileId = this.props.profile.id;
    const formValues = this.refs.form.getValues();
    return updateProfile(formValues, profileId, hideEditFunc)
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.refs.form.formValidate()) {
      this.save(this.props.hideEdit)
    }
    return false;
  };

  render() {
    const {profile} = this.props;
    return (
      <ProfileInfoForm onSubmit={this.onSubmit} ref="form" profile={profile}>
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

  getValues = () => {
    return {
      username: this.refs.usernameInput.getValue(),
      first_name: this.refs.firstNameInput.getValue(),
      last_name: this.refs.lastNameInput.getValue(),
      email: this.refs.emailInput.getValue()
    }
  };

  formValidate = () => {
    let result = true;
    const validates = [
      this.refs.usernameInput.validate(),
      this.refs.firstNameInput.validate(),
      this.refs.lastNameInput.validate(),
      this.refs.emailInput.validate()
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
            ref="usernameInput"
          />
          <TextInput
            name="firstName"
            label={__('First name') + ": "}
            value={user.first_name}
            ref="firstNameInput"
          />
          <TextInput
            name="lastName"
            label={__('Last name') + ": "}
            value={user.last_name}
            ref="lastNameInput"
          />
          {/*TODO EMAIL INPUT*/}
          <EmailInput
            label={__('Email') + ": "}
            value={user.email}
            ref="emailInput"
          />
          {this.props.children}
        </div>
      </form>
    )
  }
}


export class UserInfoEditForm extends Component {
  state = {
    confirm: false,
  };

  static propTypes = {
    hideEdit: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };

  save = (hideEditFunc) => {
    const userId = this.props.user.id;
    const formValues = this.refs.form.getValues();
    return updateUser(formValues, userId, hideEditFunc)
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.refs.form.formValidate()) {
      this.save(this.props.hideEdit)
    }
    return false;
  };

  render() {
    const {user} = this.props;
    return (
      <UserInfoForm onSubmit={this.onSubmit} ref="form" user={user}>
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


