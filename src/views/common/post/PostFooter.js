// @flow
import * as React from "react"
import PropTypes from "prop-types"
import {Link} from "react-router-dom"
import type {postType} from "../../../consts/flowTypes/common/post"
import type {identityType} from "../../../consts/flowTypes/user/basicInformation"
import checkOwner from "../CheckOwner"
import EditIcon from "../../../images/common/edit.svg"

type postFooterProps = {
  post: postType,
  extendedView?: boolean,
  menuToggle: boolean,
  openMenu: Function,
  postIdentity: identityType,
  translate: { [string]: string },
  deletePost: Function,
  showComment: Function,
}

const PostFooter = (props: postFooterProps) => {
  const {post, extendedView, menuToggle, openMenu, postIdentity, translate, deletePost, showComment, showEdit} = props
  let viewerCount
  let postUrl = ""
  let user = {}
  let organization = {}
  let ownerId


  if (post) {
    viewerCount = post.viewerCount
    if (postIdentity && postIdentity.id) {
      user = postIdentity.identity_user
      organization = postIdentity.identity_organization
      ownerId = user ? user.id : organization.id

      postUrl = user
          ? `/user/${ownerId}/Posts/${post.id}`
          : `/organization/${ownerId}/Posts/${post.id}`
    }
  }
  return (
      <div className="-item-footerPost">
        <div className='footer-part'>
        </div>
        <div className='post-details footer-part'>
          <div className='items'>
            <i className="post-menu-bottom fa fa-ellipsis-h cursor-pointer" aria-hidden="true"
               onClick={openMenu}/>
            {menuToggle ?
                <div className="menu-box-post pt-0 pb-0" id='sidebar-post-menu-box'>
                  <div>
                    {
                      !extendedView &&
                      <Link to={postUrl}>
                        <span>{translate["Show more"]}</span>
                      </Link>
                    }
                    {
                      checkOwner({id: ownerId, children: <span onClick={deletePost}>{translate["Delete post"]}</span>})
                    }
                    {
                      checkOwner({id: ownerId, children: <span onClick={showEdit}>{translate["Edit Post"]}</span>})
                    }
                  </div>
                </div>
                : ""
            }
          </div>
          {/*<div className='items'>*/}
          {/*<span className="ml-1">{viewerCount}</span>*/}
          {/*<i className="fa fa-eye" aria-hidden="true"/>*/}
          {/*</div>*/}
          <div className='items'>
            <span className="ml-1"> </span>
            <i className="fa fa-share cursor-pointer post-menu-bottom" aria-hidden="true" onClick={() => showComment()}/>
          </div>
        </div>
      </div>
  )
}

PostFooter.propTypes = {
  post: PropTypes.object.isRequired,
  extendedView: PropTypes.bool,
  menuToggle: PropTypes.bool.isRequired,
  openMenu: PropTypes.func.isRequired,
  postIdentity: PropTypes.object.isRequired,
  translate: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  showComment: PropTypes.func.isRequired,
}


export default PostFooter