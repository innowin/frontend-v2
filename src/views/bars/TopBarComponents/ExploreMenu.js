import React from 'react'
import ExchangeExploreIcon from "../../../images/common/exchange_explore_svg"
import {Link} from "react-router-dom"
import ExchangeIcon from "../../../images/common/exchange_svg"
import Contacts from "../../../images/common/contacts_svg"
import ContributionIcon from "../../../images/common/contribution_svg"

const ExploreMenu = (props) => {
  const {exploreCollapse} = props
  return (
      <div>
        <ExchangeExploreIcon className="-topBarIcons"/>
        <div className={exploreCollapse ? "explore-menu-container" : "explore-menu-container-hide"}>
          <div className='explore-menu-arrow'>
            ▲
            {/*<MainLbarArrow className='explore-menu-arrow-2'/>*/}
          </div>
          <div className='explore-menu'>
            <Link to={'/exchange/Exchange_Explorer'} className='explore-menu-items'>
              <ExchangeIcon className='explore-logos'/> بورس ها
            </Link>
            <Link to={'/users/Users_Explorer'} className='explore-menu-items'>
              <Contacts svgClass='explore-logos member-logo' containerClass='explore-logos-container'/> شناسه ها (افراد و مجموعه ها)
            </Link>
            <Link to={'#'} className='explore-menu-items'>
              <ContributionIcon className='explore-logos'/> آورده ها (محصولات، توانمندی و ...)
            </Link>
          </div>
        </div>
      </div>
  )
}

export default ExploreMenu