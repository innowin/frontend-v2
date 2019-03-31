// @flow
import * as React from 'react'
import {UploadIcon} from 'src/images/icons'
import {bindActionCreators} from 'redux'
import FileActions from 'src/redux/actions/commonActions/fileActions'
import TempActions from 'src/redux/actions/tempActions'
import connect from 'react-redux/es/connect/connect'
import uuid from 'uuid'
import PropTypes from 'prop-types'
import constants from 'src/consts/constants'
import type {fileType} from '../../../consts/flowTypes/common/fileType'

type Props = {
  actions: {
    createFile: Function,
    removeFileFromTemp: Function,
    setFileProgressTemp: Function,
    deleteFile: Function,
  },
  fileType: string,
  fileCategory: string,
  tempFiles: Object,
  files: { [number]: fileType },
  fileParentId: ?number,
  fileId?: number,
}

type States = {
  fileUUID: string,
  fileString: string,
}

class UploadFile extends React.Component<Props, States> {

  static propTypes = {
    fileType: PropTypes.string.isRequired,
    fileCategory: PropTypes.string.isRequired,
    fileParentId: PropTypes.number.isRequired,
    fileId: PropTypes.number.isRequired,
  }

  state = {
    fileUUID: uuid(),
    fileString: '',
  }

  fileUploadRef: HTMLInputElement

  componentDidMount(): void {
    const {fileId, files} = this.props

    if (fileId) {
      this.setState({...this.state, fileString: files[fileId] && files[fileId].file})
    }
  }

  _handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const file = e.currentTarget.files[0]
    if (file) {
      let reader = new FileReader()
      reader.onloadend = () => {
        this._handleBase64(reader.result.toString(), file)
      }
      reader.readAsDataURL(file)
      this.fileUploadRef.value = ''
    }
  }

  _handleBase64 = (fileStringInput: string, file: File) => {
    this.setState({...this.state, fileString: fileStringInput})
    const {fileUUID} = this.state
    const {actions, fileType, fileCategory, fileParentId} = this.props
    const {createFile} = actions
    const fileToRedux = {fileUUID, formFile: file}
    const data = {
      file: fileToRedux,
      fileType,
      fileCategory,
      fileParent: fileParentId,
    }
    if (file) {
      createFile(data)
    }
  }

  _deleteFile = () => {
    const {fileUUID} = this.state
    const {actions, tempFiles} = this.props
    const {setFileProgressTemp, removeFileFromTemp, deleteFile} = actions
    const tempFile = tempFiles[fileUUID]

    if (tempFile && tempFile.progress !== 100) {
      tempFile.close && tempFile.close()
    }
    if (tempFile && tempFile.progress === 100 && tempFile.uploadedFileId) {
      deleteFile({fileUUID: tempFile.uploadedFileId})
    }

    setFileProgressTemp({fileUUID, progressDetail: {progress: 0, close: null}})
    removeFileFromTemp(fileUUID)
    this.setState({...this.state, fileString: ''})
  }

  render() {
    const {fileString, fileUUID} = this.state
    const {tempFiles, fileType, fileId, files} = this.props

    const beforeEditFile = fileId && files[fileId]
    const tempImage = tempFiles[fileUUID]
    const progress = tempImage && tempFiles[fileUUID].progress
    const percent = progress / 100
    const imageStyle = beforeEditFile && !tempImage
        ? (
            {filter: `blur(0px)`, opacity: 1}
        )
        : (progress
                ? {filter: `blur(${Math.ceil(5 * (1 - percent))}px)`, opacity: percent}
                : {filter: 'blur(5px)', opacity: 0}
        )

    return (
        fileString
            ? (fileType === constants.CREATE_FILE_TYPES.IMAGE
                ? <div className='upload-file-image-container'>
                  <img style={imageStyle} className='upload-file-image' src={fileString} alt='certificate'/>
                  <span onClick={this._deleteFile} className='remove-file pulse'>x</span>
                  {tempFiles[fileUUID] && tempFiles[fileUUID].progress !== 100 &&
                  <p className='progress-number'>
                    % {tempFiles[fileUUID].progress}
                  </p>
                  }
                </div>
                : 'file type view'
            ) :
            <div className="upload-file-container">
              <UploadIcon className='upload-resume'/>
              <input type="file" ref={e => this.fileUploadRef = e} onChange={this._handleChange}/>
            </div>
    )
  }
}

const mapStateToProps = state => {
  return ({
    tempFiles: state.temp.file,
    files: state.common.file.list,
  })
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    createFile: FileActions.createFile,
    deleteFile: FileActions.deleteFile,
    removeFileFromTemp: TempActions.removeFileFromTemp,
    setFileProgressTemp: TempActions.setFileProgressTemp,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(UploadFile)
