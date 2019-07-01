import React from 'react'
import * as PropTypes from 'prop-types'
import constants from 'src/consts/constants'

const PostType = (props) => {
  const {post} = props
  let supplyIcon, demandIcon, postTitle
  supplyIcon = post && post.post_type === constants.POST.POST_TYPE.SUPPLY
  demandIcon = post && post.post_type === constants.POST.POST_TYPE.DEMAND
  postTitle = post && post.post_title

  return (
      <div className='post-type-container'>
        {
          (supplyIcon && <div className='post-supply-demand-button post-supply'/>) ||
          (demandIcon && <div className='post-supply-demand-button post-demand'/>)
        }
        <div className='post-type'>
          <span className='title'>{postTitle}</span>
        </div>
      </div>
  )
}

PostType.propTypes = {
  post: PropTypes.object.isRequired,
  translate: PropTypes.object.isRequired,
}

export default PostType