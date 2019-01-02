import {Field} from "redux-form";
import renderTextField from "./reduxFormRenderTextField";
import * as React from "react";
import renderSelectM from "./reduxFormRenderSelectM";
import InformationIcon from "../../../images/common/information_svg";

export const ReduxFormDateInput = (props) => {
  const {translate, labelName, dayName, monthName, yearName, isNew, tipText} = props
  const years = [...Array(50).keys()].map(n => n + 1340)
  const months = [...Array(12).keys()].map(n => n + 1)
  const days = [...Array(31).keys()].map(n => n + 1)

  return (
      !isNew
          ? <div className='redux-form-date-container'>
            <label>
              {labelName + ": "}
            </label>
            <div className='date-container'>
              <Field
                  name={dayName}
                  type="text"
                  className='date-part-container'
                  component={renderTextField}
                  label={translate['Day']}
                  textFieldClass='form-control'
              />
              <Field
                  name={monthName}
                  type="text"
                  className='date-part-container'
                  component={renderTextField}
                  label={translate['Month']}
                  textFieldClass='form-control'
              />
              <Field
                  name={yearName}
                  type="text"
                  className='date-part-container'
                  component={renderTextField}
                  label={translate['Year']}
                  textFieldClass='form-control'
              />
            </div>
          </div>
          : <div className="redux-form-date-container-m">
            <div className='redux-form-date-parts-container'>
              <Field
                  name={dayName}
                  component={renderSelectM}
                  label={translate['Day']}
                  options={days}
              />

              <Field
                  name={monthName}
                  component={renderSelectM}
                  label={translate['Month']}
                  options={months}
              />
              <Field
                  name={yearName}
                  component={renderSelectM}
                  label={translate['Year']}
                  options={years}
              />
            </div>
            {tipText &&
            <div className='tooltip-container'>
              <InformationIcon className='info-icon'/>
              <p>{tipText}</p>
            </div>
            }
          </div>
  )
}