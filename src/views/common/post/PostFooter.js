import React from 'react'
import * as PropTypes from 'prop-types'
import {CommentSvg, LikeSvg, SuggestSvg} from 'src/images/icons'
import PostMenu from './PostMenu'
import {Link} from 'react-router-dom'
import constants from 'src/consts/constants'
import Material from '../components/Material'

const PostFooter = (props) => {
  const {post, postMenuId, extendedView, menuToggle, openMenu, postIdentity, translate, deletePost, showComment, showCommentSend, showProposalSend, handleLike, showEdit, clientIdentity, showProposals} = props
  const {post_type, comments_count, likes_count, is_post_liked_by_logged_in_user, post_proposals_count} = post
  const postUrl = `/${postIdentity.identity_type}/${postIdentity.id}/Posts/${post.id}/${postIdentity.id !== clientIdentity ? 'Proposal' : ''}`
  const suggest = post_type === constants.POST.POST_TYPE.SUPPLY || post_type === constants.POST.POST_TYPE.DEMAND
  const isMobile = document.body.clientWidth < 480

  return (
      <div className='-item-footerPost'>
        <div className='post-details'>
          <PostMenu postMenuId={postMenuId} translate={translate} post={post} extendedView={extendedView} deletePost={deletePost}
                    menuToggle={menuToggle} openMenu={openMenu} postIdentity={postIdentity} showEdit={showEdit} clientIdentity={clientIdentity}/>

          <Material backgroundColor={is_post_liked_by_logged_in_user === true ? undefined : 'rgba(70, 183, 161, 0.5)'} className='post-order-like post-footer-proposal-container' onClick={clientIdentity ? handleLike : null}>
            {isMobile && <div className='post-footer-proposal-title'>پسند</div>}
            <div className={`post-footer-proposal ${isMobile && 'margin'}`}>{likes_count ? likes_count : '0'}</div>
            <LikeSvg className={is_post_liked_by_logged_in_user === true ? 'liked-svg' : 'like-svg'}/>
          </Material>

          <Material className={`post-order-comment post-footer-proposal-container ${showCommentSend && 'hovered'}`} onClick={showComment}>
            {(showCommentSend || isMobile) && <div className='post-footer-proposal-title'>نظر</div>}
            {(comments_count > 0 || showCommentSend || isMobile) && <div className={`post-footer-proposal ${(showCommentSend || isMobile) && 'margin'}`}>{comments_count}</div>}
            <CommentSvg className='comment-svg'/>
          </Material>

          {
            suggest ?
                !extendedView ?
                    <Link to={postUrl} className={`post-order-proposal post-footer-proposal-container ${showProposalSend && 'hovered'}`}>
                      {(showProposalSend || isMobile) && <div className='post-footer-proposal-title'>پیشنهاده</div>}
                      {(post_proposals_count > 0 || showProposalSend || isMobile) && <div className={`post-footer-proposal ${(showProposalSend || isMobile) && 'margin'}`}>{post_proposals_count}</div>}
                      <SuggestSvg className='suggest-svg'/>
                    </Link>
                    :
                    postIdentity.id !== clientIdentity &&
                    <Material className={`post-order-proposal post-footer-proposal-container ${showProposalSend && 'hovered'}`} onClick={showProposals}>
                      {(showProposalSend || isMobile) && <div className='post-footer-proposal-title'>پیشنهاده</div>}
                      {(post_proposals_count > 0 || showProposalSend || isMobile) && <div className={`post-footer-proposal ${(showProposalSend || isMobile) && 'margin'}`}>{post_proposals_count}</div>}
                      <SuggestSvg className='suggest-svg'/>
                    </Material>
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
