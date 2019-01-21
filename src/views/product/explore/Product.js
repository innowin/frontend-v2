import React, {Component} from 'react'
import FileActions from 'src/redux/actions/commonActions/fileActions'
import {bindActionCreators} from 'redux'
import connect from 'react-redux/es/connect/connect'
import constants from 'src/consts/constants'
import {Link} from 'react-router-dom'
import {Product as ProductSvg} from 'src/images/icons'
import {Organization} from 'src/images/icons'

class Product extends Component {
  componentDidMount(): void {
    const {data, actions} = this.props
    actions.getFileByFileRelatedParentId({fileRelatedParentId: data.id, fileParentType: constants.FILE_PARENT.PRODUCT})
  }

  render() {
    const {data} = this.props
    const {product_owner, pictures_array} = data
    const {identity_user} = product_owner

    return (
        <Link to={`/product/${data.id}`} className='product-model'>
          <div className='product-model-logo'>
            <ProductSvg className='product-model-svg'/>
            <div>محصول</div>
          </div>
          <div className='product-model-detail'>
            <div className='product-model-name'>
              <ProductSvg className='product-model-little-svg'/>
              {data.name}
            </div>
            <div className='product-model-seller-icon'>
              <Organization className='product-model-little-svg'/>
              <span className='product-model-seller'>فروشنده: </span><span className='product-model-seller-name'>{identity_user ? identity_user.first_name + ' ' + identity_user.last_name : ''}</span>
            </div>
          </div>
          <img className='product-model-img' src={pictures_array && pictures_array.length > 0 && pictures_array[0].file} alt=''/>
        </Link>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getFileByFileRelatedParentId: FileActions.getFileByFileRelatedParentId
  }, dispatch)
})

export default connect(null, mapDispatchToProps)(Product)

