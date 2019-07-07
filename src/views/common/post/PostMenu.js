import * as React from 'react'
import * as PropTypes from 'prop-types'
import {MoreOptionSvg} from 'src/images/icons'
import {Link} from 'react-router-dom'

const PostMenu = (props) => {
  const {postMenuId, post, extendedView, menuToggle, openMenu, postIdentity, translate, deletePost, showEdit, clientIdentity} = props
  const ownerId = postIdentity.id
  const postUrl = `/${postIdentity.identity_type}/${ownerId}/Posts/${post.id}`

  return (
      (!extendedView || postIdentity.id === clientIdentity) &&
      <div className='items post-footer-menu'>
        <div className='items cursor-pointer post-menu-bottom bubble-more more-option-svg-container' onClick={openMenu}>
          <MoreOptionSvg className="more-option-svg"/>
        </div>
        {
          menuToggle &&
          <div className="menu-box-post pt-0 pb-0" id={postMenuId}>
            <div>
              {
                !extendedView &&
                <Link to={postUrl}>
                  <span>{translate['Show more']}</span>
                </Link>
              }
              {
                postIdentity.id === clientIdentity &&
                <span onClick={deletePost}>{translate['Delete post']}</span>
              }
              {
                postIdentity.id === clientIdentity && showEdit && <span onClick={showEdit}>{translate['Edit Post']}</span>
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