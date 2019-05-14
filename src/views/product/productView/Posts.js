import React from 'react'
import PostView from '../../common/post/PostView'

const ProductPosts = (props) => {
  const {product} = props
  return product.relatedPosts && product.relatedPosts.map((p, i) =>
      <div className='post-view-container'>
        <PostView key={i} post={this.props.posts[p]} extendedView={false}/>
      </div>,
  )
}

export default ProductPosts