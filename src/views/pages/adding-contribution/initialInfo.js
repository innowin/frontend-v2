import React from 'react'
import StateLessTextInput from '../../common/inputs/StateLessTextInput'
import StateLessTextarea from '../../common/inputs/StateLessTextarea'
import Select from 'react-select';
import {RadioButtonGroup} from '../../common/inputs/RadioButtonInput'
import {categoriesData, LAYER1S} from './addingConributionData'
import NextPrevBtns from './nextAndPrevBtns'


const InitialInfo = ({goToNextStep, goToPrevStep, newContributionData, inputHandler}) => (
    <div className="initial-info">
        <div className="form">
            <div className="form-column">
                <StateLessTextInput
                    value={newContributionData[LAYER1S.NAME]}
                    label="عنوان آورده"
                    onChange={(e) => inputHandler(e.target.value, LAYER1S.NAME)}
                />
                {[LAYER1S.CATEGORY_LAYER1, LAYER1S.CATEGORY_LAYER2, LAYER1S.CATEGORY_LAYER3].map(layerName =>(
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
                ))}
            </div>
            <div className="form-column">
                <StateLessTextInput
                    label="محدوده جغرافیایی"
                    onChange={(e) => inputHandler(e.target.value, LAYER1S.PROVINCE)}
                    value={newContributionData[LAYER1S.PROVINCE]}
                />
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
                <StateLessTextInput
                    placeholder="IRR"
                    value={newContributionData[LAYER1S.CURRENCY]}
                    onChange={(e) => inputHandler(e.target.value, LAYER1S.CURRENCY)}
                />
                <StateLessTextarea
                    value={newContributionData[LAYER1S.DESCRIPTION]}
                    name={LAYER1S.DESCRIPTION}
                    label="توصیف اجمالی محصول"
                    onChange={(e) => inputHandler(e.target.value, LAYER1S.DESCRIPTION)}
                />
            </div>
        </div>
        <NextPrevBtns
            goToNextStep={goToNextStep}
            goToPrevStep={goToPrevStep}
        />
    </div>
)


export default InitialInfo