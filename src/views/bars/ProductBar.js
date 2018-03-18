/*global __*/
import React, {Component} from "react";
import PropTypes from "prop-types";
import {defaultImg, ChartIcon, BookmarkIcon} from "../../images/icons";
import {VerifyWrapper} from "../common/cards/Frames";
import {BadgesCard, TagsBox} from "./SideBar";
import {getProduct} from "src/crud/product/product";
import {getIdentity} from "src/crud/identity";
import {getPictureProduct} from "../../crud/picture/productPicture";

class MediaSection extends Component {
  static propTypes = {
    pictureProductFiles: PropTypes.array.isRequired,
    productName: PropTypes.string.isRequired,
    toggleModal: PropTypes.func.isRequired,
  };

  _handleToggleModal = (e) => {
    e.preventDefault();
    this.props.toggleModal(this.props.pictureProductFiles, e.target.tabIndex);
  };

  render() {
    const {pictureProductFiles, productName} = this.props;
    return (
      <div className="flex-column">
        <div className="d-flex justify-content-between mb-4">
          <span>{productName}</span>
          <BookmarkIcon className="-rBarBookmark"/>
        </div>
        {
          (pictureProductFiles[0]) ? (
            <img className="w-100 -rBarMainPicture cursor-pointer" alt="Product icon" src={pictureProductFiles[0]}
                 onClick={this._handleToggleModal} tabIndex={0}/>
          ) : (
            <img className="w-100 -rBarMainPicture" alt="Product icon" src={defaultImg}/>
          )
        }
        <div className="-rBarProductImage d-flex flex-row mt-3">
          {pictureProductFiles.map((file, i) => {
            if (0 < i && i < 4) {
              return (
                <div className="cursor-pointer" key={file} style={{backgroundImage: `url(${file})`}}
                     onClick={this._handleToggleModal} tabIndex={i}/>
              )
            }
            return null
          })
          }
          {(4 < pictureProductFiles.length) ? (
            <div className="-myCenter cursor-pointer" onClick={this._handleToggleModal}>
              <span className="-fontSize10">تصاویر بیشتر</span>
            </div>) : ('')
          }
        </div>
      </div>
    )
  }
}

class OwnerSection extends Component {
  static propTypes = {
    userProfile: PropTypes.object.isRequired,
    ownerName: PropTypes.string.isRequired,
  };

  render() {
    const {userProfile, ownerName} = this.props;
    return (
      <div className="align-items-center flex-row pt-3 pb-3">
        {/*TODO mohsen : handle profile_media.url*/}
        <img className="rounded-circle" alt="Product icon" src={userProfile.profile_media || defaultImg}
             style={{width: "40px"}}/>
        <span className="mr-4 -grey2">{ownerName}</span>
      </div>
    )
  }
}

class BottomSection extends Component {
  static propTypes = {
    price: PropTypes.number
  };

