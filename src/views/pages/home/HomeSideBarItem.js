import React from 'react'
import Material from '../../common/components/Material'
import {ChannelIcon, MainLbarArrow} from '../../../images/icons'
import {Link} from 'react-router-dom'

const SideBarItem = (props) => {

  function _onClickHandler() {
    const {handleClick, exchange} = props
    handleClick(exchange.id)
  }

  if (props.exchange) {
    const {active} = props
    const {exchange_image, name, id: exchangeId} = props.exchange
    return (
        <div className={`item-wrapper ${active ? 'active' : ''}`} onClick={_onClickHandler}>
          <Material content={
            <div className="header-exchange">
              <a className="default-logo">
                {
                  exchange_image ?
                      <img className="img-logo" src={exchange_image.file} alt="logo"/>
                      :
                      <ChannelIcon className='default-channel-icon'/>
                }
              </a>
              <div className={`exchange-name ${active && 'active'}`}>{name}
                <Link to={active ? '/exchange/' + exchangeId : '/'}>
                  <div className={`exchange-sub-name-link ${active && 'active'}`}>پروفایل پنجره</div>
                </Link>
              </div>
              <div className={active ? 'left-arrow-home-exchange-container' : 'left-arrow-home-exchange-container-hide'}>
                <MainLbarArrow className="home-exchange-left-arrow"/>
              </div>
            </div>
          }/>
        </div>
    )
  }
  else return null
}

export default SideBarItem