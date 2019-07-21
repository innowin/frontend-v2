import React, {Component} from 'react'
import FontAwesome from 'react-fontawesome'
import Material from '../../common/components/Material'
import {NewRightArrow} from '../../../images/icons'

class Sidebar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      collapse: true,
      collapseJob: true,
      collapseBadge: true,
      searchLength: 0,
      workStatus: [],
      badges: [],
    }
  }

  _searchWorkStatus = (e, item) => {
    let workStatus = [...this.state.workStatus]
    if (e.target.checked) workStatus.push(item)
    else workStatus.splice(workStatus.indexOf(item), 1)
    this.setState({...this.state, workStatus}, () => this.props.searchWorkStatus(workStatus))
  }

  _searchBadges = (e, id) => {
    let badges = [...this.state.badges]
    if (e.target.checked) badges.push(id)
    else badges.splice(badges.indexOf(id), 1)
    this.setState({...this.state, badges}, () => this.props.searchBadges(badges))
  }

  _handleChangeUser = (e) => this.props.justUsers(e.target.checked)

  _handleChangeOrgan = (e) => this.props.justOrgans(e.target.checked)

  _collapse = () => this.setState({...this.state, collapse: !this.state.collapse})

  _collapseJob = () => this.setState({...this.state, collapseJob: !this.state.collapseJob})

  _collapseBadge = () => this.setState({...this.state, collapseBadge: !this.state.collapseBadge})

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
    const {searchLength, collapse, collapseJob, collapseBadge} = this.state
    const {allBadges} = this.props

    return (
        <div className={!window.location.pathname.includes('search') ? 'exchanges-explore-sidebar exchanges-explore-sidebar-hide' : 'exchanges-explore-sidebar'}>

          <div className='users-explore-filter-header'>
            <Material backgroundColor='rgba(255,255,255,0.5)' className='back-button-material-no-margin' content={<NewRightArrow className='back-button-product'/>} onClick={() => window.history.back()}/>
            <div className='product-header-title'>فیلتر پروفایل ها</div>
          </div>

          <div className='exchanges-explore-sidebar-searchbox'>
            <input type='text' className='exchanges-explore-sidebar-searchbox-input' placeholder='جستجو' ref={e => this.searchInput = e} onKeyUp={this._submitSearchByWord} onChange={this._handleLength}/>
            {
              searchLength > 0 ?
                  <div className='exchanges-explore-sidebar-search-exit-icon' onClick={this._cancelSearchByClick}>✕</div>
                  :
                  <FontAwesome name="search" className='exchanges-explore-sidebar-searchbox-icon'/>
            }
          </div>

          <div className='users-explore-side-filter-first'>
            <div className='kindOfId' onClick={this._collapse}>
              <div className='kindId'>نوع کاربر:</div>
              <div className={collapse ? 'arrowDown' : 'arrowUp'}>❮</div>
            </div>
            <div className={collapse ? 'users-explore-sidebar-check' : 'collapseId'}>
              <div className="product-explorer">
                <label className="label-wrapper">
                  <input type="checkbox" onChange={this._handleChangeUser}/>
                  <span className="checkmark"/>
                  فرد
                </label>
                <label className="label-wrapper">
                  <input type="checkbox" onChange={this._handleChangeOrgan}/>
                  <span className="checkmark"/>
                  شرکت
                </label>
                <label className="label-wrapper">
                  <input type="checkbox"/>
                  <span className="checkmark"/>
                  کارگزار
                </label>
              </div>
            </div>
          </div>

          <div className='users-explore-side-filter'>
            <div className='kindOfId' onClick={this._collapseJob}>
              <div className='kindId'>وضعیت شغلی:</div>
              <div className={collapseJob ? 'arrowDown' : 'arrowUp'}>❮</div>
            </div>
            <div className={collapseJob ? 'users-explore-sidebar-job-filter' : 'collapseId'}>
              <div className="product-explorer">
                <label className="label-wrapper">
                  <input type="checkbox" onChange={(e) => this._searchWorkStatus(e, 'hire')}/>
                  <span className="checkmark"/>
                  علاقه مند به فرصت های همکاری
                </label>
                <label className="label-wrapper">
                  <input type="checkbox" onChange={(e) => this._searchWorkStatus(e, 'full_time_hire')}/>
                  <span className="checkmark"/>
                  علاقه مند به همکاری تمام وقت
                </label>
                <label className="label-wrapper">
                  <input type="checkbox" onChange={(e) => this._searchWorkStatus(e, 'part_time_hire')}/>
                  <span className="checkmark"/>
                  علاقه مند به همکاری پاره وقت
                </label>
                <label className="label-wrapper">
                  <input type="checkbox" onChange={(e) => this._searchWorkStatus(e, 'internship_hire')}/>
                  <span className="checkmark"/>
                  علاقه مند به فرصت کارآموزی
                </label>
                <label className="label-wrapper">
                  <input type="checkbox" onChange={(e) => this._searchWorkStatus(e, 'not_hiring')}/>
                  <span className="checkmark"/>
                  بدون فرصت شغلی
                </label>
              </div>
            </div>
          </div>

          <div className='users-explore-side-filter'>
            <div className='kindOfId' onClick={this._collapseBadge}>
              <div className='kindId'>براساس نشان های دریافت شده:</div>
              <div className={collapseBadge ? 'arrowDown' : 'arrowUp'}>❮</div>
            </div>
            <div className={collapseBadge ? 'users-explore-sidebar-badge-filter' : 'collapseBadge'}>
              <div className="product-explorer">
                {
                  allBadges.badges.map((badge, index) =>
                      <label key={'badge' + index} className="label-wrapper">
                        <input type="checkbox" onChange={(e) => this._searchBadges(e, badge.id)}/>
                        <span className="checkmark"/>
                        {badge.title}
                      </label>,
                  )
                }
              </div>
            </div>
          </div>

        </div>
    )
  }
}

export default Sidebar
