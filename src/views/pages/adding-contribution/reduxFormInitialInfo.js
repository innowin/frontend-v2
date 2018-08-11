// @flow
import * as React from 'react'
import StateLessTextInput from '../../common/inputs/StateLessTextInput'
import StateLessTextarea from '../../common/inputs/StateLessTextarea'
import Select from 'react-select';
import {RadioButtonGroup} from '../../common/inputs/RadioButtonInput'
import {categoriesData, LAYER1S} from './addingConributionData'
import NextPrevBtns from './nextAndPrevBtns'
import {reduxForm, Field} from "redux-form";
import renderTextField from "../../common/inputs/reduxFormRenderTextField"
import renderSelectField from "../../common/inputs/reduxFormRenderReactSelect"
import renderTextArea from "../../common/inputs/reduxFormRenderTextArea"

const InitialInfoReduxFormValidate = (values) => {
    const errors = {}
    return errors
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
    submitFailed: boolean
}

let InitialInfoReduxForm = (props: InitialInfoProps) => {

    const {
        goToNextStep,
        goToPrevStep,
        newContributionData,
        inputHandler,
        handleSubmit,
        onSubmit,
        submitting,
        error,
        submitFailed
    } = props

    return (
        <form onSubmit={handleSubmit(v => console.log('values is: ', v))}>
            <div className="initial-info">
                <div className="form">
                    <div className="form-column">

                        <Field name="name" type="text" component={renderTextField}
                               label="عنوان آورده"/>

                        /*
                                                <StateLessTextInput
                                                    value={newContributionData[LAYER1S.NAME]}
                                                    label="عنوان آورده"
                                                    onChange={(e) => inputHandler(e.target.value, LAYER1S.NAME)}
                                                />
                        */

                        {[LAYER1S.CATEGORY_LAYER1, LAYER1S.CATEGORY_LAYER2, LAYER1S.CATEGORY_LAYER3].map(layerName => (

                            /*
                               <div className="category-selection" key={layerName}>

                                   <label htmlFor={layerName}>
                                       {layerName === LAYER1S.CATEGORY_LAYER1 ? 'طبقه اول دسته‌بندی'
                                           :
                                           (layerName === LAYER1S.CATEGORY_LAYER2 ? 'طبقه دوم دسته‌بندی' : 'طبقه سوم دسته‌بندی')
                                       }
                                   </label>
                                   <Select
                                       id={layerName}
                                       placeholder=""
                                       onChange={(opt) => inputHandler(opt, layerName)}
                                       rtl
                                       options={categoriesData}
                                       // noResultsText={translator['No result found']}
                                       value={newContributionData && newContributionData[layerName]}
                                   />
                               </div>
   */
                            <Field key={layerName}
                                   className="category"
                                   name={layerName}
                                   placeholder={layerName === LAYER1S.CATEGORY_LAYER1 ? 'طبقه اول دسته‌بندی'
                                       :
                                       (layerName === LAYER1S.CATEGORY_LAYER2 ? 'طبقه دوم دسته‌بندی' : 'طبقه سوم دسته‌بندی')
                                   }
                                   component={renderSelectField}
                                   label={'category'}
                                   noResultsText={'چنین دسته‌بندی وجود ندارد.'}
                                   options={categoriesData}
                            />


                        ))}
                    </div>
                    <div className="form-column">

                        <Field name="place" type="text" component={renderTextField}
                               label="محدوده جغرافیایی"/>

                        /*
                        <StateLessTextInput
                            label="محدوده جغرافیایی"
                            onChange={(e) => inputHandler(e.target.value, LAYER1S.PROVINCE)}
                            value={newContributionData[LAYER1S.PROVINCE]}
                        />
                        */



                        <RadioButtonGroup
                            label="قیمت"
                            name={LAYER1S.PRICE_STATUS}
                            handler={value => inputHandler(value, LAYER1S.PRICE_STATUS)}
                            items={[
                                {title: 'معین', value: 'specified'},
                                {title: 'تماس با عرضه‌کننده', value: 'call_with_owner'}
                            ]}
                            selected={newContributionData[LAYER1S.PRICE_STATUS]}
                        />

                        <Field name={'IRR'} type="text" component={renderTextField}
                               label="IRR"/>

                        /*
                        <StateLessTextInput
                            placeholder="IRR"
                            value={newContributionData[LAYER1S.CURRENCY]}
                            onChange={(e) => inputHandler(e.target.value, LAYER1S.CURRENCY)}
                        />
                        */

                        <Field name={LAYER1S.DESCRIPTION} type="text" component={renderTextArea}
                               label="توصیف اجمالی محصول"/>


                        /*
                        <StateLessTextarea
                            value={newContributionData[LAYER1S.DESCRIPTION]}
                            name={LAYER1S.DESCRIPTION}
                            label="توصیف اجمالی محصول"
                            onChange={(e) => inputHandler(e.target.value, LAYER1S.DESCRIPTION)}
                        />
                        */
                    </div>
                </div>
                <NextPrevBtns
                    goToNextStep={goToNextStep}
                    goToPrevStep={goToPrevStep}
                />
            </div>
            <button type="submit btn btn-success">sss</button>
        </form>
    )
}

InitialInfoReduxForm = reduxForm({
    form: 'initialInfoReduxForm',
    validate: InitialInfoReduxFormValidate,
})(InitialInfoReduxForm)

export default InitialInfoReduxForm