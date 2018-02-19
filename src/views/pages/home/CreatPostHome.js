import React, {Component} from "react";
import PropTypes from "prop-types";
import "moment/locale/fa";
import {defaultImg} from "src/images/icons";
import AttachFile from "src/views/common/inputs/AttachFile";
import {createPost} from "../../../crud/user/post";
import cx from 'classnames';

class CreatePostFooter extends Component {

  static propTypes = {
    getMedia: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {postType: 'post'}
  }

  _AttachFile = () => {
    return {
      media: this.AttachFileInput._getFile(),
      fileName: this.AttachFileInput._getFileName(),
      validate: this.AttachFileInput._validate(),
    }
  };

  _post_type = () => {
    return this.state.postType
  };

  _handle_post_type = (e) => {
    e.preventDefault();
    this.setState({...this.state, postType: e.target.id});
  };

  render() {
    const {postType} = this.state;
    const supply = postType === 'supply';
    const demand = postType === 'demand';console.log(supply, demand)
    return (
      <div className="-createPostFooter">
        <div>
          <i className={cx("fa fa-cart-arrow-down", {"-selectedPostType": supply})} aria-hidden="true" id='supply'
             onClick={this._handle_post_type}></i>
          <i className={cx("fa fa-shopping-cart mr-3", {"-selectedPostType": demand})} aria-hidden="true" id='demand'
             onClick={this._handle_post_type}></i>
        </div>
        <div>
          <AttachFile
            ref={AttachFileInput => {
              this.AttachFileInput = AttachFileInput
            }}
            getMedia={this.props.getMedia}
          />
          <i class="fa fa-smile-o mr-3" aria-hidden="true"></i>
          <span className="mr-4">
             <span style={{color: "#BFBFBF"}}>ارسال</span>
             <label for="submit" className="-submitAttach">
               <i class="fa fa-paper-plane mr-2" aria-hidden="true"></i>
             </label>
            <input id="submit" hidden type="submit"/>
          </span>
        </div>
      </div>
    )
  }
}

class HomeCreatePost extends Component {
  static propTypes = {
    postParent: PropTypes.number.isRequired,
    updatePosts: PropTypes.func.isRequired,
    handleErrorLoading: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {media: {}, fileName: '', description: '', descriptionValidate: true}
  }

  _getValues = () => {
    const {media} = this.createPostFooter._AttachFile();
    const mediaId = media ? media.id : null;
    return {
      post_picture: mediaId,
      post_description: this.state.description,
      post_title: 'title',
      post_type: this.createPostFooter._post_type(),
      post_parent: this.props.postParent
    }
  };

  _formValidate = () => {
    let result = true;
    const validates = [
      this.createPostFooter._AttachFile().validate,
      this.state.descriptionValidate
    ];
    for (let i = 0; i < validates.length; i++) {
      if (validates[i]) {
        result = false;
        break;
      }
    }
    return result
  };

  _getMedia = (media, fileName) => {
    this.setState({...this.state, media, fileName})
  };

  _hideCreateForm = () => {
    this.setState({...this.state, media: {}, fileName: '', description: ''})
  };

  _save = () => {
    const formValues = this._getValues();
    return createPost(formValues, this.props.updatePosts, this.props.handleErrorLoading, this._hideCreateForm)
  };

  _handleChange = (e) => {
    const val = e.target.value;
    let validate = false;
    if (val.length > 300) {
      validate = "very long text"
    }
    this.setState({...this.state, description: val, descriptionValidate: validate});
  };

  _onSubmit = (e) => {
    e.preventDefault();
    if (this._formValidate()) {
      this._save()
    }
    return false;
  };

  render() {
    const {media, fileName, description} = this.state;
    const {profile_media_file} = this.props;
    return (
      <form className="-createPostHome" onSubmit={this._onSubmit}>
        {/*// TODO mohsen: handle src of img*/}
        <img className="-img-col rounded-circle" src={profile_media_file || defaultImg} alt=""/>
        <div className="-content-col">
          <div className="d-flex flex-row mb-2">
            <textarea className="-createPostInput" onChange={this._handleChange}>{description}</textarea>
            <div className="-img-content text-center">
              {(media.file) ? <img src={media.file} alt="imagePreview"/> : ('')}
              <span style={{color: "#BFBFBF"}}>{fileName}</span>
            </div>
          </div>
          <CreatePostFooter getMedia={this._getMedia} ref={createPostFooter => {
            this.createPostFooter = createPostFooter
          }}
          />
        </div>
      </form>
    )
  }
}

export default HomeCreatePost;