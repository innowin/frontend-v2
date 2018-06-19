import React from "react"
import {Field, reduxForm} from 'redux-form'
import {BeatLoader} from "react-spinners"
import {validateOrganSignUp1, validateOrganSignUp2} from './validations'
import renderTextField from '../../common/inputs/reduxFormRenderTextField'
import renderSelectField from '../../common/inputs/reduxFormRenderSelect'
// const asyncValidate = (values /*, dispatch */) => {
//   return sleep(1000).then(() => {
//     // simulate server latency
//     if (['john', 'paul', 'george', 'ringo'].includes(values.username)) {
//       throw { username: 'این نام کاربری قبلا استفاده شده است.' }
//     }
//   })
// }

const OrgFormPart1 = ({translator, handleSubmit, OWNERSHIP_TYPES, BUSINESS_TYPES, submitting, onSubmit,
                        submitFailed, error}) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <Field
      name="username"
      type="text"
      component={renderTextField}
      label={translator['Username']}
    />
    <Field name="email" type="email" component={renderTextField} label={translator['Email']}/>
    <Field name="official_name" type="text" component={renderTextField} label={translator['Official name']}/>
    <Field name="national_code" type="text" component={renderTextField} label={translator['National code']}/>
    <Field
      name="organization_type"
      component={renderSelectField}
      label={translator['Organization type']}
      options={OWNERSHIP_TYPES}
    />
    <Field
      name="business_type"
      component={renderSelectField}
      label={translator['Business type']}
      options={BUSINESS_TYPES}
    />
    <div>
      <button
        className="btn btn-primary btn-block login-submit-button mt-0 cursor-pointer"
        disabled={submitting}>
        {!submitting ? translator['Continue'] : (
          <BeatLoader color="#fff" size={10} margin="auto"/>
        )}
      </button>
    </div>
    {submitFailed && <p className="error-message">{error}</p>}
  </form>
);
const OrgFormPart2 = ({translator, handleSubmit, submitting, onSubmit, COUNTRIES, PROVINCES, TOWNS, getProvinces,
                        getTowns, submitFailed, error}) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <Field
      name="country"
      label={translator['Country']}
      options={COUNTRIES}
      component={renderSelectField}
      changeHandler={getProvinces}
    />
    <Field
      name="province"
      label={translator['Province']}
      options={PROVINCES}
      component={renderSelectField}
      changeHandler={getTowns}
    />
    <Field
      name="city"
      label={translator['City']}
      options={TOWNS}
      component={renderSelectField}
    />
    <Field name="password" type="password" component={renderTextField} label={translator['Password']}/>
    <Field name="passwordConfirm" type="password" component={renderTextField} label={translator['Repeat password']}/>
    <div>
      <button
        className="btn btn-primary btn-block login-submit-button mt-0 cursor-pointer"
        disabled={submitting}>
        {!submitting ? translator['Register'] : (
          <BeatLoader color="#fff" size={10} margin="auto"/>
        )}
      </button>
    </div>
    {submitFailed && <p className="error-message">{error}</p>}
  </form>
);
const OrgReduxFormPart1 = reduxForm({
  form: 'orgSignupFormPart1',
  validate:validateOrganSignUp1,
// asyncValidate,
// asyncBlurFields: ['username']
})(OrgFormPart1);

const OrgReduxFormPart2 = reduxForm({
  form: 'orgSignupFormPart2',
  validate:validateOrganSignUp2,
})(OrgFormPart2);


const OrganizationSignupForm = ({
                                  translator, onSubmitPart1, onSubmitPart2, formPart,
                                  ownershipTypesOptions, businessTypesOptions, countriesOptions,
                                  provinceOptions, townOptions, getProvinces, getTowns
                                }) => (
  <div className="organization-signup-form">
    <div className={formPart === 2 ? 'visible-part' : 'hidden-part'}>
      <OrgReduxFormPart2
        translator={translator}
        onSubmit={onSubmitPart2}
        getProvinces={getProvinces}
        getTowns={getTowns}
        COUNTRIES={countriesOptions}
        PROVINCES={provinceOptions}
        TOWNS={townOptions}
      />
    </div>
    <div className={formPart === 1 ? 'visible-part' : 'hidden-part'}>
      <OrgReduxFormPart1
        translator={translator}
        onSubmit={onSubmitPart1}
        OWNERSHIP_TYPES={ownershipTypesOptions}
        BUSINESS_TYPES={businessTypesOptions}
      />
    </div>
  </div>
);

export default OrganizationSignupForm

