import React, {Component} from 'react'
import BeeBackground from '../../../images/bee/beeBackground'
import {Bee} from '../../../images/icons'

class BeePanel extends Component {

  constructor(props) {
    super(props)
    this.state = {
      level: 1,
      image: 0,
      name: 0,
      graduate: 0,
      job: 0,
      bio: 0
    }
  }

  _handleCancel = () => {
    const {level} = this.state
    if (level < 5)
      this.setState({...this.state, level: this.state.level + 1})
    else this.setState({...this.state, level: 1})
  }

  _handleChooseProfile = () => {
    this.setState({...this.state, level: 2})
  }

  _handleName = () => {
    this.setState({...this.state, level: 3})
  }

  _handleGraduate = () => {
    this.setState({...this.state, level: 4})
  }

  _handleJob = () => {
    this.setState({...this.state, level: 5})
  }

  _handleBio = () => {
    this.setState({...this.state, level: 6})
  }

  renderLevel() {
    const {level} = this.state
    if (level === 1) {
      return (
          <div>
            <div className='bee-text'>یک عکس برای پروفایل خود انتخاب کنید.</div>
            <div className='bee-close'>✕</div>

            <div className='bee-background-cont'>
              <BeeBackground className='bee-background'/>
              <Bee className='bee'/>
            </div>

            <div className='bee-buttons'>
              <button className='bee-button-cancel' onClick={this._handleCancel}>فعلا نه</button>
              <button className='bee-button-choose' onClick={this._handleChooseProfile}>انتخاب عکس</button>
            </div>
          </div>
      )
    } else if (level === 2) {
      return (
          <div>
            <div className='bee-text'>نام خود را وارد کنید.</div>
            <div className='bee-close'>✕</div>

            <div className='bee-background-cont'>
              <BeeBackground className='bee-background'/>
              <Bee className='bee'/>
            </div>

            <div className='bee-text-name'>نام و نام خانوادگی</div>
            <input type='text' className='bee-name-text-box'/>

            <div className='bee-loading'>
              <div className='bee-loading-nav'>
                <div className='bee-loading-fill' style={{width: '30%'}}/>
              </div>
              <div>تکمیل پروفایل 30%</div>
            </div>

            <div className='bee-buttons'>
              <button className='bee-button-cancel' onClick={this._handleCancel}>فعلا نه</button>
              <button className='bee-button-choose' onClick={this._handleName}>ثبت</button>
            </div>

          </div>
      )
    } else if (level === 3) {
      return (
          <div>
            <div className='bee-text'>آخرین مقطع تحصیلی</div>
            <div className='bee-close'>✕</div>

            <div className='bee-text-graduate'>آخرین مقطع تحصیلی خود را وارد کنید. شما می توانید در ادامه، از داخل صفحه پروفایل مقاطع دیگر را نیز وارد نمایید</div>

            <div className='bee-background-cont'>
              <BeeBackground className='bee-background'/>
              <Bee className='bee'/>
            </div>

            <div className='bee-text-name'>مقطع</div>
            <input type='text' className='bee-graduate-text-box'/>
            <div className='bee-text-name'>رشته تحصیلی</div>
            <input type='text' className='bee-graduate-text-box'/>
            <div className='bee-text-name'>دانشگاه</div>
            <input type='text' className='bee-name-text-box'/>

            <div className='bee-loading'>
              <div className='bee-loading-nav'>
                <div className='bee-loading-fill' style={{width: '50%'}}/>
              </div>
              <div>تکمیل پروفایل 50%</div>
            </div>

            <div className='bee-buttons'>
              <button className='bee-button-cancel' onClick={this._handleCancel}>فعلا نه</button>
              <button className='bee-button-choose' onClick={this._handleGraduate}>ثبت</button>
            </div>

          </div>
      )
    } else if (level === 4) {
      return (
          <div>
            <div className='bee-text'>شغل</div>
            <div className='bee-close'>✕</div>

            <div className='bee-text-graduate'>سابقه کاری، پروفایل حرفه ای تری از شما معرفی می کند.</div>

            <div className='bee-background-cont'>
              <BeeBackground className='bee-background'/>
              <Bee className='bee'/>
            </div>

            <div className='bee-text-name'>عنوان شغلی</div>
            <input type='text' className='bee-graduate-text-box' placeholder='مثال: مدیر اجرایی'/>
            <div className='bee-text-name'>محل کار</div>
            <input type='text' className='bee-name-text-box' placeholder='مثال: پژوهشکده رویان'/>

            <div className='bee-loading'>
              <div className='bee-loading-nav'>
                <div className='bee-loading-fill' style={{width: '80%'}}/>
              </div>
              <div>تکمیل پروفایل 80%</div>
            </div>

            <div className='bee-buttons'>
              <button className='bee-button-cancel' onClick={this._handleCancel}>فعلا نه</button>
              <button className='bee-button-choose' onClick={this._handleJob}>ثبت</button>
            </div>

          </div>
      )
    } else if (level === 5) {
      return (
          <div>
            <div className='bee-text'>بیوگرافی</div>
            <div className='bee-close'>✕</div>

            <div className='bee-text-graduate'>معرفی کوتاهی از خود، فعالیت ها یا علاقه مندی هایتان بنویسید.</div>

            <div className='bee-background-cont'>
              <BeeBackground className='bee-background'/>
              <Bee className='bee'/>
            </div>

            <div className='bee-text-name'>عنوان شغلی</div>
            <textarea className='bee-name-text-box' placeholder='مثال: 23 ساله | طراح صنعتی'/>

            <div className='bee-loading'>
              <div className='bee-loading-nav'>
                <div className='bee-loading-fill' style={{width: '80%'}}/>
              </div>
              <div>تکمیل پروفایل 80%</div>
            </div>

            <div className='bee-buttons'>
              <button className='bee-button-cancel' onClick={this._handleCancel}>فعلا نه</button>
              <button className='bee-button-choose' onClick={this._handleBio}>ثبت</button>
            </div>

          </div>
      )
    } else if (level === 6) {
      return (
          <div>
            <div className='bee-text'>عالیه!</div>
            <div className='bee-close'>✕</div>

            <div className='bee-text-graduate'>تبریک، پروفایل شما کامل شد.</div>

            <div className='bee-background-cont'>
              <BeeBackground className='bee-background'/>
              <Bee className='bee'/>
            </div>

            <div className='bee-button-complete'>
              100 %
            </div>

            <div className='bee-button-submit-cont'>
              <button className='bee-button-submit'>مشاهده پروفایل</button>
            </div>

          </div>
      )
    }

  }

  render() {
    return (
        <div className='bee-panel-cont'>

          {
            this.renderLevel()
          }

        </div>
    )
  }
}

export default BeePanel