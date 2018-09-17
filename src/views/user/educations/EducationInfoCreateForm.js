// flow type of EducationInfoForm
import * as React from "react";
import {Component} from "react";
import PropTypes from "prop-types";

import EducationInfoForm from './EducationInfoForm'

type PropsEducationInfoForm = {
  create: Function,
  hideCreateForm: Function,
  translate: { [string]: string },
  userId: number,
}

class EducationInfoCreateForm extends Component<PropsEducationInfoForm> {
  static propTypes = {
    hideCreateForm: PropTypes.func.isRequired,
    create: PropTypes.func.isRequired,
    translate: PropTypes.object.isRequired,
    userId: PropTypes.number.isRequired,
  }

  _onSumbit = () => {
    const {hideCreateForm} = this.props
    hideCreateForm()
  }

  constructor(props) {
    super(props);
    this.state = {confirm: false};
  }

  render() {
    const {translate, userId, education} = this.props
    return (
        <EducationInfoForm userId={userId}
                       translate={translate}
                       onSubmit={this._onSubmit}>
          <div className="col-12 d-flex justify-content-end">
            <button type="button" className="btn btn-secondary mr-2" onClick={this.props.hideEdit}>
              {translate['Cancel']}
            </button>
            <button type="submit" className="btn btn-success">{translate['Save']}</button>
          </div>
        </EducationInfoForm>
    )
  }
}

export default EducationInfoCreateForm