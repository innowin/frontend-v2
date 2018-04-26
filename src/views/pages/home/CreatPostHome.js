import React, {Component} from "react";
import PropTypes from "prop-types";
import "moment/locale/fa";
import {defaultImg} from "src/images/icons";
import AttachFile from "src/views/common/inputs/AttachFile";
import {createPost} from "src/crud/post";
import cx from 'classnames';
import {SupplyIcon, DemandIcon, PostSendIcon} from "src/images/icons";
import Transition from 'react-transition-group/Transition'
import {FileName} from "../../common/FileName";
import {AttachFileIcon} from "src/images/icons";

const duration = 300;
const defaultStyle = {
  transition: `all ${duration}ms ease-in-out`,
  height: 60,
};
const transitionStyles = {
  entering: {height: 60},
  entered: {height: 190}
};

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

  AttachBottom = () => <AttachFileIcon className="-h18"/>;

  _post_type = () => this.state.postType;

  _reset_postType = () => this.setState({...this.state, postType: 'post'});

  _handle_post_type = (e) => {
    e.preventDefault();
    this.setState({...this.state, postType: e.target.getAttribute("data-value")});
  };

  render() {
    const {postType} = this.state;
    const supplyMark = postType === 'supply';
    const demandMark = postType === 'demand';
    const postMark = postType === 'post';
    return (
      <div className="-createPostFooter">
        <div className="rightIcons">
          <i className={cx("fa fa-share-alt", {'-selectedPostType': postMark})} aria-hidden="true" data-value='post'
             onClick={this._handle_post_type}/>
          <SupplyIcon height="22px" className={cx("mr-3", {'-selectedPostType': supplyMark})}
                      onClickFunc={this._handle_post_type} dataValue='supply'/>
          {/*// TODO mohsen: improve place of demand icon*/}
          <DemandIcon height="22px" className={cx("-viewDemand-icon mr-2", {'-selectedPostType': demandMark})}
                      onClickFunc={this._handle_post_type} dataValue='demand'/>
        </div>
        <div className="leftIcons">
          <AttachFile
            ref={AttachFileInput => {
              this.AttachFileInput = AttachFileInput
            }}
            getMedia={this.props.getMedia}
            AttachBottom={this.AttachBottom}
          />
          <i className="fa fa-smile-o mr-3" aria-hidden="true"/>
          <span className="mr-4">
             <span style={{color: "#BFBFBF"}}>ارسال</span>
             <label htmlFor="submit">
               {/*// TODO mohsen: improve place of PostSend icon*/}
               <PostSendIcon className="-submitAttach -h18 mr-2"/>
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
    postIdentity: PropTypes.number.isRequired,
    updatePosts: PropTypes.func.isRequired,
    handleErrorLoading: PropTypes.func,
    className: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      media: {}, fileName: '', description: '', descriptionValidate: false, textareaClass: 'closeTextarea',
      show: false
    }
  }

  _getValues = () => {
    const {media} = this.createPostFooter._AttachFile();
    const mediaId = media ? media.id : null;
    const {postIdentity, postParent} = this.props;
    return {
      post_picture: mediaId,
      post_description: this.state.description,
      post_title: 'title',
      post_type: this.createPostFooter._post_type(),
      post_parent: postParent,
      post_identity: postIdentity
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

  AttachBottom = () => <i className="fa fa-pencil-square-o" aria-hidden="true"/>;

  _getMedia = (media, fileName) => {
    this.setState({...this.state, media, fileName})
  };

  _hideCreateForm = () => {
    this.setState({...this.state, media: {}, fileName: '', description: ''});
    this.createPostFooter._reset_postType()
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

  _handleFocus = () => {
    this.setState({...this.state, textareaClass: "openTextarea", show: true})
  };

  _onSubmit = (e) => {
    e.preventDefault();
    if (this._formValidate()) {
      this._save();
      this.setState({...this.state, textareaClass: "closeTextarea", show: false})
    }
    return false;
  };

  render() {
    const {media, fileName, description, textareaClass, show} = this.state;
    const {profile_media_file, className} = this.props;
    return (
      <form className={"-createPostHome " + className} onSubmit={this._onSubmit}>
        {/*// TODO mohsen: handle src of img*/}
        <img className="-img-col rounded-circle" src={profile_media_file || defaultImg} alt=""/>
        <Transition in={show} timeout={duration}>
          {(state) => (
            <div className={"-content-col " + textareaClass} style={{...defaultStyle, ...transitionStyles[state]}}>
              <div className="d-flex flex-row mb-2 -texBox">
                <textarea onFocus={this._handleFocus} onChange={this._handleChange} value={description}/>
                <div className="-img-content">
                  {(media.file) ? (
                    <div className="-fileBox">
                      <AttachFile getMedia={this._getMedia} AttachBottom={this.AttachBottom}/>
                      <img src={media.file} alt="imagePreview"/>
                    </div>

                  ) : ('')}
                  <div className="-fileNameBox"><FileName fileName={fileName} className={"d-inline-block"}/></div>
                </div>
              </div>
              <CreatePostFooter getMedia={this._getMedia} ref={createPostFooter => {
                this.createPostFooter = createPostFooter
              }}
              />
            </div>
          )}
        </Transition>
      </form>
    )
  }
}

export default HomeCreatePost;