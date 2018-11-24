import React from "react"
import PropTypes from "prop-types"

import AttachFile from "src/views/common/inputs/AttachFile"
import AttachFileIcon from "src/images/common/attachFileNew_svg"
import ContributionIcon from "src/images/common/contribution_svg"
import Image from "src/images/common/image_upload_svg"
import Link from "src/images/common/link_svg"
import Movie from "src/images/common/movie_svg"
import constants from "src/consts/constants"


const AttachMenu = (props) => {
  const AttachPictureButton = () => (
    <div>
      <Image className='post-component-footer-logos'/>
      عکس
    </div>
  )
  const AttachFileButton = () => (
    <div>
      <AttachFileIcon className='post-component-footer-logos'/>
      فایل
    </div>
  )
  const AttachMediaButton = () => (
    <div>
      <Movie className='post-component-footer-logos-little'/>
      ویدئو
    </div>
  )
  const {AttachMenuId, linkModalFunc, handlePictures, handleMedia, handleFile,
    postPicturesLength, postMediaExist, postFileExist, postLinkExist, translate} = props
  const attachMenu = props.attachMenu || false
  const picturesAttachedDisabled = (postPicturesLength > 2 || postMediaExist || postFileExist || postLinkExist)
    ? 'disabled-label' : ''
  const FileAttachedDisabled = (postPicturesLength > 0 || postMediaExist || postFileExist || postLinkExist)
    ? 'disabled-label' : ''
  const MediaAttachedDisabled = (postPicturesLength > 0 || postMediaExist || postFileExist || postLinkExist)
    ? 'disabled-label' : ''
  const LinkAttachedDisabled = (postPicturesLength > 0 || postMediaExist || postFileExist || postLinkExist)
    ? 'disabled-label' : ''
  return (
    <div
      className={attachMenu ? "post-component-footer-attach-menu-container" : "post-component-footer-attach-menu-container-hide"}
      id={AttachMenuId}
    >
      <div className='post-component-footer-attach-menu'>
        <AttachFile
          AttachButton={AttachFileButton}
          inputId='AttachFileInput'
          // isLoadingProp={postFileLoading}
          className={'explore-menu-items ' + FileAttachedDisabled}
          handleBase64={handleFile}
          handleError={(error) => alert(error)}
          allowableFormat={constants.FILE_TYPE.FILE}
          translate={translate}
        />
        <AttachFile
          AttachButton={AttachPictureButton}
          inputId='AttachPicturesInput'
          // isLoadingProp={postPictureLoading}
          className={'explore-menu-items ' + picturesAttachedDisabled}
          handleBase64={handlePictures}
          handleError={(error) => alert(error)}
          allowableFormat={constants.FILE_TYPE.PHOTO}
          translate={translate}
        />
        <AttachFile
          AttachButton={AttachMediaButton}
          inputId='AttachMediaInput'
          // isLoadingProp={postMediaLoading}
          className={'explore-menu-items '+ MediaAttachedDisabled}
          handleBase64={handleMedia}
          handleError={(error) => alert(error)}
          allowableFormat={constants.FILE_TYPE.VIDEO}
          translate={translate}
        />
        <div className='explore-menu-items'>
          <ContributionIcon className='post-component-footer-logos-little'/>
          محصول
        </div>
        <div className={'explore-menu-items '+ LinkAttachedDisabled} onClick={linkModalFunc}>
          <Link className='post-component-footer-logos-little'/>
          لینک
        </div>
      </div>
    </div>
  )
}

AttachMenu.propTypes = {
  attachMenu: PropTypes.bool,
  AttachMenuId: PropTypes.string.isRequired,
  handlePictures: PropTypes.func.isRequired,
  handleFile: PropTypes.func.isRequired,
  handleMedia: PropTypes.func.isRequired,
  postPicturesLength:PropTypes.number,
  postMediaExist:PropTypes.bool,
  postFileExist:PropTypes.bool,
  postLinkExist: PropTypes.bool,
  linkModalFunc: PropTypes.func.isRequired,
  translate: PropTypes.object.isRequired
}

export default AttachMenu