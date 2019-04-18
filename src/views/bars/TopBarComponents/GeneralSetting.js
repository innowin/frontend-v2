import connect from 'react-redux/es/connect/connect'
import React, {Component} from 'react'
import updateUserByUserIdAction from 'src/redux/actions/user/updateUserByUserIdAction'
import {bindActionCreators} from 'redux'

class GeneralSetting extends Component {
  constructor(props) {
    super(props)
    this.state = {
      saved: false,
    }
  }

  saveChanges = () => {
    const {actions, user} = this.props
    const {updateUserByUserId} = actions

    if (!this.state.saved) {
      const username = this.username.value
      const password = this.password.value
      const email = this.email.value
      const authMobile = this.authMobile.value

      let error = false

      let formUsername = null
      let formPassword = null
      let formEmail = null
      let formAuthMobile = null

      if (username !== user.username && (username.length > 4) && (username.length < 33)) {
        if (!/^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]+$/.test(username)) {
          error = true
          this.usernameError.className = 'settingModal-menu-general-error-show'
          this.usernameError.innerText = 'نام کاربری غیر قابل قبول است. لطفا تنها از حروف انگلیسی  یا اعداد یا کاراکتر ـ استفاده نمایید.'
        }
        else {
          formUsername = username
        }
      }
      else if (username.length < 5) {
        error = true
        this.usernameError.className = 'settingModal-menu-general-error-show'
        this.usernameError.innerText = 'لطفا نام کاربری با طول حداقل 5 کاراکتر وارد کنید!'
      }
      else if (username.length > 32) {
        error = true
        this.usernameError.className = 'settingModal-menu-general-error-show'
        this.usernameError.innerText = 'لطفا نام کاربری با طول حداکثر 32 کاراکتر وارد کنید!'
      }

      if (password !== '') {
        const test1 = '(?=.*[a-z])'
        const test2 = '(?=.*[A-Z])'
        const test3 = '(?=.[!@#\\$%\\^&])'
        const test4 = '(?=.*[0-9])'
        const level1 = new RegExp(test1)
        const level2 = new RegExp(test2)
        const level3 = new RegExp(test3)
        const level4 = new RegExp(test4)
        const condition1 = (level1.test(password) && level2.test(password))
        const condition2 = (level1.test(password) && level3.test(password))
        const condition3 = (level1.test(password) && level4.test(password))
        const condition4 = (level2.test(password) && level1.test(password))
        const condition5 = (level2.test(password) && level3.test(password))
        const condition6 = (level2.test(password) && level4.test(password))
        const condition7 = (level3.test(password) && level1.test(password))
        const condition8 = (level3.test(password) && level2.test(password))
        const condition9 = (level3.test(password) && level4.test(password))
        const condition10 = (level4.test(password) && level1.test(password))
        const condition11 = (level4.test(password) && level2.test(password))
        const condition12 = (level4.test(password) && level3.test(password))
        const validate = condition1 || condition2 || condition3 || condition4 || condition5 || condition6 || condition7 || condition8 || condition9 || condition10 || condition11 || condition12
        if (password.length < 8) {
          this.passwordError.innerText = 'لطفا یک رمز ورودی قوی شامل یک عدد یا یک حرف بزرگ یا علامت ، با طول حداقل 8 کاراکتر وارد کنید!'
          this.passwordError.className = 'settingModal-menu-general-error-show'
          error = true
        }
        else if (!validate) {
          error = true
          this.passwordError.innerText = 'این رمز ضعیف است. رمز ورود حداقل دارای یک عدد یا یک حرف بزرگ یا علامت باشد!'
          this.passwordError.className = 'settingModal-menu-general-error-show'
        }
        else if (validate && password.length > 7) {
          formPassword = password
        }
      }

      if (email !== user.email) {
        let atpos = email.indexOf('@')
        let dotpos = email.lastIndexOf('.')
        if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length) {
          error = true
          this.emailError.className = 'settingModal-menu-general-error-show'
        }
        else {
          formEmail = email
        }
      }

      if (authMobile !== user.authMobile) {
        if (!/^\d{11}$/.test(authMobile)) {
          error = true
          this.authMobileError.className = 'settingModal-menu-general-error-show'
        }
        else {
          formAuthMobile = authMobile
        }
      }

      if (!error) {
        const formFormat = {
          username: formUsername,
          password: formPassword,
          email: formEmail,
          auth_mobile: formAuthMobile,
        }

        const propertyNames = Object.keys(formFormat)
        propertyNames.map(key =>
            formFormat[key] === null ? delete (formFormat[key]) : null,
        )

        updateUserByUserId(formFormat, user.id)
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if ((this.props.user.email !== nextProps.user.email) || (this.props.user.username !== nextProps.user.username) || (this.props.user.password !== nextProps.user.password) || (this.props.user.authMobile !== nextProps.user.authMobile)) {
      this.setState({...this.state, saved: true})
    }
  }

  hideSetting = () => {
    this.setState({...this.state, saved: false})
    this.props.hideSetting()
  }

