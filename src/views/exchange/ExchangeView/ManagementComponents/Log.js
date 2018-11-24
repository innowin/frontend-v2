import React, {Component} from 'react'

class Log extends Component {

  constructor(props) {
    super(props)
    this.close = this.close.bind(this)
  }

  close() {
    alert('close')
  }

  render() {
    const {logo, title, name, dateTime} = this.props
    return (
        <div className='ticket-body-main-frame'>

          <div className='ticket-body-frame'>
            <div className='ticket-body-frame-section'>
              {logo}
              <div className='ticket-body-frame-logo-content'>{title}</div>
            </div>

            <div className='ticket-body-frame-section-name'>{name}</div>

            <div className='ticket-body-frame-section-time'>{dateTime}</div>

            <div className='ticket-body-frame-section-open-pattren'/>
            <div className='ticket-body-frame-section-open-pattren'/>


            <div className='ticket-body-frame-section-open-black' onClick={this.close}>
              <div className='ticket-body-frame-section-open-sign-little-black'>✖</div>
            </div>

          </div>

          <div className='ticket-body-closed'/>


        </div>
    )
  }
}

export default Log