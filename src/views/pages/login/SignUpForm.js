/*global __*/
import React, {Component} from "react"
import cookies from "browser-cookies"
import {REST_REQUEST} from "src/consts/Events"
import {setID, setTOKEN, saveData} from "src/consts/data"
import {SOCKET as socket, REST_URL as url} from "src/consts/URLS"
import {BeatLoader} from "react-spinners"

export class SignUpForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      success: false,
      sending: false,
      credentials: {
        username: null,
        password: null
      },
      status: {
        usernameS: null,
        emailS: null,
        passwordS: null,
        passwordConfirmS: null
      },
      messages: {
        usernameMB: null,
        emailMB: null,
        passwordMB: null,
        passwordConfirmMB: null,
        formMB: null,
      }
    }
  }

  componentDidMount() {
    socket.on('USERNAME_check', (res) => {
      console.log('res is ', res);
      const {status, messages} = this.state;
      if (res.length > 0) {
        let message = __('Username exists');
        this.setState({
          ...this.state,
          status: {...status, usernameS: 'error'},
          messages: {...messages, usernameMB: message}
        });
        return false;
      }
      let message = __('Acceptable');
      this.setState({
        ...this.state,
        status: {...status, usernameS: 'success'},
        messages: {...messages, usernameMB: message}
      });
    });

    socket.on('CREATE_USER_RESULT', res => {
      console.log(res);
      this._handleSignIn();
    });

    socket.on("TOKEN_Result_2", res => {
      // this.setState({...this.state , isLoggedIn: true});
      const {RedirectToHome} = this.props;
      cookies.set('token', res.token);
      setTOKEN(res.token);
      setID(res.user.id.toString());
      saveData(res);
      this.form.reset();
      RedirectToHome();
    });
  }

  _handleSignIn = () => {
    const {credentials} = this.state;
    const {username, password} = credentials;
    console.log('username is :', username, '  ', password);
    socket.emit(REST_REQUEST, {
      method: "post",
      url: url + "/api-token-auth/",
      result: "TOKEN_Result_2",
      data: {
        username,
        password
      }
    })
  };

  _sendingForm = () => {
    const username = this.username.value;
    const password = this.password.value;
    const email = this.email.value;
    this.setState({
      ...this.state, credentials: {
        username,
        password
      }
    });
    socket.emit(REST_REQUEST, {
      method: 'post',
      url: `${url}/users/`,
      result: 'CREATE_USER_RESULT',
      data: {
        username,
        password,
        email
      }
    });
  };

  _handleSubmit = async (e) => {
    e.preventDefault();
    await this.setState({...this.state, sending: true})
    await this._validateUsername()
    await this._validateEmail()
    await this._validatePassword()
    await this._validatePasswordConfirm()
    // note: this function state should be get after validations await
    const {messages, status} = this.state;
    if (Object.values(status).indexOf('error') > -1) {
      let message = __('Fix the errors and retry');
      this.setState({...this.state, messages: {...messages, formMB: message}, sending: false})
      return false
    }
    if (Object.values(status).indexOf('error') === -1) {
      let message = __('');
      this.setState({...this.state, messages: {...messages, formMB: message}})
      this._sendingForm();
      return true
    }
  };

  _validateUsername = () => {
    const username = this.username.value
    const {status, messages} = this.state;
    if (!username) {
      let message = __('Username is required');
      this.setState({
        ...this.state,
        status: {...status, usernameS: 'error'},
        messages: {...messages, usernameMB: message}
      });
      return false;
    }
    if (username.length > 0 && username.length < 5) {
      let message = __('Username length should be greater than 4');
      this.setState({
        ...this.state,
        status: {...status, usernameS: 'error'},
        messages: {...messages, usernameMB: message}
      });
      return false;
    }
    if (username.length > 4) {
      socket.emit(REST_REQUEST, {
        method: "get",
        url: `${url}/users/?username=${username}`,
        result: "USERNAME_check",
      })
      return false;
    }
    if (!/^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]+$/.test(username)) {
      let message = __('Invalid username');
      this.setState({
        ...this.state,
        status: {...status, usernameS: 'error'},
        messages: {...messages, usernameMB: message}
      });
      return false
    }
    return false;
  };

  _validateEmail = () => {
    const value = this.email.value;
    const {status, messages} = this.state;
    if (value.length === 0) {
      let message = __('Email is required');
      this.setState({
        ...this.state,
        status: {...status, emailS: 'error'},
        messages: {...messages, emailMB: message}
      });
      return false;
    }
    if (value.length > 0 && value.length < 5) {
      let message = __('Invalid email');
      this.setState({
        ...this.state,
        status: {...status, emailS: 'error'},
        messages: {...messages, emailMB: message}
      });
      return false;
    }
    if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) {
      //email is false
      let message = null;
      this.setState({
        ...this.state,
        status: {...status, emailS: 'success'},
        messages: {...messages, emailMB: message}
      });
      return false
    }
    if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) {
      //email is false
      const message = 'رایانامه وارد شده معتبر نمی باشد';
      this.setState({
        ...this.state,
        status: {...status, emailS: 'error'},
        messages: {...messages, emailMB: message}
      });
      return false;
    }

    //email is OK'
    this.setState({...this.state, status: {...status, emailS: 'success'}})
    return true

  };

  _validatePassword = () => {
    const value = this.password.value;
    const {status, messages} = this.state;
    //using dot and 8 chars min 8 and max 32
    const level1 = new RegExp("^[\s\S]{8,32}$");
    //using dot and 8 chars min 8 and max 32
    const level = new RegExp("^[\s\S]{4,}$");
    //using visible chars and space chars
    const level2 = new RegExp('^[\x20-\x7E]+$');
    //using capital Chars
    const level3 = new RegExp('[A-Z]');
    //using small Chars
    const level4 = new RegExp('[a-z]');
    // number chars
    const level5 = new RegExp('[0-9]');
    // one or more special chars
    const level6 = new RegExp('[●!"#$%&\'()*+,\\-./:;<=>?@[\\\\\\]^_`{|}~]');
    // Disallow three or more sequential identical characters
    const level7 = new RegExp('([\\s\\S])\\1\\1\n');

    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,64})");
    const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
    if (!value) {
      const message = __('Password is required');
      const newState = {
        ...this.state,
        status: {...status, passwordS: 'error'},
        messages: {...messages, passwordMB: message}
      };
      this.setState(newState);
      return false;
    }
    if (level1.test(value) && level2.test(value) && level5.test(value) && level4.test(value) && level3.test(value) && level6.test(value)) {
      const message = 'سطح امنیت گذرواژه: عالی';
      const newState = {
        ...this.state,
        status: {...status, passwordS: 'strong'},
        messages: {...messages, passwordMB: message}
      };
      this.setState(newState);
      return false;
    }
    if (strongRegex.test(value)) {
      const message = 'سطح امنیت گذرواژه: بسیار خوب';
      const newState = {
        ...this.state,
        status: {...status, passwordS: 'good'},
        messages: {...messages, passwordMB: message}
      };
      this.setState(newState);
      return false;
    }
    if (mediumRegex.test(value)) {
      const message = 'سطح امنیت گذرواژه: خوب';
      const newState = {
        ...this.state,
        status: {...status, passwordS: 'medium'},
        messages: {...messages, passwordMB: message}
      };
      this.setState(newState);
      return false;
    }
    if (level.test(value) && !level1.test(value) && !level2.test(value) && !level3.test(value)) {
      const message = 'سطح امنیت گذرواژه: متوسط';
      const newState = {
        ...this.state,
        status: {...status, passwordS: 'weak'},
        messages: {...messages, passwordMB: message}
      };
      this.setState(newState);
      return false;
    }
    if (!level.test(value) || level7.test(value)) {
      const message = 'سطح امنیت گذرواژه:  ضعیف';
      const newState = {
        ...this.state,
        status: {...status, passwordS: 'tooWeak'},
        messages: {...messages, passwordMB: message}
      };
      this.setState(newState);
      return false;
    }
  };

  _validatePasswordConfirm = () => {
    const pass = this.password.value;
    const {status, messages} = this.state;
    const pass2 = this.passwordConfirm.value;
    if (pass !== pass2) {
      const message = 'تکرار گذرواژه با گذرواژه مطابقت ندارد';
      const newState = {
        ...this.state,
        status: {...status, passwordConfirmS: 'error'},
        messages: {...messages, passwordConfirmMB: message}
      };
      this.setState(newState);
      return false;
    }
    if (!pass2) {
      return false
    }
    else {
      const message = '';
      const newState = {
        ...this.state,
        status: {...status, passwordConfirmS: 'success'},
        messages: {...messages, passwordConfirmMB: message}
      };
      this.setState(newState);
      return true;
    }
  };

  _verifyValue = (e) => {
    const name = e.target.name
    if (name === 'username') {
      this._validateUsername()
    }
    if (name === 'email') {
      this._validateEmail()
    }
    if (name === 'password') {
      this._validatePassword()
    }
    if (name === 'passwordConfirm') {
      this._validatePasswordConfirm()
    }
  };

  _statusClassName = (status) => {
    if (status === 'error' || status === 'tooWeak') {
      return {messages: 'messageBox error-message', border: 'mb-0 error-border'}
    }
    if (status === 'success' || status === 'good') {
      return {messages: 'messageBox success-message', border: 'mb-0 success-border'}
    }
    if (status === 'strong') {
      return {messages: 'messageBox strong-message', border: 'mb-0 strong-border'}
    }
    if (status === 'medium') {
      return {messages: 'messageBox medium-message', border: 'mb-0 medium-border'}
    }
    if (status === 'weak') {
      return {messages: 'messageBox weak-message', border: 'mb-0 weak-border'}
    }
    return {messages: '', border: ''}
  }

  render() {
    const {success, sending, messages, status} = this.state
    const {usernameMB, emailMB, passwordMB, passwordConfirmMB, formMB} = messages
    const {usernameS, emailS, passwordS, passwordConfirmS} = status
    const usernameClass = this._statusClassName(usernameS)
    const emailClass = this._statusClassName(emailS)
    const passwordClass = this._statusClassName(passwordS)
    const passwordConfirmClass = this._statusClassName(passwordConfirmS)

    if (success) {
      return (
        <div className="alert alert-success">
          {__('Activation email sent to your email')}
          <button type="button" onClick={this.props.showLogin} className="btn btn-success btn-sm float-right">
            {__('Login')}
          </button>
        </div>
      )
    }
    return (
      <form ref={form => {
        this.form = form
      }} className="sign-up-form">
        <input
          type="text"
          name="username"
          ref={username => {
            this.username = username
          }}
          onKeyUp={this._verifyValue}
          onBlur={this._verifyValue}
          className={`form-control my-form-control-lg -mb-2 ${usernameClass.border}`}
          placeholder={__('Username')}
        />
        <div className={usernameClass.messages}>{usernameMB}</div>
        <input
          type="email"
          name="email"
          ref={email => {
            this.email = email
          }}
          className={"form-control my-form-control-lg -mb-2" + ' ' + emailClass.border}
          onBlur={this._verifyValue}
          placeholder={__('Email')}
        />
        <div className={emailClass.messages}>{emailMB}</div>

        <input
          type="password"
          name="password"
          ref={password => {
            this.password = password
          }}
          className={"form-control my-form-control-lg -mb-2" + ' ' + passwordClass.border}
          onKeyUp={this._verifyValue}
          placeholder={__('Password')}
        />

        <div className={passwordClass.messages}>
          {passwordMB}
        </div>

        <input
          type="password"
          name="passwordConfirm"
          ref={passwordConfirm => {
            this.passwordConfirm = passwordConfirm
          }}
          onKeyUp={this._verifyValue}
          className={"form-control my-form-control-lg -mb-2" + ' ' + passwordConfirmClass.border}
          placeholder={__('Repeat password')}
        />

        <div className={passwordConfirmClass.messages}>{passwordConfirmMB}</div>

        <button onClick={this._handleSubmit}
                className="btn btn-primary btn-block login-submit-button mt-0 cursor-pointer"
                disabled={sending}>
          {!sending ? (__('Register')) : (
            <BeatLoader color="#fff" size={10} margin="auto"/>
          )}
        </button>
        <div className={(formMB) ? ("messageBox error-message") : ("")}>{formMB}</div>
      </form>
    )
  }
}


export default SignUpForm;