  handleUsernameChange = (e) => {
    e.target.value = e.target.value.replace(/ /g, '')
    if (e.target.value.length > 4 && e.target.value.length < 33 && /^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]+$/.test(e.target.value)) {
      this.usernameError.className = 'settingModal-menu-general-error'
    }
  }

  handleEmailChange = (e) => {
    e.target.value = e.target.value.replace(/ /g, '')
    let email = e.target.value.replace(/ /g, '')
    if (email !== this.props.user.email) {
      let atpos = email.indexOf('@')
      let dotpos = email.lastIndexOf('.')
      if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length) {
      }
      else {
        this.emailError.className = 'settingModal-menu-general-error'
      }
    }
  }

  handlePasswordChange = (e) => {
    let password = e.target.value
    if (password !== '' && password.length > 7) {
      const test1 = '(?=.*[a-z])'
      const test2 = '(?=.*[A-Z])'
      const test3 = '(?=.[!@#\\$%\\^&])'
      const test4 = '(?=.*[0-9])'
      const level1 = new RegExp(test1)
      const level2 = new RegExp(test2)
      const level3 = new RegExp(test3)
      const level4 = new RegExp(test4)
      const condition1 = (level1.test(password) && level2.test(password))
      const condition2 = (level1.test(password) && level3.test(password))
      const condition3 = (level1.test(password) && level4.test(password))
      const condition4 = (level2.test(password) && level1.test(password))
      const condition5 = (level2.test(password) && level3.test(password))
      const condition6 = (level2.test(password) && level4.test(password))
      const condition7 = (level3.test(password) && level1.test(password))
      const condition8 = (level3.test(password) && level2.test(password))
      const condition9 = (level3.test(password) && level4.test(password))
      const condition10 = (level4.test(password) && level1.test(password))
      const condition11 = (level4.test(password) && level2.test(password))
      const condition12 = (level4.test(password) && level3.test(password))
      const validate = condition1 || condition2 || condition3 || condition4 || condition5 || condition6 || condition7 || condition8 || condition9 || condition10 || condition11 || condition12
      if (validate && password.length > 7) {
        this.passwordError.className = 'settingModal-menu-general-error'
      }
    }
  }

  render() {
    const {translate, user} = this.props
    const topBarTranslate = translate.topBar
    return (
        <div style={{textAlign: 'right', position: 'relative', paddingBottom: '50px'}}>
          <div className='settingModal-menu-general-title'>
            {topBarTranslate['Username']}
          </div>
          <input type='text' defaultValue={user ? user.username : ''} ref={e => this.username = e}
                 className='settingModal-menu-general-input' onChange={this.handleUsernameChange}/>
          <div ref={e => this.usernameError = e} className='settingModal-menu-general-error'/>
          <div className='settingModal-menu-general-hint'>حداقل 5 و حداکثر 32 کاراکتر dot و underline ، 9-0 ، Z-A شامل
            حروف.
          </div>

          <div className='settingModal-menu-general-title'>
            {topBarTranslate['Password']}
          </div>
          <input type='password' placeholder='******' ref={e => this.password = e}
                 className='settingModal-menu-general-input-password' onChange={this.handlePasswordChange}/>
          <div ref={e => this.passwordError = e} className='settingModal-menu-general-error'>

          </div>
          <div className='settingModal-menu-general-hint'>رمز عبوری انتخاب کنید که برای دیگران به سختی قابل حدس زدن
            باشد.
          </div>

          <div className='settingModal-menu-general-title'>
            {topBarTranslate['Contact Email']}
          </div>
          <input type='email' defaultValue={user ? user.email : ''} ref={e => this.email = e}
                 className='settingModal-menu-general-input' onChange={this.handleEmailChange}/>
          <div ref={e => this.emailError = e} className='settingModal-menu-general-error'>
            لطفا ایمیلی معتبر وارد کنید!
          </div>
          <div className='settingModal-menu-general-hint'>این ایمیل برای ارتباط اینوین (مثلا بازیابی رمز عبور) با شما
            است و برای سایر کاربران قابل مشاهده نخواهد بود.
          </div>

          <div className='settingModal-menu-general-title'>
            {translate['Phone']}
          </div>
          <input type='text' defaultValue={user ? user.auth_mobile : ''} ref={e => this.authMobile = e}
                 className='settingModal-menu-general-input' onChange={this.handleEmailChange}/>
          <div ref={e => this.authMobileError = e}
               className='settingModal-menu-general-error'>{translate['Phone number is wrong']}</div>
          <div className='settingModal-menu-general-hint'>{topBarTranslate['Phone setting description']}</div>

          <button className={this.state.saved ? 'settingModal-menu-general-saved' : 'settingModal-menu-general-save'}
                  onClick={this.saveChanges}>{this.state.saved ? 'ذخیره شد' : topBarTranslate['Save Changes']}
          </button>

          <button className={this.state.saved ? 'settingModal-menu-general-close' : 'settingModal-menu-general-closed'}
                  onClick={this.hideSetting}>بستن
          </button>

        </div>
    )
  }
}

const mapStateToProps = state => {
  const id = state.auth.client.identity.content
  return {
    user: state.identities.list[id],
    translate: state.intl.messages,
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    updateUserByUserId: updateUserByUserIdAction.updateUser,
  }, dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(GeneralSetting)