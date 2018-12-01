import React from 'react'

class Material extends React.Component {
  constructor(props) {
    super(props)
    this.onMouseDown = this.onMouseDown.bind(this)
  }

  onMouseDown(e) {
    let target = this.container
    let rect = target.getBoundingClientRect()
    let ripple = document.createElement('span')
    ripple.className = 'ripple'
    ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px'
    target.appendChild(ripple)
    let top = e.pageY - rect.top - ripple.offsetHeight / 2 - window.scrollY
    let left = e.pageX - rect.left - ripple.offsetWidth / 2 - window.scrollX
    ripple.style.top = top + 'px'
    ripple.style.left = left + 'px'
    setTimeout(() => {
      target.removeChild(ripple)
    }, 600)
  }

  render() {
    return <div ref={e => this.container = e} className={this.props.className ? 'material ' + this.props.className : 'material'} onMouseDown={this.onMouseDown} onClick={this.props.onClick}>
      {this.props.content}
    </div>
  }
}

export default Material