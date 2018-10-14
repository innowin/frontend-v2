/*global __*/
import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import FileActions from "src/redux/actions/commonActions/fileActions"
import types from "src/redux/actions/types"

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
    getMedia: PropTypes.func.isRequired,
    AttachBottom: PropTypes.func.isRequired,
    fileIdKey: PropTypes.string,
    nextActionType: PropTypes.string,
    nextActionData: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {error: false, isLoading: false, fileName: '', media: {}};
  };

  _createFile = (fileString, fileName) => {
    const {actions, fileIdKey, nextActionType, nextActionData} = this.props
    const {createFile} = actions
    // const mediaResult = (res) => {
    //   this.props.getMedia(res, fileName)
    //   this.setState({...this.state, isLoading: false, fileName, media: res})
    // }
    createFile({file_string: fileString, nextActionData, nextActionType, fileIdKey})
  }

  componentDidUpdate(prevProps){
    // if(prevProps.)
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
    this.setState({...this.state, isLoading: false, fileName: '', media: {}});
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
    const {AttachBottom} = this.props;
    if (isLoading) {
      return (
        <span>{__('Uploading...')}</span>
      )
    }
    return (
      <span>
        <label htmlFor="file">
          {/*// TODO mohsen: improve place of attach icon*/}
          <AttachBottom/>
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

const mapStateToProps = (state, ownProps) => {
  const {} = ownProps
  return {
    files: state.common.file.list,
    organization:state.organs.list[]
  }
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    createFile: FileActions.createFile,
    getFile: FileActions.getFile,
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(AttachFile)