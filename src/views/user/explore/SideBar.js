// @flow
import * as React from 'react'
import FontAwesome from 'react-fontawesome'
import {Component} from 'react'
import {connect} from 'react-redux'
import {hashTagsListSelector} from 'src/redux/selectors/common/hashTags/hashTag'
// import Select from 'react-select'

type appProps =
    {|
      hashTags: Object,
      search: Function,
      justFollowing: Function,
      justFollowed: Function,
      justFollowing: Function,
    |}

type appState =
    {|
      searchHashTags: boolean,
      hashTags: Object,
      collapse: boolean,
      searchLength: number
    |}

class Sidebar extends Component <appProps, appState> {

  constructor(props) {
    super(props)
    this.state =
        {
          searchHashTags: false,
          hashTags: Object,
          collapse: true,
          searchLength: 0
        }
  }


  _handleChange = (e) => {
    // this.props.getFollowersChecked(e.target.checked)
  }

  _handleChangeUser = (e) => {
    this.props.justUsers(e.target.checked)
  }

  _handleChangeOrgan = (e) => {
    this.props.justOrgans(e.target.checked)
  }

  _handleHashTagsChange = (e) => {
    let nowHashTags = this.state.hashTags
    nowHashTags[e.value] = {title: e.value, usage: e.usage}
    this.setState({...this.state, hashTags: nowHashTags})
  }

  _showHashTagsSearch = () => {
    this.setState({...this.state, searchHashTags: !this.state.searchHashTags})
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

  _collapse = () => {
    this.setState({...this.state, collapse: !this.state.collapse})
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

    const {justFollowed, justFollowing} = this.props
    const {
      // searchHashTags,
      searchLength,
      collapse
    } = this.state

    const self: any = this

    let hashTags = []
    Object.values(this.props.hashTags).forEach((p: Object) =>
        hashTags.push({value: p.title, label: p.title, usage: p.usage})
    )

    // let selectedHashTags = Object.values(this.state.hashTags).map((hashTag: Object) =>
    //     <div className='exchanges-explore-sidebar-hashTags'>
    //       <div className='exchanges-explore-sidebar-hashTags-title'>{hashTag.title}</div>
    //       <div className='exchanges-explore-sidebar-hashTags-usage'>{hashTag.usage}</div>
    //     </div>
    // )

    return (
        <div className='exchanges-explore-sidebar'>
          <div className='exchanges-explore-sidebar-searchbox'>
            <input type='text' className='exchanges-explore-sidebar-searchbox-input' placeholder='جستجوی شناسه'
                   ref={e => self.searchInput = e} onKeyUp={this._submitSearchByWord} onChange={this._handleLength}/>
            {
              searchLength > 0 ?
                  <div className='exchanges-explore-sidebar-search-exit-icon' onClick={this._cancelSearchByClick}>✕</div>
                  :
                  <FontAwesome name="search" className='exchanges-explore-sidebar-searchbox-icon'/>
            }
          </div>

          <div className='kindOfId' onClick={this._collapse}>
            <div className='kindId'>نوع شناسه:</div>
            <div className={collapse ? 'arrowDown' : 'arrowUp'}>❮</div>
          </div>

          <div className={collapse ? 'users-explore-sidebar-check' : 'collapseId'}>
            <div className="product-explorer">
              <label className="label-wrapper">
                <input type="checkbox" onChange={this._handleChangeUser}/>
                <span className="checkmark"></span>
                فرد
              </label>
              <label className="label-wrapper">
                <input type="checkbox" onChange={this._handleChangeOrgan}/>
                <span className="checkmark"></span>
                شرکت
              </label>
              {/*<label className="label-wrapper">*/}
              {/*<input type="checkbox" onChange={this._handleChange}/>*/}
              {/*<span className="checkmark"></span>*/}
              {/*کارگزار*/}
              {/*</label>*/}
              <label className="label-wrapper">
                <input type="checkbox" onChange={(e) => justFollowed(e.target.checked)}/>
                <span className="checkmark"> </span>
                دنبال کرده ها
              </label>
              <label className="label-wrapper">
                <input type="checkbox" onChange={(e) => justFollowing(e.target.checked)}/>
                <span className="checkmark"> </span>
                دنبال شده ها
              </label>
            </div>
          </div>
          {/*<div className='exchanges-explore-sidebar-hashTags-search-container'>
           <div className='exchanges-explore-sidebar-tag'>
           افزودن برچسب:
           </div>
           <div className='exchanges-explore-sidebar-tag-search'>
           <FontAwesome name="search" style={{color: '#bababa'}} onClick={this._showHashTagsSearch}/>
           <Select
           className={searchHashTags ? 'exchanges-explore-sidebar-tag-input-show' : 'exchanges-explore-sidebar-tag-input'}
           onChange={this._handleHashTagsChange}
           options={hashTags}
           placeholder=''
           />
           </div>
           <div className='exchanges-explore-sidebar-hashTags-container'>
           {
           selectedHashTags
           }
           </div>
           </div>*/}
          {/*<div style={{fontSize: '14px'}}>*/}
          {/*فیلتر بر اساس نشان ها:*/}
          {/*</div>*/}
        </div>
    )
  }
}

const mapStateToProps = (state) => ({
  hashTags: hashTagsListSelector(state)
})

export default connect(mapStateToProps, null)(Sidebar)