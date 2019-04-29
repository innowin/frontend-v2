import Badge from './Badge'
import badgeActions from 'src/redux/actions/commonActions/badgeActions'
import BadgeSkeleton from './Badge_Skeleton'
import connect from 'react-redux/es/connect/connect'
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {getBadges} from 'src/redux/selectors/common/badge/getAllBadges'

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
                badges.map((badge, index) =>
                    <Badge key={'badges ' + index} media={badge.media} title={badge.title} description={badge.description}/>
                )
                :
                !loading && badges.length === 0 ?
                    <div className='introduce-badges-title'>نشانی وجود ندارد</div>
                    :
                    arr.map(() =>
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