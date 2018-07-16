import React from 'react'
import {CircularCheckbox} from '../../common/inputs/CircularCheckbox'
import {PayIcon, CongratsTick, ThinDownArrow} from '../../../images/icons'
import {LAYER1S} from "./addingConributionData";
import NextPrevBtns from './nextAndPrevBtns'
import StateLessTextInput from '../../common/inputs/StateLessTextInput'

const Certificates = ({
                          goToNextStep,
                          goToPrevStep,
                          certificatesImagesHandler,
                          newContributionData,
                          setStateForFileField,
                          inputHandler,
                          newCertificateHandler
                      }) => {

    const {certificates} = newContributionData
    let repairedCertificates
    if (certificates) {
        repairedCertificates = [...certificates]
        for (let i = 0; i < (3 - certificates.length); i++) {
            console.log(i)
            repairedCertificates.push({})
        }
    } else repairedCertificates = [{},{},{}]
    return (
        <div className="certificates">
            <div className="form">
                <div className="form-column">
                    <div className="title">
                        <StateLessTextInput
                            label="عنوان گواهینامه"
                            value={newContributionData[LAYER1S.NEW_CERT_TITLE]}
                            onChange={(e) => inputHandler(e.target.value, LAYER1S.NEW_CERT_TITLE)}
                        />
                    </div>
                    <div className="verification-request-wrapper">
                        <PayIcon className="pay-svg-icon"/>
                        <CircularCheckbox
                            label="درخواست اعتبارسنجی توسط دانش‌بوم"
                            checked={newContributionData[LAYER1S.NEW_CERT_NEED_FOR_VERIFY]}
                            onCheck={() => inputHandler(!newContributionData[LAYER1S.NEW_CERT_NEED_FOR_VERIFY], LAYER1S.NEW_CERT_NEED_FOR_VERIFY)}
                        />
                    </div>
                </div>
                <div className="form-column">
                    <div className="logo-upload">
                        <CongratsTick className={newContributionData[LAYER1S.NEW_CERT_LOGO] ?
                            'logo-uploaded-check checked'
                            :
                            'logo-uploaded-check'
                        }
                        />
                        <label>بارگذاری لوگو</label>
                        <div className="file-btn">
                            انتخاب فایل
                            <input onChange={(e) => setStateForFileField(e.target, LAYER1S.NEW_CERT_LOGO)} type="file" name="logo"/>
                        </div>
                    </div>
                    <div className="image-upload">
                        <label>
                            بارگذاری تصویر گواهینامه
                        </label>
                        <div className="file-btn">
                            انتخاب فایل
                            <input type="file" name="certificate_image" onChange={(e) => {
                                setStateForFileField(e.target, LAYER1S.NEW_CERT_IMAGE)
                            }}
                            />
                        </div>
                    </div>
                    <div className="submit" onClick={() => newCertificateHandler(0)}>
                        ثبت
                        <ThinDownArrow className="icon"/>
                    </div>
                </div>
            </div>
            <div className="images">
                {repairedCertificates.map((certificate, index) => (
                    <div className="image" key={certificate.title}>
                        <div className={certificate.image ? 'show' : 'hide'}>
                            <img src={certificate.image} alt="certificate"/>
                            <div className="certificate-img-edit-btn">
                                {/*<input*/}
                                    {/*type="file"*/}
                                    {/*className="edit-file-input"*/}
                                    {/*onChange={(e) => {*/}
                                        {/*certificatesImagesHandler()*/}
                                    {/*}}*/}
                                {/*/>*/}
                            </div>
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