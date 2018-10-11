import React, {Component} from 'react'
import FontAwesome from 'react-fontawesome'
import {connect} from 'react-redux'
import {bindActionCreators} from "redux"
import exchangeActions from "../../../redux/actions/exchangeActions"
import {getExchanges} from "../../../redux/selectors/common/exchanges/GetAllExchanges"
import {hashTagsListSelector} from 'src/redux/selectors/common/hashTags/hashTag'
import Select from 'react-select'


class Sidebar extends Component {

  constructor(props) {
    super(props)
    this.state =
        {
          searchHashTags: false,
          hashTags: []
        }
  }

  _handleChange = (e) => {
    this.props.getFollowersChecked(e.target.checked)
  }

  handleHashTagsChange = (e) => {
    let nowHashTags = this.state.hashTags.slice()
    nowHashTags.push({title: e.value, usage: e.usage})

    this.setState({hashTags: nowHashTags.slice()})
  }

  showHashTagsSearch = () => {
    this.setState({searchHashTags: !this.state.searchHashTags})
  }

  submitSearchByWord = (e) => {
    e.preventDefault()
    if (e.keyCode === 13) {
      this.props.actions.searchByWord(e.target.value)
    }
  }

  render() {
    let hashTags = []
    Object.values(this.props.hashTags).forEach(p =>
        hashTags.push({value: p.title, label: p.title, usage: p.usage})
    )

    let selectedHashTags = this.state.hashTags.map(hashTag =>
        <div className='exchanges-explore-sidebar-hashTags'>
          <div className='exchanges-explore-sidebar-hashTags-title'>{hashTag.title}</div>
          <div className='exchanges-explore-sidebar-hashTags-usage'>{hashTag.usage}</div>
        </div>
    )

    return (
        <div className='exchanges-explore-sidebar'>
          <div className='exchanges-explore-sidebar-searchbox'>
            <input type='text' className='exchanges-explore-sidebar-searchbox-input' placeholder='جستجو'
                   onKeyUp={this.submitSearchByWord}/>
            <FontAwesome name="search" className='exchanges-explore-sidebar-searchbox-icon'/>
          </div>
          <div className='exchanges-explore-sidebar-check'>
            <div className="product-explorer">
              <label className="label-wrapper">
                <input type="checkbox" onChange={this._handleChange}/>
                <span className="checkmark"></span>
                دنبال
              </label>
            </div>
          </div>
          <hr/>
          <div className='exchanges-explore-sidebar-hashTags-search-container'>
            <div className='exchanges-explore-sidebar-tag'>
              افزودن برچسب:
            </div>
            <div className='exchanges-explore-sidebar-tag-search'>
              <FontAwesome name="search" onClick={this.showHashTagsSearch}/>
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
          <div>
            فیلتر بر اساس نشان ها:
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => ({
  hashTags: hashTagsListSelector(state),
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    searchByWord: exchangeActions.searchExchangesByWord,
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)