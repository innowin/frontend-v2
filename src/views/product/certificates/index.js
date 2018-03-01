/*global __*/
import React, {Component} from "react";
import PropTypes from 'prop-types';
import {FrameCard, CategoryTitle, ListGroup} from "../../common/cards/Frames";


export class ProductCertificates extends Component {
  static propTypes = {
    ProductId: PropTypes.number.isRequired
  };

  render() {
    return (
      <div>
        <CategoryTitle
          title={__('Certificates')}
        />
        <FrameCard>
          <ListGroup>
            <p>Product Certificates</p>
          </ListGroup>
        </FrameCard>
      </div>
    )
  }
}

export default ProductCertificates;