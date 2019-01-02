// @flow
import * as React from 'react'
import Tip from "../../../common/Text/Tip"
import BtnBar from "../../../common/BtnBar/BtnBar"
import type {ActType} from "../../../common/BtnBar/BtnBar";
import TextArea from "../../../common/inputs/StateLessTextarea"
import {exchangeFields} from "./createExchangeData";
import type {HandlerType} from "./basicInfo"
import Select from 'react-select'
import {Tag} from "../../adding-contribution/product/galleryAndTags"
import type {TagAsOptionType} from "../../adding-contribution/types"


type TagsProps = {
  tags: Array<TagAsOptionType>,
  deleteTagHandler: (string) => void
}

const Tags = (props: TagsProps) => {
  const {tags, deleteTagHandler} = props
  return (
      <div className="tags">
        <div className="scroll-less">
          {tags.map(tag =>
              <Tag deleteTag={deleteTagHandler} tag={tag} key={tag.label}/>
          )}
        </div>
      </div>
  )
}

type TagsManagerProps = {
  deleteTagHandler: (string) => void,
  selectedTags: Array<TagAsOptionType>,
  tags: Array<TagAsOptionType>,
  changeHandler: (Array<TagAsOptionType>) => void,
  className?: string
}
const TagsManager = (props: TagsManagerProps) => {
  const {selectedTags, tags, changeHandler, deleteTagHandler, className} = props
  return (
      <div className={`tags-manager ${className || ''}`}>
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
        <Tags
            deleteTagHandler={deleteTagHandler}
            tags={selectedTags}
        />
      </div>
  )
}

type FormType = {
  inputHandler: (string) => HandlerType,
  desc: string,
  deleteTagHandler: (string) => void,
  selectedTags: Array<TagAsOptionType>,
  tags: Array<TagAsOptionType>,
  tagAddHandler: (Array<TagAsOptionType>) => void,
}

const Form = (props: FormType) => {
  const {
    inputHandler,
    desc,
    tags,
    selectedTags,
    tagAddHandler,
    deleteTagHandler
  } = props
  const DescHandler = inputHandler(exchangeFields.desc)
  return (
      <div className="form">
        <TextArea
            label="توصیف پنجره"
            className="exchange-desc"
            onChange={(e: SyntheticEvent<HTMLInputElement>) => DescHandler(e.currentTarget.value)}
            value={desc}
        />
        <TagsManager
            tags={tags}
            selectedTags={selectedTags}
            changeHandler={tagAddHandler}
            deleteTagHandler={deleteTagHandler}
        />
      </div>
  )
}

type Props = {
  btnBarActs: Array<ActType>,
  inputHandler: (string) => HandlerType,
  desc: string,
  deleteTagHandler: (string) => void,
  selectedTags: Array<TagAsOptionType>,
  tags: Array<TagAsOptionType>,
  tagAddHandler: (Array<TagAsOptionType>) => void,
  processing: boolean
}

export default (props: Props) => {
  const {
    btnBarActs,
    inputHandler,
    desc,
    tags,
    selectedTags,
    deleteTagHandler,
    tagAddHandler,
    processing
  } = props
  return (
      <div className="more-info">
        <Tip
            desc="توضیح مختصر از پنجره توضیح مختصر از پنجره توضیح
             مختصر از پنجره توضیح مختصر از پنجره توضیح مختصر از پنجره توضیح"
        />
        <Form
            inputHandler={inputHandler}
            desc={desc}
            deleteTagHandler={deleteTagHandler}
            tags={tags}
            selectedTags={selectedTags}
            tagAddHandler={tagAddHandler}
        />
        <BtnBar processingFunc={() => console.log('processing now!')} acts={btnBarActs} processing={processing}/>
      </div>
  )
}