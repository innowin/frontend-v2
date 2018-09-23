import type {skillType} from "../../../consts/flowTypes/user/others";
import * as React from "react";
import {Component} from "react";
import PropTypes from "prop-types";
import {TextInput} from "../../common/inputs/TextInput";
import {Field, reduxForm} from "redux-form";
import renderTextField from "../../common/inputs/reduxFormRenderTextField";
import renderTextArea from "../../common/inputs/reduxFormRenderTextArea";
import skillInfoValidation from "../../../helpers/validations/userSkillInfo";

type PropsSkillForm = {
  onSubmit: Function,
  skill?: skillType,
  translate: { [string]: string },
  children?: React.Node,
  initialize: Function,
  submitFailed: boolean,
  error: string,
  handleSubmit: Function,
}

class SkillInfoForm extends Component<PropsSkillForm> {

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    skill: PropTypes.object,
    translate: PropTypes.object.isRequired,
    initialize: PropTypes.func.isRequired,
    submitFailed: PropTypes.bool,
    error: PropTypes.string,
    handleSubmit: PropTypes.func,
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

  componentDidMount() {
    const {initialize, skill} = this.props
    if(skill){
      const defaultFormValue = {
        title: skill.title,
        description: skill.description,
      }
      initialize(defaultFormValue)
    }
  }

  // FixMe: mohammad tag input not work
  render() {
    const {onSubmit, translate, submitFailed, error, handleSubmit, skill} = this.props
    const tag = (skill) ? skill.tag : []
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <div className="skillTags m-1" name="tags" ref={input => {
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

          {this.props.children}
        </form>
    )
  }
}

SkillInfoForm = reduxForm({
  form: 'skillInfoForm',
  validate: skillInfoValidation,
})(SkillInfoForm)

export default SkillInfoForm