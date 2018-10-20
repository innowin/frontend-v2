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

      let formUsername = null
      let formPassword = null
      let formEmail = null

      if (username !== this.props.username) {
        formUsername = username
      }

      if (password !== '' && password.length > 6) {
        formPassword = password
      }

      if (email !== this.props.email) {
        let atpos = email.indexOf("@")
        let dotpos = email.lastIndexOf(".")
        if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length) {
          this.username.style.border = '1px solid red'
        }
        else {
          formEmail = email
        }
      }


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

  componentWillReceiveProps(nextProps) {

    if ((this.props.email !== nextProps.email) || (this.props.username !== nextProps.username) || (this.props.password !== nextProps.password)) {
      this.setState({...this.state, saved: true})
    }
  }

  hideSetting = () => {
    this.setState({...this.state, saved: false})
    this.props.hideSetting()
  }

  render() {
    return (
        <div style={{textAlign: "right", position: "relative", paddingBottom: "50px"}}>
          <div className='settingModal-menu-general-title'>
            {this.props.translate["Username"]}
          </div>
          <input type='text' defaultValue={this.props.username} ref={e => this.username = e} className='settingModal-menu-general-input'/>
          <div className='settingModal-menu-general-hint'>حداقل 5 و حداکثر 32 کاراکتر dot و underline ، 9-0 ، Z-A شامل
            حروف.
          </div>

          <div className='settingModal-menu-general-title'>
            {this.props.translate["Password"]}
          </div>
          <input type='password' placeholder='******' ref={e => this.password = e} className='settingModal-menu-general-input-password'/>
          <div className='settingModal-menu-general-hint'>رمز عبوری انتخاب کنید که برای دیگران به سختی قابل حدس زدن
            باشد.
          </div>

          <div className='settingModal-menu-general-title'>
            {this.props.translate["Contact Email"]}
          </div>
          <input type='email' defaultValue={this.props.email} ref={e => this.email = e} className='settingModal-menu-general-input'/>
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
  email: state.auth.client.user.email,
  translate: state.intl.messages.topBar
})
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    updateUserByUserId: updateUserByUserIdAction.updateUser,
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(GeneralSetting)