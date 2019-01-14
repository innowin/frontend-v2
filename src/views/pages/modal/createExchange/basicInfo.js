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
import FontAwesome from "react-fontawesome"


export type HandlerType = (StrNumBool) => void

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
            label="عنوان پنجره"
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
        {/*<Input*/}
        {/*name={exchangeFields.link}*/}
        {/*className="link-input"*/}
        {/*label="نام کاربری پنجره"*/}
        {/*onChange={(e: SyntheticEvent<HTMLInputElement>) => linkHandler(e.currentTarget.value)}*/}
        {/*value={formData[exchangeFields.link]}*/}
        {/*extraContent={<span className="domain">http://dbm.ir/</span>}*/}
        {/*/>*/}
      </div>
  )
}

export type ImageType = {
  id: string,
  file: string
}
type ImageFormProps = {
  images: Array<ImageType>,
  selectedImage: string,
  uploadHandler: Function,
  imageHandler: (ImageType) => void,
  processing?: boolean
}
const ImageForm = (props: ImageFormProps) => {
  const {images, selectedImage, uploadHandler, imageHandler, processing} = props
  return (
      <div className="image-form">
        <div className="image-selection-wrapper">
          <span>انتخاب تصویر</span>
          <div className="hide-scroll-wrapper">
            <div className='image-selection'>
              <div className={`file-input-wrapper img-option ${processing ? 'processing' : ''}`}>
                <input type="file" accept="image/*,.jpeg,.jpg,.bmp,.gif,.png" onChange={!processing && (e => uploadHandler(e.currentTarget.files[0]))}/>
                <FontAwesome name="spinner"/>
                <ImageUploadSvg className="upload-icon"/>
              </div>
              {images.map(img =>
                  <img
                      className="img-option"
                      key={`img-option${img.id}`}
                      src={img.file}
                      alt={img.id}
                      onClick={() => imageHandler(img)}
                  />
              )}
            </div>
          </div>
        </div>
        <img
            className={`selected-image ${selectedImage ? 'show' : ''}`}
            src={selectedImage}
            alt="عکس انتخاب شده"
        />
      </div>
  )
}

type FormProps = {
  formData: { [string]: string },
  inputHandler: (string) => HandlerType,
  selectionImages: Array<ImageType>,
  selectedImage: string,
  uploadHandler: Function,
  imageHandler: (ImageType) => void,
  processing?: boolean,
}
const Form = (props: FormProps) => {
  const {formData, inputHandler, selectionImages, selectedImage, uploadHandler, imageHandler, processing} = props
  return (
      <div className="form">
        <SimpleForm
            formData={formData}
            inputHandler={inputHandler}
        />
        <ImageForm
            processing={processing}
            uploadHandler={uploadHandler}
            images={selectionImages}
            selectedImage={selectedImage}
            imageHandler={imageHandler}
        />
      </div>
  )
}
type Props = {
  btnBarActs: Array<ActType>,
  formData: { [string]: string },
  inputHandler: (string) => HandlerType,
  selectionImages: Array<ImageType>,
  selectedImage: string,
  uploadHandler: Function,
  imageHandler: (ImageType) => void,
  processing: boolean
}

export default (props: Props) => {
  const {
    btnBarActs,
    formData,
    inputHandler,
    selectionImages,
    selectedImage,
    uploadHandler,
    imageHandler,
    processing
  } = props
  return (
      <div className="basic-info">
        <Tip
            desc="توضیح مختصر از پنجره توضیح مختصر از پنجره توضیح مختصر از پنجره توضیح مختصر از پنجره توضیح مختصر از پنجره توضیح
            از پنجره توضیح مختصر از پنجره توضیح مختصر از پنجره توضیح مختصر از پنجره"
        />
        <Form
            processing={processing}
            imageHandler={imageHandler}
            uploadHandler={uploadHandler}
            formData={formData}
            inputHandler={inputHandler}
            selectedImage={selectedImage}
            selectionImages={selectionImages}
        />
        <BtnBar processing={processing} acts={btnBarActs}/>
      </div>
  )
}