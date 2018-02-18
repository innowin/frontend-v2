import React, {Component} from "react";
import PropTypes from "prop-types";
import "moment/locale/fa";
import {defaultImg} from "src/images/icons";
import AttachFile from "src/views/common/inputs/AttachFile";
import {updateUser} from "../../../crud/user/user";

class CreatePostFooter extends Component {

  static propTypes = {
    getAttachMedia: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {postType:'post'}
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

  };

  render() {
    return (
      <div className="-createPostFooter">
        <div>
          <i class="fa fa-cart-arrow-down" aria-hidden="true"></i>
          <i class="fa fa-shopping-cart mr-3" aria-hidden="true"></i>
        </div>
        <div>
          <AttachFile
            ref={AttachFileInput => {
              this.AttachFileInput = AttachFileInput
            }}
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
  constructor(props) {
    super(props);
    this.state = {media: {}, fileName:''}
  }

  _getValues = () => {
    const {media} = this.state;
    const mediaId = media ? media.id : null;
    return {
      post_type: this.postTypeInput.getValue(),
      post_title: this.postTitleInput.getValue(),
      post_description: this.postDescriptionInput.getValue(),
      post_pinned: this.postPinnedInput.getValue(),
      post_picture: mediaId,
      // post_parent: this.props
    }
  };

  _formValidate = () => {
    let result = true;
    const validates = [
      this.createPostFooter.validate(),
      this.firstNameInput.validate(),
      this.lastNameInput.validate(),
      this.emailInput.validate()
    ];
    for (let i = 0; i < validates.length; i++) {
      if (validates[i]) {
        result = false;
        break;
      }
    }
    return result
  };

  _getAttachMedia = (media, fileName) => {
    this.setState({...this.state, media, fileName})
  };


  _save = () => {
    const userId = this.props.user.id;
    const formValues = this._getValues();
    return updateUser(formValues, userId)
  };

  _onSubmit = (e) => {
    e.preventDefault();
    if (this._formValidate()) {
      this._save()
    }
    return false;
  };

  render() {
    const {media, fileName} = this.state;
    const {profile_media_file} = this.props;
    return (
      <form className="-createPostHome" onSubmit={this._onSubmit} >
        {/*// TODO mohsen: handle src of img*/}
        <img className="-img-col rounded-circle" src={profile_media_file || defaultImg} alt="" />
        <div className="-content-col">
          <div className="d-flex flex-row mb-2">
            <textarea
              className="-createPostInput"
              name="post_description"
            />
            <div className="-img-content text-center">
              {(media.file) ? <img src={media.file} alt="imagePreview"/> : ('')}
              <span style={{color: "#BFBFBF"}}>{fileName}</span>
            </div>
          </div>
          <CreatePostFooter
            getAttachMedia={this._getAttachMedia}
            ref={createPostFooter => {
              this.createPostFooter = createPostFooter
            }}
          />
        </div>
      </form>
    )
  }
}

export default HomeCreatePost;