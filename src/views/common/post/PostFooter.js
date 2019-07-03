import React from 'react'
import * as PropTypes from 'prop-types'
import {CommentSvg, LikeSvg, SuggestSvg} from 'src/images/icons'
import PostMenu from './PostMenu'
import {Link} from 'react-router-dom'
import constants from 'src/consts/constants'

const PostFooter = (props) => {
  const {
    post, postMenuId, extendedView, menuToggle, openMenu, postIdentity, translate,
    deletePost, showComment, handleLike, is_liked, showEdit, clientIdentity, showProposals,
  } = props
  const {post_type, comments_count, likes_count, is_post_liked_by_logged_in_user, post_proposals_count} = post
  const postUrl = `/${postIdentity.identity_type}/${postIdentity.id}/Posts/${post.id}`
  const suggest = post_type === constants.POST.POST_TYPE.SUPPLY || post_type === constants.POST.POST_TYPE.DEMAND
  return (
      <div className='-item-footerPost'>
        <div className='post-details footer-part'>
          <PostMenu postMenuId={postMenuId} translate={translate} post={post} extendedView={extendedView} deletePost={deletePost}
                    menuToggle={menuToggle} openMenu={openMenu} postIdentity={postIdentity} showEdit={showEdit} clientIdentity={clientIdentity}/>
          <div className='items cursor-pointer post-menu-bottom bubble-more comment-svg-container' onClick={handleLike}>
            <span className='comment-count'>
              {
                likes_count ?
                    is_liked && is_post_liked_by_logged_in_user ?
                        likes_count :
                        is_liked && !is_post_liked_by_logged_in_user ?
                            likes_count + 1 :
                            !is_liked && is_post_liked_by_logged_in_user ? likes_count - 1 : likes_count :
                    is_liked ? 1 : 0
              }
            </span>
            <LikeSvg className={is_liked ? 'liked-svg' : 'like-svg'}/>
          </div>
          <div className='items cursor-pointer post-menu-bottom bubble-more comment-svg-container' onClick={showComment}>
            <span className='comment-count'>{comments_count ? comments_count : ''}</span>
            <CommentSvg className='comment-svg'/>
          </div>

          {
            suggest ?
                postIdentity.id === clientIdentity && !extendedView ?
                    <Link to={postUrl}>
                      <div className='items cursor-pointer post-menu-bottom bubble-more comment-svg-container'>
                        <span className='comment-count'>{post_proposals_count ? post_proposals_count : ''}</span>
                        <SuggestSvg className='suggest-svg'/>
                      </div>
                    </Link>
                    :
                    postIdentity.id !== clientIdentity &&
                    <div className='items cursor-pointer post-menu-bottom bubble-more comment-svg-container' onClick={showProposals}>
                      <span className='comment-count'>{post_proposals_count ? post_proposals_count : ''}</span>
                      <SuggestSvg className='suggest-svg'/>
                    </div>
                : null
          }

        </div>
      </div>
  )
}

PostFooter.propTypes = {
  extendedView: PropTypes.bool,
  menuToggle: PropTypes.bool.isRequired,
  openMenu: PropTypes.func.isRequired,
  postIdentity: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  translate: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  showComment: PropTypes.func.isRequired,
  clientIdentity: PropTypes.number,
  showEdit: PropTypes.func,
}

export default PostFooter