import React from 'react'
import PropTypes from "prop-types"


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
  }

  handleButtonRelease(e) {
    try {
      clearTimeout(this.buttonPressTimer)
      if (!this.ripple) {
        let target = this.container
        let rect = target.getBoundingClientRect()
        let ripple = document.createElement("span")
        ripple.className = "ripple"
        if (this.props.backgroundColor) ripple.style.backgroundColor = this.props.backgroundColor
        ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + "px"
        target.appendChild(ripple)
        let top = e.pageY - rect.top - ripple.offsetHeight / 2 - window.scrollY
        let left = e.pageX - rect.left - ripple.offsetWidth / 2 - window.scrollX
        ripple.style.top = top + "px"
        ripple.style.left = left + "px"
        setTimeout(() => {
          target.removeChild(ripple)
        }, 600)
      }
      else {
        this.ripple = null
      }
    }
    catch (e) {
      console.log('Material Effect Failed!')
    }
  }

  onMouseDown(e) {
    try {
      let pageY = e.pageY
      let pageX = e.pageX
      this.buttonPressTimer = setTimeout(() => {
        let target = this.container
        let rect = target.getBoundingClientRect()
        let ripple = document.createElement("span")
        ripple.className = "rippleSlow"
        if (this.props.backgroundColor) ripple.style.backgroundColor = this.props.backgroundColor
        ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + "px"
        target.appendChild(ripple)
        this.ripple = ripple
        let top = pageY - rect.top - ripple.offsetHeight / 2 - window.scrollY
        let left = pageX - rect.left - ripple.offsetWidth / 2 - window.scrollX
        ripple.style.top = top + "px"
        ripple.style.left = left + "px"
        setTimeout(() => {
          target.removeChild(ripple)
        }, 1500)
      }, 300)
    }
    catch (e) {
      console.log('Material Effect Failed!')
    }
  }

  render() {
    return <div ref={e => this.container = e} className={this.props.className ? "material " + this.props.className : "material"}
                onMouseDown={this.onMouseDown} onMouseUp={this.handleButtonRelease} onClick={this.props.onClick}>
      <div className='material-content'>
        {this.props.content}
      </div>
    </div>
  }
}

export default Material