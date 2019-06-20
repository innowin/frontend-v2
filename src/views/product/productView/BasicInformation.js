import * as React from 'react'
import Material from '../../common/components/Material'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import productActions from 'src/redux/actions/commonActions/productActions'
import Catalog from '../../organization/aboutUs/catalog'
import {getMessages} from '../../../redux/selectors/translateSelector'
import FileActions from '../../../redux/actions/commonActions/fileActions'
import {PureComponent} from 'react'


export class productBasicInformation extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      editDescription: false,
      edit: false,
      custom_attrs: [],
      error: false,
    }
  }

  showEdit = () => {
    this.setState({...this.state, edit: !this.state.edit, custom_attrs: this.props.product.custom_attrs})
  }

  showEditDescription = () => {
    this.setState({...this.state, editDescription: !this.state.editDescription})
  }

  updateDescription = () => {
    const {product, actions} = this.props
    const {updateProduct} = actions
    updateProduct({formValues: {description: this.textarea.value.trim()}, productId: product.id})
    this.setState({...this.state, editDescription: false})
  }

  updateAttr(e, index, type) {
    let custom_attrs = [...this.state.custom_attrs]
    custom_attrs[index][type] = e.target.value.trim()
    this.setState({...this.state, custom_attrs: [...custom_attrs], error: false})
  }

  deleteAttr(index) {
    let custom_attrs = [...this.state.custom_attrs]
    custom_attrs.splice(index, 1)
    this.setState({...this.state, custom_attrs: [...custom_attrs]})
  }

  addAttr = () => {
    let custom_attrs = this.state.custom_attrs ? [...this.state.custom_attrs] : []
    custom_attrs.push({title: '', value: ''})
    this.setState({...this.state, custom_attrs: [...custom_attrs]})
  }

  submitUpdateAttr = () => {
    const {product, actions} = this.props
    const {custom_attrs} = this.state
    const {updateProduct} = actions
    let attrs = custom_attrs && custom_attrs.reduce((sum, attr) => (attr.title.length !== 0 && attr.value.length !== 0) ? [...sum, {...attr}] : [...sum], [])
    updateProduct({formValues: {custom_attrs: JSON.stringify(attrs)}, productId: product.id})
    this.setState({...this.state, edit: false})
  }

  render() {
    const {edit, editDescription, custom_attrs, error} = this.state
    const {product, current_user_identity, product_owner, translate, files} = this.props
    const {deleteFile, updateProduct} = this.props.actions

    return (
        <div>
          <div className='product-description' style={(product.description && product.description.length > 0) || (product_owner && product_owner.id === current_user_identity) ? {display: 'block'} : {display: 'none'}}>
            <div className='product-description-title'>
              <div>معرفی</div>
              {
                product_owner && product_owner.id === current_user_identity &&
                <div className={editDescription ? 'product-description-title-editing' : 'product-description-title-edit'} onClick={this.showEditDescription}>{editDescription ? 'درحال ویرایش...  ✕' : 'ویرایش'}</div>
              }
            </div>
            {
              editDescription ?
                  <textarea className='product-description-detail-editing' defaultValue={product.description} ref={e => this.textarea = e}/>
                  :
                  <div className='product-description-detail'>{product.description}</div>
            }
            {
              editDescription ?
                  <div className='product-description-edit-container'>
                    <Material className='product-description-cancel' content='لغو ویرایش' onClick={this.showEditDescription}/>
                    <Material className='product-description-submit' content='ثبت تغییرات' onClick={this.updateDescription}/>
                  </div>
                  :
                  null
            }
          </div>

          <div className='product-description' style={(product.custom_attrs && product.custom_attrs.length > 0) || (product_owner && product_owner.id === current_user_identity) ? {display: 'block'} : {display: 'none'}}>
            <div className='product-description-title'>
              <div>مشخصات</div>
              {
                product_owner && product_owner.id === current_user_identity ?
                    <div className={edit ? 'product-description-title-editing' : 'product-description-title-edit'} onClick={this.showEdit}>{edit ? 'درحال ویرایش...  ✕' : 'ویرایش'}</div>
                    :
                    null
              }
            </div>
            <div>
              {
                edit ?
                    <div>
                      {
                        custom_attrs && custom_attrs.map((attribute, i) =>
                            <div key={i} className='product-attributes-cont'>
                              <input type='text' className='product-attributes-title-edit' defaultValue={attribute.title} onChange={(e) => this.updateAttr(e, i, 'title')}/>
                              <input type='text' className='product-attributes-value-edit' defaultValue={attribute.value} onChange={(e) => this.updateAttr(e, i, 'value')}/>
                              <Material className='product-attributes-delete' content='حذف' onClick={() => this.deleteAttr(i)}/>
                            </div>,
                        )
                      }
                      <div className='product-attributes-cont'>
                        <div className={!error ? 'product-attributes-error-hide' : 'product-attributes-error'}>ویژگی نمی تواند فاقد عنوان یا مقدار باشد!</div>
                        <Material className='product-attributes-add' content='افزودن' onClick={this.addAttr}/>
                      </div>

                      <div className='product-attrs-edit-container'>
                        <Material className='product-description-cancel' content='لغو ویرایش' onClick={this.showEdit}/>
                        <Material className='product-description-submit' content='ثبت تغییرات' onClick={this.submitUpdateAttr}/>
                      </div>

                    </div>
                    :
                    product.custom_attrs && product.custom_attrs.map((attribute, i) =>
                        <div key={i} className='product-attributes-cont'>
                          <div className='product-attributes-title'>{attribute.title}</div>
                          <div className='product-attributes-value'>{attribute.value}</div>
                        </div>,
                    )
              }
            </div>
          </div>

          <Catalog updateUser={undefined} updateProduct={updateProduct} translate={translate} owner={product} files={files} deleteFile={deleteFile}/>

        </div>
    )
  }
}

const mapStateToProps = (state) => ({
  translate: getMessages(state),
  files: state.common.file.list,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    updateProduct: productActions.updateProduct,
    deleteFile: FileActions.deleteFile,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(productBasicInformation)

