import React, {Component} from "react"
import PropTypes from "prop-types"

import AttachFile from "src/views/common/inputs/AttachFile"
import AttachFileIcon from "src/images/common/attachFileNew_svg"
import ContributionIcon from "src/images/common/contribution_svg"
import Image from "src/images/common/image_upload_svg"
import Link from "src/images/common/link_svg"
import Movie from "src/images/common/movie_svg"



class AttachMenu extends Component {
  static defaultProps = {
    attachMenu: false,
  }
  static propTypes = {
    attachMenu: PropTypes.bool,
    handlePictures: PropTypes.func.isRequired,
    handleFile: PropTypes.func.isRequired,
    handleMedia: PropTypes.func.isRequired,
    linkModalFunc: PropTypes.func.isRequired,
    translate: PropTypes.object.isRequired
  }

  AttachPictureButton = () => (
    <div>
      <Image className='post-component-footer-logos'/>
      عکس
    </div>
  )

  AttachFileButton = () => (
    <div>
      <AttachFileIcon className='post-component-footer-logos'/>
      فایل
    </div>
  )

  AttachMediaButton = () => (
    <div>
      <Movie className='post-component-footer-logos-little'/>
      ویدئو
    </div>
  )

  _handleBase64Picture = ({fileString, fileExtension, fileName}) => {
    const allowablePictureFormat = ['jpg', 'jpeg', 'png']
    const {translate, handlePictures} = this.props
    if (allowablePictureFormat.includes(fileExtension)) handlePictures(fileString, '')
    else handlePictures('', translate["This format is not allowed"])
  }

  _handleBase64Media = ({fileString, fileExtension, fileName}) => {
    const allowableMediaFormat = ['mp4', 'mp3']
    const {translate, handleMedia} = this.props
    if (allowableMediaFormat.includes(fileExtension)) handleMedia(fileString, '')
    else handleMedia('', translate["This format is not allowed"])
  }

  _handleBase64File = ({fileString, fileExtension, fileName}) => {
    const allowableFileFormat = ['pdf', 'xlsx']
    const {translate, handleFile} = this.props
    if (allowableFileFormat.includes(fileExtension)) handleFile(fileString, '')
    else handleFile('', translate["This format is not allowed"])
  }


  render() {
    const {attachMenu, linkModalFunc} = this.props
    return (
      <div
        ref={e => this.attachMenuRef = e}
        className={attachMenu ? "post-component-footer-attach-menu-container" : "post-component-footer-attach-menu-container-hide"}>
        <div className='post-component-footer-attach-menu'>
          <AttachFile
            AttachButton={this.AttachFileButton}
            inputId='AttachFileInput'
            // isLoadingProp={postFileLoading}
            className='explore-menu-items'
            handleBase64={this._handleBase64File}
          />
          <AttachFile
            AttachButton={this.AttachPictureButton}
            inputId='AttachPicturesInput'
            // isLoadingProp={postPictureLoading}
            className='explore-menu-items'
            handleBase64={this._handleBase64Picture}
          />
          <AttachFile
            AttachButton={this.AttachMediaButton}
            inputId='AttachMediaInput'
            // isLoadingProp={postMediaLoading}
            className='explore-menu-items'
            handleBase64={this._handleBase64Media}
          />
          <div className='explore-menu-items'>
            <ContributionIcon className='post-component-footer-logos-little'/>
            محصول
          </div>
          <div className='explore-menu-items' onClick={linkModalFunc}>
            <Link className='post-component-footer-logos-little'/>
            لینک
          </div>
        </div>
      </div>
    )
  }
}

export default AttachMenu