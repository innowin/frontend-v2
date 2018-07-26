/*global __*/
//@flow
import * as React from 'react';
import PropTypes from 'prop-types';
import {TextInput} from 'src/views/common/inputs/TextInput'
import {FileInput} from 'src/views/common/inputs/FileInput';
import {ImageViewer} from 'src/views/common/ImageViewer';
import {Confirm} from "../../common/cards/Confirm";
import {SelectComponent} from '../../common/SelectComponent';
import {IDENTITY_ID} from '../../../consts/data';
import {DefaultUserIcon} from 'src/images/icons'

type ProductFormProps = { 
  onSubmit: Function,
  product?:Object,
  categories: Array<Object>,
  deletePicture: Function,
  pictures:Array<Object>,
  children: React.Node
}
export class ProductForm extends React.Component<ProductFormProps> {
  defaultProps = {
    product :{name:"", city:"", province:"", country:"",description:""},
  }
  productPictureInput: any;
  nameInput: any;
  countryInput : any;
  provinceInput : any;
  cityInput : any;
  descriptionInput : any;
  productCategoryInput : any;
  updatePictureList: any;

  getValues = () => {
    const media = this.productPictureInput.getFile();
    const mediaId = media ? media.id : null;
    return {
      name: this.nameInput.getValue(),
      country: this.countryInput.getValue(),
      province: this.provinceInput.getValue(),
      city: this.cityInput.getValue(),
      description: this.descriptionInput.getValue(),
      product_owner: IDENTITY_ID,
      product_category: this.productCategoryInput.getValue(),
      picture_media: mediaId,
    }
  };

  formValidate = () => {
    let result = true;
    const validates = [
      this.nameInput.validate(),
      this.countryInput.validate(),
      this.provinceInput.validate(),
      this.cityInput.validate(),
      this.descriptionInput.validate(),
      this.productCategoryInput.validate()
    ];
    for (let i = 0; i < validates.length; i++) {
      if (validates[i]) {
        result = false;
        break;
      }
    }
    return result
  };

  deletePicture = (index:number) => {
    const {deletePicture, pictures} = this.props;
    let pictureId = pictures[index].id;
    deletePicture(pictures, pictures[index], this.updatePictureList);
  };

  //TODO amir specify identity concept and how to handle them
  render() {
    const {categories, pictures} = this.props;
    const product = this.props.product || {name:"", city:"", province:"", country:"",description:"",pictures:[]}
    let currentCategory = {title: "", name: "", id:-1};
    const options = categories.map((cat, index) => {
      if (product.product_category) {
        if (cat.id === product.product_category.id) {
          currentCategory = cat;
        }
      }
      return {value: cat.id, label: cat.title};
    });
    return (
      <form onSubmit={this.props.onSubmit}>
        <div className="row">

          {
            pictures.map((pic, index) => {
              return <div className="imageViewer col-4">
                <div className="image">
                  <ImageViewer
                    mediaId={pic.picture_media}
                  />
                  <button onClick={this.deletePicture.bind(this, index)} type="button"
                          className="btn btn-sm btn-outline-danger">{__('Delete')}</button>
                </div>
              </div>

            })
          }

          <FileInput
            label={__('Post pictures') + ": "}

            ref={productPictureInput => {
              this.productPictureInput = productPictureInput
            }}
          />

          <TextInput
            name="name"
            required
            label={__('Name') + ": "}
            value={product.name}
            ref={nameInput => {
              this.nameInput = nameInput
            }}
          />
          <TextInput
            name="country"
            required
            label={__('Country') + ": "}
            value={product.country}
            ref={countryInput => {
              this.countryInput = countryInput
            }}
          />

          <TextInput
            name="province"
            required
            label={__('Province') + ": "}
            value={product.province}
            ref={provinceInput => {
              this.provinceInput = provinceInput
            }}
          />
          <TextInput
            name="city"
            required
            label={__('City') + ": "}
            value={product.city}
            ref={cityInput => {
              this.cityInput = cityInput
            }}
          />
          <TextInput
            name="description"
            required
            label={__('Description') + ": "}
            value={product.description}
            ref={descriptionInput => {
              this.descriptionInput = descriptionInput
            }}
          />

          <SelectComponent
            name="productCategory"
            label={__('ProductCategory') + ": "}
            options={options}
            className="col-12 form-group"
            required
            value={currentCategory.id}
            ref={productCategoryInput => {
              this.productCategoryInput = productCategoryInput
            }}
          />


          {this.props.children}
        </div>
      </form>
    )
  }
}
type ProductCreateFormProps = { 
  create: Function,
  hideEdit: Function,
  categories:Array<Object>, 
  pictures:Array<Object>, 
  deletePicture:Function
}
export class ProductCreateForm extends React.Component<ProductCreateFormProps> {

