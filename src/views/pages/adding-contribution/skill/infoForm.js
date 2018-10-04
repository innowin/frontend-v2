// @flow
import * as React from 'react'
import NextPrevBtns from '../nextAndPrevBtns'
import {reduxForm, Field} from "redux-form";
import renderTextField from "../../../common/inputs/reduxFormRenderTextField"
import renderSelectField from "../../../common/inputs/reduxFormRenderReactSelect"
import renderTextArea from "../../../common/inputs/reduxFormRenderTextArea"
import helpers from "src/consts/helperFunctions/helperFunctions"
import {skillFields} from "../addingConributionData"
import type {TagAsOptionType, SkillFormValsType} from "../types"
import FontAwesome from 'react-fontawesome'


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


type InitialInfoProps = {
  goToNextStep: Function,
  goToPrevStep: Function,
  handleSubmit: Function,
  error: string,
  formVals: SkillFormValsType,
  hashTags: {},
  tagHandler: Function
}

let InfoForm = (props: InitialInfoProps) => {

  const {
    goToNextStep,
    goToPrevStep,
    hashTags,
    handleSubmit,
    error,
    formVals,
    tagHandler
  } = props

  const goToNextStepHandler = () => {
    if (!error) goToNextStep()
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
                    objToArrayAsOptions(hashTags, 'id', 'title', ['usage'])
                  }
              />
              <Tags tagHandler={tagHandler} tags={formVals ? formVals.hashTags : []}/>
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

const Tags = (props) => {
  const {tags, tagHandler} = props
  return (
      <div className="selected-tags">
        {tags && tags.map(tag => <Tag handler={tagHandler} tag={tag} key={tag.label}/>)}
      </div>
  )
}

const Tag = (props) => {
  const {tag, handler} = props
  return (
      <div className="tag">
        <FontAwesome name="times" onClick={() => handler(tag.value)}/>
        {tag.label}
      </div>
  )
}

export const skillInfoFormName = 'addingContributionSkillInfoForm'

InfoForm = reduxForm({
  form: skillInfoFormName,
  validate: InfoFormValidate,
})(InfoForm)

export default InfoForm