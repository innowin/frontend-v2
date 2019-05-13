import React from 'react'
import connect from 'react-redux/es/connect/connect'
import PostView from '../../common/post/PostView'

const ProductPosts = (props) => {
  const {product} = props
  return product.relatedPosts && product.relatedPosts.map((p, i) =>
      <div className='post-view-container'>
        <PostView key={i} post={this.props.posts[p]} extendedView={false}/>
      </div>,
  )
}

const mapStateToProps = state => ({
  posts: state.common.post.list,
})

export default connect(mapStateToProps)(ProductPosts)