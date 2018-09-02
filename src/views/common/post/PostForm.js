/*global __*/

import {Component} from "react";
import PropTypes from "prop-types";
import {SelectComponent} from "../SelectComponent";
import {TextInput} from "../inputs/TextInput";
import {TextareaInput} from "../inputs/TextareaInput";
import {CheckBox} from "../inputs/CheckBox";
import {FileInput} from "../inputs/FileInput";
import React from "react";

export class PostForm extends Component {
  static defaultProps = {
    postParent: null
  };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    postParent: PropTypes.number,
    postIdentity: PropTypes.number.isRequired,
    post: PropTypes.object
  };

  _getValues = () => {
    const media = this.postPictureInput.getFile();
    const mediaId = media ? media.id : null;
    const {postParent, postIdentity} = this.props;
    return {
      post_type: this.postTypeInput.getValue(),
      post_title: this.postTitleInput.getValue(),
      post_description: this.postDescriptionInput.getValue(),
      post_pinned: this.postPinnedInput.getValue(),
      post_picture: mediaId,
      post_parent: postParent,
      post_identity: postIdentity,
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
              className="col-12 form-group"
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
              value={post.post_pinned}
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