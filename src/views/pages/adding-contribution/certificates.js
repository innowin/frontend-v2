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
                          newCertificateHandler,
                          certificateIndexHandler,
                          newCertIndex
                      }) => {

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

    return (
        <div className="certificates">
            <div className="form">
                <div className="form-column">
                    <div className={(newCertIndex === 0 || newCertIndex > 0) ? 'title edit' : 'title'}>
                        <StateLessTextInput
                            label="عنوان گواهینامه"
                            value={newContributionData[LAYER1S.NEW_CERT_TITLE]}
                            onChange={(e) => inputHandler(e.target.value, LAYER1S.NEW_CERT_TITLE)}
                        />
                    </div>
                    <div className={(newCertIndex === 0 || newCertIndex > 0) ?
                        'verification-request-wrapper edit': 'verification-request-wrapper'}>
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
                        <CongratsTick className={newContributionData[LAYER1S.CONTRIBUTION_LOGO] ?
                            'logo-uploaded-check checked'
                            :
                            'logo-uploaded-check'
                        }
                        />
                        <label>بارگذاری لوگو</label>
                        <div className="file-btn">
                            انتخاب فایل
                            <input onChange={(e) => setStateForFileField(e.target, LAYER1S.CONTRIBUTION_LOGO)} type="file"
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
                                setStateForFileField(e.target, LAYER1S.NEW_CERT_IMAGE)
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
                    <div className="image" key={certificate.title}>
                        <div className={_certClassNameHandler(index, certificate.image)}>
                            <img src={certificate.image} alt="certificate"/>
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