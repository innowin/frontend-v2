import React, {Component} from 'react'
import {bindActionCreators} from "redux"
import connect from "react-redux/es/connect/connect"

class Privacy extends Component {
  render() {
    return (
        <div>
          <div className='settingModal-menu-privacy-who-follow-container'>
            <div className='settingModal-menu-privacy-header'>{this.props.translate["Manage Followers"]}</div>

            <div className='settingModal-menu-privacy-who-follow'>{this.props.translate["Who Should Can Follow You?"]}</div>
            <div className='settingModal-menu-privacy-check-container'>
              <form>
                <label className='settingModal-menu-privacy-checkbox'>
                  <input type="radio" name="kind"/>
                  <span className='checkmark'></span>
                  {this.props.translate["All People"]}
                </label>

                <label className='settingModal-menu-privacy-checkbox'>
                  <input type="radio" name="kind"/>
                  <span className='checkmark'></span>
                  {this.props.translate["Only Accepted Requests"]}
                </label>
              </form>
            </div>

            <br/>

            <div className='settingModal-menu-privacy-who-follow'>{this.props.translate["Who Can Read Base Info?"]}</div>
            <div className='settingModal-menu-privacy-check-container'>
              <form>
                <label className='settingModal-menu-privacy-checkbox'>
                  <input type="radio" name="kind"/>
                  <span className='checkmark'></span>
                  {this.props.translate["All People"]}
                </label>

                <label className='settingModal-menu-privacy-checkbox'>
                  <input type="radio" name="kind"/>
                  <span className='checkmark'></span>
                  {this.props.translate["Only Followers"]}
                </label>

                <label className='settingModal-menu-privacy-checkbox'>
                  <input type="radio" name="kind"/>
                  <span className='checkmark'></span>
                  {this.props.translate["Nobody"]}
                </label>
              </form>
            </div>

            <br/>

            <div className='settingModal-menu-privacy-who-follow'>{this.props.translate["Who Can Read Activity?"]}</div>
            <div className='settingModal-menu-privacy-check-container'>
              <form>
                <label className='settingModal-menu-privacy-checkbox'>
                  <input type="radio" name="kind"/>
                  <span className='checkmark'></span>
                  {this.props.translate["All People"]}
                </label>

                <label className='settingModal-menu-privacy-checkbox'>
                  <input type="radio" name="kind"/>
                  <span className='checkmark'></span>
                  {this.props.translate["Only Followers"]}
                </label>

                <label className='settingModal-menu-privacy-checkbox'>
                  <input type="radio" name="kind"/>
                  <span className='checkmark'></span>
                  {this.props.translate["Nobody"]}
                </label>
              </form>
            </div>

            <br/>

            <div className='settingModal-menu-privacy-who-follow'>{this.props.translate["Who Can Read Work Experiences?"]}</div>
            <div className='settingModal-menu-privacy-check-container'>
              <form>
                <label className='settingModal-menu-privacy-checkbox'>
                  <input type="radio" name="kind"/>
                  <span className='checkmark'></span>
                  {this.props.translate["All People"]}
                </label>

                <label className='settingModal-menu-privacy-checkbox'>
                  <input type="radio" name="kind"/>
                  <span className='checkmark'></span>
                  {this.props.translate["Only Followers"]}
                </label>

                <label className='settingModal-menu-privacy-checkbox'>
                  <input type="radio" name="kind"/>
                  <span className='checkmark'></span>
                  {this.props.translate["Nobody"]}
                </label>
              </form>
            </div>

            <br/>

            <div className='settingModal-menu-privacy-who-follow'>{this.props.translate["Who Can Read Badges?"]}</div>
            <div className='settingModal-menu-privacy-check-container'>
              <form>
                <label className='settingModal-menu-privacy-checkbox'>
                  <input type="radio" name="kind"/>
                  <span className='checkmark'></span>
                  {this.props.translate["All People"]}
                </label>

                <label className='settingModal-menu-privacy-checkbox'>
                  <input type="radio" name="kind"/>
                  <span className='checkmark'></span>
                  {this.props.translate["Only Followers"]}
                </label>

                <label className='settingModal-menu-privacy-checkbox'>
                  <input type="radio" name="kind"/>
                  <span className='checkmark'></span>
                  {this.props.translate["Nobody"]}
                </label>
              </form>
            </div>

            <br/>

            <div className='settingModal-menu-privacy-who-follow'>{this.props.translate["Who Can Read Certificates?"]}</div>
            <div className='settingModal-menu-privacy-check-container'>
              <form>
                <label className='settingModal-menu-privacy-checkbox'>
                  <input type="radio" name="kind"/>
                  <span className='checkmark'></span>
                  {this.props.translate["All People"]}
                </label>

                <label className='settingModal-menu-privacy-checkbox'>
                  <input type="radio" name="kind"/>
                  <span className='checkmark'></span>
                  {this.props.translate["Only Followers"]}
                </label>

                <label className='settingModal-menu-privacy-checkbox'>
                  <input type="radio" name="kind"/>
                  <span className='checkmark'></span>
                  {this.props.translate["Nobody"]}
                </label>
              </form>
            </div>

            <br/>

            <div className='settingModal-menu-privacy-who-follow'>{this.props.translate["Who Can Read Followers?"]}</div>
            <div className='settingModal-menu-privacy-check-container'>
              <form>
                <label className='settingModal-menu-privacy-checkbox'>
                  <input type="radio" name="kind"/>
                  <span className='checkmark'></span>
                  {this.props.translate["All People"]}
                </label>

                <label className='settingModal-menu-privacy-checkbox'>
                  <input type="radio" name="kind"/>
                  <span className='checkmark'></span>
                  {this.props.translate["Only Followers"]}
                </label>

                <label className='settingModal-menu-privacy-checkbox'>
                  <input type="radio" name="kind"/>
                  <span className='checkmark'></span>
                  {this.props.translate["Nobody"]}
                </label>
              </form>
            </div>

            <br/>

            <div className='settingModal-menu-privacy-who-follow'>{this.props.translate["Who Can Read Followings?"]}</div>
            <div className='settingModal-menu-privacy-check-container'>
              <form>
                <label className='settingModal-menu-privacy-checkbox'>
                  <input type="radio" name="kind"/>
                  <span className='checkmark'></span>
                  {this.props.translate["All People"]}
                </label>

                <label className='settingModal-menu-privacy-checkbox'>
                  <input type="radio" name="kind"/>
                  <span className='checkmark'></span>
                  {this.props.translate["Only Followers"]}
                </label>

                <label className='settingModal-menu-privacy-checkbox'>
                  <input type="radio" name="kind"/>
                  <span className='checkmark'></span>
                  {this.props.translate["Nobody"]}
                </label>
              </form>
            </div>

            <br/>

            <div className='settingModal-menu-privacy-who-follow'>{this.props.translate["Who Can Read Exchanges?"]}</div>
            <div className='settingModal-menu-privacy-check-container'>
              <form>
                <label className='settingModal-menu-privacy-checkbox'>
                  <input type="radio" name="kind"/>
                  <span className='checkmark'></span>
                  {this.props.translate["All People"]}
                </label>

                <label className='settingModal-menu-privacy-checkbox'>
                  <input type="radio" name="kind"/>
                  <span className='checkmark'></span>
                  {this.props.translate["Only Followers"]}
                </label>

                <label className='settingModal-menu-privacy-checkbox'>
                  <input type="radio" name="kind"/>
                  <span className='checkmark'></span>
                  {this.props.translate["Nobody"]}
                </label>
              </form>
            </div>

            <button className='settingModal-menu-general-save'>{this.props.translate["Save Changes"]}</button>
          </div>

          <div className='settingModal-menu-privacy-who-follow-container-no-border'>
            <div className='settingModal-menu-privacy-header'>{this.props.translate["Delete Account"]}</div>
            <div className='settingModal-menu-privacy-hint'>
              با بسته شدن حساب کاربری شما در اینوین، شما در اینوین، تمام اطلاعات مربوط به آن، اعم از اطلاعات شناسه،
              پیام ها و نظر ها، در شبکه نمایش داده نخواهد شد. شما می توانید حساب خود را طی 30
              روز آینده بازیابی کنید. ممکن است این مهلت تا 40 روز ادامه داشته باشد.
            </div>
            <button
                className='settingModal-menu-privacy-delete-account'>{this.props.translate["Delete Account"]}</button>
          </div>

        </div>
    )
  }
}

const mapStateToProps = state => ({
  translate: state.intl.messages.topBar
})
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({}, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Privacy)