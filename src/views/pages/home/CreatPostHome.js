import React, {Component} from "react"
import "moment/locale/fa";
import {defaultImg} from "src/images/icons";


class CreatePostFooter extends Component {

    render() {
        return (
            <div className="-createPostFooter">
                <div>
                    <i class="fa fa-cart-arrow-down" aria-hidden="true"></i>
                    <i class="fa fa-shopping-cart mr-3" aria-hidden="true"></i>
                </div>
                <div>
                     <i class="fa fa-paperclip" aria-hidden="true"></i>
                     <i class="fa fa-smile-o mr-3" aria-hidden="true"></i>
                     <span className="mr-4">
                         <span style={{color:"#BFBFBF"}}>ارسال</span>
                         <i class="fa fa-paper-plane mr-2" style={{color:"#929292"}} aria-hidden="true"></i>
                     </span>
                </div>
            </div>
        )
    }
}

class HomeCreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {profile_media_File} = this.props;
        return (
            <div className="-createPostHome">
                <div className="-img-col">
                    {/*// TODO mohsen: handle src of img*/}
                    <img className="-item-imgPost rounded-circle" src={profile_media_File || defaultImg} alt=""/>
                </div>
                <div className="-content-col">
                    <textarea
                        className="border-0 h-75 -outlineWhite"
                    />
                    <CreatePostFooter />
                </div>
            </div>
        )
    }
}

export default HomeCreatePost;