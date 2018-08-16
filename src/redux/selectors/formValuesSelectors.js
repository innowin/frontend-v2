import { createSelector } from 'reselect'


/**
 function 'getFormValues' accept (state, formName) properties and return the values of form on
 state.form.formName
 the below code is what we doing for example in view component.

 someThingYouWantFromState: getFormValues(state, 'theNameOfTheFormThatYouNeed')
 **/

const getValues = (state, formName) => state.form[formName]


export const getFormValues = createSelector(
    getValues,
    formState => { if (formState) return formState.values }
)