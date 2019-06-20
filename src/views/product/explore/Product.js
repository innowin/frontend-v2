import React, {PureComponent} from 'react'
import FileActions from 'src/redux/actions/commonActions/fileActions'
import {bindActionCreators} from 'redux'
import connect from 'react-redux/es/connect/connect'
import constants from 'src/consts/constants'
import {Link} from 'react-router-dom'
import {Product as ProductSvg} from 'src/images/icons'
import {Organization} from 'src/images/icons'
import {ClipLoader} from 'react-spinners'
import GetUserActions from 'src/redux/actions/user/getUserActions'

class Product extends PureComponent {
  componentDidMount() {
    const {data, actions} = this.props
    actions.getFileByFileRelatedParentId({fileRelatedParentId: data.id, fileParentType: constants.FILE_PARENT.PRODUCT})
    const id = data.product_owner.id ? data.product_owner.id : data.product_owner
    actions.getUserByUserId(id)
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.data.id !== nextProps.data.id) {
      const {data, actions} = nextProps
      actions.getFileByFileRelatedParentId({fileRelatedParentId: data.id, fileParentType: constants.FILE_PARENT.PRODUCT})
      const id = data.product_owner.id ? data.product_owner.id : data.product_owner
      actions.getUserByUserId(id)
    }
  }

  render() {
    const {data, identities} = this.props
    const pictures_array = data.pictures_array ? data.pictures_array.filter(p => p.type === 'image') : []
    const id = data.product_owner.id ? data.product_owner.id : data.product_owner

    return (
        <Link to={`/product/${data.id}`} className='product-model'>
          <div className='product-model-logo'>
            <ProductSvg className='product-model-svg'/>
            <div>محصول</div>
          </div>
          <div className='product-model-detail'>
            <div className='product-model-name'>
              <ProductSvg className='product-model-little-svg'/>
              <div>{data.name}</div>
            </div>
            <div className='product-model-seller-icon'>
              <Organization className='product-model-little-svg'/>
              <span className='product-model-seller'>فروشنده: </span>
              <div className='product-model-seller-name'>
                {
                  identities[id] ?
                      identities[id].official_name ? identities[id].official_name : identities[id].nike_name ? identities[id].nike_name : identities[id].first_name || identities[id].last_name ? identities[id].first_name + ' ' + identities[id].last_name
                          : <span style={{color: 'red'}}>فاقد نام</span> : <div style={{verticalAlign: 'top', display: 'inline-block', marginTop: '3px'}}><ClipLoader size={15}/></div>
                }
              </div>
            </div>
          </div>
          <img className='product-model-img' src={pictures_array.length > 0 ? pictures_array[0].file : ''} alt=''/>
        </Link>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getFileByFileRelatedParentId: FileActions.getFileByFileRelatedParentId,
    getUserByUserId: GetUserActions.getUserByUserId,
  }, dispatch),
})

export default connect(null, mapDispatchToProps)(Product)

