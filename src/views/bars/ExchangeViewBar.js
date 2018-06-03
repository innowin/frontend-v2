/*global __*/
import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {defaultImg} from "../../images/icons";
import {VerifyWrapper} from "../common/cards/Frames";
import {BadgesCard, TagsBox} from "./SideBar";
import {getExchange} from "../../crud/exchange/exchange";
import {ExchangeIcon} from "src/images/icons"
import {getExchangePostsByPostType, getExchangePostsHasProduct} from "../../crud/post/exchangePost";

class ExchangeViewBar extends Component {
  static propTypes = {
    exchangeId: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      exchange: {},
      demandCount: 0,
      supplyCount: 0,
      productCount: 0,
      badgesImgUrl: [],
      tags: [],
      isLoading: true,
      error: null
    }
  }

  _MockData = () => {
    const tags = [{title: "چادر مشکی"}, {title: "پوشاک مردانه"}];
    const badges = ["http://restful.daneshboom.ir/media/14ba7946fe394deca765cad2fc02c848.jpeg"];
    this.setState({...this.state, tags: tags, badgesImgUrl: badges})
  };

  _getExchange = (exchangeId) => {
    const handleResult = (res) => {
      this.setState({...this.state, exchange: res})
      // TODO mohsen: socket.emit of badges
      // TODO mohsen: socket.emit of tags
    };
    getExchange(exchangeId, handleResult)
  };

  _getCounts = (exchangeId) => {
    const handleCountProduct = (res) => this.setState({...this.state, productCount: res.length, isLoading: false});
    const handleCountSupply = (res) => this.setState({...this.state, supplyCount: res.length},
      () => getExchangePostsHasProduct(exchangeId, handleCountProduct));
    const handleCountDemand = (res) => this.setState({...this.state, demandCount: res.length},
      () => getExchangePostsByPostType(exchangeId, 'supply', handleCountSupply));
    getExchangePostsByPostType(exchangeId, 'demand', handleCountDemand)
  };

  componentDidMount() {
    const {exchangeId} = this.props;
    this._getExchange(exchangeId);
    this._getCounts(exchangeId);
  }


  render() {
    const {exchange, badgesImgUrl, demandCount, supplyCount, productCount, tags, isLoading, error} = this.state;
    return (
      <VerifyWrapper isLoading={isLoading} error={error}>
        <div className="-sidebar-child-wrapper col">
          <div className="align-items-center flex-column">
            <i className="fa fa-ellipsis-v menuBottom"/>
            {/*//TODO mohsen: set dafault image for exchange */}
            <img className="rounded-circle exchangeViewBarImg" alt="" src={exchange.link || defaultImg}/>
            <div className="exchangeName">
              <ExchangeIcon/>
              <div>
                <span className="fontSize-13px">{__('Exchange')}: </span>
                <span>{exchange.name}</span>
              </div>
            </div>
            <span className="-grey1 fontSize-13px">{exchange.description}</span>
          </div>
          <div className="numbersSection flex-column pl-3">
            <div className="">
              <span>اعضا:</span>
              <span>{exchange.members_count}</span>
            </div>
            <div className="">
              <span>عرضه:</span>
              <span>{supplyCount}</span>
            </div>
            <div className="">
              <span>تقاضا:</span>
              <span>{demandCount}</span>
            </div>
            <div className="">
              <span>محصول عرضه شده:</span>
              <span>{productCount}</span>
            </div>
          </div>
          {
            (badgesImgUrl.length > 0) ? (
              <div className="flex-wrap pb-3">
                <BadgesCard badgesImgUrl={badgesImgUrl}/>
              </div>
            ) : ("")
          }
          {
            (tags.length > 0) ? (
              <div className="flex-wrap pb-3">
                <TagsBox tags={tags}/>
              </div>) : ("")
          }
          <div className="row mr-0 ml-0 pb-3 exchangeViewSidebarBottom flex-wrap justify-content-around">
            <div className="pb-2">
              <button
                type="button"
                className="btn btn-outline-secondary btn-block sidebarBottom">ارسال پیام به کارگزار
              </button>
            </div>
            <div className="pb-2">
              <button
                type="button"
                className="btn btn-outline-secondary btn-block sidebarBottom">درخواست عضویت
              </button>
            </div>
          </div>
        </div>
      </VerifyWrapper>
    )
  }
}

export default ExchangeViewBar;