import React, {Component} from 'react'
import {bindActionCreators} from "redux"
import connect from "react-redux/es/connect/connect"
import badgeActions from "src/redux/actions/commonActions/badgeActions"

class IntroduceBadges extends Component {
  componentDidMount() {
    this.props.actions.getBadges()
  }

  render() {
    return (
        <div className='introduce-badges-container'>
          {
            this.props.allBadges.map(badge =>
                <div className='introduce-badges-item-container'>
                  <img src={badge.media} className='introduce-badges-media'/>
                  <div className='introduce-badges-item-text-container'>
                    <div className='introduce-badges-title'>
                      {badge.title}
                    </div>
                    <div className='introduce-badges-description'>
                      {badge.description}
                    </div>
                  </div>
                </div>
            )
          }
        </div>
    )
  }
}

const mapStateToProps = state => ({
  allBadges: state.common.badges.badge.allBadges,
  translate: state.intl.messages.topBar
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getBadges: badgeActions.getAllBadges
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(IntroduceBadges)