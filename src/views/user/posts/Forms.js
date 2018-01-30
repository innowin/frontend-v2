/*global __*/
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Confirm} from "../../common/cards/Confirm";
import {SelectComponent} from '../../common/SelectComponent';
import {TextInput} from "../../common/inputs/TextInput";
import {Tabs} from "../../common/cards/Frames";
import {TextareaInput} from "../../common/inputs/TextareaInput";


export class PostForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    post: PropTypes.object,
  };

  getValues =  () => {
    return {
      postType: this.refs.postTypeInput.getValue(),
    };
  };

  formValidate = () => {
    let result = true;
    const validates = [
      this.refs.titleInput.validate(),
    ];
    for (let i = 0; i < validates.length; i++) {
      if (validates[i]) {
        result = false;
        break;
      }
    }
    return result
  };

  render() {
    const {onSubmit, post} = this.props;
    return (
      <form onSubmit={onSubmit} className="row w-100">
        {/*<SelectComponent*/}
          {/*name="postType"*/}
          {/*label={__('Post type') + ": "}*/}
          {/*options={options}*/}
          {/*required*/}
          {/*value=""*/}
          {/*ref={postTypeInput => {this.postTypeInput = postTypeInput}}*/}
        {/*/>*/}
        <select className="w-100 mb-3">
          <option value="post">پست</option>
          <option value="supply">عرضه</option>
          <option value="demand">تقاضا</option>
        </select>
        <TextInput
          label={__('Post title')}
          name="post_title"
          required
        />
        <TextareaInput
          name="post_description"
          label={__('Post description')}
          required
        />
        {this.props.children}
      </form>
    )
  }
}


export class PostCreateForm extends Component {

  static propTypes = {
    create: PropTypes.func.isRequired,
    hideEdit: PropTypes.func.isRequired
  };

  _save = () => {
    const {create, hideEdit} = this.props;
    const formValues = this.refs.form.getValues();
    return create(formValues, hideEdit);
  };

  _onSubmit = (e) => {
    e.preventDefault();
    if (this.form._formValidate()) {
      this._save()
    }
    return false;
  };

  render() {
    const {hideEdit} = this.props;
    return <PostForm onSubmit={this._onSubmit} ref={form => {this.form = form}}>
      <div className="col-12 d-flex justify-content-end">
        <button type="button" className="btn btn-secondary mr-2" onClick={hideEdit}>
          {__('Cancel')}
        </button>
        <button type="submit" className="btn btn-success">{__('Create')}</button>
      </div>
    </PostForm>;
  }
}
export class PostEditForm extends Component {
  state = {
    confirm: false,
  };

  static propTypes = {
    update: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    hideEdit: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
  };

  _showConfirm = () => {
    this.setState({confirm: true})
  };

  _cancelConfirm = () => {
    this.setState({confirm: false})
  };

  _remove = () => {
    const postId = this.props.post.id;
    return this.props.remove(postId)
  };

  save = () => {//(formValues, postId, updateStateForView, hideEdit
    const {post,updateStateForView,hideEdit} = this.props;
    const postId = post.id;
    const formValues = this.refs.form.getValues();
    return this.props.update(formValues, postId, updateStateForView, hideEdit)
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.save();
  };

  render() {
    const {confirm} = this.state;
    if (confirm) {
      return <Confirm cancelRemoving={this._cancelConfirm} remove={this._remove}/>;
    }

    const {post} = this.props;
    return <PostForm onSubmit={this.onSubmit} ref="form" post={post} >
      <div className="col-12 d-flex justify-content-end">
        <button type="button" className="btn btn-outline-danger mr-auto" onClick={this._showConfirm}>
          {__('Delete')}
        </button>
        <button type="button" className="btn btn-secondary mr-2" onClick={this.props.hideEdit}>
          {__('Cancel')}
        </button>
        <button type="submit" className="btn btn-success">{__('Save')}</button>
      </div>
    </PostForm>;
  }
}