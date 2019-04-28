import React, {Component} from 'react'
import Material from 'src/views/common/components/Material'
import {bindActionCreators} from 'redux'
import connect from 'react-redux/es/connect/connect'
import CheckUsernameAction from 'src/redux/actions/user/checkUsernameAction'
import AuthActions from 'src/redux/actions/authActions'
import CreateUserActions from 'src/redux/actions/user/createUserActions'
import {WelcomeOrgan, WelcomeUser} from 'src/images/icons'


class FirstLevel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 'user',
      isFocused: false,
      username: '',
      valid: false,
      error: false,
    }
  }

  _select(selected) {
    this.setState({...this.state, selected})
  }

  _handleFocus = () => {
    this.setState({...this.state, isFocused: true})
  }

  _handleBlur = () => {
    this.setState({...this.state, isFocused: false})
  }

  _handleChange = (e) => {
    const username = e.target.value.trim()
    let valid = false
    if (username.length > 4 && username.length < 33) {
      if (/^[a-zA-Z0-9]+([a-zA-Z0-9]([_\- ])[a-zA-Z0-9])*[a-zA-Z0-9]+$/.test(username)) {
        valid = true
      }
    }
    this.setState({...this.state, username, valid, error: false})
  }

  onUserOut = () => this.usernameInput.focus()

  createUser() {
    return new Promise((resolve, reject) => {
      const {selected, username} = this.state
      const {password, email, actions} = this.props
      const {signIn, createUserPerson, createUserOrgan} = actions
      if (selected === 'user') {
        createUserPerson(
            {username, password, email},
            () => signIn(username, password, false, () => reject(), () => resolve()),
            () => signIn(username, password, false, () => reject(), () => resolve()),
        )
      }
      else {
        createUserOrgan(
            {username, password, email},
            () => signIn(username, password, false, () => reject(), () => resolve()),
            () => signIn(username, password, false, () => reject(), () => resolve()),
        )
      }
    })
  }

  submit = () => {
    if (this.state.valid) {
      const {username} = this.state
      const {actions, setSecondLevel} = this.props
      const {checkUsername} = actions
      checkUsername(username, (res) => {
        if (parseInt(res, 10) === 1) {
          this.setState({...this.state, error: true}, () => this.errText.innerText = 'نام کاربری قبلا در سامانه ثبت شده است.')
        }
        else if (parseInt(res, 10) === 0) {
          this.createUser()
              .then(() => setSecondLevel())
              .catch(() => this.setState({...this.state, error: true}, () => this.errText.innerText = 'سیستم با خطا مواجه شده است.'))
        }
      }, () => this.setState({...this.state, error: true}, () => this.errText.innerText = 'شامل حروف underline ، 0-9 ، A - Z , dot حداقل 5 و حداکثر 32 کاراکتر.'))
    }
  }

  render() {
    const {error, username, valid, selected, isFocused} = this.state
    return (
        <div className='get-data-content'>
          <div className='get-data-content-welcome'>
            به اینوین خوش آمدید!
            <br/>
            برای شروع آماده اید؟
          </div>

          <div>
            <div className='get-data-content-account-container'>
              <div className='get-data-content-account-container-title'>نوع حساب کاربری</div>

              <Material className={selected === 'user' ? 'get-data-content-account-select get-data-content-selected' : 'get-data-content-account-select'}
                        onClick={() => this._select('user')}
                        backgroundColor='rgba(255, 194, 65,0.3)'
                        content={
                          <div>
                            <WelcomeUser className='get-data-icon'/>
                            <div>فرد</div>
                          </div>
                        }
              />

              <div className='get-data-content-account-show' style={{right: selected === 'user' ? '45px' : '232px'}}>✔</div>

              <Material className={selected === 'organization' ? 'get-data-content-account-select get-data-content-selected' : 'get-data-content-account-select'}
                        onClick={() => this._select('organization')}
                        backgroundColor='rgba(0,132,191,0.3)'
                        content={
                          <div>
                            <WelcomeOrgan className='get-data-icon'/>
                            <div>شرکت</div>
                          </div>
                        }
              />

            </div>
          </div>

          <div>
            <div className='get-data-content-username-container'>
              <div className={isFocused || username.length > 0 ? 'get-data-content-username-container-title-out' : 'get-data-content-username-container-title'} onClick={this.onUserOut}>نام کاربری</div>
              <div className={isFocused || username.length > 0 ? 'get-data-content-username-container-close' : 'get-data-content-username-container-close-hide'}>
                {valid ? <span style={{color: '#4dab9f'}}>✔</span> : <span style={{color: '#dd5145'}}>✖</span>}
              </div>

              <input type='text'
                     value={username}
                     className='get-data-content-username-input'
                     ref={e => this.usernameInput = e}
                     onFocus={this._handleFocus}
                     onBlur={this._handleBlur}
                     onChange={this._handleChange}
              />
              <div ref={e => this.errText = e} className={error ? 'get-data-content-username-error' : 'get-data-content-username-error-hide'}/>
            </div>
          </div>

          <div className='get-data-content-next'>
            <button className={valid ? 'get-data-content-next-button-on' : 'get-data-content-next-button'} onClick={this.submit}>بعدی</button>
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    checkUsername: CheckUsernameAction.checkUsername,
    signIn: AuthActions.signIn,
    createUserPerson: CreateUserActions.createUserPerson,
    createUserOrgan: CreateUserActions.createUserOrgan,
  }, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(FirstLevel)