  save = () => {
    const formValues = this.refs.form.getValues();
    const {hideEdit} = this.props;
    return this.props.create(formValues, hideEdit);
  };
  onSubmit = (e:SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (this.refs.form.formValidate()) {
      this.save();
    }
  };

  render() {
    const {categories, pictures, deletePicture} = this.props;

    return <div>
      <ProductForm deletePicture={deletePicture} pictures={pictures} categories={categories}
                   onSubmit={this.onSubmit} ref="form">
        <div className="col-12 d-flex justify-content-end">
          <button type="button" className="btn btn-secondary mr-2" onClick={this.props.hideEdit}>
            {__('Cancel')}
          </button>
          <button type="submit" className="btn btn-success">{__('Create')}</button>
        </div>
      </ProductForm>
    </div>
  }
}
type ProductPictureFormProps  = {
  product:Object, 
  hideEdit:Function, 
  updatePicture:Function,
  picture:Object
}
export class ProductPictureForm extends React.Component<ProductPictureFormProps> {
  productPictureInput: any;

  constructor(props:ProductPictureFormProps) {
    super(props);
  }

  getValues = () => {
    const media = this.productPictureInput.getFile();
    const mediaId = media ? media.id : null;
    return {
      picture_media: mediaId,
    }
  };

  formValidate = () => {
    let result = true;
    const validates = [
      this.productPictureInput.validate()
    ];
    for (let i = 0; i < validates.length; i++) {
      if (validates[i]) {
        result = false;
        break;
      }
    }
    return result
  };

  save = () => {//(formValues, productId, updateStateForView, hideEdit
    const {product,  hideEdit, updatePicture} = this.props;
    const productId = product.id;
    const formValues = this.getValues();
    return updatePicture(formValues, productId,  hideEdit)
  };

  onSubmit = (e:SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    this.save();
  };

  render() {
    const {picture} = this.props;
    return (
      <form onSubmit={this.onSubmit}>
        <FileInput
          label={__('Post picture') + ": "}
          mediaId={picture.picture_media}
          ref={productPictureInput => {
            this.productPictureInput = productPictureInput
          }}
        />
        {
          (picture.picture_media)?(<img alt="" className="-item-productForm-img" src={picture.picture_media}/>):(
            <DefaultUserIcon className="-item-productForm-img"/>
          )
        }
        <div className="col-12 d-flex justify-content-end">
          <button type="button" className="btn btn-secondary mr-2" onClick={this.props.hideEdit}>
            {__('Cancel')}
          </button>
          <button type="submit" className="btn btn-success">{__('Create')}</button>
        </div>
      </form>
    )
  }

}
type ProductEditFormProps = {
  update: Function,
  remove: Function,
  hideEdit: Function,
  product: Object,
  products: Array<Object>,
  pictures:Array<Object>,
  categories: Array<Object>, 
  deletePicture:Function

}
export class ProductEditForm extends React.Component<ProductEditFormProps,{confirm:boolean}> {
  state = {
    confirm: false,
  };

  showConfirm = () => {
    this.setState({confirm: true})
  };

  cancelConfirm = () => {
    this.setState({confirm: false})
  };

  remove = () => {
    const {hideEdit, product, products} = this.props;
    return this.props.remove(product, products, hideEdit)
  };

  save = () => {//(formValues, productId, updateStateForView, hideEdit
    const {product,  hideEdit, pictures} = this.props;
    const productId = product.id;
    const formValues = this.refs.form.getValues();
    return this.props.update(formValues, productId, hideEdit)
  };

  onSubmit = (e:SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    this.save();
  };

  render() {
    const {confirm} = this.state;
    const {categories, deletePicture} = this.props;

    if (confirm) {
      return <Confirm cancelRemoving={this.cancelConfirm} remove={this.remove}/>;
    }
    const {product, pictures} = this.props;
    return (
      <div>

        <ProductForm pictures={pictures}  deletePicture={deletePicture} categories={categories}
                     onSubmit={this.onSubmit} ref="form" product={product}>
          <div className="col-12 d-flex justify-content-end">
            <button type="button" className="btn btn-outline-danger mr-auto" onClick={this.showConfirm}>
              {__('Delete')}
            </button>
            <button type="button" className="btn btn-secondary mr-2" onClick={this.props.hideEdit}>
              {__('Cancel')}
            </button>
            <button type="submit" className="btn btn-success">{__('Save')}</button>
          </div>
        </ProductForm>
      </div>
    )
  }
}
