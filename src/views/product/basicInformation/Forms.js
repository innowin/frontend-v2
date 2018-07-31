// @flow
import * as React from "react"
import {Component} from "react"
import PropTypes from "prop-types"
import {TextInput} from "src/views/common/inputs/TextInput"
import {updateProduct} from "src/crud/product/basicInformation"
import {SelectComponent} from "src/views/common/SelectComponent"
import type {ProductType} from "src/consts/flowTypes/product/productTypes"
import type {TranslatorType} from "src/consts/flowTypes/common/commonTypes"
import renderTextField from "../../common/inputs/reduxFormRenderTextField";
import {Field, reduxForm} from "redux-form"
import {BeatLoader} from "react-spinners"
import renderSelectField from "../../common/inputs/reduxFormRenderReactSelect"
import {ProductInfoItemWrapper, ProductDescriptionWrapper} from "./Views"
import renderTextArea from "../../common/inputs/reduxFormRenderTextArea"


type ProductDescriptionFormProps = {
    onSubmit: Function,
    description: [],
    children: React.Node,
    translator: TranslatorType
}

type FormVluesType = {
    description: string
}

export class ProductDescriptionForm extends Component<ProductDescriptionFormProps> {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        description: PropTypes.array,
    }
    descriptionInput: React.ElementRef<typeof TextInput>;
    _getValues = () => {
        return {
            description: this.descriptionInput.getValue()
        }
    }

    _formValidate = () => {
        let result = true
        const validates = [
            this.descriptionInput.validate(),
        ]
        for (let i = 0; i < validates.length; i++) {
            if (validates[i]) {
                result = false
                break
            }
        }
        return result
    }

    render() {
        const {translator} = this.props
        //Todo pedram : delete and create functionality should be added
        const description = this.props.description || ""
        return (
            <form onSubmit={this.props.onSubmit}>
                <div className="description-wrapper">
                    <TextInput
                        name="description"
                        required
                        label={translator['Description'] + ": "}
                        value={description}
                        ref={descriptionInput => {
                            this.descriptionInput = descriptionInput
                        }}
                    />
                </div>
                <div>{this.props.children}</div>
            </form>
        )
    }
}

type ProductDescriptionEditFormProps = {
    hideEdit: Function,
    updateStateForView: Function,
    description: any,
    translator: TranslatorType,
    product: ProductType
}
type ProductDescriptionEditFormState = {
    confirm: boolean
}

export class ProductDescriptionEditForm extends Component<ProductDescriptionEditFormProps, ProductDescriptionEditFormState> {
    constructor() {
        super()
        this.state = {
            confirm: false
        }
    }

    form: ?React.ElementRef<typeof ProductDescriptionForm>
    static propTypes = {
        hideEdit: PropTypes.func.isRequired,
        updateStateForView: PropTypes.func.isRequired,
        description: PropTypes.string.isRequired,
    }

    _save = (updateStateForView: Function, hideEdit: Function) => {
        const productId: number = this.props.product.id
        const formValues: FormVluesType = (this.form && this.form._getValues()) || {description: ''}
        return updateProduct(formValues, productId, updateStateForView, hideEdit)
    }

    _onSubmit = (e: SyntheticEvent<>) => {
        e.preventDefault()
        const {updateStateForView, hideEdit} = this.props
        if (this.form && this.form._formValidate()) {
            this._save(updateStateForView, hideEdit)
        }
        return false
    }

    render() {
        const {description, translator} = this.props
        return (
            <ProductDescriptionForm onSubmit={this._onSubmit} ref={form => {
                this.form = form
            }} translator={translator} description={description}>
                <div className="col-12 d-flex justify-content-end">
                    <button type="button" className="btn btn-secondary mr-2" onClick={this.props.hideEdit}>
                        {translator['Cancel']}
                    </button>
                    <button type="submit" className="btn btn-success">{translator['Save']}</button>
                </div>
            </ProductDescriptionForm>
        )
    }
}

