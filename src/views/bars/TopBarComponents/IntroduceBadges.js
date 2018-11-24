import React, {Component} from 'react'
import {bindActionCreators} from "redux"
import connect from "react-redux/es/connect/connect"
import badgeActions from "src/redux/actions/commonActions/badgeActions"
import {getBadges} from 'src/redux/selectors/common/badge/getAllBadges'

class IntroduceBadges extends Component {
  componentDidMount() {
    this.props.actions.getBadges()
  }

  render() {
    return (
        <div className='introduce-badges-container'>
          {
            !this.props.allBadges.loading && this.props.allBadges.badges.length > 0 ?
                this.props.allBadges.badges.map(badge =>
                    <div className='introduce-badges-item-container'>
                      <img src={badge.media} className='introduce-badges-media' alt='badge'/>
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
                :
                !this.props.allBadges.loading && this.props.allBadges.badges.length === 0 ?
                    <div className='introduce-badges-title'>نشانی وجود ندارد</div>
                    :
                    <div className='introduce-badges-title'>در حال بارگذاری ...</div>
          }
        </div>
    )
  }
}

const mapStateToProps = state => ({
  allBadges: getBadges(state),
  translate: state.intl.messages.topBar
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getBadges: badgeActions.getAllBadges
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(IntroduceBadges)