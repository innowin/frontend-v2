import React, {PureComponent} from 'react'
import FontAwesome from 'react-fontawesome'
import {Link} from 'react-router-dom'

class MobileHeader extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      searchLength: 0,
    }
  }

  _submitSearchByWord = (e) => {
    e.preventDefault()
    if (e.keyCode === 13) {
      if (e.target.value.trim().length > 0)
        this.props.search(e.target.value.trim())
      else this.props.search(null)
      window.scrollTo({top: 0, behavior: 'smooth'})
    }
  }

  _handleLength = (e) => this.setState({...this.state, searchLength: e.target.value.length})

  _cancelSearchByClick = () => {
    this.props.search(null)
    this.setState({...this.state, searchLength: 0})
    this.searchInput.value = ''
    window.scrollTo({top: 0, behavior: 'smooth'})
  }

  render() {
    const {searchLength} = this.state
    const {path} = this.props

    return (
        <div className='users-explore-header-filter'>
          <Link to={path}>
            <div className='users-explore-header-filter-btn'>فیلتر</div>
          </Link>

          <div className='users-explore-sidebar-searchbox'>
            <input type='text' className='exchanges-explore-sidebar-searchbox-input' placeholder='جستجو' ref={e => this.searchInput = e} onKeyUp={this._submitSearchByWord} onChange={this._handleLength}/>
            {
              searchLength > 0 ?
                  <div className='exchanges-explore-sidebar-search-exit-icon' onClick={this._cancelSearchByClick}>✕</div>
                  :
                  <FontAwesome name="search" className='exchanges-explore-sidebar-searchbox-icon'/>
            }
          </div>
        </div>
    )
  }
}

export default MobileHeader