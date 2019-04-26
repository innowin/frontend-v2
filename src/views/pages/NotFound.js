import React, {Component} from 'react'
import {NotFoundSvg} from 'src/images/icons'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Material from '../common/components/Material'

class NotFound extends Component {
  render() {
    const {userType, id} = this.props
    return (
        <div className='not-found'>
          <div className='not-found-content'>
            <NotFoundSvg className='not-found-content-logo'/>
            <div className='not-found-content-404'>404</div>
            <div className='not-found-content-text'>صفحه ای که به دنبال آن بودید، پیدا نشد.</div>
            <Link to='/'>
              <Material className='not-found-content-button' content='صفحه اصلی'/>
            </Link>
            <div className='not-found-content-links'>
              <Link to={`/${userType}/${id}`}>
                <div>پروفایل من</div>
              </Link>
              <Link to='/exchange/Exchange_Explorer'>
                <div>پنجره ها</div>
              </Link>
              <Link to='/users/Users_Explorer'>
                <div>افراد و شرکت ها</div>
              </Link>
              <Link to='/product/Product_Explorer'>
                <div>محصولات و خدمات</div>
              </Link>
            </div>
          </div>
        </div>
    )
  }
}

const mapStateToProps = state => {
  const id = state.auth.client.identity.content
  const allIdentities = state.identities.list
  const userType = id && allIdentities[id] && allIdentities[id].identity_type
  return {
    id,
    userType,
  }
}

export default connect(mapStateToProps, null)(NotFound)