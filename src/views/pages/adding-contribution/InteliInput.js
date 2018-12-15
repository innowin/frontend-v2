import React, {Component} from "react"

class InteliInput extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  _handleMenu(e) {
    const {list} = this.props
    let text = e.target.innerText
    let found = []

    for (let i = 0; i < list.length; i++) {
      if (list[i].indexOf(text) >= 0) {
        found.push(list[i])
      }
    }
  }

  render() {
    const {handleChange} = this.props
    return (
        <div contentEditable
             className="form-control gray-text-input"
             onBlur={(e) => handleChange(e.target.innerText)}
             onKeyUp={(e) => this._handleMenu(e)}
        >
          bounce
        </div>
    )
  }
}

export default InteliInput