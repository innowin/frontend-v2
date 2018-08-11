import React from 'react'
import {Modal, ModalBody} from 'reactstrap'
import MenuProgressive from '../progressive/penu-progressive'
import TechnicalProperties from './technicalProperties'
import InitialInfo from './initialInfo'
import NewContribution from './newConribution'
import Certificates from './certificates'
import {
    newContributionMainCategories,
    WRAPPER_CLASS_NAMES,
    PROGRESSIVE_STATUS_CHOICES,
    CERTIFICATES_IMG_IDS,
    logoFieldName,
    tags,
    TYPES
} from './addingConributionData'
import GalleryAndTags from './galleryAndTags'
import {
    ItemsAndPropertiesIcon,
    CircularAddIcon,
    CertificateIcon,
    InformationIcon,
    ContributionIcon
} from '../../../images/icons'
import {getMessages} from "../../../redux/selectors/translateSelector"
import {connect} from "react-redux";
import {LAYER1S} from './addingConributionData'
import SuccessMessage from './successMessage'
import {createSkillAction, createProductAction} from 'src/redux/actions/ContributionActions'
import FontAwesome from "react-fontawesome"
import client from 'src/consts/client'
import InitialInfoReduxForm from './reduxFormInitialInfo'


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
            newTechPropertyData: {},
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

    componentDidUpdate() {
        console.log('this.state.newContributionData', this.state.newContributionData)
        // const articlesData = [{
        //         id: 21,
        //         author: {id: 12, name: 'ali'},
        //         comments: [
        //             {
        //                 id: 14,
        //                 text: 'some text',
        //                 commenter: {id: 24, name: 'mohammad'}
        //             },
        //             {
        //                 id: 28,
        //                 text: 'some other text',
        //                 commenter: {id: 36, name: 'mohammad ali'}
        //             }
        //         ]
        // }]
        // const userSchema = new schema.Entity('users')
        // const commentSchema = new schema.Entity('comments', {commenter: userSchema})
        // const articleSchema = new schema.Entity('articles', {author: userSchema, comments: [commentSchema]})
        // const articlesSchema = [articleSchema]
        // const normalizedArticles = normalize(articlesData, articlesSchema)
        // console.log(normalizedArticles)
        const identity = client.getIdentityId()
        console.log('client.getIdentity()', identity, typeof identity)
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
    _createSkillHandler = () => {
        const {title, description} = this.state.newContributionData
        const userType = client.getIdentityType()
        if (userType === TYPES.PERSON) {
            this.props.dispatch(createSkillAction({title, description}))
        }
        else {

        }
    }

    _createProductHandler = () => {
        const {
            title,
            description,
            [LAYER1S.CATEGORY_LAYER3]: product_category,
            technicalProperties,
        } = this.state.newContributionData

        const attrs = technicalProperties.reduce((result, property) => {
            const {value, title} = property
            if (value && title) result[title] = value
            return result
        }, {})

        console.log(attrs)
        const identity = client.getIdentityId()
        console.log('identity is ', identity)
        const data = {
            name: title,
            description,
            product_category: 30,
            attrs,
            province: 'some province',
            country: 'some country',
            product_owner: client.getIdentityId()
        }
        console.log(data)
        this.props.dispatch(createProductAction(data))
    }

    _submitHandler = () => {
        const {mainCategory} = this.state.newContributionData
        switch (mainCategory) {
            case newContributionMainCategories[0].value: // in case product.
                this._createProductHandler()
                break
            case newContributionMainCategories[1].value: // in case skill.
                this._createSkillHandler()
                break
            default:
                return
        }
        this._nextStep()
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
        if (activeStep < progressSteps.length + 1) {
            console.log(activeStep + 1)
            this._setStep((activeStep + 1), PROGRESSIVE_STATUS_CHOICES.GOING_NEXT)
        }
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
    _videoHandler = (input) => {
        const {newContributionData} = this.state
        this.setState({
            ...this.state,
            newContributionData: {
                ...newContributionData,
                [LAYER1S.GALLERY_VIDEO_NAME]: null
            }
        }, () => {
            if (input) {
                setTimeout(() => this._setStateForFileField(input, LAYER1S.GALLERY_VIDEO_NAME), 10)
            }
        })
    }
    _newCertificateHandler = (index) => {
        const {newContributionData} = this.state
        const {
            certificates,
            [LAYER1S.NEW_CERT_TITLE]: title,
            [LAYER1S.NEW_CERT_IMAGE]: image,
            [LAYER1S.NEW_CERT_LOGO]: logo,
            [LAYER1S.NEW_CERT_NEED_FOR_VERIFY]: needForVerify,
        } = newContributionData
        const newCertificates = (certificates && [...certificates]) || []
        const deleteCount = ((index === 0) && 0) || 1 // index determines that creating or updating.
        const start = index || newCertificates.length // if there is index we want to update a certificate. else we only
        // want to add a new certificate in the end of certificates.
        if (title && image) {
            newCertificates.splice(start, deleteCount, {title, image, logo, needForVerify})
            this.setState({
                ...this.state,
                newContributionData: {
                    ...newContributionData,
                    certificates: newCertificates,
                    [LAYER1S.NEW_CERT_TITLE]: '',
                    [LAYER1S.NEW_CERT_IMAGE]: '',
                    [LAYER1S.NEW_CERT_LOGO]: '',
                    [LAYER1S.NEW_CERT_NEED_FOR_VERIFY]: false,
                },
            })
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
            () => {
                this._afterStepChanging()
                console.log(this.state)
            })
    }

    _afterStepChanging = () => {
        setTimeout(() => this.setState({
            ...this.state,
            progressStatus: PROGRESSIVE_STATUS_CHOICES.ACTIVE,
            wrapperClassName: WRAPPER_CLASS_NAMES.ENTERED,
        }), 10)
    }

    _newContributionMainCategoryHandler = (category) => {
        const data = {...this.state.newContributionData, mainCategory: category}
        this.setState({...this.state, newContributionData: data})
    }
    _handleModalVisibility = () => {
        const {handleModalVisibility} = this.props
        handleModalVisibility()
        this.setState({...this.state, newContributionData: {}, activeStep: 1})
    }

    _shareContribution = () => 1
    _introToExchange = () => 1
    _findAgent = () => 1
    _getCertificateHandler = () => 1

    _switchContent = () => {
        const {newContributionData, activeStep, addingTechPropNow, newTechPropertyData} = this.state
        const {technicalProperties} = newContributionData
        const {translator} = this.props
        switch (activeStep) {
            case 1:
                return (
                    <NewContribution
                        categories={newContributionMainCategories}
                        goToNextStep={this._nextStep}
                        goToPrevStep={this._handleModalVisibility}
                        selectedCategory={newContributionData.mainCategory}
                        selectCategoryHandler={this._newContributionMainCategoryHandler}
                    />
                )
            case 2:
                return (
                    <InitialInfoReduxForm
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
                        setStateForFileField={this._setStateForFileField}
                        newCertificateHandler={this._newCertificateHandler}
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
                        goToNextStep={this._submitHandler}
                        goToPrevStep={this._prevStep}
                        videoHandler={this._videoHandler}
                    />
                )
            case 6:
                return (
                    <SuccessMessage
                        smallUrl="some/test/small.url"
                        shareContribution={this._shareContribution}
                        introToExchange={this._introToExchange}
                        findAgent={this._findAgent}
                        getCertificateHandler={this._getCertificateHandler}
                        finishHandler={this._handleModalVisibility}
                    />
                )
            default:
                return (<span/>)
        }
    }

    render() {
        const {activeStep, progressSteps, progressStatus, wrapperClassName} = this.state
        const {modalIsOpen} = this.props
        return (
            <div>
                {/*<button color="danger" onClick={() => this.setState({...this.state, modalIsOpen: true})}>test</button>*/}
                <Modal className="exchanges-modal" size="lg" isOpen={modalIsOpen} backdrop={false}>
                    <ModalBody className="adding-contribution-wrapper">
                        <FontAwesome name="times" size="2x" className="close-btn"
                                     onClick={this._handleModalVisibility}/>
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

