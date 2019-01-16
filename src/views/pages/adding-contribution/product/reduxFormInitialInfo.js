// @flow
import * as React from 'react'
import {RadioButtonGroup} from '../../../common/inputs/RadioButtonInput'
import {LAYER1S} from '../addingConributionData'
import NextPrevBtns from '../nextAndPrevBtns'
import {reduxForm, Field} from "redux-form";
import renderTextField from "../../../common/inputs/reduxFormRenderTextField"
import renderSelectField from "../../../common/inputs/reduxFormRenderReactSelect"
import renderTextArea from "../../../common/inputs/reduxFormRenderTextArea"
import helpers from "src/consts/helperFunctions/helperFunctions"

const {objToArrayAsOptions, filterNestedObjByKey} = helpers

const InitialInfoReduxFormValidate = (values) => {
  const errors = {}
  const {
    NAME,
    COUNTRY,
    PROVINCE,
    CITY,
    CATEGORY_LAYER1,
  } = LAYER1S
  const requiredFields = [NAME, COUNTRY, PROVINCE, CITY, CATEGORY_LAYER1]

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors._error = 'لطفا فیلدهای ضروری را پر کنید'
      errors[field] = true
    }
  })
  return errors
}

type CountryType = {
  id: number,
  name: string
}

type LocationType = {
  list: { [number]: CountryType }
}

type CategoriesType = {
  list: {},
  isLoading: boolean,
  isLoaded: boolean
}

type InitialInfoProps = {
  goToNextStep: Function,
  goToPrevStep: Function,
  newContributionData: {},
  inputHandler: Function,
  handleSubmit: Function,
  onSubmit: Function,
  submitting: boolean,
  error: string,
  submitFailed: boolean,
  formVals: {},
  categories: CategoriesType,
  countries: LocationType,
  countryChangeHandler: Function,
  provinceChangeHandler: Function,
  provinces: LocationType,
  cities: LocationType
}

let InitialInfoReduxForm = (props: InitialInfoProps) => {

  const {
    goToNextStep,
    goToPrevStep,
    newContributionData,
    inputHandler,
    handleSubmit,
    // onSubmit,
    // submitting,
    error,
    // submitFailed,
    formVals = {},
    categories,
    countries,
    provinces,
    cities,
    countryChangeHandler,
    provinceChangeHandler,
  } = props

  const setCategoriesObjByLevel = (layerName) => {
    const categoriesObj = categories.list
    switch (layerName) {
      case LAYER1S.CATEGORY_LAYER2: {
        if (formVals[LAYER1S.CATEGORY_LAYER1]) {
          return filterNestedObjByKey(categoriesObj, 'category_parent',
              +formVals[LAYER1S.CATEGORY_LAYER1].value)
        }
        return {}
      }

      case LAYER1S.CATEGORY_LAYER3: {
        if (formVals[LAYER1S.CATEGORY_LAYER2]) {
          return filterNestedObjByKey(categoriesObj, 'category_parent',
              +formVals[LAYER1S.CATEGORY_LAYER2].value)
        }
        return {}
      }
      default:
        return categoriesObj
    }
  }

  const goToNextStepHandler = () => {
    if (!error) goToNextStep()
  }
  const countriesList = objToArrayAsOptions(countries.list, 'id', 'name')

  const provincesList = objToArrayAsOptions(provinces.list, 'id', 'name') || []

  const citiesList = objToArrayAsOptions(cities.list, 'id', 'name')

  return (
      <form onSubmit={handleSubmit(() => {
      })}>
        <div className="initial-info">
          <div className="form">
            <div className="form-column">
              <Field name="name" type="text" component={renderTextField}
                     label="عنوان آورده" className="form-group"/>

              {[LAYER1S.CATEGORY_LAYER1, LAYER1S.CATEGORY_LAYER2, LAYER1S.CATEGORY_LAYER3].map(layerName => (
                    <CategoryField
                        key={layerName}
                        layerName={layerName}
                        categories={setCategoriesObjByLevel(layerName)}
                    />
                ))}
            </div>
            <div className="form-column">
              <div className="location-fields-wrapper">
                <Field key={LAYER1S.COUNTRY}
                       placeholder="کشور"
                       id={LAYER1S.COUNTRY}
                       className="location-select"
                       name={LAYER1S.COUNTRY}
                       component={renderSelectField}
                    // label="کشور"
                       noResultsText={`چنین کشوری وجود ندارد`}
                       options={countriesList}
                       onChange={countryChangeHandler}
                />
                <Field key={LAYER1S.PROVINCE}
                       placeholder="استان"
                       id={LAYER1S.PROVINCE}
                       className="location-select"
                       name={LAYER1S.PROVINCE}
                       component={renderSelectField}
                    // label="استان"
                       noResultsText={`چنین استان وجود ندارد`}
                       options={provincesList}
                       onChange={provinceChangeHandler}
                />
                <Field key={LAYER1S.CITY}
                       placeholder="شهر"
                       id={LAYER1S.CITY}
                       className="location-select"
                       name={LAYER1S.CITY}
                       component={renderSelectField}
                    // label="شهر"
                       noResultsText={`چنین شهری وجود ندارد`}
                       options={citiesList}
                />
              </div>
              <RadioButtonGroup
                  label="قیمت"
                  name={LAYER1S.PRICE_STATUS}
                  handler={value => inputHandler(value, LAYER1S.PRICE_STATUS)}
                  items={[
                    {title: 'معین', value: 'specified'},
                    {title: 'تماس با عرضه‌کننده', value: 'call'}
                  ]}
                  selected={newContributionData[LAYER1S.PRICE_STATUS]}
              />

              <Field name={'IRR'} type="text" component={renderTextField}
                     label="IRR" className="form-group"/>

              <Field name={LAYER1S.DESCRIPTION} type="text" component={renderTextArea}
                     label="توصیف اجمالی آورده" className="form-group desc"/>
              {console.log('\n error: ', error, '\n')}
            </div>
          </div>
          <NextPrevBtns
              goToNextStep={goToNextStepHandler}
              goToPrevStep={goToPrevStep}
          />
        </div>
      </form>
  )
}

const CategoryField = (props) => {
  const {layerName, categories} = props
  return (
      <Field key={layerName}
             placeholder=""
             id={layerName}
             className="category-selection"
             name={layerName}
             component={renderSelectField}
             label={layerName === LAYER1S.CATEGORY_LAYER1 ? 'طبقه اول دسته‌بندی'
                 :
                 (layerName === LAYER1S.CATEGORY_LAYER2 ? 'طبقه دوم دسته‌بندی' : 'طبقه سوم دسته‌بندی')
             }
             noResultsText={'چنین دسته‌بندی وجود ندارد.'}
             options={
               objToArrayAsOptions(categories, 'id', 'name')
             }
      />
  )
}

export const initialInfoFormName = 'addingContributionInitialInfoForm'

InitialInfoReduxForm = reduxForm({
  form: initialInfoFormName,
  validate: InitialInfoReduxFormValidate,
})(InitialInfoReduxForm)

export default InitialInfoReduxForm