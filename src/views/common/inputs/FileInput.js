/*global __*/
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import {FileName} from 'src/views/common/FileName'

export class FileInput extends Component {
    static defaultProps = {
        customValidate: () => false,
        onChange: () => false,
        required: false
    };

    static propTypes = {
        customValidate: PropTypes.func,
        onChange: PropTypes.func,
        url: PropTypes.string,
        thumbnailUrl: PropTypes.string,
        label: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        required: PropTypes.bool
    };

    constructor(props) {
        super(props);
        this.state = {fileName: "", error: false};
        this.file = null;
    };

    handleChange = (event) => {
        this.file = event.target.files[0];
        event.target.value = null;
        let fileName = "";
        if (this.file) {
            fileName = this.file.name;
        }
        const error = this.validateFile(this.file);
        this.setState({fileName, error});
        if (!error) {
            this.props.onChange(this.file);
        }
    };

    handleClick = (event) => {
        // if need
    };

    getFile = () => {
        return this.file;
    };


    validateFile = (file) => {
        if (this.props.required) {
            if (file === null) {
                return __('Required field');
            }
        }
        return this.props.customValidate(file);
    };

    validate = () => {
        const error = this.validateFile(this.file);
        this.setState({error});
        return error;
    };

    render() {
        const filename = this.state.fileName;
        return (
            <div className={cx("col-12 form-group", {'has-danger': this.state.error})}>
                <label className="w-100">{this.props.label}</label>
                <label className="custom-file w-100">
                    <input
                        type="file"
                        name={this.props.name}
                        className="custom-file-input w-100"
                        ref="FileInput"
                        onChange={this.handleChange}
                        onClick={this.handleClick}
                    />
                    <span className="danesh-boom-custom-file-control">
                    <span className="after">{filename &&
                    <FileName fileName={filename}/>}{!filename && __('Choose file')}</span>
                    <span className="before">{__('Select')}</span>
                </span>
                </label>
                {this.state.error &&
                <div className="form-control-feedback">{this.state.error}</div>}
            </div>
        )
    }
}

