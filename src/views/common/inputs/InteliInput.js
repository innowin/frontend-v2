import * as React from "react"
import {Component} from "react"
import {MainLbarArrow} from "src/images/icons"
import PropTypes from "prop-types"

class InteliInput extends Component {
  static propTypes = {
    list: PropTypes.arrayOf(Object).isRequired,
    handleChange: PropTypes.func.isRequired,
    className: PropTypes.string,
    noCheck: PropTypes.bool
  }

  constructor(props) {
    super(props)
    this.state = {found: [], list: [], ids: [], mouseInMenu: false}
    this._setItem = this._setItem.bind(this)
    this._mouseInMenu = this._mouseInMenu.bind(this)
    this._mouseOutMenu = this._mouseOutMenu.bind(this)
    this._openMenu = this._openMenu.bind(this)
    this._closeMenu = this._closeMenu.bind(this)
  }

  componentDidMount(): void {
    const {list} = this.props
    let names = []
    let ids = []
    if (list && list.length > 0) {
      for (let i = 0; i < list.length; i++) {
        names.push(list[i].name)
        ids.push(list[i].id)
      }
      this.setState({...this.state, list: names, ids: ids})
    }
  }

  componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
    if (this.props.list && this.props.list.length !== nextProps.list.length) {
      let names = []
      let ids = []
      for (let i = 0; i < nextProps.list.length; i++) {
        names.push(nextProps.list[i].name)
        ids.push(nextProps.list[i].id)
      }
      this.setState({...this.state, list: names, ids: ids})
    }
  }

  _handleMenu(e) {
    if (e.target.innerText.length > 0) {
      const {list} = this.state
      let text = e.target.innerText
      let found = []
      for (let i = 0; i < list.length; i++) {
        if (list[i].indexOf(text) >= 0) {
          found.push(list[i])
        }
      }
      if (found.length < 1) {
        this.setState({...this.state, found: ["مورد مشابهی یافت نشد!"]})
      }
      else {
        this.setState({...this.state, found: found.slice()})
      }
    }
    else this.setState({...this.state, found: []})
  }

  _showMenu(e) {
    if (e.target.innerText.length <= 0) {
      const {list} = this.state
      this.setState({...this.state, found: list.slice()})
    }
    else this._handleMenu(e)
  }

  _openMenu() {
    const {list, found} = this.state
    if (found.length === list.length) {
      this.setState({...this.state, found: []})
    }
    else {
      this.setState({...this.state, found: list})
    }
  }

  _closeMenu() {
    this.setState({...this.state, found: []})
  }

  _setItem(e) {
    if (e.target.innerText !== "مورد مشابهی یافت نشد!") {
      const {handleChange} = this.props
      const {list, ids} = this.state
      handleChange({name: e.target.innerText, id: ids[list.indexOf(e.target.innerText)]})
      this.text.innerText = e.target.innerText
      this.setState({...this.state, found: []})
    }
    else {
      this.text.innerText = ""
      this.setState({...this.state, found: []})
    }
  }

  _handleBlur(e) {
    let {mouseInMenu} = this.state
    let {noCheck} = this.props
    if (noCheck === undefined) {
      if (!mouseInMenu) {
        if (this.text && this.text.innerText !== "مورد مشابهی یافت نشد!") {
          if (e.target.innerText !== "") {
            const {list} = this.state
            for (let i = 0; i < list.length; i++) {
              if (list[i] === e.target.innerText) {
                const {handleChange} = this.props
                const {list, ids} = this.state
                handleChange({name: e.target.innerText, id: ids[list.indexOf(e.target.innerText)]})
                this.setState({...this.state, found: []})
                break
              }
              else if (i === list.length - 1) {
                this.text.innerText = ""
                this.setState({...this.state, found: []})
              }
            }
          }
          else {
            this.setState({...this.state, found: []})
          }
        }
        else {
          this.setState({...this.state, found: []})
        }
      }
    }
    else {
      if (!mouseInMenu) {
        let {handleChange} = this.props
        handleChange({name: e.target.innerText, id: 0})
        this.setState({...this.state, found: []})
      }
    }
  }


  _mouseInMenu() {
    this.setState({...this.state, mouseInMenu: true})
  }

  _mouseOutMenu() {
    this.setState({...this.state, mouseInMenu: false})
  }


  render() {
    const {found} = this.state
    const {className} = this.props
    return (
        <div className='relative-type'>
          <div contentEditable
               className={`form-control gray-text-input ${className && className}`}
               onBlur={(e) => this._handleBlur(e)}
               onKeyUp={(e) => this._handleMenu(e)}
               onClick={(e) => this._showMenu(e)}
               ref={e => this.text = e}
          >
          </div>
          <div onClick={this._openMenu}>
            {
              this.props.icon ? this.props.icon : <MainLbarArrow className='inteli-more-svg'/>
            }
          </div>
          <div className={found.length > 0 ? "inteli-menu" : "inteli-menu-hide"}
               onMouseEnter={this._mouseInMenu} onMouseLeave={this._mouseOutMenu} onClick={this._closeMenu}>
            {
              found.map((prop, key) =>
                  <div key={key} className='inteli-menu-item' onClick={this._setItem}>
                    {prop}
                  </div>
              )
            }
          </div>
        </div>
    )
  }
}

export default InteliInput