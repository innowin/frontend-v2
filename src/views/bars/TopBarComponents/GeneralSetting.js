import React, {Component} from 'react'
import {bindActionCreators} from "redux"
import connect from "react-redux/es/connect/connect"
import updateUserByUserIdAction from "../../../redux/actions/user/updateUserByUserIdAction"

class GeneralSetting extends Component {
  constructor(props) {
    super(props)
    this.state = {
      saved: false
    }
  }

  saveChanges = () => {
    if (!this.state.saved) {
      const username = this.username.value
      const password = this.password.value
      const email = this.email.value

      let error = false

      let formUsername = null
      let formPassword = null
      let formEmail = null

      if (username !== this.props.username && (username.length > 4)) {
        formUsername = username
      }
      else if (username.length < 5) {
        error = true
        this.usernameError.className = 'settingModal-menu-general-error-show'
      }

      if (password !== '') {
        const test1 = "(?=.*[a-z])"
        const test2 = "(?=.*[A-Z])"
        const test3 = "(?=.[!@#\\$%\\^&])"
        const test4 = "(?=.*[0-9])"
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


      if (email !== this.props.email) {
        let atpos = email.indexOf("@")
        let dotpos = email.lastIndexOf(".")
        if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length) {
          error = true
          this.emailError.className = 'settingModal-menu-general-error-show'
        }
        else {
          formEmail = email
        }
      }

      if (!error) {
        const formFormat = {
          username: formUsername,
          password: formPassword,
          email: formEmail
        }

        const propertyNames = Object.keys(formFormat)
        propertyNames.map(key =>
            formFormat[key] === null ? delete(formFormat[key]) : ''
        )

        this.props.actions.updateUserByUserId(formFormat, this.props.userId)
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if ((this.props.email !== nextProps.email) || (this.props.username !== nextProps.username) || (this.props.password !== nextProps.password)) {
      this.setState({...this.state, saved: true})
    }
  }

  hideSetting = () => {
    this.setState({...this.state, saved: false})
    this.props.hideSetting()
  }

  handleUsernameChange = (e) => {
    if (e.target.value.length > 4) {
      this.usernameError.className = 'settingModal-menu-general-error'
    }
  }

  handleEmailChange = (e) => {
    let email = e.target.value
    if (email !== this.props.email) {
      let atpos = email.indexOf("@")
      let dotpos = email.lastIndexOf(".")
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
      const test1 = "(?=.*[a-z])"
      const test2 = "(?=.*[A-Z])"
      const test3 = "(?=.[!@#\\$%\\^&])"
      const test4 = "(?=.*[0-9])"
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
    return (
        <div style={{textAlign: "right", position: "relative", paddingBottom: "50px"}}>
          <div className='settingModal-menu-general-title'>
            {this.props.translate["Username"]}
          </div>
          <input type='text' defaultValue={this.props.username} ref={e => this.username = e} className='settingModal-menu-general-input' onChange={this.handleUsernameChange}/>
          <div ref={e => this.usernameError = e} className='settingModal-menu-general-error'>
            لطفا نام کاربری با طول حداقل 5 کاراکتر وارد کنید!
          </div>
          <div className='settingModal-menu-general-hint'>حداقل 5 و حداکثر 32 کاراکتر dot و underline ، 9-0 ، Z-A شامل
            حروف.
          </div>

          <div className='settingModal-menu-general-title'>
            {this.props.translate["Password"]}
          </div>
          <input type='password' placeholder='******' ref={e => this.password = e} className='settingModal-menu-general-input-password' onChange={this.handlePasswordChange}/>
          <div ref={e => this.passwordError = e} className='settingModal-menu-general-error'>

          </div>
          <div className='settingModal-menu-general-hint'>رمز عبوری انتخاب کنید که برای دیگران به سختی قابل حدس زدن
            باشد.
          </div>

          <div className='settingModal-menu-general-title'>
            {this.props.translate["Contact Email"]}
          </div>
          <input type='email' defaultValue={this.props.email} ref={e => this.email = e} className='settingModal-menu-general-input' onChange={this.handleEmailChange}/>
          <div ref={e => this.emailError = e} className='settingModal-menu-general-error'>
            لطفا ایمیلی معتبر وارد کنید!
          </div>
          <div className='settingModal-menu-general-hint'>این ایمیل برای ارتباط اینوین (مثلا بازیابی رمز عبور) با شما
            است و برای سایر کاربران قابل مشاهده نخواهد بود.
          </div>

          <button className={this.state.saved ? 'settingModal-menu-general-saved' : 'settingModal-menu-general-save'}
                  onClick={this.saveChanges}>{this.state.saved ? 'ذخیره شد' : this.props.translate["Save Changes"]}
          </button>

          <button className={this.state.saved ? 'settingModal-menu-general-close' : 'settingModal-menu-general-closed'}
                  onClick={this.hideSetting}>بستن
          </button>

        </div>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.auth.client.user.id,
  username: state.auth.client.user.username,
  password: state.auth.client.user.password,
  email: state.auth.client.user.email,
  translate: state.intl.messages.topBar
})
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    updateUserByUserId: updateUserByUserIdAction.updateUser,
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(GeneralSetting)