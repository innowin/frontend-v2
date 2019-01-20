// @flow
import * as React from "react"
import PropTypes from "prop-types"
// import {Modal, Button, ModalBody, ModalFooter} from "reactstrap"

// const ProductViewImageGallery = (props) => {
//     const {files, selectedFileIndex} = props
//     const startIndex = ((selectedFileIndex === -1) && 0) || selectedFileIndex
//     const images = files.map(file => {
//       return ({
//           original: file,
//           thumbnail: file,
//           originalClass: "-productViewOriginalClass",
//           thumbnailClass: "-productViewThumbnailClass"
//       })
//     })
//     const settings = {showPlayButton: false, showBullets: true, startIndex: startIndex}
//     return (
//         <div dir="ltr" className="-productViewModal">
//             <ImageGallery items={images} {...settings}/>
//         </div>
//     )
// }

type PictureModalProps = {
    isOpen: boolean,
    files: [],
    selectedFileIndex: ?number,
    toggleModal: Function,
    className: ?string
}

type PictureModalState = {
  modal: boolean
}

/*<Modal isOpen={this.state.modal} className={className}>*/
/*<ModalBody className="-grey3">*/
/*<ProductViewImageGallery files={files} selectedFileIndex={selectedFileIndex}/>*/
/*</ModalBody>*/
/*<ModalFooter className="-grey3 pt-0">*/
/*<Button className="-grey4" onClick={this._handleToggleModal}>بستن</Button>*/
/*</ModalFooter>*/
/*</Modal>*/

export class PictureModal extends React.Component<PictureModalProps, PictureModalState> {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    files: PropTypes.array.isRequired,
    selectedFileIndex: PropTypes.number,
    toggleModal: PropTypes.func.isRequired,
    className: PropTypes.string
  }

  static displayName = "PictureModal"

  constructor() {
    super()
    this.state = {modal: false}
  }

  componentWillReceiveProps(PrevProps: PictureModalProps) {
    this.setState({...this.state, modal: PrevProps.isOpen})
  }

  _handleToggleModal = (e: SyntheticEvent<>) => {
    e.preventDefault()
    this.props.toggleModal()
  }

  render() {
    // const {className, files, selectedFileIndex} = this.props
    return (
      ''
    )
  }
}