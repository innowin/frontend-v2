// @flow
import * as React from 'react'
import NextPrevBtns from './nextAndPrevBtns'
import Desc from "../../common/Text/Tip"


type MainCategoriesProps = {
  categories: Array<CategoryType>,
  selectCategoryHandler: Function,
  selectedCategory?: string
}

const MainCategories = (props: MainCategoriesProps) => {
  const {categories, selectCategoryHandler, selectedCategory} = props
  return (
      <div className="categories-wrapper">
        <h5 className="header">انتخاب نوع آورده:</h5>
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
                <div className="title">{category.label}</div>
              </div>
          )}
        </div>
      </div>
  )
}


type CategoryType = {
  value: string,
  title: string,
  svg: React.Node
}

type NewContributionProps = {
  categories: Array<CategoryType>,
  goToNextStep: Function,
  goToPrevStep: Function,
  selectedCategory?: string,
  selectCategoryHandler: Function
}

const NewContribution = (props: NewContributionProps) => {
  const {
    categories, goToNextStep, goToPrevStep, selectedCategory, selectCategoryHandler
  } = props
  return (
      <div className="new-contribution-wrapper">
        <Desc desc="اورده در سامانه اینوین دارایی تومندی یا ارزشی‌ست که کاربران اعم از مجموعه‌ها و افراد ارایه
              می‌دهند . قابلیت عرضه در پنجره‌ها کارگزاری و انجام معامله آن وجود دارد. محصولات تولیدی
              توانمندی‌ها تاییدیه‌ها گواهی‌نامه‌ها خدمات مشاوره . زیرساخت‌های قابل اشتراک از انواع آورده در
              سامانه اینوین هستند."/>
        <MainCategories
            selectCategoryHandler={selectCategoryHandler}
            categories={categories}
            selectedCategory={selectedCategory}
        />
        <NextPrevBtns
            prevBtnTitle="لغو"
            goToNextStep={selectedCategory ? goToNextStep : ''}
            isGoToNextBtnDisabled={!selectedCategory}
            goToPrevStep={goToPrevStep}
        />
      </div>
  )
}
export default NewContribution