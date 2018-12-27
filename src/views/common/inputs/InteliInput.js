import * as React from 'react'
import {Component} from 'react'
import {MainLbarArrow} from '../../../images/icons'
import PropTypes from 'prop-types'

class InteliInput extends Component {
  static propTypes = {
    list: PropTypes.arrayOf(String).isRequired,
    handleChange: PropTypes.func.isRequired,
    className: PropTypes.string
  }

  constructor(props) {
    super(props)
    this.state = {found: [], list: [], mouseInMenu: false}
    this._setItem = this._setItem.bind(this)
    this._mouseInMenu = this._mouseInMenu.bind(this)
    this._mouseOutMenu = this._mouseOutMenu.bind(this)
    this._openMenu = this._openMenu.bind(this)
    this._closeMenu = this._closeMenu.bind(this)
  }

  componentDidMount(): void {
    const {list} = this.props
    if (list && list.length > 0) {
      this.setState({...this.state, list: list.sort()})
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
        this.setState({...this.state, found: ['مورد مشابهی یافت نشد!']})
      } else {
        this.setState({...this.state, found: found.slice()})
      }
    } else this.setState({...this.state, found: []},)
  }

  _showMenu(e) {
    if (e.target.innerText.length <= 0) {
      const {list} = this.state
      this.setState({...this.state, found: list.slice()})
    } else this._handleMenu(e)
  }

  _openMenu() {
    const {list, found} = this.state
    if (found.length === list.length) {
      this.setState({...this.state, found: []})
    } else {
      this.setState({...this.state, found: list})
    }
  }

  _closeMenu() {
    this.setState({...this.state, found: []})
  }

  _setItem(e) {
    if (e.target.innerText !== 'مورد مشابهی یافت نشد!') {
      const {handleChange} = this.props
      handleChange(e.target.innerText)
      this.text.innerText = e.target.innerText
      this.setState({...this.state, found: []})
    } else {
      this.text.innerText = ''
      this.setState({...this.state, found: []})
    }
  }

  _handleBlur(e) {
    const {mouseInMenu} = this.state
    if (!mouseInMenu) {
      if (this.text && this.text.innerText !== 'مورد مشابهی یافت نشد!') {
        if (e.target.innerText !== '') {
          const {list} = this.state
          for (let i = 0; i < list.length; i++) {
            if (list[i] === e.target.innerText) {
              const {handleChange} = this.props
              handleChange(e.target.innerText)
              this.setState({...this.state, found: []})
              break
            } else if (i === list.length - 1) {
              this.text.innerText = ''
              this.setState({...this.state, found: []})
            }
          }
        } else {
          this.setState({...this.state, found: []})
        }
      } else {
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
          <div onClick={() => this._openMenu()}>
            {
              this.props.icon ? this.props.icon : <MainLbarArrow className='inteli-more-svg'/>
            }
          </div>
          <div className={found.length > 0 ? 'inteli-menu' : 'inteli-menu-hide'}
               onMouseEnter={() => this._mouseInMenu()} onMouseLeave={() => this._mouseOutMenu()} onClick={() => this._closeMenu()}>
            {
              found.map((prop, key) =>
                  <div key={key} className='inteli-menu-item' onClick={(e) => this._setItem(e)}>
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