// @flow
import * as React from 'react'
import Select from 'react-select'
import FontAwesome from 'react-fontawesome'
import {LAYER1S} from '../addingConributionData'
import {ImageUploadSvg, MoviesSvgIcon} from 'src/images/icons'
import {CircularCheckbox} from '../../../common/inputs/CircularCheckbox'
import NextPrevBtns from '../nextAndPrevBtns'
import type {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'
import helpers from 'src/consts/helperFunctions/helperFunctions'
import type {NewContributionDataType, TagAsOptionType} from "../types"

type HashTagsContentType = {
  title: string,
  usage: number
}

type HashTagsType = {
  [number]: HashTagsContentType
}

type GalleryAndTagsProps = {
  translator: TranslatorType,
  tagsSelectionHandler: Function,
  newContributionData: NewContributionDataType,
  deleteTag: Function,
  imageAddEditHandler: Function,
  imageDeleteHandler: Function,
  videoHandler: Function,
  setMainGalleryImageIndex: Function,
  goToNextStep: Function,
  goToPrevStep: Function,
  hashTags: HashTagsType
}

const GalleryAndTags = (props: GalleryAndTagsProps) => {

  const {
    // translator,
    tagsSelectionHandler,
    newContributionData,
    deleteTag,
    imageAddEditHandler,
    imageDeleteHandler,
    videoHandler,
    setMainGalleryImageIndex,
    goToNextStep,
    goToPrevStep,
    hashTags
  } = props

  // hashTags keys are id. note: react-select by default need a 'label' a 'value'(can change this default)

  const tags = helpers.objToArrayAsOptions(hashTags, 'id', 'title', ['usage'])
  const galleryImages: any = newContributionData.galleryImages || []

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
                    <img className="gallery-item" src={galleryImages[num]} alt=""/>
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
                className={newContributionData[LAYER1S.GALLERY_VIDEO_NAME] ? 'upload-box uploaded' : 'upload-box'}>
              <div className="image-wrapper">
                <div className="upload-icon-wrapper">
                  <MoviesSvgIcon className="upload-icon"/>
                </div>
                {newContributionData[LAYER1S.GALLERY_VIDEO_NAME] ?
                    <video className="gallery-video" controls>
                      <source src={newContributionData[LAYER1S.GALLERY_VIDEO_NAME]} type="video/mp4"/>
                      مرورگر شما توانایی پخش ویدیو را ندارد. لطفا از یک مرورگر پیشرفته‌تر استفاده کنید.
                    </video>
                    :
                    ''
                }
              </div>
              {newContributionData[LAYER1S.GALLERY_VIDEO_NAME] ?
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
        <TagsManager
            selectedTags={newContributionData.tags}
            changeHandler={tagsSelectionHandler}
            deleteHandler={deleteTag}
            tags={tags}
        />
        <NextPrevBtns
            nextBtnTitle="ثبت"
            goToNextStep={goToNextStep}
            goToPrevStep={goToPrevStep}
        />
      </div>
  )
}


type TagsManagerProps = {
  changeHandler: Function,
  tags: Array<TagAsOptionType>,
  deleteHandler: Function,
  selectedTags?: Array<TagAsOptionType>
}

const TagsManager = (props: TagsManagerProps) => {
  const {changeHandler, tags, deleteHandler, selectedTags} = props
  return (
      <div className="tags-wrapper">
        <h4 className="header">مدیریت برچسب‌ها:</h4>
        <div className="tags-search-box">
          <Select
              placeholder=""
              multi
              onChange={changeHandler}
              rtl
              options={tags}
              noResultsText="موردی یافت نشد"
              value={selectedTags}
          />
        </div>
        <Tags deleteTag={deleteHandler} tags={selectedTags}/>
      </div>
  )
}

type TagsProps = {
  tags?: Array<TagAsOptionType>,
  deleteTag: Function
}

const Tags = (props: TagsProps) => {
  const {tags, deleteTag} = props
  return (
      <div className="tags">
        {tags && tags.map(tag => (
            <Tag deleteTag={deleteTag} tag={tag} key={tag.label}/>
        ))}
      </div>
  )
}


type TooltipProps = {
  classNames: string,
  children: React.Node,
  desc: React.Node
}

const Tooltip = (props: TooltipProps) => {
  const {classNames, children, desc} = props
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

type TagProps = {
  tag: TagAsOptionType,
  deleteTag: Function

}

export const Tag = (props: TagProps) => {
  const {tag, deleteTag} = props
  return (
      <div className="tag">
        <div className="title">{tag.label}</div>
        <div className="used-count">
          {tag.usage}
          <div onClick={() => deleteTag(tag.value)} className="clear-btn">
            <FontAwesome name="times"/>
          </div>
        </div>
      </div>
  )
}
export default GalleryAndTags