type ProductInfoFormProps = {
    onSubmit: Function,
    product: ProductType,
    translator: TranslatorType,
    children: React.Node
}
type ProductInfoFormState = {
    categories: []
}

const productFormValidation = (values) => {
    const errors = {}
    const requiredFields = ['name', 'country', 'province', 'product_category']
    // const hasRequiredError = requiredFields.some(field => !values[field])
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors._error = 'لطفا فیلدهای ضروری را پر کنید'
            errors[field] = true
        }
    })
    // the hasRequiredError checks if there is a required field that hasn't value.
    // if (hasRequiredError) errors._error = 'لطفا فیلدهای ضروری را پر کنید'
    return errors
}

type ProductInformationFormProps = {
    handleSubmit: Function,
    onSubmit: Function,
    translator: TranslatorType,
    submitting: boolean,
    error: string,
    submitFailed: boolean,
    hideEdit: Function,
    formData: ProductType,
    categoriesOptions: []
}

let ProductInformationForm = (props: ProductInformationFormProps) => {
    const {handleSubmit, onSubmit, translator, submitting, error, submitFailed, hideEdit, categoriesOptions} = props
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="product-form">
            <ProductDescriptionWrapper translator={translator}>
                <Field name="description" className="description" type="text"
                       component={renderTextArea} label={'desc'}/>
            </ProductDescriptionWrapper>
            <ProductInfoItemWrapper translator={translator}>
                <Field name="name" className="form-field" type="text" component={renderTextField}
                       label={'name'}/>
                <Field name="country" className="form-field" type="text" component={renderTextField}
                       label={'country'}/>
                <Field name="province" className="form-field" type="text" component={renderTextField}
                       label={'province'}/>
                <Field name="city" className="form-field" type="text" component={renderTextField}
                       label={'city'}/>
                <Field
                    className="category"
                    name="product_category"
                    type="text"
                    placeholder='category'
                    component={renderSelectField}
                    label={'category'}
                    noResultsText={'چنین دسته‌بندی وجود ندارد.'}
                    changeHandler={(e) => console.log('e is: ', e)}
                    options={categoriesOptions}
                />
                <div>
                    <button
                        className="btn btn-success btn login-submit-button mt-0 cursor-pointer"
                        disabled={submitting}>
                        {!submitting ? translator['Register'] : (
                            <BeatLoader color="#fff" size={10} margin="auto"/>
                        )}
                    </button>
                    <span className="btn btn-secondary mr-2" onClick={hideEdit}>
                        {translator['Cancel']}
                    </span>
                </div>
                {submitFailed && <p className="error-message">{error}</p>}
            </ProductInfoItemWrapper>
        </form>
    )
}

ProductInformationForm = reduxForm({
    form: 'productBasicInfoForm',
    validate: productFormValidation,
})(ProductInformationForm)

export {ProductInformationForm}


