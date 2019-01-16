/*global __*/

import { Component } from 'react'
import PropTypes from 'prop-types'
import { SelectComponent } from '../SelectComponent'
import { TextInput } from '../inputs/TextInput'
import { TextareaInput } from '../inputs/TextareaInput'
import { CheckBox } from '../inputs/CheckBox'
import { FileInput } from '../inputs/FileInput'
import React from 'react'
import DefaultUserIcon from './createPost'
import AttachFileIcon from 'src/images/common/attachFileNew_svg'

export class PostForm extends Component {
  static defaultProps = {
    postParent: null
  }

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    postParent: PropTypes.number,
    postIdentity: PropTypes.number.isRequired,
    post: PropTypes.object
  }

  _getValues = () => {
    const media = this.postPictureInput.getFile()
    const mediaId = media ? media.id : null
    const { postParent, postIdentity } = this.props
    return {
      post_type: this.postTypeInput.getValue(),
      post_title: this.postTitleInput.getValue(),
      post_description: this.postDescriptionInput.getValue(),
      post_pinned: this.postPinnedInput.getValue(),
      post_picture: mediaId,
      post_parent: postParent,
      post_identity: postIdentity
    }
  }

  _formValidate = () => {
    let result = true
    const validates = [
      this.postTypeInput.validate(),
      this.postTitleInput.validate(),
      this.postDescriptionInput.validate(),
      this.postPinnedInput.validate(),
      this.postPictureInput.validate()
    ]
    for (let i = 0; i < validates.length; i++) {
      if (validates[i]) {
        result = false
        break
      }
    }
    return result
  }

  render() {
    const { onSubmit, currentUserMedia, currentUserName } = this.props
    const post = this.props.post || {}
    const options = [
      { value: 'post', label: 'نما' },
      { value: 'supply', label: 'عرضه' },
      { value: 'demand', label: 'تقاضا' }
    ]
    return (
        <form onSubmit={onSubmit} className="edit-form w-90">

          {/*// display none*/}
          <SelectComponent
              name="post_type"
              label={__('Post type') + ': '}
              options={options}
              required
              value={post.post_type}
              ref={postTypeInput => {
                this.postTypeInput = postTypeInput
              }}
              className="col-12 form-group display-none"
          />
          <TextInput
              label={__('Post title') + ': '}
              name="post_title"
              value={post.post_title}
              required
              ref={postTitleInput => {
                this.postTitleInput = postTitleInput
              }}
              className="display-none"
          />

          <CheckBox
              label={__('Post pinned') + ': '}
              name="post_pinned"
              value={post.post_pinned}
              ref={postPinnedInput => {
                this.postPinnedInput = postPinnedInput
              }}
          />

          <FileInput
              label={__('Post picture') + ': '}
              mediaId={post.post_picture}
              ref={postPictureInput => {
                this.postPictureInput = postPictureInput
              }}
          />
          {/*//end of display nones*/}

          <div className='post-component-header'>
            {currentUserMedia ?
                <img alt='profile' src={currentUserMedia} className='post-edit-header-img'/>
                :
                <DefaultUserIcon className='post-edit-header-img'/>
            }
            <div className='post-not-collapse-username'>
              {currentUserName}
            </div>
            <div className='post-component-header-item'>
              <span className='post-edit-header-left'>درحال ویرایش...</span>
              <div className='post-edit-header-left-close'>✕</div>
            </div>
          </div>


          <TextareaInput
              name="post_description"
              label={__('Post description') + ': '}
              value={post.post_description}
              ref={postDescriptionInput => {
                this.postDescriptionInput = postDescriptionInput
              }}
          />

          <div className='post-component-footer-send'>
            {/*<div className='post-component-footer-link' ref={e => this.link = e}>{link}</div>*/}
            <div style={{ display: 'inline-block' }} onClick={this.handleAttach}>
              <AttachFileIcon className='post-component-footer-send-attach'/>
            </div>

            <button type="button" className='post-edit-footer-cancel-btn' onClick={this.props.hideEdit}>{__('Cancel')}</button>

            <button type="submit" className='post-edit-footer-send-btn'>ثبت ویرایش</button>

            {/*<button type="button" className="btn btn-outline-danger mr-auto" onClick={this.props._showConfirm}>*/}
            {/*{__('Delete')}*/}
            {/*</button>*/}


            {/*<AttachMenu*/}
            {/*attachMenu={attachMenu}*/}
            {/*handleFile={this._handlePostFile}*/}
            {/*handleMedia={this._handlePostMedia}*/}
            {/*handlePictures={this._handlePostPictures}*/}
            {/*postImagesLength={postImagesLength}*/}
            {/*postMediaExist={Boolean(postMedia)}*/}
            {/*postFileExist={Boolean(postFile)}*/}
            {/*postLinkExist={Boolean(link)}*/}
            {/*linkModalFunc={this._linkModalFunc}*/}
            {/*addProductModalFunc={this._addProductModalFunc}*/}
            {/*AttachMenuId="create-post-attach-menu-box"*/}
            {/*translate={translate}*/}
            {/*/>*/}
          </div>


        </form>
    )
  }
}
