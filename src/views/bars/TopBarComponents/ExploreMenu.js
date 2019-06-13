import Contacts from 'src/images/common/contacts_svg'
import ExchangeIcon from 'src/images/common/exchange_svg'
import Material from '../../common/components/Material'
import React from 'react'
import {Link} from 'react-router-dom'
import {ContributionIcon} from 'src/images/icons'

const ExploreMenu = (props) => {
  const {exploreCollapse, _toggleExplore} = props
  const _toggle = () => {
    _toggleExplore(true)
  }
  return (
      <div>
        <div className={exploreCollapse ? 'explore-menu-container' : 'explore-menu-container-hide'}>
          <div className='explore-menu-arrow'>
            ▲
          </div>
          <div className='explore-menu'>

            <Link style={{textDecoration: 'none', color: 'black'}} to={'/exchange/exchange_explorer'} onClick={_toggle}>
              <Material className='explore-menu-items' content={
                <div>
                  <ExchangeIcon className='explore-logos'/> پنجره ها
                </div>
              }/>
            </Link>

            <Link style={{textDecoration: 'none', color: 'black'}} to='/users/users_explorer' onClick={_toggle}>
              <Material className='explore-menu-items' content={
                <div>
                  <Contacts svgClass='explore-logos member-logo' containerClass='explore-logos-container'/> شناسه ها (افراد و مجموعه ها)
                </div>
              }/>
            </Link>

            <Link style={{textDecoration: 'none', color: 'black'}} to={'/product/product_explorer'} onClick={_toggle}>
              <Material className='explore-menu-items' content={
                <div>
                  <ContributionIcon className='explore-logos'/> آورده ها (محصولات، مهارت و ...)
                </div>
              }/>
            </Link>
          </div>
        </div>
      </div>
  )
}

export default ExploreMenu