import React from 'react'
import PostView from '../../common/post/PostView'

const ProductPosts = (props) => {
  const {product, posts} = props

  return product.relatedPosts && product.relatedPosts.map((p, i) =>
      posts && posts[p] ?
          <div className='post-view-container'>
            <PostView key={i} post={posts[p]} extendedView={false}/>
          </div>
          : null,
  )
}

export default ProductPosts