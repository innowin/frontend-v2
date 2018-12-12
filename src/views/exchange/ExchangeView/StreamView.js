import * as React from "react"
import PostView from "src/views/common/post/PostView"
import {ClipLoader} from "react-spinners"
import {connect} from "react-redux"
// import DefaultUserIcon from "../../../images/defaults/defaultUser_svg"
// import Moment from "react-moment"
// import {VerifyWrapper} from "../../common/cards/Frames"
// import {Link} from "react-router-dom"

const StreamView = props => {
  window.scrollTo({
    top: 0
  })
  const {posts, exchangeId, exchanges} = props

  if (exchanges[exchangeId] && exchanges[exchangeId].exchange.content && exchanges[exchangeId].exchange.content.owner) {
    return Object.values(posts).reverse().map((p, key) => {
          return p.post_parent && p.post_parent.id === exchangeId ?
              <div className={"posts-frame-container"} key={key}>
                <div className={"post-view-container"}>
                  <PostView post={p}
                      // showEdit={this._showEdit}
                  />
                </div>
              </div>
              :
              null
        }
    )
  } else return (
      <div className={"info-loading"}>
        {console.log("EXCHANGE RESPOND NOT FOUND!")}
        <ClipLoader color="#C2B9BD" size={45} margin="4px" loading={true}/>
      </div>
  )
}
/*<div className={"info-loading"}><ClipLoader color="#C2B9BD" size={45} margin="4px" loading={true}/></div>*/

const mapStateToProps = (state) => ({
  posts: state.common.post.list,
  exchanges: state.exchanges.list,
})

export default connect(mapStateToProps)(StreamView)