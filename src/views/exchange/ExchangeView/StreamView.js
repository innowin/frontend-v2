import * as React from 'react'
import PostView from 'src/views/common/post/PostView'
import {ClipLoader} from 'react-spinners'
import {connect} from 'react-redux'
import {exchangePostSelector} from 'src/redux/selectors/common/post/exchangePostSelector'
// import DefaultUserIcon from "../../../images/defaults/defaultUser_svg"
// import Moment from "react-moment"
// import {VerifyWrapper} from "../../common/cards/Frames"
// import {Link} from "react-router-dom"

let scroll = false

const StreamView = props => {
  if (!scroll) {
    window.scrollTo({
      top: 0
    })
    scroll = true
  }
  const {exchangeId, exchanges, exchangePosts} = props

  if (exchanges[exchangeId] && exchanges[exchangeId].exchange.content && exchanges[exchangeId].exchange.content.owner) {
    return exchangePosts.map((p, key) =>
        <div className={'posts-frame-container'} key={key}>
          <div className={'post-view-container'}>
            <PostView post={p}
                // showEdit={this._showEdit}
            />
          </div>
        </div>
    )
  } else return (
      <div className={'info-loading'}>
        <ClipLoader color="#C2B9BD" size={45} margin="4px" loading={true}/>
      </div>
  )
}

let mapStateToProps = (state, props) => {
  let {exchangeId} = props
  return {
    exchanges: state.exchanges.list,
    exchangePosts: exchangePostSelector(state, exchangeId)
  }
}

export default connect(mapStateToProps)(StreamView)