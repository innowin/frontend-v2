import {Field} from "redux-form";
import renderTextField from "./reduxFormRenderTextField";
import * as React from "react";

export const ReduxFormDateInput = ({translate, labelName, dayName, monthName, yearName}) => {
  return (
      <div className='redux-form-date-container'>
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
  )
}