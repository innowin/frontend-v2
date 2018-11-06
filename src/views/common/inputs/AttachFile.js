/*global __*/
import React, {Component} from "react"
import PropTypes from "prop-types"

export default class AttachFile extends Component {
  static defaultProps = {
    className : '',
    customValidate: () => false,
    required: false,
    isLoadingProp: false,
    LoadingFile: () => <span>{__('Uploading...')}</span>
  }

  static propTypes = {
    required: PropTypes.bool,
    className: PropTypes.string,
    customValidate: PropTypes.func,
    inputId: PropTypes.string.isRequired,
    LoadingFile : PropTypes.func,
    AttachButton: PropTypes.func.isRequired,
    isLoadingProp: PropTypes.bool,
    handleBase64: PropTypes.func.isRequired
    // TODO mohsen: fileType: PropTypes.arrayOf(PropTypes.string.isRequired),
    // TODO mohsen: fileSize
  }

  constructor(props) {
    super(props)
    this.state = {error: false, isLoadingState: false}
  }

  _handleChange = (event) => {
    event.preventDefault()
    const {handleBase64}= this.props
    const file = event.target.files[0]
    const error = this._validateFile(file)
    this.setState({...this.state, error})
    if (file && !error) {
      // TODO mohsen: check maximum file-size with attention to fileType
      let reader = new FileReader()
      reader.onloadstart = () => {
        this.setState({isLoadingState: true})
      }
      reader.onloadend = () => {
        handleBase64(reader.result)
        this.setState({...this.state, isLoadingState: false})
      }
      reader.readAsDataURL(file)
    }
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

  render() {
    const {error, isLoadingState} = this.state
    const {isLoadingProp} = this.props
    const isLoading = isLoadingProp || isLoadingState
    const {AttachButton, LoadingFile, inputId, className} = this.props
    if (isLoading) {
      return <LoadingFile/>
    }
    return (
        <label className={"attachLabel " + className} htmlFor={inputId}>
          <AttachButton/>
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
        </label>
    )
  }
}