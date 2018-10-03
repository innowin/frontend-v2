import React, {Component} from 'react'
import FontAwesome from 'react-fontawesome'
import {Collapse} from 'reactstrap'
import {ContributionsType} from '../../bars/filter/ContributionType'


class Sidebar extends Component {
  _handleChange = (e) => {
    this.props.getFollowersChecked(e.target.checked)
  }

  render() {
    return (
        <div className='exchanges-explore-sidebar'>
          <div className='exchanges-explore-sidebar-searchbox'>
            <input type='text' className='exchanges-explore-sidebar-searchbox-input' placeholder='جستجو'/>
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
          <div>
            <div className='exchanges-explore-sidebar-tag'>
              افزودن برچسب:
            </div>
            <div className='exchanges-explore-sidebar-tag-search'>
              <FontAwesome name="search" /*onClick={()=>alert('shit')}*/ />
            </div>
          </div>
        </div>
    )
  }
}

export default Sidebar