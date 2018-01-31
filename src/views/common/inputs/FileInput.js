/*global __*/
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import {FileName} from 'src/views/common/FileName'

export class FileInput extends Component {
    static defaultProps = {
        customValidate: () => false,
        onChange: () => false,
        required: false,
        autoUpload: true,
    };

    static propTypes = {
        url: PropTypes.string,
        label: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        required: PropTypes.bool,
        autoUpload: PropTypes.bool,
        customValidate: PropTypes.func,
        onChange: PropTypes.func,
        // thumbnailUrl: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {fileName: "", error: false, isLoading: false, fileDataUrl: null};
    };

    _handleChange = (event) => {
        event.preventDefault();
        const file = event.target.files[0];
        event.target.value = null;
        let fileName = "";
        if (file && this.props.autoUpload) {
            fileName = file.name;
            let reader = new FileReader();
            reader.onloadstart = () => {
                this.setState({isLoading: true});
            };
            reader.onloadend = () => {
                this.setState({fileDataUrl: reader.result, fileName: fileName, isLoading: false});
            };
            reader.readAsDataURL(file);
        }
        const error = this._validateFile(file);
        this.setState({error});
        if (!error) {
            this.props.onChange(file);
        }
    };

    _onChangeClick = () => {
        this.setState({fileName:'', fileDataUrl: null});
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
        const {fileDataUrl} = this.state;
        return fileDataUrl;
    };

    render() {
        const {fileName, error, isLoading, fileDataUrl} = this.state;
        const {name, label} = this.props;
        let imagePreview = null;
        let selectText = __('Select');
        if (fileDataUrl) {
            imagePreview = (
                <img className="media-preview mt-1" src={fileDataUrl} alt="imagePreview"/>
            );
            selectText = __('Change')
        }

        if (isLoading) {
            return (
                <div className="col-12">{__('Uploading...')}</div>
            )
        }

        return (
            <div className={cx("col-12 form-group", {'has-danger': error})}>
                <label className="w-100">{label}</label>
                <label className="custom-file w-100">
                    {/*// TODO mohsen: handle cancel event for remove selected file*/}
                    <input
                        type="file"
                        name={name}
                        className="custom-file-input w-100"
                        onChange={this._handleChange}
                        onClick={this._onChangeClick}
                        title={__('Choose file')}
                    />
                    <span className="danesh-boom-custom-file-control">
                        <span className="after">{fileName &&
                        <FileName fileName={fileName}/>}{!fileName && __('Choose file')}</span>
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

