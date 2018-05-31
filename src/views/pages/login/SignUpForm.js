/*global __*/
import React, {Component} from 'react'
import PersonSignUpForm from './PersonSignUpForm'
import OrganizationSignUpForm from './OrganizationSignUpForm'
import { RadioButtonGroup } from '../../common/inputs/RadioButtonInput'

const USER_TYPES = {
  PERSON: 'person',
  ORGANIZATION: 'organization',
}

export class SignUpForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userType: USER_TYPES.PERSON
    }
  }

  _typeHandler = (value) => this.setState({ ...this.state, userType: value });

  render() {
    const {RedirectToHome} = this.props;
    const { userType } = this.state
    const userTypeItems = [ // used for RadioButtonItems as items property.
      { value: USER_TYPES.PERSON, title: 'فرد' },
      { value: USER_TYPES.ORGANIZATION, title: 'سازمان' },
    ]
    return (
      <div className="signup-wrapper">
        <RadioButtonGroup selected={userType} handler={this._typeHandler} items={userTypeItems} name="userType" label="ثبت نام کننده" />
        {userType === USER_TYPES.PERSON ?
          <PersonSignUpForm RedirectToHome={RedirectToHome} />
          :
          <OrganizationSignUpForm />
        }
      </div>
    )
  }
}


export default SignUpForm;
