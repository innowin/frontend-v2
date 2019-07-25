import React from 'react'
import * as PropTypes from 'prop-types'
import constants from 'src/consts/constants'
import {Link} from 'react-router-dom'

const PostType = (props) => {
  const {post, showProposals, clientIdentity, postIdentity} = props
  const supplyIcon = post.post_type === constants.POST.POST_TYPE.SUPPLY
  const demandIcon = post.post_type === constants.POST.POST_TYPE.DEMAND
  const postTitle = post.post_title
  const postUrl = `/${postIdentity.identity_type}/${postIdentity.id}/Posts/${post.id}`
  const postProposalUrl = `/${postIdentity.identity_type}/${postIdentity.id}/Posts/${post.id}/${postIdentity.id !== clientIdentity ? 'Proposal' : ''}`


  return (
      <div className='post-type-container'>
        {
          supplyIcon ?
              clientIdentity === postIdentity.id ?
                  <Link to={postUrl}>
                    <div className='post-supply-demand-button post-supply'/>
                  </Link>
                  :
                  <Link to={postProposalUrl}>
                    <div className='post-supply-demand-button post-supply' onClick={showProposals}/>
                  </Link>
              :
              demandIcon ?
                  clientIdentity === postIdentity.id ?
                      <Link to={postUrl}>
                        <div className='post-supply-demand-button post-demand'/>
                      </Link>
                      :
                      <Link to={postProposalUrl}>
                        <div className='post-supply-demand-button post-demand' onClick={showProposals}/>
                      </Link>
                  : null
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
