// @flow
import React from 'react'
import {CircularCheckbox} from '../../../common/inputs/CircularCheckbox'
import {PayIcon, CongratsTick, ThinDownArrow} from '../../../../images/icons'
import {LAYER1S} from "../addingConributionData";
import NextPrevBtns from '../nextAndPrevBtns'
import StateLessTextInput from '../../../common/inputs/StateLessTextInput'
import type {NewContributionDataType} from '../types'

type CertificateProps = {
  goToNextStep: Function,
  goToPrevStep: Function,
  certificatesImagesHandler: Function,
  newContributionData: NewContributionDataType,
  setStateForFileField: Function,
  inputHandler: Function,
  newCertificateHandler: Function,
  certificateIndexHandler: Function,
  newCertIndex: number
}

const Certificates = (props: CertificateProps) => {
  const {
    goToNextStep,
    goToPrevStep,
    certificatesImagesHandler,
    newContributionData,
    setStateForFileField,
    inputHandler,
    newCertificateHandler,
    certificateIndexHandler,
    newCertIndex
  } = props
  const {certificates} = newContributionData

  let repairedCertificates

  if (certificates) {
    repairedCertificates = [...certificates]
    for (let i = 0; i < (3 - certificates.length); i++) {
      repairedCertificates.push({title: i})
    }
  } else repairedCertificates = [{title: '1'}, {title: '2'}, {title: '3'}] // for giving unique key to certificates.

  const _certClassNameHandler = (index, image) => {
    return (!image && 'hide') || (((index === newCertIndex) && 'show edit')) || 'show'

  }
  const {NEW_CERT_LOGO, NEW_CERT_IMAGE, NEW_CERT_TITLE, NEW_CERT_NEED_FOR_VERIFY} = LAYER1S

  return (
      <div className="certificates">
        <div className="form">
          <div className="form-column">
            <div className={(newCertIndex === 0 || newCertIndex > 0) ? 'title edit' : 'title'}>
              <StateLessTextInput
                  label="عنوان گواهینامه"
                  value={newContributionData[NEW_CERT_TITLE]}
                  onChange={(e) => inputHandler(e.target.value, NEW_CERT_TITLE)}
              />
            </div>
            <div className={(newCertIndex === 0 || newCertIndex > 0) ?
                'verification-request-wrapper edit' : 'verification-request-wrapper'}>
              <PayIcon className="pay-svg-icon"/>
              <CircularCheckbox
                  label="درخواست اعتبارسنجی توسط اینوین"
                  checked={newContributionData[NEW_CERT_NEED_FOR_VERIFY]}
                  onCheck={() => inputHandler(!newContributionData[NEW_CERT_NEED_FOR_VERIFY], NEW_CERT_NEED_FOR_VERIFY)}
              />
            </div>
          </div>
          <div className="form-column">
            <div className="logo-upload">
              <CongratsTick className={newContributionData[NEW_CERT_LOGO] ?
                  'logo-uploaded-check checked'
                  :
                  'logo-uploaded-check'
              }
              />
              <label>بارگذاری لوگو</label>
              <div className="file-btn">
                انتخاب فایل
                <input onChange={(e) => setStateForFileField(e.target, NEW_CERT_LOGO)} type="file"
                       name="logo"/>
              </div>
            </div>
            <div className={(newCertIndex === 0 || newCertIndex > 0) ? 'image-upload edit' : 'image-upload'}>
              <label>
                بارگذاری تصویر گواهینامه
              </label>
              <div className="file-btn">
                انتخاب فایل
                <input type="file" name="certificate_image" onChange={(e) => {
                  setStateForFileField(e.target, NEW_CERT_IMAGE)
                }}
                />
              </div>
            </div>
            <div className="submit" onClick={newCertificateHandler}>
              ثبت
              <ThinDownArrow className="icon"/>
            </div>
          </div>
        </div>
        <div className="images">
          {repairedCertificates.map((certificate, index) => (
              <div className="image" key={certificate[NEW_CERT_TITLE]}>
                <div className={_certClassNameHandler(index, certificate[NEW_CERT_IMAGE])}>
                  <img src={certificate[NEW_CERT_IMAGE]} alt="certificate"/>
                  <div onClick={() => certificateIndexHandler(index)} className="certificate-img-edit-btn"/>
                </div>
              </div>
          ))}
        </div>
        <NextPrevBtns
            goToNextStep={goToNextStep}
            goToPrevStep={goToPrevStep}
        />
      </div>
  )
}

export default Certificates