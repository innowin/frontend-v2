import React, {Component} from "react"
import PropTypes from "prop-types"

export default class AttachFile extends Component {
	static defaultProps = {
		acceptFilter: [],
		className: '',
		customValidate: () => false,
		required: false,
		isLoadingProp: false,
		allowableFormat: [],
	}

	static propTypes = {
		inputId: PropTypes.string.isRequired,
		acceptFilter: PropTypes.array,
		AttachButton: PropTypes.func.isRequired,
		handleBase64: PropTypes.func.isRequired,
		handleError: PropTypes.func.isRequired,
		translate: PropTypes.object.isRequired,
		fileId: PropTypes.string.isRequired,
		allowableFormat: PropTypes.arrayOf(PropTypes.string),
		isLoadingProp: PropTypes.bool,
		LoadingFile: PropTypes.func,
		required: PropTypes.bool,
		className: PropTypes.string,
		customValidate: PropTypes.func,
		// TODO mohsen: get as props Maximum allowed fileSize- dont attach files that greater than max size
	}

	constructor (props) {
		super(props)
		this.state = {isLoadingState: false}
	}

	_getExtension = (fileName) => {
		const parts = fileName.split('.')
		const ext = parts.pop()
		return ext.toLowerCase()
	}

	_validateFile = (file) => {
		const {required, customValidate, allowableFormat, translate: tr} = this.props
		const fileName = file ? file.name : ''
		const fileExtension = this._getExtension(fileName)
		if (required) {
			if (!file) {
				return tr['Required field']
			}
		}
		if (file && allowableFormat.length > 0 && !allowableFormat.includes(fileExtension)) {
			return tr['This format is not allowed']
		}
		return customValidate(file)
	}

	_validate = () => {
		return this._validateFile(this.file)
	}

	_generateAcceptList = list => {
		let generalTypes = ["video", "image", "application", "audio", "text"]
		return list.reduce((res, i) => {
			if (generalTypes.indexOf(i) > -1) {
				res += `${i}/*, `
			} else {
				res += `.${i}, `
			}
			return res
		}, '')
	}

	_handleChange = (event) => {
		event.preventDefault()
		event.stopPropagation()
		const {handleBase64, handleError, fileId} = this.props
		const file = this.fileupload.files[0]
		let error = this._validateFile(file)
		const fileToRedux = {fileId, formFile: file}
		if (error) return handleError(error)
		if (file && !error) {
      let reader = new FileReader()
      reader.onloadstart = () => {
        this.setState({...this.state, isLoadingState: true})
      }
      reader.onloadend = () => {
        handleBase64(reader.result, fileToRedux)
        this.setState({...this.state, isLoadingState: false})
      }
      reader.readAsDataURL(file)
			this.fileupload.value = null
		}
	}

	render () {
		const {isLoadingState} = this.state
		const {isLoadingProp, translate: tr, acceptFilter} = this.props
		const isLoading = isLoadingProp || isLoadingState
		const {AttachButton, LoadingFile, inputId, className} = this.props
		if (isLoading) {
			if (LoadingFile)
				return <LoadingFile/>
			else return <span>{tr['Uploading...']}</span>
		}
		return (
				<label className={"attachLabel " + className} htmlFor={inputId}>
					<AttachButton/>
					<input
							accept={this._generateAcceptList(acceptFilter)}
							type="file"
							className="custom-file-input w-100"
							onChange={this._handleChange}
							ref={e => this.fileupload = e}
							id={inputId}
							hidden
					/>
				</label>
		)
	}
}