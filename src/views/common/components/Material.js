import React from 'react'
import PropTypes from 'prop-types'


class Material extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    content: PropTypes.any.isRequired,
    backgroundColor: PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.onMouseDown = this.onMouseDown.bind(this)
    this.handleButtonRelease = this.handleButtonRelease.bind(this)
    this.handleLeave = this.handleLeave.bind(this)
  }

  handleButtonRelease(e) {
    clearTimeout(this.buttonPressTimer)
    if (!this.ripple && this.container) {
      let target = this.container
      let rect = target.getBoundingClientRect()
      let ripple = document.createElement('span')
      ripple.className = 'ripple'
      if (this.props.backgroundColor) ripple.style.backgroundColor = this.props.backgroundColor
      ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px'
      target.appendChild(ripple)
      let top = e.pageY - rect.top - ripple.offsetHeight / 2 - window.scrollY
      let left = e.pageX - rect.left - ripple.offsetWidth / 2 - window.scrollX
      ripple.style.top = top + 'px'
      ripple.style.left = left + 'px'
      setTimeout(() => {
        try {
          target.removeChild(ripple)
        }
        catch (e) {
          console.log('material failed')
        }
      }, 600)
    }
    else {
      this.ripple.style.opacity = '0'
      setTimeout(() => {
        if (this.ripple && this.container) {
          try {
            this.container.removeChild(this.ripple)
            this.ripple = null
          }
          catch (e) {
            console.log('material failed')
          }
        }
      }, 500)
    }
  }

  onMouseDown(e) {
    let pageY = e.pageY
    let pageX = e.pageX
    this.buttonPressTimer = setTimeout(() => {
      if (this.container) {
        let target = this.container
        let rect = target.getBoundingClientRect()
        let ripple = document.createElement('span')
        ripple.className = 'rippleSlow'
        if (this.props.backgroundColor) ripple.style.backgroundColor = this.props.backgroundColor
        ripple.style.height = ripple.style.width = parseInt(1.3 * Math.max(rect.width, rect.height), 10) + 'px'
        target.appendChild(ripple)
        this.ripple = ripple
        let top = pageY - rect.top - ripple.offsetHeight / 2 - window.scrollY
        let left = pageX - rect.left - ripple.offsetWidth / 2 - window.scrollX
        ripple.style.top = top + 'px'
        ripple.style.left = left + 'px'
      }
    }, 300)
  }

  handleLeave() {
    clearTimeout(this.buttonPressTimer)
    if (this.ripple) {
      this.ripple.style.opacity = '0'
      setTimeout(() => {
        if (this.ripple && this.container) {
          try {
            this.container.removeChild(this.ripple)
            this.ripple = null
          }
          catch (e) {
            console.log('material failed')
          }
        }
      }, 500)
    }
  }

  render() {
    return <div ref={e => this.container = e} className={this.props.className ? 'material ' + this.props.className : 'material'} onMouseDown={this.onMouseDown} onMouseUp={this.handleButtonRelease} onMouseLeave={this.handleLeave} onClick={this.props.onClick}>
      {this.props.content}
    </div>
  }
}

export default Material