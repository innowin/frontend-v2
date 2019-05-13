import React from 'react'
import FontAwesome from 'react-fontawesome'
import {Component} from 'react'
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
    }
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
                  <input type="checkbox" onChange={this._handleChangeUser}/>
                  <span className="checkmark"/>
                  علاقه مند به فرصت های همکاری
                </label>
                <label className="label-wrapper">
                  <input type="checkbox" onChange={this._handleChangeOrgan}/>
                  <span className="checkmark"/>
                  علاقه مند به همکاری تمام وقت
                </label>
                <label className="label-wrapper">
                  <input type="checkbox"/>
                  <span className="checkmark"/>
                  علاقه مند به همکاری پاره وقت
                </label>
                <label className="label-wrapper">
                  <input type="checkbox"/>
                  <span className="checkmark"/>
                  علاقه مند به فرصت کارآموزی
                </label>
                <label className="label-wrapper">
                  <input type="checkbox"/>
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
            <div className={collapseBadge ? 'users-explore-sidebar-job-filter' : 'collapseId'}>
              <div className="product-explorer">
                <label className="label-wrapper">
                  <input type="checkbox" onChange={this._handleChangeUser}/>
                  <span className="checkmark"/>
                  پروفایل کامل
                </label>
                <label className="label-wrapper">
                  <input type="checkbox" onChange={this._handleChangeOrgan}/>
                  <span className="checkmark"/>
                  شرکت دانش بنیان
                </label>
                <label className="label-wrapper">
                  <input type="checkbox"/>
                  <span className="checkmark"/>
                  ناحیه نوآوری شریف
                </label>
                <label className="label-wrapper">
                  <input type="checkbox"/>
                  <span className="checkmark"/>
                  اعضای مجموعه فحاد
                </label>
                <label className="label-wrapper">
                  <input type="checkbox"/>
                  <span className="checkmark"/>
                  شرکت فنّاور
                </label>
              </div>
            </div>
          </div>

          {/*<label className="label-wrapper">*/}
          {/*  <input type="checkbox" onChange={(e) => justFollowed(e.target.checked)}/>*/}
          {/*  <span className="checkmark"/>*/}
          {/*  دنبال کرده ها*/}
          {/*</label>*/}
          {/*<label className="label-wrapper">*/}
          {/*  <input type="checkbox" onChange={(e) => justFollowing(e.target.checked)}/>*/}
          {/*  <span className="checkmark"/>*/}
          {/*  دنبال شده ها*/}
          {/*</label>*/}

        </div>
    )
  }
}

export default Sidebar