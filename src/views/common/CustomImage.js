/*global __*/
import React, {Component} from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { getFile} from "src/crud/media/media";

export class CustomImage extends Component {

  static defaultProps = {
    customValidate: () => false,
    required: false,
    multiple: false,
    className: ''
    };

  static propTypes = {
    required: PropTypes.bool,
    label: PropTypes.string.isRequired,
    customValidate: PropTypes.func,
    multiple: PropTypes.bool,
    // TODO mohsen: fileType: PropTypes.arrayOf(PropTypes.string.isRequired), get as props allowed fileType
    // TODO mohsen: fileSize : get as props Maximum allowed fileSize- dont attach files that greater than max size
    // for get or create media
    mediaId: PropTypes.object,
    className: PropTypes.string
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
      return getFile (mediaId, mediaResult)
    }
  };

  componentDidMount() {
    this._getFile();
  }


  _onChangeClick = () => {
    this.setState({...this.state, fileName: '', media: null, isLoading: false});
  };


  getFile = () => {
    const {media} = this.state;
    return media;
  };

  render() {
    // const {fileName, error, isLoading, media} = this.state;
    // const {label, multiple,className} = this.props;
    const {error, isLoading, media} = this.state;
    const {className} = this.props;

    let imagePreview = '';
    // let selectText = __('Select');
    if (media) {
      imagePreview = (
        <img className={className} src={media.file} alt="imagePreview"/>
      );
      // selectText = __('Change')
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
        {imagePreview}
        {error &&
        <div className="form-control-feedback">{error}</div>}
      </div>
    )
  }
}

