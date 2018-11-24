import React, {Component} from 'react'
import {bindActionCreators} from "redux"
import connect from "react-redux/es/connect/connect"
import badgeActions from "src/redux/actions/commonActions/badgeActions"
import {getBadges} from 'src/redux/selectors/common/badge/getAllBadges'
import Badge from './Badge'
import BadgeSkeleton from './Badge_Skeleton'

class IntroduceBadges extends Component {
  componentDidMount() {
    this.props.actions.getBadges()
  }

  render() {
    const {loading, badges} = this.props.allBadges
    const arr = [1, 2, 3, 4]
    return (
        <div className={!loading && badges.length ? 'introduce-badges-container' : !loading && badges.length === 0 ? 'introduce-badges-container-empty' : 'introduce-badges-container-loading'}>
          {
            !loading && badges.length > 0 ?
                badges.map(badge =>
                    <Badge media={badge.media} title={badge.title} description={badge.description}/>
                )
                :
                !loading && badges.length === 0 ?
                    <div className='introduce-badges-title'>نشانی وجود ندارد</div>
                    :
                    arr.map(badge =>
                        <BadgeSkeleton/>
                    )
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