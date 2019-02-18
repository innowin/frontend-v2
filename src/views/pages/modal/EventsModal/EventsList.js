// @flow
import * as React from 'react'
import {Component} from 'react'
import {RightArrow} from 'src/images/icons'

type EventsListProps = {
  events : {|
    [string] : {
      id : number,
      title : string,
      detail : string,
      showDetails : boolean
    }
  |}
}

type EventsListStates = {
  events : {
    [string] : {
      id : number,
      title : string,
      detail : string,
      showDetails : boolean
    }
  }
}

class EventsList extends Component<EventsListProps, EventsListStates> {
  constructor (props : EventsListProps) {
    super(props);
    this.state = {
      events: this.props.events
    }
  }
  
  attrs : HTMLDivElement
  _detailToggle = (id : string) => {
    const {events} = this.state
    const obj = events[id]

    if (obj && obj.hasOwnProperty("showDetails")) {
      const newObj = {...obj, showDetails: !obj.showDetails}
      this.setState({...this.state, events: {...events, [id]: newObj}}, () => console.log(this.state))
    }
  }
  
  render = () => {
    const {events} = this.props
    console.log('this.state >> ', this.state)
    return (
        <React.Fragment>
          <div className="event-list-wrapper">
            <div className="head">
              <div className="title">ثبت نام در رویداد های شبکهٔ نخبگان علمی - فناوری | فحاد</div>
              <div className="description">مایل به شرکت در کدام رویداد ها هستید؟</div>
            </div>
            <div className="list">
              {
                function (events, toggle, state, attrs) {
                  let result = []
                  
                  for (let key in events) {
                    let eventObj = events[key]
                    let {showDetails, id} = eventObj
                    let attrsStyle = showDetails ? {
                      height: `${eventObj.detail.length*44}px`
                    } : {
                      height: `0`
                    }
                    console.log('obj in iife >', eventObj)
                    result.push(
                        <div key={`${key}-item`} className="item">
                          <label htmlFor={eventObj.title} className="container-checkmark">
                            <input name={eventObj.title} id={eventObj.title} type="checkbox"/>
                            <p>{eventObj["title"]}</p>
                            <div className="button button-details" onClick={(e) => {e.stopPropagation();toggle('' + id)}}> مشاهدهٔ
                              جزییات <span><RightArrow className="arrow"/></span>
                            </div>
                            <span className="checkmark"> </span>
                          </label>
                          <div style={attrsStyle} className={showDetails ? "attributes-list slide-in" : "attributes-list slide-out"}>
                            <div className="attribute-item">
                              <div className="key item-box">مکان</div>
                              <div className="value item-box">تهران</div>
                            </div>
                            <div className="attribute-item">
                              <div className="key item-box">زمان</div>
                              <div className="value item-box">امروز</div>
                            </div>
                          </div>
                        </div>)
                  }
                  return result
                }(this.state.events, this._detailToggle, this.attrs)
              }
            </div>
            <div className="buttons">
              <div className="button save">ثبت</div>
              <div className="button cancel">لغو</div>
            </div>
          </div>
        </React.Fragment>
    )
  }
}

export default EventsList