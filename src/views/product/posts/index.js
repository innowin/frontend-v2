// @flow
import * as React from "react"
import {FrameCard, CategoryTitle, ListGroup} from "src/views/common/cards/Frames"
import type {TranslatorType} from "src/consts/flowTypes/common/commonTypes"
import {bindActionCreators} from "redux"
import postActions from "../../../redux/actions/commonActions/postActions"
import {getMessages} from "../../../redux/selectors/translateSelector"
import connect from "react-redux/es/connect/connect"
import PostView from "../../common/post/PostView"

type ProductPostsProps = {
  translator: TranslatorType,
  productId: number,
  actions: {
    getPosts: Function,
  },
  products: [],
  posts: [],
}

class ProductPosts extends React.Component<ProductPostsProps> {

  componentDidMount() {
    this.props.actions.getPosts({postRelatedProductId: this.props.productId})
  }

  renderPosts() {
    if (this.props.products[this.props.productId] && this.props.products[this.props.productId].relatedPosts) {
      const arr = this.props.products[this.props.productId].relatedPosts
      return arr.map((p, i) =>
          <PostView key={i} post={this.props.posts[p]}/>
      )
    }
    else return null
  }

  render() {
    const {translator, productId} = this.props
    return (
        <div>
          <CategoryTitle
              title={translator['Post']}
          />
          <FrameCard className="-frameCardPost">
            <ListGroup>
              <div className={"post-view-container"}>
                {
                  this.renderPosts()
                }
              </div>
            </ListGroup>
          </FrameCard>
        </div>
    )
  }
}

const DispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getPosts: postActions.filterPostsByPostRelatedProduct,
  }, dispatch)
})

const mapStateToProps = state => {
  return {
    products: state.common.product.products.list,
    posts: state.common.post.list,
    translate: getMessages(state),
  }
}

export default connect(mapStateToProps, DispatchToProps)(ProductPosts)