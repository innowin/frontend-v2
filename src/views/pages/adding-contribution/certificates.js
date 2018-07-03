import React from 'react'
import {TextInput} from '../../common/inputs/TextInput'
import {CircularCheckbox} from '../../common/inputs/CircularCheckbox'
import {PayIcon, CongratsTick, ThinDownArrow} from '../../../images/icons'
import {CERTIFICATES_IMG_IDS, logoFieldName, LAYER1_INPUTS} from "./addingConributionData";
import NextPrevBtns from './nextAndPrevBtns'
import Sidebar from "../../bars/SideBar";
import StateLessTextInput from '../../common/inputs/StateLessTextInput'

const Certificates = ({
                          goToNextStep,
                          goToPrevStep,
                          certificatesImagesHandler,
                          newContributionData,
                          logoFileHandler,
                          inputHandler
                      }) => {
    return (
        <div className="certificates">
            <div className="form">
                <div className="form-column">
                    <div className="title">
                        <StateLessTextInput
                            label="عنوان گواهینامه"
                            value={newContributionData[LAYER1_INPUTS.CERTIFICATE_TITLE]}
                            onChange={(e) => inputHandler(e.target.value, LAYER1_INPUTS.CERTIFICATE_TITLE)}
                        />
                    </div>
                    <div className="verification-request-wrapper">
                        <PayIcon className="pay-svg-icon"/>
                        <CircularCheckbox
                            label="درخواست اعتبارسنجی توسط دانش‌بوم"
                            checked={newContributionData[LAYER1_INPUTS.CERTIFICATE_NEED_FOR_VERIFY]}
                            onCheck={() => inputHandler(!newContributionData[LAYER1_INPUTS.CERTIFICATE_NEED_FOR_VERIFY], LAYER1_INPUTS.CERTIFICATE_NEED_FOR_VERIFY)}
                        />
                    </div>
                </div>
                <div className="form-column">
                    <div className="logo-upload">
                        <CongratsTick className={newContributionData[logoFieldName] ?
                            'logo-uploaded-check checked'
                            :
                            'logo-uploaded-check'
                        }
                        />
                        <label>بارگذاری لوگو</label>
                        <div className="file-btn">
                            انتخاب فایل
                            <input onChange={logoFileHandler} type="file" name="logo"/>
                        </div>
                    </div>
                    <div className="image-upload">
                        <label>
                            بارگذاری تصویر گواهینامه
                        </label>
                        <div className="file-btn">
                            انتخاب فایل
                            <input type="file" name="certificate_image" onChange={(e) => {
                                certificatesImagesHandler(e, null)
                            }}
                            />
                        </div>
                    </div>
                    <div className="submit">
                        ثبت
                        <ThinDownArrow className="icon"/>
                    </div>
                </div>
            </div>
            <div className="images">
                {CERTIFICATES_IMG_IDS.map(id => (
                    <div className="image" key={`certificateId/${id}`}>
                        <div className={newContributionData[id] ? 'show' : 'hide'}>
                            <img id={id} src={newContributionData[id]} alt="certificate"/>
                            <div className="certificate-img-edit-btn">
                                <input
                                    type="file"
                                    className="edit-file-input"
                                    onChange={(e) => {
                                        certificatesImagesHandler(e, id)
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <NextPrevBtns
                prevBtnTitle="قبلی"
                goToNextStep={goToNextStep}
                goToPrevStep={goToPrevStep}
            />
        </div>
    )
}

export default Certificates