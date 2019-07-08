import React, {Component} from "react"
import RightArrowSvg from "src/images/common/right_arrow_svg"
import {CancelSvg, CheckSvg} from "src/images/icons"

class FahadEventPageFive extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
        <React.Fragment>
          <div className="event-reg-modal-header">
            فحاد
            &nbsp;&nbsp;&nbsp;
            <RightArrowSvg className="small-event-arrow"/>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <b>
              ثبت نام رویداد زیست‌فناوری
            </b>
          </div>
          <div className="event-reg-modal-body">

            <p style={{marginBottom: "25px"}}>
              پیشنهادات می‌بایست عملیاتی و آمادۀ عقد قرارداد همکاری توسط مجموعه با ذکر جزییات (عدد، رقم و سایر پارامتر های مهم) باشد.
            </p>

            <div style={{marginBottom: "25px"}}>
              <div className="fahad-modal-cancel-check-con">
                <CancelSvg className="fahad-modal-cancel-svg"/>
                <div className="fahad-modal-cancel-check-text">نمونۀ بد:</div>
              </div>
              <div style={{margin: "10px 25px"}}>
                علاقه‌مند به جذب سرمایه‌گذار
              </div>

              <div className="fahad-modal-cancel-check-con">
                <CheckSvg className="fahad-modal-check-svg"/>
                <div className="fahad-modal-cancel-check-text">نمونۀ صحیح:</div>
              </div>
              <div style={{margin: "10px 25px"}}>
                نیازمند سرمایه‌گذاری به ارزش 500 میلیون تومان تا 3 میلیارد تومان در قالب مشارکتی مدنی/تأسیس شرکت مشترک جهت راه‌اندازی خط تولید پرینتر
                های سه بعدی
              </div>
            </div>


            <div style={{marginBottom: "25px"}}>
              <div className="fahad-modal-cancel-check-con">
                <CancelSvg className="fahad-modal-cancel-svg"/>
                <div className="fahad-modal-cancel-check-text">نمونۀ بد:</div>
              </div>
              <div style={{margin: "10px 25px"}}>
                نیازمند جذب نیروی برق
              </div>

              <div className="fahad-modal-cancel-check-con">
                <CheckSvg className="fahad-modal-check-svg"/>
                <div className="fahad-modal-cancel-check-text">نمونۀ صحیح:</div>
              </div>
              <div style={{margin: "10px 25px"}}>
                نیازمند به جذب دو نفر در رشتۀ برق، خانم و آقا، ساکن تهران، در مقطع تحصیلی کارشناسی، در قالب اعطای تسهیلات نظام‌وظیفه، با پرداخت ساعتی
              </div>
            </div>

            <label>
              فرصت‌های همکاری در حوزۀ سرمایه
            </label>
            <textarea className="organization-leadership-expertise-input"/>

            <label>
              فرصت‌های همکاری در حوزۀ بازار و بازرگانی
            </label>
            <textarea className="organization-leadership-expertise-input"/>

            <label>
              فرصت‌های همکاری در حوزۀ منابع انسانی
            </label>
            <textarea className="organization-leadership-expertise-input"/>

            <label>
              فرصت‌های همکاری در حوزۀ تحقیق و توسعه
            </label>
            <textarea className="organization-leadership-expertise-input"/>

            <label>
              فرصت‌های همکاری در حوزۀ تامین
            </label>
            <textarea className="organization-leadership-expertise-input"/>

            <label>
              فرصت‌های همکاری در حوزۀ رسانه
            </label>
            <textarea className="organization-leadership-expertise-input"/>

            <label>
              فرصت‌های همکاری در حوزۀ پایان‌نامه و پروژه
            </label>
            <textarea className="organization-leadership-expertise-input"/>

            <label>
              سایر فرصت‌های همکاری
            </label>
            <textarea className="organization-leadership-expertise-input"/>

          </div>

        </React.Fragment>
    )
  }
}

export default FahadEventPageFive