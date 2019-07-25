import React from 'react'
import PostView from '../../common/post/PostView'

const ProductPosts = (props) => {
  const {product, posts} = props
  if (posts && product.relatedPosts)
    return product.relatedPosts.map((p, i) =>
        posts[p] && <PostView key={'pro' + i} post={posts[p]} extendedView={false}/>,
    )
  else return null
}

export default ProductPosts
