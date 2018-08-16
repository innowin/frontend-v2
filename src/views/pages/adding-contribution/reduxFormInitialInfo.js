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
import renderRadioButtonGroup from "../../common/inputs/rdxRenderCircularRadioButtonGroup"
import helpers from "src/consts/helperFunctions"


const InitialInfoReduxFormValidate = (values) => {
    const errors = {}
    return errors
}

type CountryType = {
    id: number,
    name: string
}

type CountriesType = {
    content: {[number]: CountryType}
}

type CategoriesType = {
    content: {},
    isLoading: boolean,
    isLoaded: boolean
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
    submitFailed: boolean,
    initialInfoFormState: {},
    categories: CategoriesType,
    countries: CountriesType,
    countryChangeHandler: Function,
    provinceChangeHandler: Function,
    provinces: {},
    cities: {}
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
        submitFailed,
        initialInfoFormState={},
        categories,
        countries,
        provinces,
        cities,
        countryChangeHandler,
        provinceChangeHandler
    } = props

    const {objToArrayAsOptions, filterNestedObjByKey} = helpers
    const setCategoriesObjByLevel = (layerName) => {
        const categoriesObj = categories.content
        switch (layerName) {
            case LAYER1S.CATEGORY_LAYER2: {
                if (initialInfoFormState && initialInfoFormState[LAYER1S.CATEGORY_LAYER1]) {
                    return filterNestedObjByKey(categoriesObj, 'category_parent',
                        +initialInfoFormState[LAYER1S.CATEGORY_LAYER1].value)
                }
                return {}
            }

            case LAYER1S.CATEGORY_LAYER3: {
                if (initialInfoFormState && initialInfoFormState[LAYER1S.CATEGORY_LAYER2]) {
                    return filterNestedObjByKey(categoriesObj, 'category_parent',
                        +initialInfoFormState[LAYER1S.CATEGORY_LAYER2].value)
                }
                return {}
            }
            default: return categoriesObj
        }
    }

    const countriesList = objToArrayAsOptions(countries.content, 'id', 'name')

    const provincesList = objToArrayAsOptions(provinces.content, 'id', 'name')

    const citiesList = objToArrayAsOptions(cities.content, 'id', 'name')

    return (
        <form onSubmit={handleSubmit(() => {})}>
            <div className="initial-info">
                <div className="form">
                    <div className="form-column">
                        <Field name="name" type="text" component={renderTextField}
                               label="عنوان آورده" className="form-group"/>

                        {[LAYER1S.CATEGORY_LAYER1, LAYER1S.CATEGORY_LAYER2, LAYER1S.CATEGORY_LAYER3].map(layerName => (
                            <Field key={layerName}
                                   placeholder=""
                                   id={layerName}
                                   className="category-selection"
                                   name={layerName}
                                   component={renderSelectField}
                                   label={layerName === LAYER1S.CATEGORY_LAYER1 ? 'طبقه اول دسته‌بندی'
                                       :
                                       (layerName === LAYER1S.CATEGORY_LAYER2 ? 'طبقه دوم دسته‌بندی' : 'طبقه سوم دسته‌بندی')
                                   }
                                   noResultsText={'چنین دسته‌بندی وجود ندارد.'}
                                   options={
                                       objToArrayAsOptions(setCategoriesObjByLevel(layerName), 'id', 'name')
                                   }
                            />
                        ))}
                    </div>
                    <div className="form-column">

                            <Field key={LAYER1S.COUNTRY}
                                   placeholder="کشور"
                                   id={LAYER1S.COUNTRY}
                                   className="location-select"
                                   name={LAYER1S.COUNTRY}
                                   component={renderSelectField}
                                   label="کشور"
                                   noResultsText={`چنین کشوری وجود ندارد`}
                                   options={countriesList}
                                   onChange={countryChangeHandler}
                            />
                        <Field key={LAYER1S.PROVINCE}
                               placeholder="استان"
                               id={LAYER1S.PROVINCE}
                               className="location-select"
                               name={LAYER1S.PROVINCE}
                               component={renderSelectField}
                               label="استان"
                               noResultsText={`چنین استان وجود ندارد`}
                               options={provincesList}
                               onChange={provinceChangeHandler}
                        />
                        <Field key={LAYER1S.CITY}
                               placeholder="شهر"
                               id={LAYER1S.CITY}
                               className="location-select"
                               name={LAYER1S.CITY}
                               component={renderSelectField}
                               label="شهر"
                               noResultsText={`چنین شهری وجود ندارد`}
                               options={citiesList}
                        />

                        <RadioButtonGroup
                            label="قیمت"
                            name={LAYER1S.PRICE_STATUS}
                            handler={value => inputHandler(value, LAYER1S.PRICE_STATUS)}
                            items={[
                                {title: 'معین', value: 'specified'},
                                {title: 'تماس با عرضه‌کننده', value: 'call'}
                            ]}
                            selected={newContributionData[LAYER1S.PRICE_STATUS]}
                        />

                        <Field name={'IRR'} type="text" component={renderTextField}
                               label="IRR" className="form-group"/>

                        <Field name={LAYER1S.DESCRIPTION} type="text" component={renderTextArea}
                               label="توصیف اجمالی محصول" className="form-group desc"/>

                    </div>
                </div>
                <NextPrevBtns
                    goToNextStep={goToNextStep}
                    goToPrevStep={goToPrevStep}
                />
            </div>
        </form>
    )
}

InitialInfoReduxForm = reduxForm({
    form: 'addingContributionInitialInfoForm',
    validate: InitialInfoReduxFormValidate,
})(InitialInfoReduxForm)

export default InitialInfoReduxForm