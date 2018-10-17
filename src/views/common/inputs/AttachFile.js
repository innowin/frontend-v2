/*global __*/
import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import FileActions from "src/redux/actions/commonActions/fileActions"

class AttachFile extends Component {
  static defaultProps = {
    customValidate: () => false,
    required: false,
    LoadingFile: () => <span>{__('Uploading...')}</span>
  }

  static propTypes = {
    required: PropTypes.bool,
    customValidate: PropTypes.func,
    inputId: PropTypes.string.isRequired,
    LoadingFile : PropTypes.func,
    // TODO mohsen: fileType: PropTypes.arrayOf(PropTypes.string.isRequired),
    // TODO mohsen: fileSize
    getMedia: PropTypes.func,
    mediaId: PropTypes.number,
    AttachBottom: PropTypes.func.isRequired,
    createArguments: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {error: false, isLoading: false, fileName: '', media: {}}
  }

  _handleChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const error = this._validateFile(file);
    this.setState({...this.state, error});
    if (file && !error) {
      // TODO mohsen: check maximum file-size with attention to fileType
      let reader = new FileReader();
      reader.onloadstart = () => {
        this.setState({isLoading: true});
      };
      reader.onloadend = () => {
        const fileName = file.name;
        this._createFile(reader.result);
        this.setState({...this.state, fileName})
      };
      reader.readAsDataURL(file);
    }
  }

  _onChangeClick = () => {
    const {getMedia} = this.props
    this.setState({...this.state, isLoading: false, fileName: '', media: {}});
    getMedia && getMedia({}, '')
  }

  _validateFile = (file) => {
    const {required, customValidate} = this.props;
    if (required) {
      if (!file) {
        return __('Required field');
      }
    }
    return customValidate(file);
  }

  _validate = () => {
    const error = this._validateFile(this.file);
    this.setState({error});
    return error;
  }

  _getFile = () => {
    return this.state.media
  }

  _getFileName = () => {
    return this.state.fileName;
  }

  _createFile = (fileString) => {
    const {actions, createArguments} = this.props
    const {createFile} = actions
    const {nextActionData, nextActionType, fileIdKey} = createArguments
    createFile({file_string: fileString, nextActionData, nextActionType, fileIdKey})
  }

  componentDidUpdate(prevProps) {
    const {mediaId, getMedia} = this.props
    const {fileName} = this.state
    if (prevProps.mediaId !== mediaId) {
      getMedia && getMedia(mediaId, fileName)
      this.setState({...this.state, isLoading: false, fileName, media: mediaId})
    }
  }

  render() {
    const {error, isLoading} = this.state;
    const {AttachBottom, LoadingFile, inputId} = this.props;
    if (isLoading) {
      return <LoadingFile/>
    }
    return (
      <span>
        <label htmlFor={inputId}>
          <AttachBottom/>
        </label>
        <input
          type="file"
          className="custom-file-input w-100"
          onChange={this._handleChange}
          onClick={this._onChangeClick}
          id={inputId}
          hidden
        />
        {error &&
        <div className="form-control-feedback">{error}</div>}
      </span>
    )
  }
}


const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    createFile: FileActions.createFile,
  }, dispatch)
})
export default connect(null, mapDispatchToProps, null, { withRef: true })(AttachFile)