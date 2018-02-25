/*global __*/
import React, {Component} from "react";
import PropTypes from "prop-types";
import {createFile} from "../../../crud/media/media";
import {attachFileIcon} from "src/images/icons";

class AttachFile extends Component {
  static defaultProps = {
    customValidate: () => false,
    required: false,
  };

  static propTypes = {
    required: PropTypes.bool,
    customValidate: PropTypes.func,
    // TODO mohsen: fileType: PropTypes.arrayOf(PropTypes.string.isRequired),
    // TODO mohsen: fileSize
    getMedia: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {error: false, isLoading: false, fileName:'', media: {}};
  };

  _createFile = (fileString, fileName) => {
    const mediaResult = (res) => {
      this.setState({...this.state, isLoading: false, fileName, media:res});
      this.props.getMedia(res, fileName)
    };
    createFile(fileString, mediaResult);
  };

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
        this._createFile(reader.result, fileName);
      };
      reader.readAsDataURL(file);
    }
  };

  _onChangeClick = () => {
    this.setState({...this.state, isLoading: false, fileName:'', media:{}});
    this.props.getMedia({}, '')
  };

  _validateFile = (file) => {
    const {required, customValidate} = this.props;
    if (required) {
      if (!file) {
        return __('Required field');
      }
    }
    return customValidate(file);
  };

  _validate = () => {
    const error = this._validateFile(this.file);
    this.setState({error});
    return error;
  };

  _getFile = () => {
    return this.state.media;
  };

  _getFileName = () => {
    return this.state.fileName;
  };

  render() {
    const {error, isLoading} = this.state;
    if (isLoading) {
      return (
          <span>{__('Uploading...')}</span>
      )
    }
    return (
      <span>
        <label for="file">
          {/*// TODO mohsen: improve place of attach icon*/}
          {attachFileIcon("-h18")}
        </label>
        <input
          type="file"
          className="custom-file-input w-100"
          onChange={this._handleChange}
          onClick={this._onChangeClick}
          id="file"
          hidden
        />
        {error &&
        <div className="form-control-feedback">{error}</div>}
      </span>
    )
  }
}

export default AttachFile;