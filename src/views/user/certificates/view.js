// @flow
import * as React from "react"
import {Component} from "react"
import PropTypes from "prop-types"
import {CertificateIcon, starIcon, EditIcon} from "src/images/icons"
import {getFile} from "src/crud/media/media"
import {ItemWrapper} from "../../common/cards/Frames"
import type {certificateType} from "src/consts/flowTypes/user/others"

type PropsCertificateItemWrapper = {
  children?: React.Node
}
export const CertificateItemWrapper = (props: PropsCertificateItemWrapper) => {
  return <ItemWrapper icon={<CertificateIcon/>}>{props.children}</ItemWrapper>
}


type PropsCertificateView = {
  showEdit: Function,
  certificate: certificateType
}

type StateCertificateView = {
  mediaFile: ?string
}

export class CertificateView extends Component<PropsCertificateView, StateCertificateView> {
  static propTypes = {
    showEdit: PropTypes.func.isRequired,
    certificate: PropTypes.object.isRequired,
  }

  constructor(props: PropsCertificateView) {
    super(props)
    this.state = {mediaFile: null}
  }

  _getFile = (mediaId: number) => {
    if (mediaId) {
      const mediaResult = (res) => {
        this.setState({...this.state, mediaFile: res.file})
      }
      getFile(mediaId, mediaResult)
    }
  }

  componentDidMount() {
    this._getFile(this.props.certificate.picture_media)
  }

  render() {
    const {certificate, showEdit} = this.props
    const {mediaFile} = this.state
    return (
      <div className="col-6 text-center certificate-col">
        <div className="row">
          <div className="col certificate">
            <div className="content">
              <div className="editButton">
                <div onClick={showEdit}><EditIcon/></div>
              </div>
              <img className="certImage" alt="" src={mediaFile || "/static/media/defaultImg.94a29bce.png"}/>
              <h5>{certificate.title}</h5>
              <a className="shareButton">{starIcon}</a>
              <span>&nbsp;</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}