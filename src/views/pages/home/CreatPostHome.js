import React, {Component} from "react";
import PropTypes from "prop-types";
import "moment/locale/fa";
import {DefaultUserIcon, EditIcon} from "src/images/icons";
import AttachFile from "src/views/common/inputs/AttachFile";
import cx from 'classnames';
import {SupplyIcon, DemandIcon, PostSendIcon} from "src/images/icons";
import Transition from 'react-transition-group/Transition'
import {AttachFileIcon} from "src/images/icons";
import {bindActionCreators} from "redux"
import PostActions from "../../../redux/actions/commonActions/postActions"
import FileActions from "src/redux/actions/commonActions/fileActions"
import {connect} from "react-redux";
import FontAwesome from 'react-fontawesome'
import {getMessages} from "../../../redux/selectors/translateSelector";

const duration = 300;
const defaultStyle = {
  transition: `all ${duration}ms ease-in-out`,
  height: 30,
};
const transitionStyles = {
  entering: {height: 30},
  entered: {height: 190}
};

class CreatePostFooter extends Component {

  static propTypes = {
    createFile: PropTypes.func.isRequired,
    fileInputId: PropTypes.string.isRequired,
    postFileLoading: PropTypes.bool
  }

  constructor(props) {
    super(props);
    this.state = {postType: 'post'}
  }

  _AttachFile = () => {
    return {
      validate: this.AttachFileInput._validate()
    }
  }

  AttachButton = () => <AttachFileIcon className="-h18"/>

  _post_type = () => this.state.postType

  _reset_postType = () => this.setState({...this.state, postType: 'post'})

  _handle_post_type = (e) => {
    e.preventDefault();
    this.setState({...this.state, postType: e.target.getAttribute("data-value")})
  }

