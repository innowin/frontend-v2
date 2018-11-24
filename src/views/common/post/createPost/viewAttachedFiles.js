import React from "react"
import PropTypes from "prop-types"

const RemoveFile = (props) => {
  const {onClickFunc} = props
  return <span onClick={onClickFunc} className='remove-file pulse'>x</span>
}
RemoveFile.PropTypes = {
  onClickFunc: PropTypes.func.isRequired,
}

const ViewAttachedFiles = (props) => {
  const {postPictures, postMedia, postFile, deletePicture, deleteMedia, deleteFile} = props
  const postPicturesIds_ = postPictures.slice(0, 3) // just three pictures allowable
  const postPicturesLength = postPicturesIds_.length
  let picturesClass = 'onePicture'
  if (postPicturesLength === 2) picturesClass = 'twoPictures'
  if (postPicturesLength === 3) picturesClass = 'threePictures'
  return (
    <div className="post-attached-Media">
      {
        postPicturesIds_.length > 0 ?
          <div className={"pictures-section " + picturesClass}>
            {
              postPicturesIds_.map((fileString, i) => (
                  <div key={i + "pictures-section"}>
                    <RemoveFile onClickFunc={() => deletePicture(i)}/>
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
            <RemoveFile onClickFunc={deleteMedia}/>
            <video width="100%" height="200px" controls poster="">
              <source src={postMedia} type="video/mp4"/>
            </video>
          </div>
        ) : ''
      }
      {
        (postFile) ? (
          <div className="file-section">
            <RemoveFile onClickFunc={deleteFile}/>
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