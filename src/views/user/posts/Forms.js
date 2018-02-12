/*global __*/
import React, {Component} from "react";
import PropTypes from "prop-types";
import {CheckBox} from "../../common/inputs/CheckBox";
import {Confirm} from "../../common/cards/Confirm";
import {SelectComponent} from '../../common/SelectComponent';
import {TextareaInput} from "../../common/inputs/TextareaInput";
import {TextInput} from "../../common/inputs/TextInput";
import {FileInput} from "src/views/common/inputs/FileInput";


export class PostForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    post: PropTypes.object,
  };

  _getValues = () => {
    const media = this.postPictureInput.getFile();
    const mediaId = media ? media.id : null;
    return {
      post_type: this.postTypeInput.getValue(),
      post_title: this.postTitleInput.getValue(),
      post_description: this.postDescriptionInput.getValue(),
      post_pinned: this.postPinnedInput.getValue(),
      post_picture: mediaId,
    };
  };

  _formValidate = () => {
    let result = true;
    const validates = [
      this.postTypeInput.validate(),
      this.postTitleInput.validate(),
      this.postDescriptionInput.validate(),
      this.postPinnedInput.validate(),
      this.postPictureInput.validate()
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
    const {onSubmit} = this.props;
    const post = this.props.post || {};
    const options = [
      {value: 'post', label: 'نما'},
      {value: 'supply', label: 'عرضه'},
      {value: 'demand', label: 'تقاضا'}
    ];
    return (
      <form onSubmit={onSubmit} className="row w-100">
        <SelectComponent
          name="post_type"
          label={__('Post type') + ": "}
          options={options}
          required
          value={post.post_type}
          ref={postTypeInput => {
            this.postTypeInput = postTypeInput
          }}
        />
        <TextInput
          label={__('Post title') + ": "}
          name="post_title"
          value={post.post_title}
          required
          ref={postTitleInput => {
            this.postTitleInput = postTitleInput
          }}
        />
        <TextareaInput
          name="post_description"
          label={__('Post description') + ": "}
          value={post.post_description}
          ref={postDescriptionInput => {
            this.postDescriptionInput = postDescriptionInput
          }}
        />
        <CheckBox
          label={__('Post pinned') + ": "}
          name="post_pinned"
          checked={post.post_pinned}
          ref={postPinnedInput => {
            this.postPinnedInput = postPinnedInput
          }}
        />
        <FileInput
          label={__('Post picture') + ": "}
          mediaId={post.post_picture}
          ref={postPictureInput => {
            this.postPictureInput = postPictureInput
          }}
        />
        {this.props.children}
      </form>
    )
  }
}

export class PostCreateForm extends Component {

  static propTypes = {
    create: PropTypes.func.isRequired,
    hideCreateForm: PropTypes.func.isRequired
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
    const {hideCreateForm} = this.props;
    return <PostForm onSubmit={this._onSubmit} ref={form => {
      this.form = form
    }}>
      <div className="col-12 d-flex justify-content-end">
        <button type="button" className="btn btn-secondary mr-2" onClick={hideCreateForm}>
          {__('Cancel')}
        </button>
        <button type="submit" className="btn btn-success">{__('Create')}</button>
      </div>
    </PostForm>;
  }
}

export class PostEditForm extends Component {

  static propTypes = {
    update: PropTypes.func.isRequired,
    delete: PropTypes.func.isRequired,
    hideEdit: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {confirm: false};
  }

  _showConfirm = () => {
    this.setState({confirm: true})
  };

  _cancelConfirm = () => {
    this.setState({confirm: false})
  };

  _remove = () => {
    const postId = this.props.post.id;
    return this.props.delete(postId)
  };

  _save = () => {
    const {post, update} = this.props;
    const postId = post.id;
    const formValues = this.form._getValues();
    return update(formValues, postId)
  };

  _onSubmit = (e) => {
    e.preventDefault();
    this._save();
  };

  render() {
    const {confirm} = this.state;
    const {hideEdit, post} = this.props;
    if (confirm) {
      return <Confirm cancelRemoving={this._cancelConfirm} remove={this._remove}/>;
    }
    return <PostForm onSubmit={this._onSubmit} post={post} ref={form => {this.form = form}}>
      <div className="col-12 d-flex justify-content-end">
        <button type="button" className="btn btn-outline-danger mr-auto" onClick={this._showConfirm}>
          {__('Delete')}
        </button>
        <button type="button" className="btn btn-secondary mr-2" onClick={hideEdit}>
          {__('Cancel')}
        </button>
        <button type="submit" className="btn btn-success">{__('Save')}</button>
      </div>
    </PostForm>;
  }
}