import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ItemWrapper} from "../../common/cards/Frames";
import {certificateIcon, starIcon,editIcon} from "src/images/icons";
import {getFile} from "../../../crud/media/media";
//TODO amir share icon image
export const CertificateItemWrapper = ({children}) => {
	return <ItemWrapper icon={certificateIcon}>{children}</ItemWrapper>;
};

export class CertificateView extends Component {
	static propTypes = {
		showEdit: PropTypes.func.isRequired,
		certificate: PropTypes.object.isRequired,
	};

  constructor(props) {
    super(props);
    this.state = {mediaFile: null};
  };

  _getFile = (mediaId) => {
    if (mediaId) {
      const mediaResult = (res) => {
        this.setState({...this.state, mediaFile: res.file})
      };
      return getFile(mediaId, mediaResult)
    }
  };

  componentDidMount() {
    this._getFile(this.props.certificate.picture_media);
  }

	render() {

		const {certificate, showEdit} = this.props;
		const {mediaFile} = this.state;
		return (
			<div className="col-6 text-center certificate-col">
				<div className="row">
					<div className="col certificate">
						<div className="content">
							<div className="editButton">
								<div onClick={showEdit}>{editIcon}</div>
							</div>
							<img className="certImage" alt="" src={mediaFile || "/static/media/defaultImg.94a29bce.png"} />
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