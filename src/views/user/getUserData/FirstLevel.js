import React, {Component} from "react"
import Material from "src/views/common/components/Material"
import {bindActionCreators} from 'redux'
import connect from 'react-redux/es/connect/connect'
import CheckUsernameAction from "src/redux/actions/user/checkUsernameAction"
import AuthActions from '../../../redux/actions/authActions'
import {routerActions} from 'react-router-redux'
import CreateUserActions from '../../../redux/actions/user/createUserActions'


class FirstLevel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 'user',
      isFocused: false,
      username: '',
      valid: false,
      error: false
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
      valid = true
    }
    this.setState({...this.state, username, valid, error: false})
  }

  createUser = (validate) => {
    if (validate === 0) {
      const {selected, username} = this.state
      const {password, email} = this.props

      if (selected === 'user') {
        const {signIn, createUserPerson} = this.props.actions
        createUserPerson({username, password, email}, (values) => {
          signIn(values.username, password, false)
        })
      }
      else {
        // const {signIn, createUserOrgan} = this.props.actions
        // const {translator} = this.props
        // const promise = new Promise((resolve, reject) => createUserOrgan(values, resolve, reject))
      }
    }
    else {
      this.setState({...this.state, error: true})
    }
  }

  submit = () => {
    if (this.state.valid) {
      const {username} = this.state
      const {actions} = this.props
      const {checkUsername} = actions
      checkUsername(username, this.createUser)
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

              <Material className={`get-data-content-account-select ${selected === 'user' ? 'get-data-content-selected' : 'get-data-content-deselected'}`}
                        onClick={() => this._select('user')}
                        backgroundColor='rgba(0,132,191,0.3)'
                        content='فرد'
              />

              <div className='get-data-content-account-show' style={{right: selected === 'user' ? '50px' : '240px'}}>✔</div>

              <Material className={`get-data-content-account-select ${selected === 'organization' ? 'get-data-content-selected' : 'get-data-content-deselected'}`}
                        onClick={() => this._select('organization')}
                        backgroundColor='rgba(0,132,191,0.3)'
                        content='شرکت'
              />

            </div>
          </div>

          <div>
            <div className='get-data-content-username-container'>
              <div className={isFocused || username.length > 0 ? 'get-data-content-username-container-title-out' : 'get-data-content-username-container-title'}>نام کاربری</div>
              <div className={isFocused || username.length > 0 ? 'get-data-content-username-container-close' : 'get-data-content-username-container-close-hide'}>
                {valid ? <span style={{color: '#4dab9f'}}>✔</span> : <span style={{color: '#dd5145'}}>✖</span>}
              </div>

              <input type='text'
                     value={username}
                     className='get-data-content-username-input'
                     onFocus={this._handleFocus}
                     onBlur={this._handleBlur}
                     onChange={this._handleChange}
              />
              <div className={error ? 'get-data-content-username-error' : 'get-data-content-username-error-hide'}>
                {/*شامل حروف underline ، 0-9 ، A - Z , dot حداقل 5 و حداکثر 32 کاراکتر.*/}
                نام کاربری قبلا در سامانه ثبت شده است
              </div>
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
    createUserOrgan: CreateUserActions.createUserOrgan
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(FirstLevel)