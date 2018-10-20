import React from "react"
import DefaultUserIcon from "../../../images/defaults/defaultUser_svg"
import Moment from "react-moment"
import connect from "react-redux/es/connect/connect"
import {VerifyWrapper} from "../../common/cards/Frames"
import {Link} from "react-router-dom"
import PostView from "../../common/post/PostView"

const StreamView = props => {
  window.scrollTo({
    top: 0
  })
  const {posts, exchangeId} = props
  const {groupedByExchange} = posts
  return (
    <div className={"posts-frame-container"}>
      {
        groupedByExchange[exchangeId] ?
          Object.values(groupedByExchange[exchangeId]).reverse().map((p) => {
            return (
              <div className={"post-view-container"}>
                <PostView post={p}
                  // showEdit={this._showEdit}
                />
              </div>
              /*<div key={p.post_user.username + Math.floor((Math.random() * 1000) + 1)} className={"posts-frame"}>
               <Link to={`/user/${p.post_user.id}`}>
               {p.post_related_identity_image !== null ? <img alt={"تصویر پروفایل"}
               src={p.post_related_identity_image.file}
               width={"50px"} height={"50px"}
               className={"post-user-picture"}/>
               : <DefaultUserIcon
               height={"50px"} width={"50px"} className={"post-user-picture"}/>}</Link>
               <div className={"posts-info"}>
               <div className={"post-user-name"}>
               {
               p.post_user.first_name !== "" || p.post_user.last_name !== "" ?
               p.post_user.first_name + " " + p.post_user.last_name
               :
               p.post_user.username
               }
               </div>
               <div className={"posts-date"}>
               <span>
               <Moment element="span" fromNow ago>{p.created_time}</Moment><span> پیش - </span>
               <span>{p.created_time.slice(11, 19)}</span>
               </span>
               </div>
               </div>
               <div className={"posts-description"}>
               {p.post_description}
               </div>
               {p.post_picture !== null ?
               <div>
               <img src={p.post_picture.file} width={"100%"} style={{borderRadius:'5px',}}/> {/!* TODO ABEL *!/}
               </div>
               : null}
               </div>*/
            )
          })
          :
          <VerifyWrapper isLoading={true} error={false}/>
      }
    </div>
  )
}

const mapStateToProps = (state) => ({
  posts: state.common.post,
})

export default connect(mapStateToProps)(StreamView)