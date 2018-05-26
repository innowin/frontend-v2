/*global __*/
import React, {Component} from 'react'
import {REST_URL as url} from 'src/consts/URLS'
import {REST_REQUEST} from 'src/consts/Events'
import {SOCKET as socket} from "../../../consts/URLS"
import {Redirect} from 'react-router-dom'
import {TOKEN, ALL_COOKIES, setID, saveData, setTOKEN, deleteTOKEN} from 'src/consts/data'
import ErrorMessage from './ErrorMessage'
import cookies from 'browser-cookies'

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      error: null,
      rememberme: null,
    }
  }

  componentDidMount() {
    const {handleLogIn} = this.props;
    const {rememberme} = this.state;
    socket.on("TOKEN_Result", res => {
      if (res.non_field_errors) {
        const message = res.non_field_errors[0];
        this._handleError(message);
        return false;
      }
      if (res.password || res.username) {
        const message = "Fields should not be empty";
        this._handleError(message)
      }
      handleLogIn(res, rememberme);
    });
  }

  _redirectPath = () => {
    const locationState = this.props.location.state;
    const pathname = (
      locationState && locationState.from && locationState.from.pathname
    );
    return pathname || '/';
  };

  _handleError = (msg) => {
    const message = 'نام کاربری یا گذرواژه صحیح نمی باشد';
    this.setState({...this.state, error: true, message: message});
    //TODO: showing error in form
  };

  _handleCheckbox = () => {
    let checked = this.rememberme.checked;
    this.setState({...this.state, rememberme: checked},);
  };

  _handleClick = (e) => {
    e.preventDefault();
    const username = this.username.value;
    const password = this.password.value;
    if (username.length > 0 && password.length > 0) {
      socket.emit(REST_REQUEST, {
        method: "post",
        url: url + "/api-token-auth/",
        result: "TOKEN_Result",
        data: {
          username,
          password
        },
      });
    }
  };

  render() {
    const {error, message, rememberme} = this.state;
    return (
      <form action="#" className="sign-in-form">
        <div className="input-group-vertical">
          <input
            type="text"
            name="username"
            ref={username => {
              this.username = username
            }}
            className="form-control my-form-control-lg"
            placeholder={__('Username')}
          />
          <input
            type="password"
            name="password"
            ref={password => {
              this.password = password
            }}
            className="form-control my-form-control-lg"
            placeholder={__('Password')}
          />
        </div>
        <button onClick={this._handleClick}
                className="btn btn-primary btn-block login-submit-button">{__('Login')}</button>
        <ErrorMessage message={message} error={(error) ? error : ''}/>
        <div className="remember-recovery">
          <label htmlFor="rememberme">
            <input
              id="rememberme"
              type="checkbox"
              checked={rememberme}
              ref={rememberme => this.rememberme = rememberme}
              onChange={this._handleCheckbox}
            />
            {__('Remember me')}
          </label>
          <span className="btn btn-link recovery-button">
            {__('Password recovery')}
          </span>
        </div>
      </form>
    )
  }
}