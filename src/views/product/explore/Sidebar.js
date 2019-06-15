// @flow
import * as React from 'react'
import FontAwesome from 'react-fontawesome'
import {PureComponent} from 'react'

type appProps =
    {|
      search: Function,
    |}

type appState =
    {|
      searchLength: number
    |}

class Sidebar extends PureComponent <appProps, appState> {

  constructor(props) {
    super(props)
    this.state =
        {
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

  _handleLength = (e) => {
    this.setState({...this.state, searchLength: e.target.value.length})
  }

  _cancelSearchByClick = () => {
    const self: any = this
    this.props.search(null)
    this.setState({...this.state, searchLength: 0})
    self.searchInput.value = ''
    window.scrollTo({top: 0, behavior: 'smooth'})
  }

  render() {
    const {searchLength} = this.state
    const {categories, catLevel1, catLevel2} = this.props
    const {list} = categories

    const self: any = this

    return (
        <div className='products-explore-sidebar'>
          <div className='exchanges-explore-sidebar-searchbox'>
            <input type='text' className='exchanges-explore-sidebar-searchbox-input' placeholder='جستجو'
                   ref={e => self.searchInput = e} onKeyUp={this._submitSearchByWord} onChange={this._handleLength}/>
            {
              searchLength > 0 ?
                  <div className='exchanges-explore-sidebar-search-exit-icon' onClick={this._cancelSearchByClick}>✕</div>
                  :
                  <FontAwesome name="search" className='exchanges-explore-sidebar-searchbox-icon'/>
            }
          </div>
          <div className='products-explore-sidebar-container'>
            دسته بندی:

            <select className='product-explorer-sidebar-intelli' onChange={(e) => this.props.handleCat(1, parseInt(e.target.value, 10))}>
              <option value={0}>انتخاب</option>
              {
                Object.values(list).map((cat, i) => {
                  if (cat.id && !cat.category_parent) {
                    return <option key={i} value={cat.id}>{cat.name}</option>
                  }
                  else return null
                })
              }
            </select>

            <select className='product-explorer-sidebar-intelli' onChange={(e) => this.props.handleCat(2, parseInt(e.target.value, 10))}>
              <option value={0}>انتخاب</option>
              {
                Object.values(list).map((cat, i) => {
                  if (cat.category_parent === catLevel1) {
                    return <option key={i} value={cat.id}>{cat.name}</option>
                  }
                  else return null
                })
              }
            </select>

            <select className='product-explorer-sidebar-intelli' onChange={(e) => this.props.handleCat(3, parseInt(e.target.value, 10))}>
              <option value={0}>انتخاب</option>
              {
                Object.values(list).map((cat, i) => {
                  if (cat.category_parent === catLevel2) {
                    return <option key={i} value={cat.id}>{cat.name}</option>
                  }
                  else return null
                })
              }
            </select>


          </div>
        </div>
    )
  }
}

export default Sidebar