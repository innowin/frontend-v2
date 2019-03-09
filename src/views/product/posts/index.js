import * as React from "react"
import connect from "react-redux/es/connect/connect"
import PostView from "../../common/post/PostView"


class ProductPosts extends React.Component {

  render() {
    const {/*translator,*/ product} = this.props
    return (
        <div>
          {
            product.relatedPosts && product.relatedPosts.map((p, i) =>
                <div className='post-view-container'>
                  <PostView key={i} post={this.props.posts[p]} extendedView={false}/>
                </div>
            )
          }
        </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    posts: state.common.post.list
  }
}

export default connect(mapStateToProps)(ProductPosts)