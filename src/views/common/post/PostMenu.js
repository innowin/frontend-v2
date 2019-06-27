import * as React from "react"
import * as PropTypes from "prop-types"
import {MoreOptionSvg} from "src/images/icons"
import {Link} from "react-router-dom"
import checkOwner from "../CheckOwner"
import type {postType} from "src/consts/flowTypes/common/post"
import type {identityType} from "src/consts/flowTypes/identityType"
import constants from "src/consts/constants"

type PostMenuProps = {
  post: postType,
  extendedView: boolean,
  menuToggle: boolean,
  openMenu: Function,
  postIdentity: identityType | number,
  translate: { [string]: string },
  deletePost: Function,
  showEdit: boolean | Function
}

const PostMenu = (props: PostMenuProps) => {
  const {postMenuId, post, extendedView, menuToggle, openMenu, postIdentity, translate, deletePost, showEdit, clientIdentity} = props
  let postUrl = ""
  let ownerId
  if (post) {
    // let viewerCount = post.viewerCount
    if (postIdentity && typeof postIdentity !== "number") {
      const isUser = postIdentity.identity_type === constants.USER_TYPES.USER
      ownerId = postIdentity.id

      postUrl = isUser
          ? `/user/${ownerId}/Posts/${post.id}`
          : `/organization/${ownerId}/Posts/${post.id}`
    }
  }
  return (
      <div className='items'>
        <div className='items cursor-pointer post-menu-bottom bubble-more more-option-svg-container' onClick={openMenu}>
          <MoreOptionSvg className="more-option-svg"/>
        </div>
        {menuToggle &&
        <div className="menu-box-post pt-0 pb-0" id={postMenuId}>
          <div>
            {
              !extendedView &&
              <Link to={postUrl}>
                <span>{translate["Show more"]}</span>
              </Link>
            }
            {
              post && post.post_parent_owner && post.post_parent_owner === clientIdentity ?
                  <span onClick={deletePost}>{translate["Delete post"]}</span> :
                  checkOwner({id: ownerId, children: <span onClick={deletePost}>{translate["Delete post"]}</span>})
            }
            {
              showEdit && checkOwner({id: ownerId, children: <span onClick={showEdit}>{translate["Edit Post"]}</span>})
            }
          </div>
        </div>
        }
      </div>
  )
}

PostMenu.propTypes = {
  post: PropTypes.object.isRequired,
  clientIdentity: PropTypes.number,
  extendedView: PropTypes.bool.isRequired,
  menuToggle: PropTypes.bool.isRequired,
  openMenu: PropTypes.func.isRequired,
  postIdentity: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  translate: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  showEdit: PropTypes.oneOfType([
    PropTypes.func.isRequired,
    PropTypes.bool.isRequired,
  ]),
}

export default PostMenu