  render() {
    const {postType} = this.state
    const {fileInputId, createFile, postFileLoading} = this.props
    const supplyMark = postType === 'supply'
    const demandMark = postType === 'demand'
    const postMark = postType === 'post'
    return (
      <div className="-createPostFooter">
        <div className="rightIcons">
          <i className={cx("fa fa-share-alt", {'-selectedPostType': postMark})} aria-hidden="true" data-value='post'
             onClick={this._handle_post_type}/>
          <SupplyIcon height="22px" className={cx("mr-3", {'-selectedPostType': supplyMark})}
                      onClickFunc={this._handle_post_type} dataValue='supply'/>
          {/*// TODO mohsen: improve place of demand icon*/}
          <DemandIcon height="24px" className={cx("mr-3", {'-selectedPostType': demandMark})}
                      onClickFunc={this._handle_post_type} dataValue='demand'/>
        </div>
        <div className="leftBottomIcons">
          <AttachFile
            ref={AttachFileInput => {
              this.AttachFileInput = AttachFileInput
            }}
            AttachButton={this.AttachButton}
            createFileAction={createFile}
            inputId={fileInputId}
            isLoadingProp={postFileLoading}
          />
          <i className="fa fa-smile-o mr-3" aria-hidden="true"/>
          <span className="mr-4">
             <span className="submitColor">ارسال</span>
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
  static defaultProps = {
    className: '',
    postsCountInThisPage: 0
  }

  static propTypes = {
    translate: PropTypes.object.isRequired,
    postIdentityId: PropTypes.number.isRequired,
    postOwnerId: PropTypes.number.isRequired,
    postOwnerType: PropTypes.string.isRequired,
    postOwnerImgId: PropTypes.number,
    postOwnerImgLink: PropTypes.string,
    postParentId: PropTypes.number.isRequired,
    postParentType: PropTypes.string,
    postsCountInThisPage: PropTypes.number,
    handleErrorLoading: PropTypes.func,
    createFile: PropTypes.func.isRequired,
    className: PropTypes.string,
    actions: PropTypes.object,
    temporaryFile: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      description: '',
      descriptionValidate: false,
      textareaClass: 'closeTextarea',
      show: false,
      resetByTrashIcon: false
    }
  }

  _getValues = () => {
    const {postIdentityId, postParentId, postOwnerImgId, temporaryFile} = this.props
    // TODO mohsen: post_title is static but should be from post create
    const postPictureId = (temporaryFile.content && temporaryFile.content.id) || null
    return {
      post_picture: postPictureId,
      post_description: this.state.description,
      post_title: 'title',
      post_type: this.createPostFooter._post_type(),
      post_parent: postParentId,
      post_identity: postIdentityId,
      post_related_identity_image: postOwnerImgId
    }
  }

  _formValidate = () => {
    let result = true;
    const validates = [
      this.createPostFooter._AttachFile().validate,
      this.state.descriptionValidate
    ];
    for (let i = 0; i < validates.length; i++) {
      if (validates[i]) {
        result = false;
        break
      }
    }
    return result
  }

  _save = () => {
    const {actions, postOwnerId, postOwnerType, postParentId, postParentType} = this.props
    const {createPost} = actions
    const formValues = this._getValues()
    return createPost({formValues, postOwnerId, postOwnerType, postParentId, postParentType})
  }

  _handleChange = (e) => {
    const val = e.target.value;
    let validate = false;
    if (val.length > 300) {
      validate = "very long text"
    }
    this.setState({...this.state, description: val, descriptionValidate: validate})
  }

  _handleFocus = () => {
    this.setState({...this.state, textareaClass: "openTextarea", show: true})
  }

  _handleClickOutForm = (e) => {
    const {description, resetByTrashIcon} = this.state
    const {temporaryFile} = this.props
    const postFileLoading = temporaryFile.isLoading
    if (
      !e.target.closest('#HomeCreatePost') &&
      !temporaryFile.content &&
      !resetByTrashIcon &&
      !postFileLoading &&
      !description.trim()
    ) {
      this.setState({...this.state, textareaClass: "closeTextarea", show: false})
    }
    this.setState({...this.state, resetByTrashIcon: false})
  }

  _onSubmit = (e) => {
    e.preventDefault();
    if (this._formValidate()) {
      this._save()
    }
    return false;
  }

  _deletePicture = () => {
    const {actions} = this.props
    const {resetTemporaryFile} = actions
    this.setState({...this.state, resetByTrashIcon: true})
    resetTemporaryFile()
  }

  componentDidUpdate(prevProps) {
    const {postsCountInThisPage, actions} = this.props
    const {resetTemporaryFile} = actions
    if (prevProps.postsCountInThisPage < postsCountInThisPage) {
      this.setState({...this.state, textareaClass: "closeTextarea", show: false, description: ''},
        () => {
        this.createPostFooter._reset_postType()
        resetTemporaryFile()
      })
    }
  }

  componentDidMount() {
    document.addEventListener('click', this._handleClickOutForm)
    const {actions} = this.props
    const {resetTemporaryFile} = actions
    resetTemporaryFile()
  }

  componentWillUnmount() {
    document.removeEventListener('click', this._handleClickOutForm)
  }

  render() {
    const {description, textareaClass, show} = this.state
    const {postOwnerImgLink, className, translate, temporaryFile, actions} = this.props
    const {createFile} = actions
    const postFile = temporaryFile.content
    const postFileLoading = temporaryFile.isLoading
    const fileInputId = 'AttachFileInput'
    // TODO handle description error that say: "Ensure description value has at least 5 characters."
    return (
      <form className={"-createPostHome " + className} id="HomeCreatePost" onSubmit={this._onSubmit}>
        {/*// TODO mohsen: handle src of img*/}
        {
          (!postOwnerImgLink) ? (<DefaultUserIcon className="-img-col"/>) : (
            <img className="-img-col rounded-circle covered-img" src={postOwnerImgLink} alt=""/>)
        }
        <Transition in={show} timeout={duration}>
          {(state) => (
            <div
              className={"-content-col " + textareaClass}
              style={{...defaultStyle, ...transitionStyles[state]}}
            >
              <div className="d-flex flex-row -textBox">
                <textarea className='post-text-field' placeholder={translate['Be in zist boom']} onFocus={this._handleFocus} onChange={this._handleChange} value={description}/>
                <div className="-img-content">
                  {
                    (postFile) ? (
                    <div className="-fileBox">
                      <label htmlFor={fileInputId}>
                        <EditIcon className="edit-post-picture pulse"/>
                        <FontAwesome name="trash" className='remove-post-picture pulse'
                                     onClick={this._deletePicture}/>
                      </label>
                      <img className="contain-img" src={postFile.file} alt="imagePreview"/>
                    </div>
                  ) : ('')
                  }
                </div>
              </div>
              <CreatePostFooter
                ref={createPostFooter => {
                  this.createPostFooter = createPostFooter
                }}
                createFile={createFile}
                fileInputId={fileInputId}
                postFileLoading={postFileLoading}
              />
            </div>
          )}
        </Transition>
      </form>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const postOwnerImgId = ownProps.postOwnerImgId
  const postOwnerImgLink = (postOwnerImgId
    && state.common.file.list[postOwnerImgId]
    && state.common.file.list[postOwnerImgId].file) || null
  const temporaryFile = state.common.file.temporaryFile
  return {
    postOwnerImgLink,
    translate: getMessages(state),
    temporaryFile,
  }
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    createPost: PostActions.createPost,
    createFile: FileActions.createFile,
    resetTemporaryFile: FileActions.resetTemporaryFile,
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(HomeCreatePost)