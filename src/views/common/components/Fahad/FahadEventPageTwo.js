import React, {PureComponent} from "react"
import RightArrowSvg from "src/images/common/right_arrow_svg"
import {Product as ProductSvg, UploadIcon} from "src/images/icons"
import InteliInput from "../../inputs/InteliInput"

class FahadEventPageTwo extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      haveProduct: false,
      selectedCategory: null,
      selectedImage: [],
    }
  }

  handleCatChange(data) {
    this.setState({...this.state, selectedCategory: data})
  }

  setHaveProduct() {
    this.setState({...this.state, haveProduct: true})
  }

  render() {
    let {haveProduct, selectedImage} = this.state
    let {category} = this.props
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
          {
            haveProduct ?
                <div className="event-reg-modal-body">

                  <label>
                    نام محصول یا پروژه
                    <span className={"secondary-color"}> * </span>
                  </label>
                  <input type={"text"} className="organization-leadership-job-input" placeholder={"نام محصول یا پروژه"}/>

                  <label>
                    مجوزها و تاییدیه‌ها
                  </label>
                  <textarea className="organization-leadership-expertise-input"
                            placeholder={"مجوزها و تاییدیه‌ها"}/>

                  <label>
                    ویژگی‌ها و مزیت رقابتی
                  </label>
                  <textarea className="organization-leadership-expertise-input"
                            placeholder={"ویژگی‌ها و مزیت رقابتی"}/>

                  <label>
                    بازار هدف و حوزۀ کاربرد
                  </label>
                  <textarea className="organization-leadership-expertise-input"
                            placeholder={"بازار هدف و حوزۀ کاربرد"}/>

                  <label>
                    وضعیت تجاری‌سازی محصول
                  </label>
                  <textarea className="organization-leadership-expertise-input"
                            placeholder={"وضعیت تجاری‌سازی محصول"}/>

                  <label>
                    دستۀ محصول
                  </label>
                  <InteliInput handleChange={(data) => this.handleCatChange(data)}
                               list={category} placeholder="انتخاب دسته بندی" className="inteli-input-light-border"/>

                  <label>
                    امکانات و تسحیلات خرید
                  </label>
                  <textarea className="organization-leadership-expertise-input"
                            placeholder={"امکانات و تسحیلات خرید"}/>

                  <label>
                    تصاویر محصول یا پروژه
                  </label>
                  <div className="fahad-modal-upload-svg-con"><UploadIcon className="fahad-modal-upload-svg"/></div>

                  <div className={"fahad-product-gallery-container"}>
                    <div className={"fahad-product-gallery-item-container"}>
                      {selectedImage[0] ?
                          <div>
                            <img src={selectedImage[0]} alt={"در حال بارگذاری تصویر محصول"} className={"product-gallery-item"}/>
                            <div className={"product-gallery-cancel-item"} onClick={() => this._deleteImage(0)}>✕</div>
                          </div>
                          :
                          null
                      }
                    </div>
                    <div className={"fahad-product-gallery-item-container"}>
                      {selectedImage[1] ?
                          <div>
                            <img src={selectedImage[1]} alt={"در حال بارگذاری تصویر محصول"} className={"product-gallery-item"}/>
                            <div className={"product-gallery-cancel-item"} onClick={() => this._deleteImage(1)}>✕</div>
                          </div>
                          :
                          null
                      }
                    </div>
                    <div className={"fahad-product-gallery-item-container"}>
                      {selectedImage[2] ?
                          <div>
                            <img src={selectedImage[2]} alt={"در حال بارگذاری تصویر محصول"} className={"product-gallery-item"}/>
                            <div className={"product-gallery-cancel-item"} onClick={() => this._deleteImage(2)}>✕</div>
                          </div>
                          :
                          null
                      }
                    </div>
                    <div className={"fahad-product-gallery-item-container"}>
                      {selectedImage[3] ?
                          <div>
                            <img src={selectedImage[3]} alt={"در حال بارگذاری تصویر محصول"} className={"product-gallery-item"}/>
                            <div className={"product-gallery-cancel-item"} onClick={() => this._deleteImage(3)}>✕</div>
                          </div>
                          :
                          null
                      }
                    </div>
                  </div>

                </div>
                :
                <div className="have-product-container">
                  <div className="fahad-modal-product-svg-con">
                    <ProductSvg className='fahad-modal-product-svg'/>
                  </div>
                  <p>
                    افزودن محصول یا پروژه
                  </p>
                  <p className="disabled-text">
                    در صورتی که محصول یا پروژه ندارید، میتوانید از این مرحله بگذرید
                  </p>
                  <div className="add-product-button" style={{marginTop: "25px"}} onClick={() => this.setHaveProduct()}>
                    افزودن محصول
                  </div>
                </div>
          }

        </React.Fragment>
    )
  }
}

export default FahadEventPageTwo