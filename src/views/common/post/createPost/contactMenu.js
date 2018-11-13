import React, {Component} from "react"
import PropTypes from "prop-types"

import FontAwesome from "react-fontawesome"


class ContactMenu extends Component {
  static defaultProps = {
    contactMenu: false
  }
  static propTypes = {
    contactMenu: PropTypes.bool,
    labels: PropTypes.object.isRequired,
    handleLabel: PropTypes.func.isRequired,
    followers: PropTypes.object.isRequired,
    exchanges: PropTypes.object.isRequired,
    currentUserIdentity: PropTypes.number.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {search: ""}
  }

  _submitSearchByWord = () => {
    return null
    // TODO :define _submitSearchByWord
  }


  render() {
    const {contactMenu, labels, handleLabel, followers, exchanges, currentUserIdentity} = this.props
    const {search} = this.state
    const followersArr = Object.values(followers).filter(follow => follow.follow_follower.id !== currentUserIdentity && follow.follow_follower.name.includes(search))
    const exchangesArr = Object.values(exchanges).filter(exchange => exchange.exchange_identity_related_exchange.name.includes(search))
    return (
      <div ref={e => this.contactMenuRef = e}
           className={contactMenu ? "post-component-footer-contact-menu-container" : "post-component-footer-contact-menu-container-hide"}>
        <div className='post-component-footer-contact-menu'>
          <div className='post-component-footer-contact-menu-icon'>
            ?
            <span>  </span>
            مخاطبین
          </div>
          <div className='post-component-footer-searchbox'>
            <input type='text' className='post-component-footer-searchbox-input' placeholder='جستجو'
                   onChange={(e) => this.setState({...this.state, search: e.target.value})}
                   onKeyUp={this._submitSearchByWord}/>
            <FontAwesome name="search" className='post-component-footer-searchbox-icon'/>
          </div>

          <div className='post-component-footer-contact-menu-content'>
            <div className='post-component-footer-check-container'>
              {
                "عمومی".includes(search) ? <label className='post-component-footer-checkbox'>
                    <input type="checkbox" checked={labels["عمومی"] !== undefined}
                           onClick={() => handleLabel("عمومی")}/>
                    <span className='checkmark'/>
                    عمومی
                  </label>
                  : null
              }

              {
                "دنبال کنندگان".includes(search) ?
                  <label className='post-component-footer-checkbox'>
                    <input type="checkbox" checked={labels["دنبال کنندگان"] !== undefined}
                           onClick={() => handleLabel("دنبال کنندگان")}/>
                    <span className='checkmark'/>
                    دنبال کنندگان
                  </label>
                  : null
              }

              {
                "دنبال کنندگانِ دنبال کنندگان".includes(search) ?
                  <label className='post-component-footer-checkbox'>
                    <input type="checkbox"
                           checked={labels["دنبال کنندگانِ دنبال کنندگان"] !== undefined}
                           onClick={() => handleLabel("دنبال کنندگانِ دنبال کنندگان")}/>
                    <span className='checkmark'/>
                    دنبال کنندگانِ دنبال کنندگان
                  </label>
                  : null
              }
            </div>

            <div className='post-component-footer-contact-menu-content-title'
                 style={{display: exchangesArr.length > 0 ? "block" : "none"}}>بورس ها
            </div>

            <div className='post-component-footer-check-container'>
              {
                exchangesArr.map(exchange =>
                  <label className='post-component-footer-checkbox'>
                    <input type="checkbox"
                           checked={labels[exchange.exchange_identity_related_exchange.name] !== undefined || labels["عمومی"]}
                           onClick={() => handleLabel(exchange.exchange_identity_related_exchange.name)}/>
                    <span className='checkmark'/>
                    {exchange.exchange_identity_related_exchange.name}
                  </label>
                )
              }
            </div>

            <div className='post-component-footer-contact-menu-content-title'
                 style={{display: followersArr.length > 0 ? "block" : "none"}}>دنبال کنندگان
            </div>

            <div className='post-component-footer-check-container'>
              {
                followersArr.map(follow => {
                    return (
                      <label className='post-component-footer-checkbox'>
                        <input type="checkbox"
                               checked={labels[follow.follow_follower.name] !== undefined || labels["عمومی"]}
                               onClick={() => handleLabel(follow.follow_follower.name)}/>
                        <span className='checkmark'/>
                        {follow.follow_follower.name}
                      </label>
                    )
                  }
                )
              }
            </div>

          </div>

          <div style={{textAlign: "left"}}>
            <button className='post-component-footer-cancel-btn'>لغو</button>
            <button className='post-component-footer-submit-btn'>ثبت</button>
          </div>

        </div>
      </div>
    )
  }
}

export default ContactMenu