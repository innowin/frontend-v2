// @flow
import * as React from 'react'
import StateLessTextInput from '../../../common/inputs/StateLessTextInput'
import StateLessTextarea from '../../../common/inputs/StateLessTextarea'
import Select from 'react-select';
import {RadioButtonGroup} from '../../../common/inputs/RadioButtonInput'
import {LAYER1S} from '../addingConributionData'
import NextPrevBtns from '../nextAndPrevBtns'
import {reduxForm, Field} from "redux-form";
import renderTextField from "../../../common/inputs/reduxFormRenderTextField"
import renderSelectField from "../../../common/inputs/reduxFormRenderReactSelect"
import renderTextArea from "../../../common/inputs/reduxFormRenderTextArea"
import renderRadioButtonGroup from "../../../common/inputs/rdxRenderCircularRadioButtonGroup"
import helpers from "src/consts/helperFunctions"
import {connect} from "react-redux"
import {skillFields} from "../addingConributionData"
const {objToArrayAsOptions, filterNestedObjByKey} = helpers

const InfoFormValidate = (values) => {
  const errors = {}
  const {title, desc} = skillFields
  const requiredFields = [title, desc]

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
  cities: LocationType,
  hashTags: {}
}

let InfoForm = (props: InitialInfoProps) => {

  const {
    goToNextStep,
    goToPrevStep,
      hashTags,
    handleSubmit,
    error,
  } = props

  const goToNextStepHandler = () => {
    if(!error) goToNextStep()
  }

  return (
      <form onSubmit={handleSubmit(() => {})}>
        <div className="skill-initial-info">
          <div className="form">
            <div className="form-column">
              <Field name={skillFields.title} type="text" component={renderTextField}
                     placeholder="عنوان" className="title"/>
              <Field name={skillFields.desc} type="text" component={renderTextArea}
                     placeholder="توضیحات" className="desc"/>
            </div>
            <div className="form-column">
              <Field
                     placeholder="برچسب‌ها"
                     className="tags-search-box"
                     name="hashTags"
                     component={renderSelectField}
                     label=""
                     multi
                     noResultsText={'چنین برچسبی وجود ندارد.'}
                     options={
                       objToArrayAsOptions(hashTags, 'id', 'title')
                     }
              />
              <div className="selected-tags">ss</div>
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

export const skillInfoForm = 'addingContributionSkillInfoForm'

InfoForm = reduxForm({
  form: skillInfoForm,
  validate: InfoFormValidate,
})(InfoForm)

export default InfoForm