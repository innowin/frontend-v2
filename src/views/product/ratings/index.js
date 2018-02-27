/*global __*/
import React, {Component} from "react"
import PropTypes from 'prop-types'
import {FrameCard, CategoryTitle, ListGroup} from "src/views/common/cards/Frames"

class ProductRating extends Component {
  static propTypes = {
    ProductId: PropTypes.string.isRequired
  };

  render() {
    return (
      <div>
        <CategoryTitle
          title={__('Ratings')}
        />
        <FrameCard className="-frameCardPost">
          <ListGroup>
            <p>Product Ratings</p>
          </ListGroup>
        </FrameCard>
      </div>
    )
  }
}

export default ProductRating;