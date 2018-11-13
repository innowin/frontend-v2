import React from "react"
import PropTypes from "prop-types"

const ViewAttachedFiles = (props) => {
  const {
    postPictures, errorAttachPicture, postMedia, errorAttachMedia, postFile, errorAttachFile,
    deletePicture, deleteMedia, deleteFile
  } = props
  return (
    <div className="post-attached-pictures">
      {
        postPictures.map((fileString, i) => {
            return (
              <div>
                <span onClick={() => deletePicture(i)} className='remove-post-picture pulse'>x</span>
                <img src={fileString} alt="imagePreview"/>
              </div>
            )
          }
        )
      }
      {
        errorAttachPicture ? <div className="form-control-feedback">{errorAttachPicture}</div> : ''
      }
      {
        (postMedia) ? (
          <div>
            <span onClick={deleteMedia} className='remove-post-picture pulse'>x</span>
            <video width="50px" height="50px" controls>
              <source src={postMedia} type="video/mp4"/>
            </video>
          </div>
        ) : (errorAttachMedia ? <div className="form-control-feedback">{errorAttachMedia}</div> : '')

      }
      {
        (postFile) ? (
          <div>
            <span onClick={deleteFile} className='remove-post-picture pulse'>x</span>
          </div>
        ) : (errorAttachFile ? <div className="form-control-feedback">{errorAttachFile}</div> : '')
      }
    </div>
  )
}

ViewAttachedFiles.PropTypes = {
  postPictures: PropTypes.array,
  errorAttachPicture: PropTypes.string,
  postMedia: PropTypes.string,
  errorAttachMedia: PropTypes.string,
  postFile: PropTypes.string,
  errorAttachFile: PropTypes.string,
  deletePicture: PropTypes.func.isRequired,
  deleteMedia: PropTypes.func.isRequired,
  deleteFile: PropTypes.func.isRequired
}

ViewAttachedFiles.defaultProps = {
  postPictures: [],
  errorAttachPicture: '',
  postMedia: '',
  errorAttachMedia: '',
  postFile: '',
  errorAttachFile: '',
}

export default ViewAttachedFiles