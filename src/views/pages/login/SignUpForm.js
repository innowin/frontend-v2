import React, {Component} from 'react'
import PropTypes from 'prop-types'
import PersonSignupForm from './PersonSignUpForm'
import OrganizationSignUpForm from './OrganizationSignUpForm'
import {RadioButtonGroup} from '../../common/inputs/RadioButtonInput'
import {connect} from 'react-redux'
import {getMessages} from '../../../redux/selectors/translateSelector'
import {createUser} from "src/crud/user/user";
import {apiTokenAuth, createUserOrgan} from "../../../crud/user/user";

const USER_TYPES = {
  PERSON: 'person',
  ORGANIZATION: 'organization',
};

export class SignUpForm extends Component {
  static propTypes = {
    handleLogIn: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      userType: USER_TYPES.PERSON,
      orgFormPart: 0,
      data: {},
      provincesIdentifier: 0,
      // this is for test of province changing by country changing and
      // it will be clearing in future.
    }
  }

  _typeHandler = (value) => {
    let part = ((value === USER_TYPES.PERSON) && 0) || ((value === USER_TYPES.ORGANIZATION) && 1);
    this.setState({...this.state, userType: value}, () => setTimeout(() => {
      this._orgFormPartHandler(part)
    }));
  };
  // handleProvinces = i => this.setState({check: i})

  handleProvinces = (e, v) => {
    this.setState({...this.state, provincesIdentifier: v})
  };
  // this is
  // for test of province changing by country changing and
  // it will be clearing in future.

  _orgFormPart1SubmitHandler = (values) => {
    this.setState({...this.state, orgFormPart: 2, data: {...this.state.data, ...values}})
  };

  _orgFormPart2SubmitHandler = (values) => {
    const data = {...this.state.data, ...values};
    this.setState({...this.state, data: data});
    createUserOrgan(data, apiTokenAuth, this.props.handleLogIn)
  };

  _handlePersonFormSubmit = (values) => {
    this.setState({...this.state, data: values});
    createUser(values, apiTokenAuth, this.props.handleLogIn)
  };

  _orgFormPartHandler = part => this.setState({...this.state, orgFormPart: part});

  render() {
    const {RedirectToHome, translator} = this.props;
    const {userType, orgFormPart, provincesIdentifier} = this.state;
    const userTypeItems = [ // used for RadioButtonItems as items property.
      {value: USER_TYPES.PERSON, title: 'فرد'},
      {value: USER_TYPES.ORGANIZATION, title: 'شرکت'},
    ];
    return (
      <div className="signup-wrapper">
        <RadioButtonGroup
          selected={userType}
          handler={this._typeHandler}
          items={userTypeItems}
          name="userType"
          label={translator['Registrar']}
        />
        {userType === USER_TYPES.PERSON ?
          <PersonSignupForm
            translator={translator}
            onSubmit={this._handlePersonFormSubmit}
            RedirectToHome={RedirectToHome}
          />
          :
          <OrganizationSignUpForm
            translator={translator}
            handleProvinces={this.handleProvinces}
            provincesIdentifier={provincesIdentifier}
            handlePart={this._orgFormPartHandler}
            formPart={orgFormPart}
            onSubmitPart2={this._orgFormPart2SubmitHandler}
            onSubmitPart1={this._orgFormPart1SubmitHandler}
          />
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    translator: getMessages(state)
  }
};

export default connect(mapStateToProps)(SignUpForm)
