import * as React from 'react'
import PropTypes from 'prop-types'

import {MoreOptionSvg} from '../../../images/icons'
import {Link} from 'react-router-dom'
import checkOwner from '../CheckOwner'
import type {postType} from 'src/consts/flowTypes/common/post'
import type {identityType} from 'src/consts/flowTypes/user/basicInformation'

type PostMenuProps = {
  post: postType,
  extendedView: boolean,
  menuToggle: boolean,
  openMenu: Function,
  postIdentity: identityType,
  translate: { [string]: string },
  deletePost: Function,
  showEdit: boolean
}

const PostMenu = (props: PostMenuProps) => {
  const {postMenuId, post, extendedView, menuToggle, openMenu, postIdentity, translate, deletePost, showEdit} = props
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
      <div className='items'>
        {/*<i className="post-menu-bottom fa fa-ellipsis-h cursor-pointer" aria-hidden="true" onClick={openMenu}/>*/}
        <div className='items cursor-pointer post-menu-bottom bubble-more more-option-svg-container' onClick={openMenu}>
          <MoreOptionSvg className="more-option-svg"/>
        </div>
        {menuToggle ?
            <div className="menu-box-post pt-0 pb-0" id={postMenuId}>
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
  )
}

PostMenu.propTypes = {
  post: PropTypes.object.isRequired,
  extendedView: PropTypes.bool.isRequired,
  menuToggle: PropTypes.bool.isRequired,
  openMenu: PropTypes.func.isRequired,
  postIdentity: PropTypes.object.isRequired,
  translate: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  showEdit: PropTypes.bool.isRequired
}

export default PostMenu