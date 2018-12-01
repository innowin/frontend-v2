import React from 'react'
import ExchangeExploreIcon from "../../../images/common/exchange_explore_svg"
import {Link} from "react-router-dom"
import ExchangeIcon from "../../../images/common/exchange_svg"
import Contacts from "../../../images/common/contacts_svg"
import ContributionIcon from "../../../images/common/contribution_svg"
import Material from "../../common/components/Material"

const ExploreMenu = (props) => {
  const {exploreCollapse} = props
  return (
      <div>
        <Material backgroundColor='#eee' className={exploreCollapse ? "-topBarIcons-cont-open" : "-topBarIcons-cont"} content={
          <ExchangeExploreIcon className={'-topBarIcons'}/>
        }/>
        <div className={exploreCollapse ? "explore-menu-container" : "explore-menu-container-hide"}>
          <div className='explore-menu-arrow'>
            ▲
          </div>
          <div className='explore-menu'>

            <Link to={'/exchange/Exchange_Explorer'}>
              <Material className='explore-menu-items' content={
                <div>
                  <ExchangeIcon className='explore-logos'/>بورس ها
                </div>
              }/>
            </Link>

            <Link to={'/users/Users_Explorer'}>
              <Material className='explore-menu-items' content={
                <div>
                  <Contacts svgClass='explore-logos member-logo' containerClass='explore-logos-container'/> شناسه ها (افراد و مجموعه ها)
                </div>
              }/>
            </Link>

            <Link to={'#'}>
              <Material className='explore-menu-items' content={
                <div>
                  <ContributionIcon className='explore-logos'/> آورده ها (محصولات، توانمدی و ...)
                </div>
              }/>
            </Link>
          </div>
        </div>
      </div>
  )
}

export default ExploreMenu