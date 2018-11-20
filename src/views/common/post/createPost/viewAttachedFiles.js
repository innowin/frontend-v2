import React from "react"
import PropTypes from "prop-types"

const ViewAttachedFiles = (props) => {
  const {postPictures, postMedia, postFile, deletePicture, deleteMedia, deleteFile} = props
  return (
    <div className="post-attached-pictures">
      {
        postPictures.length > 0 ?
          <div className="pictures-section">
            {
              postPictures.map((fileString, i) => (
                  <div key={i + "pictures-section"}>
                    <span onClick={() => deletePicture(i)} className='remove-post-picture pulse'>x</span>
                    <img src={fileString} alt="imagePreview"/>
                  </div>
                )
              )
            }
          </div> : ''
      }
      {
        (postMedia) ? (
          <div className="media-section">
            <span onClick={deleteMedia} className='remove-post-picture pulse'>x</span>
            <video width="100%" height="200px" controls poster="">
              <source src={postMedia} type="video/mp4"/>
            </video>
          </div>
        ) : ''
      }
      {
        (postFile) ? (
          <div className="file-section">
            <span onClick={deleteFile} className='remove-post-picture pulse'>x</span>
          </div>
        ) : ''
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