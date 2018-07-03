import React from 'react';
import {Modal, ModalBody} from 'reactstrap'
import MenuProgressive from '../progressive/penu-progressive'
import TechnicalProperties from './technicalProperties'
import InitialInfo from './initialInfo'
import NewContribution from './newConribution'
import Certificates from './certificates'
import {
    newContributionCategories,
    WRAPPER_CLASS_NAMES,
    PROGRESSIVE_STATUS_CHOICES,
    CERTIFICATES_IMG_IDS,
    logoFieldName,
    tags
} from './addingConributionData'
import GalleryAndTags from './galleryAndTags'
import {
    ItemsAndPropertiesIcon,
    CircularAddIcon,
    CertificateIcon,
    InformationIcon,
    ContributionIcon
} from '../../../images/icons'
import {getMessages} from "../../../redux/selectors/translateSelector";
import {connect} from "react-redux";

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

class AddingContribution extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            wrapperClassName: WRAPPER_CLASS_NAMES.ENTERING,
            activeStep: 1,
            progressSteps: [
                {title: 'آورده جدید', icon: (<CircularAddIcon className="progress-step-icon"/>)},
                {title: 'اطلاعات اولیه', icon: (<InformationIcon className="progress-step-icon"/>)},
                {title: 'مشخصات فنی', icon: (<ItemsAndPropertiesIcon className="progress-step-icon"/>)},
                {title: 'گواهی‌نامه‌ها', icon: (<CertificateIcon className="progress-step-icon"/>)},
                {title: 'مدیریت ویترین', icon: (<ContributionIcon className="progress-step-icon"/>)},
            ],
            progressStatus: PROGRESSIVE_STATUS_CHOICES.ACTIVE,
            newContributionData: {},
            testImage: '',
            addingTechPropNow: false,
            newTechPropertyData: {}
        };
    }

    componentDidMount() {
        const {newContributionData} = this.state
        const {technicalProperties} = newContributionData
        const properties = (technicalProperties && technicalProperties.slice()) || []
        const firstIndex = properties.length || 0
        for (let i = firstIndex; i < 9; i++) properties.push({id: i})
        this.setState({
            ...this.state,
            newContributionData: {...this.state.newContributionData, technicalProperties: properties}
        })
    }

    _activationAddTechPropBlock = (e, key) => {
        const isActive = key === 'click'
        this.setState({
            ...this.state,
            addingTechPropNow: isActive
        })

    }

    _techPropertiesOrderHandler = (result) => {
        const {source, destination} = result;
        if (!destination) {
            return;
        }
        let sourceIndex, destinationIndex
        const {technicalProperties} = this.state.newContributionData
        if (source.droppableId === destination.droppableId) {
            sourceIndex = source.index
            destinationIndex = destination.index
        } else {
            sourceIndex = source.droppableId - 3 + source.index
            destinationIndex = destination.droppableId - 3 + destination.index
        }
        const reOrderedProperties = reorder(
            technicalProperties.slice(),
            sourceIndex,
            destinationIndex
        );
        this.setState({
            ...this.state,
            newContributionData: {
                ...this.state.newContributionData,
                technicalProperties: reOrderedProperties
            },
        })
    }

    _techPropInputFillHandler = (e) => {
        const element = e.target
        const {newTechPropertyData} = this.state
        let newPropertyData = {
            ...newTechPropertyData,
            [element.name]: element.value,
            id: +element.dataset.propertyId  // + added to convert string to integer
        }
        if (newTechPropertyData.id !== undefined) {
            if (newTechPropertyData.id !== +element.dataset.propertyId) {
                newPropertyData = {}
            }
        }
        this.setState({
            ...this.state,
            newTechPropertyData: newPropertyData
        })
    }

    _setNewTechPropertyDate = property => this.setState({...this.state, newTechPropertyData: property})

    _addOrEditTechProperty = () => {
        const {newContributionData, newTechPropertyData} = this.state
        const {technicalProperties} = newContributionData
        const newTechnicalProperties = technicalProperties && technicalProperties.map(property => {
            if (property.id === newTechPropertyData.id) return newTechPropertyData
            else return property
        })

        if (newTechnicalProperties) {
            this.setState({
                ...this.state,
                newContributionData: {
                    ...this.state.newContributionData,
                    technicalProperties: newTechnicalProperties
                },
                newTechPropertyData: {},
            })
        }
    }
    _tagsSelectionHandler = (resultTags) => {
        // const {newContributionData} = this.state
        // const tags = (newContributionData.tags && [...newContributionData.tags, ...resultTags]) || [...resultTags]
        this.setState({
            ...this.state,
            newContributionData: {
                ...this.state.newContributionData,
                tags: resultTags
            }
        })
    }
    _nextStep = () => {
        const {activeStep, progressSteps} = this.state
        if (activeStep < progressSteps.length) this._setStep((activeStep + 1), PROGRESSIVE_STATUS_CHOICES.GOING_NEXT)
    }

    _prevStep = () => {
        const {activeStep} = this.state
        if (activeStep !== 1) this._setStep((activeStep - 1), PROGRESSIVE_STATUS_CHOICES.GOING_PREV)
    }

    _deleteTag = (value) => {
        const {newContributionData} = this.state
        const newTags = newContributionData.tags.filter(tag => tag.value !== value)
        this.setState({...this.state, newContributionData: {...newContributionData, tags: newTags}})
    }

    _certificatesImagesHandler = (e, id) => {
        const {newContributionData} = this.state
        let imgId = id
        if (!id) {
            for (let i = 0; i < CERTIFICATES_IMG_IDS.length; i++) {
                if (!newContributionData[CERTIFICATES_IMG_IDS[i]]) { // looking for first id that has'nt image data yet.
                    imgId = CERTIFICATES_IMG_IDS[i]
                    break
                }
            }
        }
        const input = e.target
        this._setStateForFileField(input, imgId)
    }
    _logoFileHandler = (e) => { // ! redundant
        const input = e.target
        this._setStateForFileField(input, logoFieldName)
    }
    _galleryImageDelete = (idx) => {
        const {newContributionData} = this.state
        let galleryImages = (newContributionData.galleryImages && [...newContributionData.galleryImages]) || []
        galleryImages.splice(idx, 1)
        this.setState({
            ...this.state,
            newContributionData: {
                ...newContributionData,
                galleryImages: galleryImages
            }
        })
    }
    _setMainGalleryImageIndex = (idx) => {
        const {newContributionData} = this.state
        const mainIndex = ((newContributionData.mainGalleryImageIndex === idx) && 10) || idx
        this.setState({
            ...this.state,
            newContributionData: {
                ...newContributionData,
                mainGalleryImageIndex: mainIndex
            }
        })
    }
    _layer1InputsValueHandler = (value, key) => {
        console.log('key is: ', key)
        console.log('value: ', value)
        this.setState({
            ...this.state,
            newContributionData: {
                ...this.state.newContributionData,
                [key]: value
            }
        }, () => console.log(this.state.newContributionData))
    }
    _galleryImageAddEdit = (input, idx) => {
        const {newContributionData} = this.state
        const reader = new FileReader()
        let galleryImages = (newContributionData.galleryImages && [...newContributionData.galleryImages]) || []
        if (input.files) {
            reader.onload = () => {
                galleryImages.splice(idx, 1, reader.result)
                this.setState({
                    ...this.state,
                    newContributionData: {
                        ...newContributionData,
                        galleryImages: galleryImages
                    }
                })
            }
            input.files[0] && reader.readAsDataURL(input.files[0])
        }
    }
    _videoHandler = (input, key) => {
        console.log('key is: ', key)
        console.log('input is: ', input)
        const reader = new FileReader()
        if (input.files) {
            console.log(input.files)
            reader.onload = () => {
                this.setState({...this.state, newContributionData: {...this.state.newContributionData, [key]: reader.result}})
            }
            input.files[0] && reader.readAsDataURL(input.files[0])
        }
    }
    _setStateForFileField = (input, key) => {
        const reader = new FileReader()
        if (input.files && key) {
            reader.onload = () => {
                this.setState({
                    ...this.state,
                    newContributionData: {...this.state.newContributionData, [key]: reader.result}
                })
            }
            input.files[0] && reader.readAsDataURL(input.files[0])
        }
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
        setTimeout(() => this.setState({
            ...this.state,
            progressStatus: PROGRESSIVE_STATUS_CHOICES.ACTIVE,
            wrapperClassName: WRAPPER_CLASS_NAMES.ENTERED,
        }), 10)
    }

    _newContributionCategoryHandler = (category) => {
        const data = {...this.state.newContributionData, category: category}
        this.setState({...this.state, newContributionData: data})
    }

    _switchContent = () => {
        const {newContributionData, activeStep, addingTechPropNow, newTechPropertyData} = this.state
        const {technicalProperties} = newContributionData
        const {translator} = this.props
        switch (activeStep) {
            case 1:
                return (
                    <NewContribution
                        categories={newContributionCategories}
                        goToNextStep={this._nextStep}
                        goToPrevStep={() => this.setState({...this.state, modalIsOpen: false})}
                        selectedCategory={newContributionData.category}
                        selectCategoryHandler={this._newContributionCategoryHandler}
                    />
                )

            case 2:
                return (
                    <InitialInfo
                        goToNextStep={this._nextStep}
                        goToPrevStep={this._prevStep}
                        inputHandler={this._layer1InputsValueHandler}
                        newContributionData={newContributionData}
                    />
                )

            case 3:
                return (
                    <TechnicalProperties
                        activationAddPropBlock={this._activationAddTechPropBlock}
                        properties={technicalProperties}
                        addingTechPropNow={addingTechPropNow}
                        inputFillHandler={this._techPropInputFillHandler}
                        newPropertyData={newTechPropertyData}
                        addOrEditTechProperty={this._addOrEditTechProperty}
                        propertiesOrderHandler={this._techPropertiesOrderHandler}
                        setNewTechPropertyDate={this._setNewTechPropertyDate}
                        goToNextStep={this._nextStep}
                        goToPrevStep={this._prevStep}
                    />
                )

            case 4:
                return (
                    <Certificates
                        certificatesImagesHandler={this._certificatesImagesHandler}
                        goToNextStep={this._nextStep}
                        goToPrevStep={this._prevStep}
                        newContributionData={newContributionData}
                        logoFileHandler={this._logoFileHandler}
                        inputHandler={this._layer1InputsValueHandler}
                    />
                )
            case 5:
                return (
                    <GalleryAndTags
                        translator={translator && translator.addingContribution}
                        tags={tags}
                        tagsSelectionHandler={this._tagsSelectionHandler}
                        newContributionData={newContributionData}
                        deleteTag={this._deleteTag}
                        imageAddEditHandler={this._galleryImageAddEdit}
                        imageDeleteHandler={this._galleryImageDelete}
                        setMainGalleryImageIndex={this._setMainGalleryImageIndex}
                        goToNextStep={this._nextStep}
                        goToPrevStep={this._prevStep}
                        videoHandler={this._videoHandler}
                    />
                )
            default:
                return <span>{' '}</span>
        }
    }

    render() {
        const {modalIsOpen, activeStep, progressSteps, progressStatus, wrapperClassName} = this.state
        return (
            <div>
                <button color="danger" onClick={() => this.setState({...this.state, modalIsOpen: true})}>test</button>
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

/* !toDo the field name 'currency' need for changing in future.
may be needed for fetching and creating a search box */


const mapStateToProps = (state) => {
    return {
        translator: getMessages(state)
    }
};

export default connect(mapStateToProps)(AddingContribution)

