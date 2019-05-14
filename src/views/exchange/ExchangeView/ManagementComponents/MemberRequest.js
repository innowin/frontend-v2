import React, {Component} from 'react'
import DefaultUserIcon from "src/images/defaults/defaultUser_svg"

class MemberRequest extends Component {

  constructor(props) {
    super(props)
    this.state = {
      sign: false
    }

    this.collapse = this.collapse.bind(this)
    this.accept = this.accept.bind(this)
    this.reject = this.reject.bind(this)
  }

  collapse() {
    this.setState({...this.state, sign: !this.state.sign})
  }

  accept() {
    // exchange management need back
    alert('accept')
  }

  reject() {
    // exchange management need back
    alert('reject')
  }

  render() {
    const {logo, title, name, description, dateTime, userImage, isFollowed} = this.props
    const {sign} = this.state
    return (
        <div className='ticket-body-main-frame'>

          <div className='ticket-body-frame'>
            <div className='ticket-body-frame-section'>
              {logo}
              <div className='ticket-body-frame-logo-content'>{title}</div>
            </div>

            <div className='ticket-body-frame-section-name'>{name}</div>

            <div className='ticket-body-frame-section-time'>{dateTime}</div>

            <div className='ticket-body-frame-section-open' onClick={this.collapse}>
              <div className={sign ? 'ticket-body-frame-section-open-sign' : 'ticket-body-frame-section-open-sign-rotate'}>»</div>
            </div>

            <div className='ticket-body-frame-section-open-red' onClick={this.reject}>
              <div className='ticket-body-frame-section-open-sign-little'>✖</div>
            </div>

            <div className='ticket-body-frame-section-open-green' onClick={this.accept}>
              <div className='ticket-body-frame-section-open-sign-little-green'>✔</div>
            </div>

          </div>

          <div className={!sign ? 'ticket-body-closed' : 'ticket-body-opened'}>

            {
              userImage ?
                  <img src={userImage} alt='' className='ticket-body-opened-img'/>
                  :
                  <DefaultUserIcon className='ticket-body-opened-img'/>
            }

            <div className='ticket-body-opened-img-name'>
              <div>{name}</div>
              <div className='ticket-body-opened-img-name-desc'>{description}</div>
            </div>

            {
              isFollowed ?
                  <div className='ticket-body-opened-followed'>دنبال شده</div>
                  :
                  <div className='ticket-body-opened-follow'>+</div>
            }

          </div>

        </div>
    )
  }
}

export default MemberRequest