/*global __*/
import React, {Component} from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import {FileName} from "src/views/common/FileName";
import {createFile, getFile} from "src/crud/media/media";

export class FileInput extends Component {

  static defaultProps = {
    customValidate: () => false,
    required: false,
    multiple: false
  };

  static propTypes = {
    required: PropTypes.bool,
    label: PropTypes.string.isRequired,
    customValidate: PropTypes.func,
    multiple: PropTypes.bool,
    // TODO mohsen: fileType: PropTypes.arrayOf(PropTypes.string.isRequired),
    // TODO mohsen: fileSize
    // for get or create media
    mediaId: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.state = {fileName: "", error: false, isLoading: false, media: null};
  };

  _getFile = () => {
    const mediaId = this.props.mediaId;
    if (mediaId) {
      const mediaResult = (res) => {
        this.setState({...this.state, media: res})
      };
      return getFile(mediaId, mediaResult)
    }
  };

  _createFile = (fileString, fileName) => {
    const mediaResult = (res) => {
      this.setState({...this.state, isLoading: false, fileName:fileName, media: res})
    };
    createFile(fileString, mediaResult);
  };

  componentDidMount() {
    this._getFile();
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
        this._createFile(reader.result, fileName);
      };
      reader.readAsDataURL(file);
    }
  };

  _onChangeClick = () => {
    this.setState({...this.state, fileName: '', media: null, isLoading: false});
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

  validate = () => {
    const error = this._validateFile(this.file);
    this.setState({error});
    return error;
  };

  getFile = () => {
    const {media} = this.state;
    return media;
  };

  render() {
    const {fileName, error, isLoading, media} = this.state;
    const {label, multiple} = this.props;

    let imagePreview = '';
    let selectText = __('Select');
    if (media) {
      imagePreview = (
        <img className="media-preview mt-1" src={media.file} alt="imagePreview"/>
      );
      selectText = __('Change')
    }

    if (isLoading) {
      return (
        <div className="col-12">
          <span>{__('Uploading...')}</span>
          <button onClick={this._onChangeClick} className="btn btn-info mr-3">سعی مجدد</button>
        </div>
      )
    }

    return (
      <div className={cx("col-12 form-group", {'has-danger': error})}>
        <label className="w-100">{label}</label>
        <label className="custom-file w-100">
          {/*// TODO mohsen: handle cancel event for remove selected file*/}
          <input
            type="file"
            className="custom-file-input w-100"
            onChange={this._handleChange}
            onClick={this._onChangeClick}
            title={__('Choose file')}
            multiple={multiple}
          />
          <span className="danesh-boom-custom-file-control">
              <span className="after">
                {fileName && <FileName fileName={fileName} className={"dir-ltr"}/>}{!fileName && __('Choose file')}</span>
              <span className="before">{selectText}</span>
          </span>
        </label>
        {imagePreview}
        {error &&
        <div className="form-control-feedback">{error}</div>}
      </div>
    )
  }
}

