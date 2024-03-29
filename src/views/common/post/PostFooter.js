// @flow
import * as React from 'react'
import PropTypes from 'prop-types'
import type {identityType} from 'src/consts/flowTypes/user/basicInformation'
import type {postType} from 'src/consts/flowTypes/common/post'
import {CommentSvg} from 'src/images/icons'
import PostMenu from './PostMenu'

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
  postMenuId: string,
}

const PostFooter = (props: postFooterProps) => {
  const {postMenuId, post, extendedView, menuToggle, openMenu, postIdentity, translate, deletePost, showComment, showEdit} = props
  const {comments_count} = post
  return (
      <div className="-item-footerPost">
        <div className='post-details footer-part'>
          <PostMenu postMenuId={postMenuId} translate={translate} post={post} extendedView={extendedView} deletePost={deletePost}
                    menuToggle={menuToggle} openMenu={openMenu} postIdentity={postIdentity} showEdit={showEdit}/>
          <div className='items cursor-pointer post-menu-bottom bubble-more comment-svg-container'
               onClick={() => showComment()}>
            <span className="comment-count">{comments_count ? comments_count : ''}</span>
            <CommentSvg className={'comment-svg'}/>
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
  showEdit: PropTypes.func,
}

export default PostFooter