/*global __*/
import React, {Component} from 'react';

export class NotFoundCard extends Component {
  render() {
    return <div className="full-page-wrapper">
      <div className="card mt-3">
        <div className="card-block">
          <div className="text-center">
            <h2>
              {__('Organization Not Found')}
            </h2>
          </div>
        </div>
      </div>
    </div>;
  }
}