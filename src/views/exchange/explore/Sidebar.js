import React from 'react'
import {Component} from 'react'
import FontAwesome from 'react-fontawesome'

class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchLength: 0,
    }
  }

  _handleChange = (e) => this.props.justFollowing(e.target.checked)

  _handleLength = (e) => this.setState({...this.state, searchLength: e.target.value.length})

  _submitSearchByWord = (e) => {
    e.preventDefault()
    if (e.keyCode === 13) {
      if (e.target.value.trim().length > 0)
        this.props.search(e.target.value.trim())
      else this.props.search(null)
      window.scrollTo({top: 0, behavior: 'smooth'})
    }
  }

  _cancelSearchByClick = () => {
    this.props.search(null)
    this.setState({...this.state, searchLength: 0})
    this.searchInput.value = ''
    window.scrollTo({top: 0, behavior: 'smooth'})
  }

  render() {
    const {searchLength} = this.state

    return (
        <div className='exchanges-explore-sidebar exchanges-explore-sidebar-hide'>
          <div className='exchanges-explore-sidebar-searchbox'>
            <input type='text' className='exchanges-explore-sidebar-searchbox-input' placeholder='جستجو'
                   ref={e => this.searchInput = e} onKeyUp={this._submitSearchByWord} onChange={this._handleLength}/>
            {
              searchLength > 0 ?
                  <div className='exchanges-explore-sidebar-search-exit-icon' onClick={this._cancelSearchByClick}>✕</div>
                  :
                  <FontAwesome name="search" className='exchanges-explore-sidebar-searchbox-icon'/>
            }
          </div>
          <div className='exchanges-explore-sidebar-check'>
            <div className="product-explorer">
              <label className="label-wrapper">
                <input type="checkbox" onChange={this._handleChange}/>
                <span className="checkmark"> </span>
                دنبال شده
              </label>
            </div>
          </div>
        </div>
    )
  }
}

export default Sidebar