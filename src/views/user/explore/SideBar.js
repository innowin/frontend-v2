// @flow
import * as React from 'react'
import {Component} from 'react'
import FontAwesome from 'react-fontawesome'
import {connect} from 'react-redux'
import {hashTagsListSelector} from 'src/redux/selectors/common/hashTags/hashTag'
import Select from 'react-select'

type appProps =
    {|
      // actions: any,
      // hashTags: any
    |}

type appState =
    {|
      searchHashTags: boolean,
      hashTags: any
    |}

class Sidebar extends Component <appProps, appState> {

  constructor(props) {
    super(props)
    this.state =
        {
          searchHashTags: false,
          hashTags: {},
          collapse: true,
          searchLength: 0
        }
  }

  _handleChange = (e) => {
    // this.props.getFollowersChecked(e.target.checked)
  }

  handleHashTagsChange = (e) => {
    let nowHashTags = this.state.hashTags
    nowHashTags[e.value] = {title: e.value, usage: e.usage}
    this.setState({...this.state, hashTags: nowHashTags})
  }

  showHashTagsSearch = () => {
    this.setState({...this.state, searchHashTags: !this.state.searchHashTags})
  }

  submitSearchByWord = (e) => {
    e.preventDefault()
    if (e.keyCode === 13) {
      if (e.target.value.trim().length > 0)
        this.props.search(e.target.value.trim())
      else this.props.search(null)

      window.scrollTo({top: 0, behavior: 'smooth'})

    }
  }

  collapse = () => {
    this.setState({...this.state, collapse: !this.state.collapse})
  }

  _handleLength = (e) => {
    this.setState({...this.state, searchLength: e.target.value.length})
  }

  cancelSearchByClick = () => {
    this.props.search(null)
    this.setState({...this.state, searchLength: 0})
    this.searchInput.value = ''
    window.scrollTo({top: 0, behavior: 'smooth'})
  }

  render() {
    let hashTags = []
    Object.values(this.props.hashTags).forEach(p =>
        hashTags.push({value: p.title, label: p.title, usage: p.usage})
    )

    let selectedHashTags = Object.values(this.state.hashTags).map(hashTag =>
        <div className='exchanges-explore-sidebar-hashTags'>
          <div className='exchanges-explore-sidebar-hashTags-title'>{hashTag.title}</div>
          <div className='exchanges-explore-sidebar-hashTags-usage'>{hashTag.usage}</div>
        </div>
    )

    return (
        <div className='exchanges-explore-sidebar'>
          <div className='exchanges-explore-sidebar-searchbox'>
            <input type='text' className='exchanges-explore-sidebar-searchbox-input' placeholder='جستجوی شناسه'
                   ref={e => this.searchInput = e} onKeyUp={this.submitSearchByWord} onChange={this._handleLength}/>
            {
              this.state.searchLength > 0 ?
                  <div className='exchanges-explore-sidebar-search-exit-icon' onClick={this.cancelSearchByClick}>✕</div>
                  :
                  <FontAwesome name="search" className='exchanges-explore-sidebar-searchbox-icon'/>
            }
          </div>

          <div className='kindOfId' onClick={this.collapse}>
            <div className='kindId'>نوع شناسه:</div>
            <div className={this.state.collapse ? 'arrowDown' : 'arrowUp'}>❮</div>
          </div>

          <div className={this.state.collapse ? 'users-explore-sidebar-check' : 'collapseId'}>
            <div className="product-explorer">
              <label className="label-wrapper">
                <input type="checkbox" onChange={this._handleChange}/>
                <span className="checkmark"></span>
                فرد
              </label>
              <label className="label-wrapper">
                <input type="checkbox" onChange={this._handleChange}/>
                <span className="checkmark"></span>
                شرکت
              </label>
              <label className="label-wrapper">
                <input type="checkbox" onChange={this._handleChange}/>
                <span className="checkmark"></span>
                کارگزار
              </label>
              <label className="label-wrapper">
                <input type="checkbox" onChange={(e) => this.props.justFollowed(e.target.checked)}/>
                <span className="checkmark"></span>
                دنبال کرده ها
              </label>
              <label className="label-wrapper">
                <input type="checkbox" onChange={(e) => this.props.justFollowing(e.target.checked)}/>
                <span className="checkmark"></span>
                دنبال شده ها
              </label>
            </div>
          </div>
          <hr/>
          <div className='exchanges-explore-sidebar-hashTags-search-container'>
            <div className='exchanges-explore-sidebar-tag'>
              افزودن برچسب:
            </div>
            <div className='exchanges-explore-sidebar-tag-search'>
              <FontAwesome name="search" style={{color: '#bababa'}} onClick={this.showHashTagsSearch}/>
              <Select
                  className={this.state.searchHashTags ? 'exchanges-explore-sidebar-tag-input-show' : 'exchanges-explore-sidebar-tag-input'}
                  onChange={this.handleHashTagsChange}
                  options={hashTags}
                  placeholder=''
              />
            </div>
            <div className='exchanges-explore-sidebar-hashTags-container'>
              {
                selectedHashTags
              }
            </div>
          </div>
          <hr/>
          <div style={{fontSize: '14px'}}>
            فیلتر بر اساس نشان ها:
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => ({
  hashTags: hashTagsListSelector(state),
})

export default connect(mapStateToProps, null)(Sidebar)