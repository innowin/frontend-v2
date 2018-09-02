/*global __*/

import {Component} from "react";
import PropTypes from "prop-types";
import {PostForm} from "./PostForm";
import React from "react";

export class PostCreateForm extends Component {

  static propTypes = {
    create: PropTypes.func.isRequired,
    hideCreateForm: PropTypes.func.isRequired,
    postIdentity: PropTypes.number.isRequired,
  };

  _save = () => {
    const {create} = this.props;
    const formValues = this.form._getValues();
    return create(formValues);
  };

  _onSubmit = (e) => {
    e.preventDefault();
    if (this.form._formValidate()) {
      this._save()
    }
    return false;
  };

  render() {
    const {hideCreateForm, postIdentity} = this.props;
    return (
        <PostForm onSubmit={this._onSubmit} postIdentity={postIdentity} ref={form => {this.form = form}}>
          <div className="col-12 d-flex justify-content-end">
            <button type="button" className="btn btn-secondary mr-2" onClick={hideCreateForm}>
              {__('Cancel')}
            </button>
            <button type="submit" className="btn btn-success">{__('Create')}</button>
          </div>
        </PostForm>
    )
  }
}