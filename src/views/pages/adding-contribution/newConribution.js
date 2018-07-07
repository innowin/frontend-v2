import React from 'react'
import FontAwesome from 'react-fontawesome'
import NextPrevBtns from './nextAndPrevBtns'
import {TipsIcon} from '../../../images/icons'

const NewContribution = ({
                             categories, goToNextStep, goToPrevStep, selectedCategory, selectCategoryHandler
                         }) => (
    <div className="new-contribution-wrapper">
        <div className="desc">
            <div className="icon-wrapper">
                <TipsIcon className="tip-icon" />
            </div>
            <div className="text">
                <p>
                    اورده در سامانه دانشبوم دارایی تومندی یا ارزشی‌ست که کاربران اعم از مجموعه‌ها و افراد ارایه می‌دهند . قابلیت عرضه در بورس‌ها کارگزاری و انجام معامله آن وجود دارد. محصولات تولیدی توانمندی‌ها تاییدیه‌ها گواهی‌نامه‌ها خدمات مشاوره . زیرساخت‌های قابل اشتراک از انواع آورده در سامانه دانشبوم هستند.
                </p>
            </div>
        </div>
        <div className="categories-wrapper">
            <h5 className="header">انتخاب نوع آورده</h5>
            <div className="categories">
                {categories && categories.map(category =>
                    <div
                        onClick={() => selectCategoryHandler(category.value)}
                        key={`category${category.value}`}
                        className={selectedCategory === category.value ?
                            'category pointer active' : 'category pointer'
                        }
                    >
                        <div className="image">
                            {category.svg}
                        </div>
                        <div className="title">{category.title}</div>
                    </div>
                )}
            </div>
        </div>
        <NextPrevBtns
            prevBtnTitle="لغو"
            goToNextStep={goToNextStep}
            goToPrevStep={goToPrevStep}
        />
    </div>
)
export default NewContribution