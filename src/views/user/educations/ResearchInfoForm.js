// flow type of ResearchInfoForm
import type {userResearchType} from "../../../consts/flowTypes/user/basicInformation";
import * as React from "react";
import {Component} from "react";
import PropTypes from "prop-types";
import {Field, reduxForm} from "redux-form";
import renderTextField from "../../common/inputs/reduxFormRenderTextField";
import researchInfoValidation from "../../../helpers/validations/researchInfoValidation";

type  PropsResearchInfoForm = {
  onSubmit: Function,
  research: userResearchType,
  translate: { [string]: string },
  children?: React.Node,
  initialize: Function,
  submitFailed: boolean,
  error: string,
  handleSubmit: Function,
}

export class ResearchInfoForm extends Component<PropsResearchInfoForm> {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    research: PropTypes.object,
    translate: PropTypes.object.isRequired,
    initialize: PropTypes.func.isRequired,
    submitFailed: PropTypes.bool,
    error: PropTypes.string,
    handleSubmit: PropTypes.func,
  }

  componentDidMount() {
    const {initialize, research} = this.props
    if (research) {
      const defaultFormValue = {
        title: research.title,
        pageCount: research.page_count,
        year: research.year,
        publication: research.publication,
        researchLink: research.research_link,
        url: research.url,
        author: research.author,
      }
      initialize(defaultFormValue)
    }
  }

  render() {
    const {onSubmit, translate, submitFailed, error, handleSubmit} = this.props
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
              {translate['Author'] + ": "}
            </label>
            <Field
                name="author"
                type="text"
                component={renderTextField}
                label={translate['Author']}
                textFieldClass='form-control'
            />
          </div>

          <div className='form-group'>
            <label>
              {translate['Publication'] + ": "}
            </label>
            <Field
                name="publication"
                type="text"
                component={renderTextField}
                label={translate['Publication']}
                textFieldClass='form-control'
            />
          </div>

          <div className='form-group'>
            <label>
              {translate['Year'] + ": "}
            </label>
            <Field
                name="year"
                type="text"
                component={renderTextField}
                label={translate['Year']}
                textFieldClass='form-control'
            />
          </div>

          <div className='form-group'>
            <label>
              {translate['Page Count'] + ": "}
            </label>
            <Field
                name="pageCount"
                type="text"
                component={renderTextField}
                label={translate['Page Count']}
                textFieldClass='form-control'
            />
          </div>

          <div className='form-group'>
            <label>
              {translate['Research Link'] + ": "}
            </label>
            <Field
                name="researchLink"
                type="text"
                component={renderTextField}
                label={translate['Research Link']}
                textFieldClass='form-control'
            />
          </div>

          <div className='form-group'>
            <label>
              {translate['Url'] + ": "}
            </label>
            <Field
                name="url"
                type="text"
                component={renderTextField}
                label={translate['Url']}
                textFieldClass='form-control'
            />
          </div>

          {submitFailed && <p className="error-message">{error}</p>}

          {this.props.children}
        </form>
    )
  }
}

ResearchInfoForm = reduxForm({
  form: 'researchInfoForm',
  validate: researchInfoValidation,
})(ResearchInfoForm)

export default ResearchInfoForm