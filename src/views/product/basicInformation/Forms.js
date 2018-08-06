// @flow
import * as React from "react"
import {Component} from "react"
import PropTypes from "prop-types"
import {TextInput} from "src/views/common/inputs/TextInput"
import {updateProduct} from "src/crud/product/basicInformation"
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

type FormValuesType = {
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
        const formValues: FormValuesType = (this.form && this.form._getValues()) || {description: ''}
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

const productFormValidation = (values) => {
    const errors = {}
    const requiredFields = ['name', 'country', 'province', 'product_category']
    // COMMENT: const hasRequiredError = requiredFields.some(field => !values[field])
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors._error = 'لطفا فیلدهای ضروری را پر کنید'
            errors[field] = true
        }
    })
    // COMMENT: the hasRequiredError checks if there is a required field that hasn't value.
    // COMMENT: if (hasRequiredError) errors._error = 'لطفا فیلدهای ضروری را پر کنید'
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
