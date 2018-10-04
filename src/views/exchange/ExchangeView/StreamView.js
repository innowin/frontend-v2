import React from "react"
import DefaultUserIcon from "../../../images/defaults/defaultUser_svg"
import Moment from "react-moment"

const StreamView = props => {
  const {postsList} = props
  return (
      <div className={"posts-frame-container"}>
        {
          Object.values(postsList).reverse().map((p) => {
            return (
                <div key={p.post_user.username + Math.floor((Math.random() * 1000) + 1)} className={"posts-frame"}>
                  {p.post_related_identity_image !== null ? <img alt={"تصویر پروفایل"}
                                                                 src={p.post_related_identity_image.file}
                                                                 width={"50px"} height={"50px"}
                                                                 className={"post-user-picture"}/>
                      : <DefaultUserIcon
                          height={"50px"} width={"50px"} className={"post-user-picture"}/>}
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
                </div>
            )
          })
        }
      </div>
  )
}
export default StreamView