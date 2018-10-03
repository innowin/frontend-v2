// @flow
import * as React from "react"
import PropTypes from "prop-types"
import {Field, reduxForm} from "redux-form"

import renderTextArea from "../../common/inputs/reduxFormRenderTextArea"
import renderTextField from "../../common/inputs/reduxFormRenderTextField"
import skillInfoValidation from "../../../helpers/validations/userSkillInfo"
import type {skillFormValuesType, skillType} from "../../../consts/flowTypes/user/others"
import {Confirm} from "../../common/cards/Confirm"
import {TextInput} from "../../common/inputs/TextInput"

type PropsSkillEditForm = {
  update: Function,
  deleteSkillByUserId: Function,
  hideEdit: Function,
  skill: skillType,
  translate: { [string]: string },
  userId: number,
  initialize: Function,
  submitFailed: boolean,
  error: string,
  handleSubmit: Function,
}

type StateSkillEditForm = {
  confirm: boolean,
  tag: [],
}

class SkillInfoForm extends React.Component<PropsSkillEditForm, StateSkillEditForm> {
  static propTypes = {
    update: PropTypes.func.isRequired,
    hideEdit: PropTypes.func.isRequired,
    skill: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired,
    deleteSkillByUserId: PropTypes.func.isRequired,
    userId: PropTypes.number.isRequired,
    submitFailed: PropTypes.bool,
    error: PropTypes.string,
    handleSubmit: PropTypes.func,
    initialize: PropTypes.func.isRequired,
  }

  constructor(props: PropsSkillEditForm) {
    super(props)
    this.state = {confirm: false, tag: []}
  }

  componentDidMount() {
    const {initialize, skill} = this.props
    if (skill) {
      const defaultFormValue = {
        title: skill.title,
        description: skill.description,
      }
      initialize(defaultFormValue)
    }
  }

  _showConfirm = () => {
    this.setState({confirm: true})
  }

  _cancelConfirm = () => {
    this.setState({confirm: false})
  }

  _onSubmit = (values: skillFormValuesType) => {
    const {userId, skill, update, hideEdit} = this.props

    const skillId: number = skill.id

    // FixMe: mohammad tag input not work
    const formFormat = {
      title: skill.title === values.title ? null : values.title,
      tag: skill.tag === values.tag ? null : values.tag,
      description: skill.description === values.description ? null : values.description,
    }

    const propertyNames = Object.getOwnPropertyNames(formFormat)

    propertyNames.map(key => {
      formFormat[key] === null ? delete(formFormat[key]) : ''
      return formFormat
    })

    const formValues: {} = {...formFormat}
    update({formValues, skillId, userId})
    hideEdit()
  }

  _deleteTag(tagIndex: number) {
    const {tag} = this.state
    tag.splice(tagIndex, 1)
    this.setState({...this.state, tag: tag})
  }

  _addTag(tagInput: React.ElementRef<typeof TextInput>) {
    const {tag} = this.state
    tag.push(tagInput.getValue())
    this.setState({...this.state, tag: tag})
  }

  tagNameInput: HTMLInputElement
  tags: HTMLDivElement

  render() {
    const {confirm} = this.state
    const {hideEdit, translate, skill, deleteSkillByUserId, submitFailed, error, handleSubmit} = this.props
    const tag = (skill) ? skill.tag : []

    return (
        confirm
            ? <Confirm cancelRemoving={this._cancelConfirm} remove={deleteSkillByUserId}/>
            : <form onSubmit={handleSubmit(this._onSubmit)}>
              <div className='form-group'>
                <label>
                  {translate['Title'] + ": "}
                </label>
                <Field
                    name="title"
                    type="text"
                    component={renderTextField}
                    label={translate['Title']}
                    textFieldClass='form-control'
                />
              </div>

              <div className='form-group'>
                <label>
                  {translate['Description'] + ": "}
                </label>
                <Field
                    name="description"
                    type="text"
                    component={renderTextArea}
                    label={translate['Description']}
                    textFieldClass='form-control'
                />
              </div>

              {/*//FixMe mohsen: handle below div*/}
              <div className="skillTags m-1" ref={input => {
                this.tags = input
              }}>
                {tag.map((tag, index) =>
                    <div className="tagEdit m-1">
                      <button className="tagCross btn btn-danger btn-sm" onClick={() => {
                        this._deleteTag(index)
                      }}>
                      </button>
                      <span className="badge badge-secondary skillTag m-1">{tag}</span>
                    </div>
                )}
              </div>
              <div className="skillAddTagInput">
                <input type="button" className="btn btn-primary m-2" value={translate['Add Tag']} onClick={() => {
                  this._addTag(this.tagNameInput)
                }}/>
                <TextInput
                    name="tagName"
                    label={translate['Tag Name'] + ": "}
                    ref={tagNameInput => {
                      this.tagNameInput = tagNameInput
                    }}
                />
              </div>

              {submitFailed && <p className="error-message">{error}</p>}

              <div className="col-12 d-flex justify-content-end">
                <button type="button" className="btn btn-outline-danger mr-auto" onClick={this._showConfirm}>
                  {translate['Delete']}
                </button>
                <button type="button" className="btn btn-secondary mr-2" onClick={hideEdit}>
                  {translate['Cancel']}
                </button>
                <button type="submit" className="btn btn-success">{translate['Save']}</button>
              </div>
            </form>
    )
  }
}

SkillInfoForm = reduxForm({
  form: 'skillInfoForm',
  validate: skillInfoValidation,
})(SkillInfoForm)

export default SkillInfoForm