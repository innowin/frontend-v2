/*global __*/
import React, {Component} from "react"
import PropTypes from 'prop-types'
import {FrameCard, CategoryTitle, ListGroup} from "src/views/common/cards/Frames"

class ProductPosts extends Component {
  static propTypes = {
    ProductId: PropTypes.string.isRequired
  };

  render() {
    return (
      <div>
        <CategoryTitle
          title={__('Post')}
        />
        <FrameCard className="-frameCardPost">
          <ListGroup>
            <p>Product Posts</p>
          </ListGroup>
        </FrameCard>
      </div>
    )
  }
}

export default ProductPosts;