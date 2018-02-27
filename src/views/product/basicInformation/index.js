/*global __*/
import React, {Component} from "react"
import PropTypes from "prop-types";
import {CategoryTitle, FrameCard, ListGroup} from "../../common/cards/Frames";


export default class ProductBasicInformation extends Component {

  static propTypes = {
    productId: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div>
        <CategoryTitle
          title={__('Basic information')}
        />
        <FrameCard>
          <ListGroup>
            <p>Product Basic information</p>
          </ListGroup>
        </FrameCard>
      </div>
    )
  }
}