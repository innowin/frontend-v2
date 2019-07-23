import React, {PureComponent} from "react"
import RightArrowSvg from "../../../../images/common/right_arrow_svg"

class FahadCurrentLevel extends PureComponent {
  render() {
    const {level} = this.props
    return (
        <div className="fahad-level">
          <div className="fahad-number-container" style={{backgroundColor: level >= 1 ? "#42AC97" : "#bababa"}}>
            1
          </div>
          <div className={level === 1 && "bold-one"}>
            اطلاعات مجموعه
          </div>
          <div>
            <RightArrowSvg className="small-event-arrow"/>
          </div>

          <div className="fahad-number-container" style={{backgroundColor: level >= 2 ? "#42AC97" : "#bababa"}}>
            2
          </div>
          <div className={level === 2 && "bold-one"}>
            محصولات و پروژه‌ها
          </div>
          <div>
            <RightArrowSvg className="small-event-arrow"/>
          </div>

          <div className="fahad-number-container" style={{backgroundColor: level >= 3 ? "#42AC97" : "#bababa"}}>
            3
          </div>
          <div className={level === 3 && "bold-one"}>
            مشخصات مدیران مجموعه
          </div>
          <div>
            <RightArrowSvg className="small-event-arrow"/>
          </div>

          <div className="fahad-number-container" style={{backgroundColor: level >= 4 ? "#42AC97" : "#bababa"}}>
            4
          </div>
          <div className={level === 4 && "bold-one"}>
            مشخصات شرکت‌کنندگان رویداد
          </div>
          <div>
            <RightArrowSvg className="small-event-arrow"/>
          </div>

          <div className="fahad-number-container" style={{backgroundColor: level >= 5 ? "#42AC97" : "#bababa"}}>
            5
          </div>
          <div className={level === 5 && "bold-one"}>
            فرصت‌های همکاری
          </div>
        </div>
    )
  }
}

export default FahadCurrentLevel