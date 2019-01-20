import React from "react"
import PropTypes from "prop-types"

const RemoveFile = (props) => {
  const {onClickFunc} = props
  return <span onClick={onClickFunc} className='remove-file pulse'>x</span>
}
RemoveFile.propTypes = {
  onClickFunc: PropTypes.func.isRequired,
}

const ViewAttachedFiles = (props) => {
  const {postImg1, postImg2, postImg3, postMedia, deletePicture, deleteMedia, focused} = props
  const postPictures = [postImg1, postImg2, postImg3].filter(img => img) //filter imges that not null & not undefined
  const postPicturesLength = postPictures.length
  let picturesClass = "onePicture"
  if (postPicturesLength === 2) picturesClass = "twoPictures"
  if (postPicturesLength === 3) picturesClass = "threePictures"
  return (
    <div className="post-attached-Media">
      {
        postPictures.length > 0 ?
          <div className={"pictures-section " + picturesClass} style={focused ?
            {marginTop: "-6px", border: "1px solid #bbbbbb"} :
            {marginTop: "-7px", border: "1px solid #e7e7e7"}}>
            {
              [postImg1, postImg2, postImg3].map((fileString, i) => (
                  fileString ? (
                    <div key={i + "pictures-section"}>
                      <RemoveFile onClickFunc={() => deletePicture(i)}/>
                      <img src={fileString} alt="imagePreview"/>
                    </div>
                  ) : ''
                )
              )
            }
          </div> : ""
      }
      {
        (postMedia) ? (
          <div className="media-section">
            <RemoveFile onClickFunc={deleteMedia}/>
            <video width="100%" height="200px" controls poster="">
              <source src={postMedia} type="video/mp4"/>
            </video>
          </div>
        ) : ""
      }

    </div>
  )
}

ViewAttachedFiles.propTypes = {
  postImg1: PropTypes.string,
  postImg2: PropTypes.string,
  postImg3: PropTypes.string,
  errorAttachPicture: PropTypes.string,
  postMedia: PropTypes.string,
  errorAttachMedia: PropTypes.string,
  deletePicture: PropTypes.func.isRequired,
  deleteMedia: PropTypes.func.isRequired,
}

ViewAttachedFiles.defaultProps = {
  errorAttachPicture: "",
  postMedia: "",
  errorAttachMedia: "",
}

export default ViewAttachedFiles