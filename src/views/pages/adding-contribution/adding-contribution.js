import React from 'react';
import { Modal, ModalBody } from 'reactstrap'
import MenuProgressive from '../progressive/penu-progressive'
import FontAwesome from 'react-fontawesome'
import { SelectInput } from '../../common/inputs/SelectInput'
import { TextInput } from '../../common/inputs/TextInput'
import { RadioButtonGroup } from '../../common/inputs/RadioButtonInput'
import { TextareaInput } from '../../common/inputs/TextareaInput'
import { CircularCheckbox } from '../../common/inputs/CircularCheckbox'

const categoreisData = [
    {
        value: 'ctgLevel1_1',
        title: 'طبقه اول ۱',
        children: [
            {
                value: 'ctgLevel2_1',
                title: 'طبقه دوم ۱ ',
                children: [
                    { value: 'ctgLevel3_1', title: 'طبقه سوم ۱'},
                    { value: 'ctgLevel3_2', title: 'طبقه سوم ۲'},
                    { value: 'ctgLevel3_3', title: 'طبقه سوم ۳'},
                    { value: 'ctgLevel3_4', title: 'طبقه سوم ۴'},
                ]
            },
            {
                value: 'ctgLevel2_2',
                title: 'طبقه دوم ۲',
                children: [
                    { value: 'ctgLevel3_5', title: 'طبقه سوم ۵'},
                    { value: 'ctgLevel3_6', title: 'طبقه سوم ۶'},
                    { value: 'ctgLevel3_7', title: 'طبقه سوم ۷'},
                    { value: 'ctgLevel3_8', title: 'طبقه سوم ۸'},
                ]
            },
            {
                value: 'ctgLevel2_3',
                title: 'طبقه دوم ۳',
                children: [
                    { value: 'ctgLevel3_9', title: 'طبقه سوم ۹'},
                    { value: 'ctgLevel3_10', title: 'طبقه سوم ۱۰'},
                ]
            }
        ]
    },
    {
        value: 'ctgLevel1_2',
        title: 'طبقه اول ۲',
        children: [
            {
                value: 'ctgLevel2_4',
                title: 'طبقه دوم ۴',
                children: [
                    { value: 'ctgLevel3_11', title: 'طبقه سوم ۱۱'},
                    { value: 'ctgLevel3_12', title: 'طبقه سوم ۱۲'},
                    { value: 'ctgLevel3_13', title: 'طبقه سوم ۱۳'},
                ]
            },
            {
                value: 'ctgLevel2_5',
                title: 'طبقه دوم ۵',
                children: [
                    { value: 'ctgLevel3_14', title: 'طبقه سوم ۱۴'},
                ]
            },
            {
                value: 'ctgLevel2_6',
                title: 'طبقه دوم ۶',
                children: [
                    { value: 'ctgLevel3_15', title: 'طبقه سوم ۱۵'},
                ]
            }
        ]
    },
    {
        value: 'ctgLevel1_3',
        title: 'طبقه اول ۳',
        children: [
            {
                value: 'ctgLevel2_7',
                title: 'طبقه دوم ۷',
                children: [
                    { value: 'ctgLevel3_16', title: 'طبقه سوم ۱۶'},
                    { value: 'ctgLevel3_17', title: 'طبقه سوم ۱۷'},
                    { value: 'ctgLevel3_18', title: 'طبقه سوم ۱۸'},
                    { value: 'ctgLevel3_19', title: 'طبقه سوم ۱۹'},
                ]
            },
        ]
    },
]

const newContributionStepData = {
    desc: {
        svg: 'user',
        text: 'اورده در سامانه دانشبوم دارایی تومندی یا ارزشی‌ست که کاربران اعم از مجموعه‌ها و افراد ارایه می‌دهند . قابلیت عرضه در بورس‌ها کارگزاری و انجام معامله آن وجود دارد. محصولات تولیدی توانمندی‌ها تاییدیه‌ها گواهی‌نامه‌ها خدمات مشاوره . زیرساخت‌های قابل اشتراک از انواع آورده در سامانه دانشبوم هستند.',
    },
    categoreis: [
        {
            value: '1',
            svg: 'user',
            title: 'محصول',
        },
        {
            value: '2',
            svg: 'user',
            title: 'توانمندی',
        },
        {
            value: '3',
            svg: 'user',
            title: 'تاییدیه',
        },
        {
            value: '4',
            svg: 'user',
            title: 'مشاوره',
        },
        {
            value: '5',
            svg: 'user',
            title: 'زیرساخت قابل اشتراک',
        },
    ],
}

