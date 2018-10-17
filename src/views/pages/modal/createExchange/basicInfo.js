// @flow
import * as React from 'react'
import Tip from "../../../common/Text/Tip"
import BtnBar from "../../../common/BtnBar/BtnBar"
import type {ActType} from "../../../common/BtnBar/BtnBar"
import Input from "../../../common/inputs/StateLessTextInput"
import {exchangeFields} from "./createExchangeData"
import {RadioButtonGroup} from "../../../common/inputs/RadioButtonInput"
import type {StrNumBool} from "../../../common/inputs/RadioButtonInput"
import {ImageUploadSvg} from '../../../../images/icons'
import ScrollLessWrapper from '../../../common/wrappers/scrollLesWrapper'


type HandlerType = (StrNumBool) => void

type SimpleFormProps = {
  inputHandler: (string) => HandlerType,
  formData: { [string]: string }
}

const SimpleForm = (props: SimpleFormProps) => {
  const {inputHandler, formData} = props
  const nameHandler = inputHandler(exchangeFields.name)
  const linkHandler = inputHandler(exchangeFields.link)
  const privateHandler = inputHandler(exchangeFields.private)
  return (
      <div className="simple-form">
        <Input
            name={exchangeFields.name}
            label="عنوان بورس"
            onChange={(e: SyntheticEvent<HTMLInputElement>) => nameHandler(e.currentTarget.value)}
            value={formData[exchangeFields.name]}
            className="title-input"
        />
        <RadioButtonGroup
            handler={privateHandler}
            items={[
              {value: false, title: 'عمومی'},
              {value: true, title: 'خصوصی'}
            ]}
            label="عمومیت"
            name={exchangeFields.private}
            selected={formData[exchangeFields.private]}
        />
        <Input
            name={exchangeFields.link}
            className="link-input"
            label="نام کاربری بورس"
            onChange={(e: SyntheticEvent<HTMLInputElement>) => linkHandler(e.currentTarget.value)}
            value={formData[exchangeFields.link]}
            extraContent={<span className="domain">http://dbm.ir/</span>}
        />
      </div>
  )
}

type ImageType = {
  id: string,
  url: string
}
type ImageFormProps = {
  images: Array<ImageType>,
  selectedImage: string
}
const ImageForm = (props: ImageFormProps) => {
  const {images, selectedImage} = props
  return (
      <div className="image-form">
        <div className="image-selection-wrapper">
          <span>انتخاب تصویر</span>
          <div className="hide-scroll-wrapper">
            <div className='image-selection'>
              <div className="file-input-wrapper img-option">
                <input type="file"/>
                <ImageUploadSvg/>
              </div>
              {images.map(img =>
                  <img className="img-option" key={`img-option${img.id}`} src={img.url} alt={img.id}/>
              )}
            </div>
          </div>
        </div>
        <img className="selected-image" src={selectedImage} alt="عکس انتخاب شده"/>
      </div>
  )
}

type FormProps = {
  formData: { [string]: string },
  inputHandler: (string) => HandlerType,
  selectionImages: Array<ImageType>,
  selectedImage: string
}
const Form = (props: FormProps) => {
  const {formData, inputHandler, selectionImages, selectedImage} = props
  return (
      <div className="form">
        <SimpleForm
            formData={formData}
            inputHandler={inputHandler}
        />
        <ImageForm
            images={selectionImages}
            selectedImage={selectedImage}
        />
      </div>
  )
}
type Props = {
  btnBarActs: Array<ActType>,
  formData: { [string]: string },
  inputHandler: (string) => HandlerType,
  selectionImages: Array<ImageType>,
  selectedImage: string
}

export default (props: Props) => {
  const {btnBarActs, formData, inputHandler, selectionImages, selectedImage} = props
  return (
      <div className="basic-info">
        <Tip
            desc="توضیح مختصر از بورس توضیح مختصر از بورس توضیح مختصر از بورس توضیح مختصر از بورس توضیح مختصر از بورس توضیح
            از بورس توضیح مختصر از بورس توضیح مختصر از بورس توضیح مختصر از بورس"
        />
        <Form
            formData={formData}
            inputHandler={inputHandler}
            selectedImage={selectedImage}
            selectionImages={selectionImages}
        />
        <BtnBar acts={btnBarActs}/>
      </div>
  )
}