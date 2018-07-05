import React from 'react'
import Select from 'react-select';
import FontAwesome from 'react-fontawesome'
import {LAYER1_INPUTS} from './addingConributionData'
import {ImageUploadSvg, MoviesSvgIcon} from '../../../images/icons'
import {CircularCheckbox} from '../../common/inputs/CircularCheckbox'
import NextPrevBtns from './nextAndPrevBtns'

const GalleryAndTags = ({
                            tags,
                            translator,
                            tagsSelectionHandler,
                            newContributionData,
                            deleteTag,
                            imageAddEditHandler,
                            imageDeleteHandler,
                            videoHandler,
                            setMainGalleryImageIndex,
                            goToNextStep,
                            goToPrevStep
                        }) => {
    const galleryImages = newContributionData.galleryImages || []
    const mainImageIndex = newContributionData.mainGalleryImageIndex
    return (
        <div className="gallery-and-tags-wrapper">
            <div className="gallery-wrapper">
                <h4 className="header">
                    آلبوم تصاویر:
                </h4>
                <div className="gallery">
                    {[0, 1, 2, 3, 4].map(num => (
                        <div className={galleryImages[num] ? 'upload-box uploaded' : 'upload-box'}
                             key={`galleryImage${num}`}>
                            <div className="image-wrapper">
                                <img className="gallery-item" src={galleryImages[num]} alt="gallery image"/>
                                <div className="edit-btn"/>
                            </div>
                            <div className="upload-icon-wrapper">
                                <ImageUploadSvg className="upload-icon"/>
                            </div>
                            <input type="file" className="hidden-file-input"
                                   onChange={(e) => imageAddEditHandler(e.target, num)}/>
                            {galleryImages[num] ?
                                <div>
                                    <div onClick={() => imageDeleteHandler(num)} className="clear-btn">
                                        <FontAwesome name="times"/>
                                    </div>
                                    <Tooltip classNames="choose-as-main-image-btn"
                                             desc={<div>انتخاب به عنوان تصویر اصلی</div>}>
                                        <CircularCheckbox label=" " name=" " checked={mainImageIndex === num}
                                                          onCheck={() => setMainGalleryImageIndex(num)}/>
                                    </Tooltip>
                                </div>
                                : ''
                            }
                        </div>
                    ))}
                    <div
                        className={newContributionData[LAYER1_INPUTS.GALLERY_VIDEO_NAME] ? 'upload-box uploaded' : 'upload-box'}>
                        <div className="image-wrapper">
                            <div className="upload-icon-wrapper">
                                <MoviesSvgIcon className="upload-icon"/>
                            </div>
                            {newContributionData[LAYER1_INPUTS.GALLERY_VIDEO_NAME] ?
                                <video className="gallery-video" controls>
                                    <source src={newContributionData[LAYER1_INPUTS.GALLERY_VIDEO_NAME]} type="video/mp4"/>
                                    Your browser does not support HTML5 video.
                                </video>
                                :
                                ''
                            }
                        </div>
                        {newContributionData[LAYER1_INPUTS.GALLERY_VIDEO_NAME] ?
                            <div>
                                <div className="edit-btn"/>
                                <div onClick={() => videoHandler()} className="clear-btn">
                                    <FontAwesome name="times"/>
                                </div>
                            </div>
                            :
                            ''
                        }
                        <input type="file" className="hidden-file-input"
                               onChange={(e) => videoHandler(e.target)}/>
                    </div>
                </div>
            </div>
            <div className="tags-wrapper">
                <h4 className="header">
                    مدیریت برچسب‌ها:
                </h4>
                <div className="tags-search-box">
                    <Select
                        placeholder=""
                        multi
                        onChange={tagsSelectionHandler}
                        rtl
                        options={tags}
                        noResultsText={translator['No result found']}
                        value={newContributionData && newContributionData.tags}
                    />
                </div>
                <div className="tags">
                    {newContributionData.tags && newContributionData.tags.map(tag => (
                        <Tag deleteTag={deleteTag} tag={tag} key={tag.value}/>
                    ))}
                </div>
            </div>
            <NextPrevBtns
                nextBtnTitle="ثبت"
                goToNextStep={goToNextStep}
                goToPrevStep={goToPrevStep}
            />
        </div>
    )
}

const Tooltip = ({classNames, children, desc}) => {
    return (
        <div className={`custom-tooltip ${classNames}`}>
            <div className="element">{children}</div>
            <div className="desc-wrapper">
                <div className="desc">{desc}</div>
                <div className="point"/>
            </div>
        </div>
    )
}

const Tag = ({tag, deleteTag}) => (
    <div className="tag">
        <div className="title">{tag.label}</div>
        <div className="used-count">
            {tag.usedCount}
            <div onClick={() => deleteTag(tag.value)} className="clear-btn">
                <FontAwesome name="times"/>
            </div>
        </div>
    </div>
)
export default GalleryAndTags