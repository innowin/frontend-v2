/*global __*/
import React, {Component} from 'react'
import PersonSignupForm from './PersonSignUpForm'
import OrganizationSignUpForm from './OrganizationSignUpForm'
import { RadioButtonGroup } from '../../common/inputs/RadioButtonInput'
import cookies from "browser-cookies"
import {REST_REQUEST} from "src/consts/Events"
import {setID, setTOKEN, saveData} from "src/consts/data"
import {SOCKET as socket, REST_URL as url} from "src/consts/URLS"
const USER_TYPES = {
  PERSON: 'person',
  ORGANIZATION: 'organization',
}

export class SignUpForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userType: USER_TYPES.PERSON,
      orgFormPart: 0,
      data: {}
    }
  }
  _typeHandler = (value) => {
    let part = ((value === USER_TYPES.PERSON) && 0) || ((value === USER_TYPES.ORGANIZATION) && 1)
    this.setState({ ...this.state, userType: value }, () => setTimeout(() => {
      this._orgFormPartHandler(part)
    }));
  }
  _orgFormPart1SubmitHandler = (values) => {
    socket.emit(REST_REQUEST, {
      method: "get",
      url: `${url}/users/?username=${values.username}`,
      result: "USERNAME_check",
    }).then(res => console.log('my res is ', res))
    this.setState({ ...this.state, orgFormPart: 2, data: { ...this.state.data, ...values} })
  }

  _orgFormPart2SubmitHandler = (values) => {
    this.setState({ ...this.state, data: { ...this.state.data, ...values} })
  }
  
  _handlePersonFormSubmit = (values) => {
    // socket.on('USERNAME_check', (res) => {
    //   console.log('res is ', res);
    //   const {status, messages} = this.state;
    //   if (res.length > 0) {
    //     let message = __('Username exists');
    //     this.setState({
    //       ...this.state,
    //       status: {...status, usernameS: 'error'},
    //       messages: {...messages, usernameMB: message}
    //     });
    //     return false;
    //   }
    //   let message = __('Acceptable');
    //   this.setState({
    //     ...this.state,
    //     status: {...status, usernameS: 'success'},
    //     messages: {...messages, usernameMB: message}
    //   });
    // });
    this.setState({ ...this.state, data: values}, () => console.log(this.state))
  }

  _orgFormPartHandler = part => this.setState({ ...this.state, orgFormPart: part})

  render() {
    const {RedirectToHome} = this.props;
    const { userType, orgFormPart } = this.state
    const userTypeItems = [ // used for RadioButtonItems as items property.
      { value: USER_TYPES.PERSON, title: 'فرد' },
      { value: USER_TYPES.ORGANIZATION, title: 'سازمان' },
    ]
    return (
      <div className="signup-wrapper">
        <RadioButtonGroup selected={userType} handler={this._typeHandler} items={userTypeItems} name="userType" label="ثبت نام کننده" />
        {userType === USER_TYPES.PERSON ?
          <PersonSignupForm onSubmit={this._handlePersonFormSubmit} RedirectToHome={RedirectToHome} />
          :
          <OrganizationSignUpForm handlePart={this._orgFormPartHandler} formPart={orgFormPart} onSubmitPart2={this._orgFormPart2SubmitHandler} onSubmitPart1={this._orgFormPart1SubmitHandler} />
        }
      </div>
    )
  }
}


export default SignUpForm;
