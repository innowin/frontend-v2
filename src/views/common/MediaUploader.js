/*global __*/
import React, {Component, PropTypes} from "react";
import Relay from "react-relay";
import {FileInput} from "./inputs/FileInput";
import {relayContainer} from "src/utils/relayHelpers";
import {mediaFragment} from "src/queries/medias";
import {organizationFragment} from "src/queries/organization/organization";
import {viewerFragment} from "src/queries/common";
import {createMediaMutation} from "src/mutations/profile/medias";

const fullViewerFragment = Relay.QL`
    fragment on ViewerNode{
        ${viewerFragment}
    }
`;

@relayContainer({
    fragments: {
        media: () => mediaFragment,
        viewer: () => fullViewerFragment,
        organization: () => organizationFragment,
    }
})
export class MediaUploader extends Component {

    static defaultProps = {
        autoUpload: true,
    };

    static propTypes = {
        customValidate: PropTypes.func,
        label: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        required: PropTypes.bool,
        media: PropTypes.object,
        autoUpload: PropTypes.bool,
        organization: PropTypes.object,
    };

    constructor(props) {
        super(props);
        this.state = {media: this.props.media || null, ready: true};
        this.file = null;
        this.mediaPromise = null;
    };

    upload = () => {
        if (this.file) {
            const {viewer, organization} = this.props;
            let identity;
            if (organization) {
                identity = organization.identity;
            } else {
                identity = viewer.me.identity;
            }

            this.mediaPromise = createMediaMutation({identity, viewer, file: this.file})
                .then((res) => {
                    const {media} = res.createMedia;
                    return media;
                });
        }
        return this.mediaPromise;
    };

    handleChange = (file) => {
        this.file = file;
        if (this.file) {
            this.setState({ready: false}, () => {
                if (this.props.autoUpload) {
                    this.upload()
                        .then((media) => {
                            this.setState({media, ready: true});
                        });
                }
            });
        }
    };

    getMedia = async () => {
        if (this.state.ready) {
            return this.state.media;
        }
        return await this.mediaPromise;
    };

    isReady = () => {
        return this.state.ready;
    };

    onChangeClick = () => {
        this.setState({media: null});
    };

    render() {
        const {customValidate, label, name, required} = this.props;
        const props = {customValidate, label, name, required};
        if (!this.state.ready) {
            return (
                <div>{__('Uploading...')}</div>
            )
        }
        if (this.state.media) {
            return (
                <div>
                    <img className="media-preview" src={this.state.media.url} alt=""/>
                    <button type="button" className="btn btn-secondary" onClick={this.onChangeClick}>
                        {__('Change')}
                    </button>
                </div>
            )
        }
        return (
            <FileInput onChange={this.handleChange} {...props}/>
        )
    }
}
