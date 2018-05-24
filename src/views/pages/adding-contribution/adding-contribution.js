import React from 'react';
import { Modal, ModalBody } from 'reactstrap'
import MenuProgressive from '../progressive/penu-progressive'
import FontAwesome from 'react-fontawesome'

const newContributionData = {
    desc: {
        svg: 'user',
        text: 'اورده در سامانه دانشبوم دارایی تومندی یا ارزشی‌ست که کاربران اعم از مجموعه‌ها و افراد ارایه می‌دهند . قابلیت عرضه در بورس‌ها کارگزاری و انجام معامله آن وجود دارد. محصولات تولیدی توانمندی‌ها تاییدیه‌ها گواهی‌نامه‌ها خدمات مشاوره . زیرساخت‌های قابل اشتراک از انواع آورده در سامانه دانشبوم هستند.',
    },
    categoreis: [
        {
            id: '1',
            svg: 'user',
            title: 'محصول',
        },
        {
            id: '2',
            svg: 'user',
            title: 'توانمندی',
        },
        {
            id: '3',
            svg: 'user',
            title: 'تاییدیه',
        },
        {
            id: '4',
            svg: 'user',
            title: 'مشاوره',
        },
        {
            id: '5',
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
      contnet: CONTENTS.NEW,
      progressActiveStep: 1,
      progressSteps: [
          { title: 'گام اول', icon: 'circle' },
          { title: 'گام دوم', icon: 'circle-o' },
          { title: 'گام سوم', icon: 'circle' },
          { title: 'گام چهارم', icon: 'circle-o' },
          { title: 'گام پنجم', icon: 'circle' },
      ],
      progressStatus: 'active'
    };
  }

  _nextStep = () => {
    const { progressActiveStep, progressSteps } = this.state
    if (progressActiveStep < progressSteps.length) this._setStep((progressActiveStep + 1), 'going-next')
  }

  _prevStep = () => {
      const { progressActiveStep } = this.state
      if (progressActiveStep !== 1) this._setStep((progressActiveStep - 1), 'going-prev')
  }

  _setStep = (newStep, status) => {
      this.setState({ ...this.state, progressActiveStep: newStep, progressStatus: status}, this._setWidth)
  }

  _setWidth = () => {
      setTimeout(() => this.setState({ ...this.state, progressStatus: 'active' }), 10)
  }


  _toggleModal = () => this.setState({ ...this.state, modalIsOpen: !this.state.modalIsOpen })

  render() {
    const { modalIsOpen, contnet, progressActiveStep, progressSteps, progressStatus} = this.state
    return (
      <div>
        <button color="danger" onClick={this._toggleModal}>test</button>
        <Modal className="exchanges-modal" size="lg" isOpen={modalIsOpen} toggle={this._toggleModal} backdrop={false}>
          <ModalBody className="adding-contribution-wrapper">
            <div className="progressive-wrapper">
                <MenuProgressive 
                    steps={progressSteps}
                    activeStep={progressActiveStep}
                    status={progressStatus}
                />
            </div>
            <div className="wrapper">
                <ContentHandler content={contnet} />
                <NextPrevBtns nextStep={this._nextStep} prevStep={this._prevStep} />
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}


const ContentHandler = ({ content }) => {
    switch (content) {
        case CONTENTS.NEW:
            return <NewContribution desc={newContributionData.desc} categoreis={newContributionData.categoreis} />
        default:
            return ''
    }
}


const NewContribution = ({ desc, categoreis }) => (
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
                    <div key={`category${category.id}`} className="category">
                        <div className="image">
                            <FontAwesome size='5x' name={category.svg} />
                        </div>
                        <span className="title">{category.title}</span>
                    </div>
                )}
            </div>
            
        </div>
    </div>
)

const NextPrevBtns = ({ nextStep, prevStep, tips }) => (
    <div className="next-prev-bns">
        <button onClick={prevStep} className="prev">قبلی</button>
        {tips && <div className="tips">s</div>}
        <button onClick={nextStep} className="next">بعدی</button>
    </div>
)

export default Contribution