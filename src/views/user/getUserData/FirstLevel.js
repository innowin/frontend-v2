import React, {Component} from "react"
import Material from "src/views/common/components/Material"

class FirstLevel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 'user',
      isFocused: false,
      username: '',
      valid: false
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
    this.setState({...this.state, username, valid})
  }

  render() {
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

              <Material className={`get-data-content-account-select ${this.state.selected === 'user' ? 'get-data-content-selected' : 'get-data-content-deselected'}`}
                        onClick={() => this._select('user')}
                        backgroundColor='rgba(0,132,191,0.3)'
                        content='فرد'
              />

              <div className='get-data-content-account-show' style={{right: this.state.selected === 'user' ? '50px' : '240px'}}>✔</div>

              <Material className={`get-data-content-account-select ${this.state.selected === 'organization' ? 'get-data-content-selected' : 'get-data-content-deselected'}`}
                        onClick={() => this._select('organization')}
                        backgroundColor='rgba(0,132,191,0.3)'
                        content='شرکت'
              />

            </div>
          </div>

          <div>
            <div className='get-data-content-username-container'>
              <div className={this.state.isFocused || this.state.username.length > 0 ? 'get-data-content-username-container-title-out' : 'get-data-content-username-container-title'}>نام کاربری</div>
              <div className={this.state.isFocused || this.state.username.length > 0 ? 'get-data-content-username-container-close' : 'get-data-content-username-container-close-hide'}>
                {this.state.valid ? <span style={{color: '#4dab9f'}}>✔</span> : <span style={{color: '#dd5145'}}>✖</span>}
              </div>

              <input type='text'
                     value={this.state.username}
                     className='get-data-content-username-input'
                     onFocus={this._handleFocus}
                     onBlur={this._handleBlur}
                     onChange={this._handleChange}
              />
              <div className='get-data-content-username-error-hide'>
                شامل حروف underline ، 0-9 ، A - Z , dot حداقل 5 و حداکثر 32 کاراکتر.
              </div>
            </div>
          </div>

          <div className='get-data-content-next'>
            <button className={this.state.valid ? 'get-data-content-next-button-on' : 'get-data-content-next-button'}>بعدی</button>
          </div>
        </div>
    )
  }
}

export default FirstLevel