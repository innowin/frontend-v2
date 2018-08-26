import React from "react"
import {CircularTickSvg, CertificateIcon, AgentSvgIcon} from '../../../images/icons'

const SuccessMessage = ({nowCreatedId,shareContribution, introToExchange, findAgent, getCertificateHandler, finishHandler}) => {
    const actions = ([
            {
                title: 'به اشتراک بگذارید',
                image: (<span className="act-image">?</span>),
                handler: shareContribution
            },
            {
                title: 'عرضه در بورس',
                image: (<span className="act-image">?</span>),
                handler: introToExchange
            },
            {
                title: 'یافتن کارگزار',
                image: (<AgentSvgIcon className="act-image" />),
                handler: findAgent
            },
            {
                title: 'اخذ گواهی‌نامه',
                image: (<CertificateIcon className="act-image" />),
                handler: getCertificateHandler
            },
            {
                title: 'پایان',
                handler: finishHandler
            },
        ])

    return (
        <div className="success-message">
            <CircularTickSvg className="message-image"/>
            <div className="message-text">
                محصول شما با موفقیت در سامانه ثبت شد و در فهرست آورده‌های شما قرار گرفت
            </div>
            <div className="small-url"> آدرس محصول: {`http://daneshboom.ir/product/${nowCreatedId}/basicInformation`}</div>
            <div className="act-bar">
                {actions.map(act => (
                    <div key={act.title} className="act-btn" onClick={act.handler}>
                        {act.image}
                        {act.title}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SuccessMessage
