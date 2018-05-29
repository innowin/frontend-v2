import React from 'react';
import { Modal, ModalBody } from 'reactstrap'
import MenuProgressive from '../progressive/penu-progressive'
import FontAwesome from 'react-fontawesome'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

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

const CONTENTS = {
    NEW: 'new/contribution'
}

class Contribution extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      contentNum: 0,
      activeStep: 0,
      progressSteps: [
          { title: 'گام اول', icon: 'circle' },
          { title: 'گام دوم', icon: 'circle-o' },
          { title: 'گام سوم', icon: 'circle' },
          { title: 'گام چهارم', icon: 'circle-o' },
          { title: 'گام پنجم', icon: 'circle' },
      ],
      progressStatus: 'active',
      newContributionData: {}
    };
  }

  _nextStep = () => {
    const { activeStep, progressSteps } = this.state
    if (activeStep < progressSteps.length) this._setStep((activeStep + 1), 'going-next')
  }

  _prevStep = () => {
      const { activeStep } = this.state
      if (activeStep !== 1) this._setStep((activeStep - 1), 'going-prev')
  }

  _setStep = (newStep, status) => {
      this.setState({ ...this.state, activeStep: newStep, progressStatus: status}, this._afterStepChanging)
  }
  
  _setContentNum = () => setTimeout(() => this.setState({ ...this.state, contentNum: this.state.activeStep }), 2020)

  _afterStepChanging = () => {
      setTimeout(() => this.setState({ ...this.state, progressStatus: 'active' }), 10)
      this._setContentNum()
  }


  _toggleModal = () => {
      const { activeStep } = this.state;
      this.setState({ ...this.state, modalIsOpen: !this.state.modalIsOpen })
      if (activeStep === 0) {
          setTimeout(() => this.setState({ ...this.state, activeStep: 1}, this._setContentNum), 10)
      }
    }

  _newContributionCategoryHandler = (category) => {
      const data = { ...this.state.newContributionData, category: category }
      this.setState({ ...this.state, newContributionData: data}, () => console.log(this.state))
  }
  _switchContent = () => {
    const { content, newContributionData } = this.state
    switch (content) {
        case CONTENTS.NEW:
            return (<NewContribution 
                        desc={newContributionStepData.desc}
                        categoreis={newContributionStepData.categoreis}
                        goToNextStep={this._nextStep}
                        goToPrevStep={this._toggleModal}
                        nextBtnTitle="لغو"
                        selectedCategory={newContributionData.category}
                        selectCategoryHandler={this._newContributionCategoryHandler}
                   />)
        default:
            return ''
    }
  }

  render() {
    const { modalIsOpen, activeStep, contentNum, progressSteps, progressStatus, newContributionData} = this.state
    return (
      <div>
        <button color="danger" onClick={this._toggleModal}>test</button>
        <Modal className="exchanges-modal" size="lg" isOpen={modalIsOpen} toggle={this._toggleModal} backdrop={false}>
          <ModalBody className="adding-contribution-wrapper">
            <div className="progressive-wrapper">
                <MenuProgressive 
                    steps={progressSteps}
                    activeStep={activeStep}
                    status={progressStatus}
                />
            </div>
            <div className="wrapper">
                    <CSSTransition
                        in={contentNum === 1}
                        timeout={1000}
                        classNames="new-contribution-step"
                        unmountOnExit
                    >
                        <NewContribution 
                            desc={newContributionStepData.desc}
                            categoreis={newContributionStepData.categoreis}
                            goToNextStep={this._nextStep}
                            goToPrevStep={this._toggleModal}
                            nextBtnTitle="لغو"
                            selectedCategory={newContributionData.category}
                            selectCategoryHandler={this._newContributionCategoryHandler}
                        />
                    </CSSTransition>
                    <CSSTransition
                        in={contentNum === 2}
                        timeout={1000}
                        classNames="new-contribution-step"
                        unmountOnExit
                    >
                        <InitialInfo />
                    </CSSTransition>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}


// const ContentHandler = ({ content }) => {
//     switch (content) {
//         case CONTENTS.NEW:
//             return <NewContribution desc={newContributionData.desc} categoreis={newContributionData.categoreis} />
//         default:
//             return ''
//     }
// }


const NewContribution = ({
    desc, categoreis, goToNextStep, goToPrevStep, nextBtnTitle, selectedCategory, selectCategoryHandler
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
            nextBtnTitle={nextBtnTitle}
            goToNextStep={goToNextStep}
            goToPrevStep={goToPrevStep}
        />
    </div>
)
const InitialInfo = () => (
    <div className="initial-info">hikkkk</div>
)

const NextPrevBtns = ({ goToNextStep, goToPrevStep, tips, nextBtnTitle }) => (
    <div className="next-prev-btns">
        <button onClick={goToPrevStep} className="prev pointer">{nextBtnTitle}</button>
        {tips && <div className="tips">s</div>}
        <button onClick={goToNextStep} className="next pointer">بعدی</button>
    </div>
)

export default Contribution