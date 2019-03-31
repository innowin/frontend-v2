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
  fileParentId: ?number,
}

type States = {
  fileId: string,
  fileString: string,
}

class UploadFile extends React.Component<Props, States> {

  static propTypes = {
    fileType: PropTypes.string.isRequired,
    fileCategory: PropTypes.string.isRequired,
    fileParentId: PropTypes.number.isRequired,
  }

  state = {
    fileId: uuid(),
    fileString: '',
  }

  fileUploadRef: HTMLInputElement

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

  _handleBase64 = (fileString: string, file: File) => {
    this.setState({...this.state, fileString: fileString})
    const {fileId} = this.state
    const {actions, fileType, fileCategory, fileParentId} = this.props
    const {createFile} = actions
    const fileToRedux = {fileId, formFile: file}
    const data = {
      file: fileToRedux,
      fileType,
      fileCategory,
      fileParent: fileParentId,
    }
    createFile(data)
  }

  _deleteFile = () => {
    const {fileId} = this.state
    const {actions, tempFiles} = this.props
    const {setFileProgressTemp, removeFileFromTemp, deleteFile} = actions
    const tempFile = tempFiles[fileId]

    if (tempFile && tempFile.progress !== 100) {
      tempFile.close && tempFile.close()
    }
    if (tempFile && tempFile.progress === 100 && tempFile.uploadedFileId) {
      deleteFile({fileId: tempFile.uploadedFileId})
    }

    setFileProgressTemp({fileId, progressDetail: {progress: 0, close: null}})
    removeFileFromTemp(fileId)
    this.setState({...this.state, fileString: ''})
  }

  render() {
    const {fileString, fileId} = this.state
    const {tempFiles, fileType} = this.props

    const tempImage = tempFiles[fileId]
    const progress = tempImage && tempFiles[fileId].progress
    const percent = progress / 100
    const imageStyle = progress
        ? {filter: `blur(${Math.ceil(5 * (1 - percent))}px)`, opacity: percent}
        : {filter: 'blur(5px)', opacity: 0}

    return (
        fileString
            ? (fileType === constants.CREATE_FILE_TYPES.IMAGE
                ? <div className='upload-file-image-container'>
                  <img style={imageStyle} className='upload-file-image' src={fileString} alt='certificate'/>
                  <span onClick={this._deleteFile} className='remove-file pulse'>x</span>
                  {tempFiles[fileId] && tempFiles[fileId].progress !== 100 &&
                  <p className='progress-number'>
                    % {tempFiles[fileId].progress}
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
