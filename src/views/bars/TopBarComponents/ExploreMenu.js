import Contacts from "../../../images/common/contacts_svg"
import ContributionIcon from "../../../images/common/contribution_svg"
import ExchangeIcon from "../../../images/common/exchange_svg"
import Material from "../../common/components/Material"
import React from 'react'
import {Link} from "react-router-dom"

const ExploreMenu = (props) => {
  const {exploreCollapse} = props
  return (
      <div>
        <div className={exploreCollapse ? "explore-menu-container" : "explore-menu-container-hide"}>
          <div className='explore-menu-arrow'>
            ▲
          </div>
          <div className='explore-menu'>

            <Link style={{textDecoration: 'none', color: 'black'}} to={'/exchange/Exchange_Explorer'}>
              <Material className='explore-menu-items' content={
                <div>
                  <ExchangeIcon className='explore-logos'/> پنجره ها
                </div>
              }/>
            </Link>

            <Link style={{textDecoration: 'none', color: 'black'}} to={'/users/Users_Explorer'}>
              <Material className='explore-menu-items' content={
                <div>
                  <Contacts svgClass='explore-logos member-logo' containerClass='explore-logos-container'/> شناسه ها (افراد و مجموعه ها)
                </div>
              }/>
            </Link>

            <Link style={{textDecoration: 'none', color: 'black'}} to={'#'}>
              <Material className='explore-menu-items' content={
                <div>
                  <ContributionIcon className='explore-logos'/> آورده ها (محصولات، توانمندی و ...)
                </div>
              }/>
            </Link>
          </div>
        </div>
      </div>
  )
}

export default ExploreMenu