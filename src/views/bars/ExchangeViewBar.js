/*global __*/
import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {defaultImg} from "../../images/icons";
import {VerifyWrapper} from "../common/cards/Frames";
import {BadgesCard, TagsBox} from "./SideBar";
import {getExchange} from "../../crud/exchange/exchange";
import {getFile} from "../../crud/media/media";
import {ExchangeIcon} from "src/images/icons"

class ExchangeViewBar extends Component {
  static propTypes = {
    exchangeId: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {exchange: {}, exchangeImage: null, badgesImgUrl: [], tags: [], isLoading: true, error: null}
  }

  _getImageUrl = (res) => {
    this.setState({...this.state, exchangeImage: res.file})
  };

  _MockData = () => {
    const tags = [{title: "چادر مشکی"}, {title: "پوشاک مردانه"}];
    const badges = ["http://restful.daneshboom.ir/media/14ba7946fe394deca765cad2fc02c848.jpeg"];
    this.setState({...this.state, tags: tags, badgesImgUrl: badges, isLoading: false})
  };

  _getExchange = (exchangeId) => {
    const handleResult = (res) => {
      this.setState({...this.state, exchange: res}, () => {
        getFile(res.exchange_image, this._getImageUrl);
        this._MockData()
      });
      // TODO mohsen: socket.emit of badges
      // TODO mohsen: socket.emit of tags
    };
    getExchange(exchangeId, handleResult)
  };

  componentDidMount() {
    this._getExchange(this.props.exchangeId)
  }


  render() {
    const {exchange, exchangeImage, badgesImgUrl, tags, isLoading, error} = this.state;
    return (
      <VerifyWrapper isLoading={isLoading} error={error}>
        <div className="-sidebar-child-wrapper col">
          <div className="align-items-center flex-column">
            <i className="fa fa-ellipsis-v menuBottom"/>
            {/*//TODO mohsen: set dafault image for exchange */}
            <img className="rounded-circle" alt="Person icon" src={exchangeImage || defaultImg}
                 style={{width: "100px",height:"100px", border:"1px solid #C2C2C2"}}/>
            <div style={{padding: "20px 0"}} className="exchangeName">
              <ExchangeIcon/>
              <div>
                <span style={{fontSize:"13px"}}>{__('Exchange')}: </span>
                <span>{exchange.name}</span>
              </div>
            </div>
            <span className="-grey1" style={{fontSize:13}}>{exchange.description}</span>
          </div>
          <div className="numbersSection flex-column pl-3">
            <div className="">
              <span>اعضا:</span>
              <span>{exchange.members_count}</span>
            </div>
            <div className="">
              <span>عرضه:</span>
              <span>۲۰</span>
            </div>
            <div className="">
              <span>تقاضا:</span>
              <span>۱۲</span>
            </div>
            <div className="">
              <span>محصول عرضه شده:</span>
              <span>۱۰</span>
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
          <div className="row mr-0 ml-0 pb-3 myBottum flex-wrap justify-content-around">
            <div className="pb-2">
              <button
                type="button"
                style={{fontFamily: 'IRANSans', borderColor: '#606060', color: '#606060', fontSize: "12px"}}
                className="btn btn-outline-secondary btn-block">ارسال پیام به کارگزار
              </button>
            </div>
            <div className="pb-2">
              <button
                type="button"
                style={{fontFamily: 'IRANSans', borderColor: '#606060', color: '#606060', fontSize: "12px"}}
                className="btn btn-outline-secondary btn-block">درخواست عضویت
              </button>
            </div>
          </div>
        </div>
      </VerifyWrapper>
    )
  }
}

export default ExchangeViewBar;