// export class ProductInfoForm extends Component<ProductInfoFormProps, ProductInfoFormState> {
//     static propTypes = {
//         onSubmit: PropTypes.func.isRequired,
//         product: PropTypes.object,
//     }
//     nameInput: React.ElementRef<typeof TextInput>
//     countryInput: React.ElementRef<typeof TextInput>
//     provinceInput: React.ElementRef<typeof TextInput>
//     cityInput: React.ElementRef<typeof TextInput>
//     productCategoryInput: React.ElementRef<typeof TextInput>
//
//     constructor() {
//         super()
//         this.state = {categories: []}
//     }
//
//     _getValues = () => {
//         return {
//             name: this.nameInput.getValue(),
//             country: this.countryInput.getValue(),
//             province: this.provinceInput.getValue(),
//             city: this.cityInput.getValue(),
//             productCategory: this.productCategoryInput.getValue()
//         }
//     }
//
//     _formValidate = () => {
//         let result = true
//         const validates = [
//             this.nameInput.validate(),
//             this.productCategoryInput.validate(),
//             this.countryInput.validate(),
//             this.provinceInput.validate(),
//             this.cityInput.validate(),
//         ]
//         for (let i = 0; i < validates.length; i++) {
//             if (validates[i]) {
//                 result = false
//                 break
//             }
//         }
//         return result
//     }
//
//     render() {
//         const product = this.props.product || {}
//         const {translator} = this.props
//         const {categories} = this.state
//         let currentCategory = {title: ""}
//         const options = categories.map((cat, index) => {
//             if (cat.id === product.product_category) {
//                 currentCategory = cat
//             }
//             return {value: cat.id, label: cat.title}
//         })
//         return (
//             <form onSubmit={this.props.onSubmit}>
//                 <div className="row">
//                     <TextInput
//                         name="name"
//                         label={translator['Name'] + ": "}
//                         value={product.name}
//                         ref={nameInput => {
//                             this.nameInput = nameInput
//                         }}
//                     />
//                     <TextInput
//                         name="country"
//                         label={translator['Country'] + ": "}
//                         value={product.country}
//                         ref={countryInput => {
//                             this.countryInput = countryInput
//                         }}
//                     />
//                     <TextInput
//                         name="province"
//                         label={translator['Province'] + ": "}
//                         value={product.province}
//                         ref={provinceInput => {
//                             this.provinceInput = provinceInput
//                         }}
//                     />
//                     <TextInput
//                         name="city"
//                         label={translator['City'] + ": "}
//                         value={product.city}
//                         ref={cityInput => {
//                             this.cityInput = cityInput
//                         }}
//                     />
//                     <SelectComponent
//                         name="productCategory"
//                         label={translator['ProductCategory'] + ": "}
//                         options={options}
//                         className="col-12 form-group"
//                         required
//                         value={currentCategory.title}
//                         ref={productCategoryInput => {
//                             this.productCategoryInput = productCategoryInput
//                         }}
//                     />
//
//                     {this.props.children}
//                 </div>
//             </form>
//         )
//     }
// }

type ProductInfoEditFormProps = {
    hideEdit: Function,
    updateStateForView: Function,
    product: ProductType,
    translator: TranslatorType,
}

type ProductInfoEditFormState = {
    confirm: boolean
}

// export class ProductInfoEditForm extends Component<ProductInfoEditFormProps, ProductInfoEditFormState> {
//     constructor() {
//         super()
//         this.state = {confirm: false}
//     }
//
//     static propTypes = {
//         hideEdit: PropTypes.func.isRequired,
//         updateStateForView: PropTypes.func.isRequired,
//         product: PropTypes.object.isRequired
//     }
//
//     form: ?React.ElementRef<typeof ProductInfoForm>
//
//     _save = (updateStateForView: Function, hideEdit: Function) => {
//         const productId = this.props.product.id
//         const formValues = this.form && this.form._getValues()
//         return updateProduct(formValues, productId, updateStateForView, hideEdit)
//     }
//
//     _onSubmit = (e: SyntheticEvent<>) => {
//         const {updateStateForView, hideEdit} = this.props
//         e.preventDefault()
//         if (this.form && this.form._formValidate()) {
//             this._save(updateStateForView, hideEdit)
//         }
//         return false
//     }
//
//     render() {
//         const {product, translator} = this.props
//         return (
//             <ProductInfoForm translator={translator} onSubmit={this._onSubmit} ref={form => {
//                 this.form = form
//             }} product={product}>
//                 <div className="col-12 d-flex justify-content-end">
//                     <button type="button" className="btn btn-secondary mr-2" onClick={this.props.hideEdit}>
//                         {translator['Cancel']}
//                     </button>
//                     <button type="submit" className="btn btn-success">{translator['Save']}</button>
//                 </div>
//             </ProductInfoForm>
//         )
//     }
// }