const WRAPPER_CLASS_NAMES = {
    ENTERING: 'entering',
    ENTERED: 'entered',
    EXITING: 'exiting',  
}
const PROGRESSIVE_STATUS_CHOICES = {
    GOING_NEXT: 'going-next',
    GOING_PREV: 'going-next',
    ACTIVE: 'active'
}
class Contribution extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      wrapperClassName: WRAPPER_CLASS_NAMES.ENTERING,
      activeStep: 1,
      progressSteps: [
          { title: 'گام اول', icon: 'circle' },
          { title: 'گام دوم', icon: 'circle-o' },
          { title: 'گام سوم', icon: 'circle' },
          { title: 'گام چهارم', icon: 'circle-o' },
          { title: 'گام پنجم', icon: 'circle' },
      ],
      progressStatus: PROGRESSIVE_STATUS_CHOICES.ACTIVE,
      newContributionData: {}
    };
  }

  _nextStep = () => {
    const { activeStep, progressSteps } = this.state
    if (activeStep < progressSteps.length) this._setStep((activeStep + 1), PROGRESSIVE_STATUS_CHOICES.GOING_NEXT)
  }

  _prevStep = () => {
      const { activeStep } = this.state
      if (activeStep !== 1) this._setStep((activeStep - 1), PROGRESSIVE_STATUS_CHOICES.GOING_PREV)
  }

  _setStep = (newStep, status) => {
      this.setState({
          ...this.state,
          activeStep: newStep,
          progressStatus: status,
          wrapperClassName: WRAPPER_CLASS_NAMES.EXITING,
        },
        this._afterStepChanging)
  }

  _afterStepChanging = () => {
      setTimeout(() => this.setState({ ...this.state, progressStatus: PROGRESSIVE_STATUS_CHOICES.ACTIVE, wrapperClassName: WRAPPER_CLASS_NAMES.ENTERED, }), 10)
    }

  _newContributionCategoryHandler = (category) => {
      const data = { ...this.state.newContributionData, category: category }
      this.setState({ ...this.state, newContributionData: data})
  }
  _switchContent = () => {
    const { newContributionData, activeStep } = this.state
    switch (activeStep) {
        case 1:
            return (
                    <Certificates
                        goToNextStep={this._nextStep}
                        goToPrevStep={this._prevStep}
                    />
                )
        
        case 2:
            return (
                <InitialInfo
                    goToNextStep={this._nextStep}
                    goToPrevStep={this._prevStep}
                />
            )
        
        case 3:
            return (<InitialInfo
                        goToNextStep={this._nextStep}
                        goToPrevStep={this._prevStep}
                    />)
        
        case 4:
            return (
                <NewContribution
                        desc={newContributionStepData.desc}
                        categoreis={newContributionStepData.categoreis}
                        goToNextStep={this._nextStep}
                        goToPrevStep={() => this.setState({ ...this.state, modalIsOpen: false })}
                        selectedCategory={newContributionData.category}
                        selectCategoryHandler={this._newContributionCategoryHandler}
                />
            )
        default:
            return <span>{' '}</span>
    }
  }

  render() {
    const { modalIsOpen, activeStep, progressSteps, progressStatus, wrapperClassName } = this.state
    return (
      <div>
        <button color="danger" onClick={() => this.setState({ ...this.state, modalIsOpen: true})}>test</button>
        <Modal className="exchanges-modal" size="lg" isOpen={modalIsOpen} backdrop={false}>
          <ModalBody className="adding-contribution-wrapper">
            <div className="progressive-wrapper">
                <MenuProgressive 
                    steps={progressSteps}
                    activeStep={activeStep}
                    status={progressStatus}
                />
            </div>
            <div className={`wrapper ${wrapperClassName}`}>
                {this._switchContent()}
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const NewContribution = ({
    desc, categoreis, goToNextStep, goToPrevStep, selectedCategory, selectCategoryHandler, className
}) => (
    <div className="new-contribution-wrapper">
        <div className="desc">
            <div className="image">
                <FontAwesome size="3x" name={desc && desc.svg} />
            </div>
            <div className="text">
                <p>{desc && desc.text}</p>
            </div>
        </div>
        <div className="categories-wrapper">
            <h5>انتخاب نوع آورده</h5>
            <div className="categories">
                {categoreis && categoreis.map(category =>
                    <div
                        onClick={selectCategoryHandler.bind(null, category.value)}
                        key={`category${category.value}`}
                        className={selectedCategory === category.value ? 
                            'category pointer active' : 'category pointer'
                        }
                    >
                        <div className="image">
                            <FontAwesome size='5x' name={category.svg} />
                        </div>
                        <span className="title">{category.title}</span>
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
/* !toDo the field name 'currency' need for changing in future. 
may be needed for fetching and creating a search box */
const InitialInfo = ({ goToNextStep, goToPrevStep }) => (
    <div className="initial-info">
        <div className="form">
            <div className="form-column">
                <TextInput label="عنوان آورده" name="name" />
                <SelectInput options={categoreisData} label="طبقه اول دسته‌بندی" name="category_level1" placeholder="لطفا انتخاب کنید" />
                <SelectInput options={categoreisData} label="طبقه دوم دسته‌بندی" name="category_level2" placeholder="لطفا انتخاب کنید" />
                <SelectInput options={categoreisData} label="طبقه سوم دسته‌بندی" name="category_level3" placeholder="لطفا انتخاب کنید" />
            </div>
            <div className="form-column">
                <TextInput label="محدوده جغرافیایی" name="province" />
                <RadioButtonGroup
                    label="قیمت"
                    name="priceStatus"
                    items={[
                        { title: 'معین', value: 'specified' },
                        { title: 'تماس با عرضه‌کننده', value: 'call_with_owner' }
                    ]}
                />
                <TextInput value="IRR" label=" " name="currency" />
                <TextareaInput name="description" label="توصیف اجمالی محصول" />
            </div>
        </div>
        <NextPrevBtns
            prevBtnTitle="قبلی"
            goToNextStep={goToNextStep}
            goToPrevStep={goToPrevStep}
        />
    </div>
)

const Certificates = ({ goToNextStep, goToPrevStep }) => (
    <div className="certificates">
        <div className="form">
            <div className="form-column">
                <div className="title">
                    <TextInput label="عنوان گواهینامه" name="name" />                
                </div>
                <div className="verification-request-wrapper">
                    <FontAwesome name="fa-dollar" />
                    <CircularCheckbox name="verification_request" label="درخواست اعتبارسنجی توسط دانش‌بوم" />
                </div>
            </div>
            <div className="form-column">
                <div className="logo-upload">
                    <label>بارگزاری لوگو</label>
                    <div className="file-btn">
                        انتخاب فایل
                        <input type="file" name="logo" />
                    </div>
                </div>
                <div className="image-upload">
                    <label>
                        بارگزاری تصویر گواهینامه
                    </label>
                    <div className="file-btn">
                        انتخاب فایل
                        <input type="file" name="certificate_image" />
                    </div>
                </div>
                <div className="submit">ثبت</div>
            </div>
        </div>
        <div className="images">
            <div className="image"></div>
            <div className="image"></div>
            <div className="image"></div>
        </div>
        <NextPrevBtns
            prevBtnTitle="قبلی"
            goToNextStep={goToNextStep}
            goToPrevStep={goToPrevStep}
        />
    </div>
)

const NextPrevBtns = ({ goToNextStep, goToPrevStep, tips, prevBtnTitle }) => (
    <div className="next-prev-btns">
        <div onClick={goToPrevStep} className="prev pointer">{prevBtnTitle}</div>
        {tips && <div className="tips">s</div>}
        <div onClick={goToNextStep} className="next pointer">بعدی</div>
    </div>
)

export default Contribution