  render() {
    return (
      <div className="row">
        <div className="col-12 d-flex justify-content-between pt-2 pb-2">
          <div>{"قیمت: " + (this.props.price || "تماس")}</div>
          <span className="ml-2"><ChartIcon className="-rBarChart"/></span>
        </div>
        <div className="col-12 d-flex justify-content-between pt-2">
          <div className="-w-45 pb-2">
            <button
              type="button"
              style={{fontFamily: 'IRANSans', borderColor: '#606060', color: '#606060', fontSize: "12px"}}
              className="btn btn-outline-secondary btn-block p-0 pt-2 pb-2">تماس با ارايه دهنده
            </button>
          </div>
          <div className="-w-45 pb-2">
            <button
              type="button"
              style={{fontFamily: 'IRANSans', borderColor: '#606060', color: '#606060', fontSize: "12px"}}
              className="btn btn-outline-secondary btn-block p-0 pt-2 pb-2">درخواست کارگزاری محصول
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default class ProductSideView extends Component {

  static propTypes = {
    productId: PropTypes.number.isRequired,
    toggleModal: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      product: {},
      ownerName: "",
      pictureProductFiles: [],
      userProfile: {},
      badges: [],
      tags: [],
      isLoading: false,
      error: null
    }
  }

  _isLoadingTrue = () => {
    this.setState({...this.state, isLoading: true});
  };

  _getProductIdentity = (product) => {
    this._isLoadingTrue();
    const handleResult = (res) => {
      this.setState({...this.state, ownerName: res.name, isLoading: false});
    };
    getIdentity(product.product_owner, handleResult)
  };

  _getProductPictures = (product) => {
    // TODO mohsen: get files from socket
    const mackData = [
      "http://restful.daneshboom.ir/media/ad33940ff4b84557af10c7ef8c98755b.jpeg",
      "http://restful.daneshboom.ir/media/0e6a0bf247654b66aa3ffb0afe8eeb34.jpeg",
      "http://restful.daneshboom.ir/media/d415fefe2f5442aab21c7783807819fe.jpeg",
      "http://restful.daneshboom.ir/media/332d993f2ebe4eb597c3e6232ad43f12.jpeg",
      "http://restful.daneshboom.ir/media/b0dc23ba075b4c5c961e271fbeb2027a.jpeg",
      "http://restful.daneshboom.ir/media/149c1bc03d784654a7c48396fe29f222.jpeg",
      "http://restful.daneshboom.ir/media/f3f52d1c67984dfe8d88db43ccad28ed.jpeg",
      "http://restful.daneshboom.ir/media/4ba35210b9a7471995a044faf48fa57a.jpeg",
      "http://restful.daneshboom.ir/media/285531dc47514033af8ffe6ddad5de4e.jpeg"
    ];
    // const handleResult = (res) => {
    this.setState({
      ...this.state,
      // pictureProductFiles: [res.file, ...this.state.pictureProductFiles],
      pictureProductFiles: mackData,
      isLoading: false
    });
    // };
    //TODO mohsen: fix range of view image in sidBar product
    // getPictureProduct(product.id, handleResult)
  };

  _getProductBadges = (product) => {
    //TODO mohsen: handle getProductBadges
    const handleResult = (res) => {
      this.setState({...this.state, product: res, isLoading: false});
    };

  };

  _getProductTags = (product) => {
    //TODO mohsen: handle getProductTags
    const handleResult = (res) => {
      this.setState({...this.state, product: res, isLoading: false});
    };
  };

  componentDidMount() {
    this._isLoadingTrue();
    const handleResult = (res) => {
      this.setState({...this.state, product: res, isLoading: false});
      this._getProductIdentity(res);
      this._getProductPictures(res);
      this._getProductBadges(res);
      this._getProductTags(res);
    };
    getProduct(this.props.productId, handleResult);
    // TODO mohsen: socket.emit of badges
    // TODO mohsen: socket.emit of tags
    // TODO mohsen: socket.on of badges
    // TODO mohsen: socket.on of tags
  }

  componentWillUnmount() {
    // TODO mohsen: socket.off
  }

  render() {
    const {product, ownerName, userProfile, badges, tags, isLoading, error} = this.state;
    const pictureProductFiles = [...new Set(this.state.pictureProductFiles)];
    return (
      <VerifyWrapper isLoading={isLoading} error={error} className="-sidebar-child-wrapper">
        <MediaSection
          pictureProductFiles={pictureProductFiles}
          userProfile={userProfile}
          productName={product.name}
          toggleModal={this.props.toggleModal}
        />
        <OwnerSection ownerName={ownerName} userProfile={userProfile}/>
        {
          (badges.length > 0) ? (
            <div className="flex-wrap pb-3">
              <BadgesCard badges={badges}/>
            </div>) : ("")
        }
        <BottomSection price={product.price}/>
        {
          (tags.length > 0) ? (
            <div className="flex-wrap pb-3">
              <TagsBox tags={tags}/>
            </div>
          ) : ("")
        }
      </VerifyWrapper>
    )
  }
}