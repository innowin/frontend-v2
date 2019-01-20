// @flow
import * as React from "react"
import checkOwner from "../CheckOwner"
import PropTypes from "prop-types"
import type {identityType} from "src/consts/flowTypes/user/basicInformation"
import type {postType} from "src/consts/flowTypes/common/post"
import {CommentSvg, MoreOptionSvg} from "src/images/icons"
import {Link} from "react-router-dom"

type postFooterProps = {
  post: postType,
  extendedView?: boolean,
  menuToggle: boolean,
  openMenu: Function,
  postIdentity: identityType | number,
  translate: { [string]: string },
  deletePost: Function,
  showComment: Function,
  showEdit?: Function,
}

const PostFooter = (props: postFooterProps) => {
  const {post, extendedView, menuToggle, openMenu, postIdentity, translate, deletePost, showComment, showEdit} = props
  const {comments_count} = post
  let postUrl = ""
  let user = {}
  let organization = {}


  let ownerId
  if (post) {
    // let viewerCount = post.viewerCount
    if (postIdentity && typeof postIdentity !== 'number') {
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
            {/*<i className="post-menu-bottom fa fa-ellipsis-h cursor-pointer" aria-hidden="true" onClick={openMenu}/>*/}
            <div className='items cursor-pointer post-menu-bottom bubble-more more-option-svg-container' onClick={openMenu}>
              <MoreOptionSvg className={"more-option-svg"}/>
            </div>
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
          <div className='items cursor-pointer post-menu-bottom bubble-more comment-svg-container' onClick={() => showComment()}>
            <span className="">{comments_count ? comments_count : ""}</span>
            {/*<i className="fa fa-share cursor-pointer post-menu-bottom" aria-hidden="true" onClick={() => showComment()}/>*/}
            <CommentSvg className={"comment-svg"}/>
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
  postIdentity: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  translate: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  showComment: PropTypes.func.isRequired,
  showEdit: PropTypes.func
}

export default PostFooter