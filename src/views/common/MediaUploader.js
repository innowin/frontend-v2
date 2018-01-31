import React, {Component} from 'react'
import PropTypes from 'prop-types'

export class MediaUploader extends Component {

    static propTypes = {
        media: PropTypes.object,
        identity: PropTypes.number,
        uploader: PropTypes.number,
        info: PropTypes.string,
        fileString: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {media: this.props.media || null, ready: true};
        this.file = null;
        this.mediaPromise = null;
    };
    //
    // upload = () => {
    //         return this.mediaPromise = createMedia({identity, viewer, file: this.file})
    //             .then((res) => {
    //                 const {media} = res.createMedia;
    //                 return media;
    //             });
    // };
    //
    // handleChange = (file) => {
    //     this.file = file;
    //     if (this.file) {
    //         this.setState({ready: false}, () => {
    //             if (this.props.autoUpload) {
    //                 this.upload()
    //                     .then((media) => {
    //                         this.setState({media, ready: true});
    //                     });
    //             }
    //         });
    //     }
    // };

    getMedia = async () => {
        if (this.state.ready) {
            return this.state.media;
        }
        return await this.mediaPromise;
    };

    render() {
        const {children} = this.props;
        return (
            <div>
                {children}
            </div>
        )
    }
}
