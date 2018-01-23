/*global __*/
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TextInput} from 'src/views/common/inputs/TextInput'
import {MediaUploader} from 'src/views/common/MediaUploader';
import {Confirm} from "../../common/cards/Confirm";


export class PostForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    post: PropTypes.object,
  };

  getValues =  () => {
    const media =null;// await this.refs.pictureInput.refs.component.getMedia();
    const mediaId = media ? media.id : null;
    const values = {
      title: this.refs.titleInput.getValue(),
      pictureId: mediaId, // TODO use media uploader
    };
    return values
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
    const {} = this.props;
    const post = this.props.post || {picture: null};
    return <form onSubmit={this.props.onSubmit}>
      <div className="row">
        <TextInput
          name="title"
          required
          label={__('Title') + ": "}
          value={post.title}
          ref="titleInput"
        />
        <MediaUploader
          name="picture"
          label={__('Picture') + ": "}
          ref="pictureInput"
          media={post.picture}
          organization={null}
        />
        {this.props.children}
      </div>
    </form>
  }
}


export class PostCreateForm extends Component {

  static propTypes = {
    create: PropTypes.func.isRequired,
    hideEdit: PropTypes.func.isRequired
  };

  _save = async () => {
    const formValues = await this.refs.form.getValues();
    const { hideEdit} = this.props;
    return this.props.create(formValues, hideEdit);
  };

  _onSubmit = (e) => {
    e.preventDefault();
    if (this.refs.form.formValidate()) {
      this._save()
        .then(res => {
          this.props.hideEdit();
        })
        .catch(err => {
        });
    }
  };

  render() {
    const {} = this.props;
    return <PostForm onSubmit={this._onSubmit} ref="form">
      <div className="col-12 d-flex justify-content-end">
        <button type="button" className="btn btn-secondary mr-2" onClick={this.props.hideEdit}>
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