import React from 'react'
import PostView from '../../common/post/PostView'

const ProductPosts = (props) => {
  const {product, posts} = props
  if (posts && product.relatedPosts)
    return product.relatedPosts.map((p, i) =>
        posts[p] ?
            <div className='post-view-container'>
              <PostView key={i} post={posts[p]} extendedView={false}/>
            </div>
            : null,
    )
  else return null
}

export default ProductPosts