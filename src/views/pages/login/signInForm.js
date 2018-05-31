/*global __*/
import React, {Component} from 'react'
import {REST_URL as url} from 'src/consts/URLS'
import {REST_REQUEST} from 'src/consts/Events'
import {SOCKET as socket} from "../../../consts/URLS"
import ErrorMessage from './ErrorMessage'
import {BeatLoader} from 'react-spinners'
import {connect} from 'react-redux'

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      error: null,
      rememberme: null,
      sending: false
    }
  }

  componentDidMount() {
    const {handleLogIn} = this.props;
    const {rememberme} = this.state;
    socket.on("TOKEN_Result", async res => {
      if (res.non_field_errors) {
        // const message = res.non_field_errors[0];
        // TODO mohsen: error message is handle
        const message = __('Username or password is not correct')
        this._handleError(message);
        return false;
      }
      await handleLogIn(res, rememberme);
      this.setState({...this.state, sending: false})
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
    this.setState({...this.state, error: true, message: msg, sending: false});
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
    if (username && username.length > 0 && password && password.length > 0) {
      this.setState({...this.state, sending: true, message: ''}, () => {
        socket.emit(REST_REQUEST, {
          method: "post",
          url: url + "/api-token-auth/",
          result: "TOKEN_Result",
          data: {
            username,
            password
          },
        });
      })
    } else {
      const message = __('Required fields should be filled')
      this._handleError(message)
    }
  };

  render() {
    const {error, message, rememberme, sending} = this.state;
    console.log('this is all props', this.props,'\n and my states are ',this.state)
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
                className="btn btn-primary btn-block login-submit-button cursor-pointer"
                disabled={sending}>
          {!sending ? (__('Login')) : (
            <BeatLoader color="#fff" size={10} margin="auto"/>
          )}
        </button>
        <ErrorMessage message={message} error={(error) ? error : ''}/>
        <div className="remember-recovery">
          <label htmlFor="rememberme" className="cursor-pointer">
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
const mapStateToProps = (state) => ({})
export default connect(mapStateToProps)(LoginForm)