import React from "react"
// import DefaultUserIcon from "../../../images/defaults/defaultUser_svg"
// import Moment from "react-moment"
import connect from "react-redux/es/connect/connect"
// import {VerifyWrapper} from "../../common/cards/Frames"
// import {Link} from "react-router-dom"
import PostView from "../../common/post/PostView"
import {ClipLoader} from "react-spinners"

const StreamView = props => {
  window.scrollTo({
    top: 0
  })
  const {posts, exchangeId} = props
  const {list} = posts

  return Object.values(list).reverse().map((p, key) => {
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
}
/*<div className={"info-loading"}><ClipLoader color="#C2B9BD" size={45} margin="4px" loading={true}/></div>*/

const mapStateToProps = (state) => ({
  posts: state.common.post,
})

export default connect(mapStateToProps)(StreamView)