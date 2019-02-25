// @flow
import * as React from 'react'
import {Component} from 'react'
import {RightArrow} from 'src/images/icons'

type Event = {|
  id : number,
  title : string,
  detail : [string],
  showDetails : boolean
|}

type EventsListProps = {
  events : {
    [string] : Event
  },
  setForm : Function,
  cancelForm : Function,
  toggleActiveEvent: Function,
}

type EventsListStates = {
  events : {
    [string] : Event
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
      this.setState({...this.state, events: {...events, [id]: newObj}})
    }
  }
  
  _toggleChangeInput = (e:SyntheticInputEvent<HTMLInputElement>) => {
    let id = e.currentTarget.dataset.eventId
    let isChecked = e.currentTarget.checked
    let {toggleActiveEvent} = this.props
    toggleActiveEvent(id, isChecked)
  }
  
  componentDidUpdate (prevProps : EventsListProps, prevState : EventsListStates, snapshot : any) : void {
    if (prevProps.events !== this.props.events) {
      console.trace('in if did update')
      this.setState({...this.state, events: this.props.events})
    }
  }
  
  render = () => {
    const {setForm, cancelForm} = this.props
    const {events} = this.state
    const list = () => {
      let result = []
      for (let key in events) {
        let eventObj = events[key]
        let {showDetails, id, detail} = eventObj
        let attrsStyle = showDetails ? {
          height: `${eventObj.detail.length * 44}px`
        } : {
          height: `0`
        }
        result.push(
            <div key={`${key}-item`} className="item">
              <label htmlFor={eventObj.title} className="container-checkmark">
                <input name={eventObj.title} data-event-id={eventObj.id} onChange={this._toggleChangeInput} id={eventObj.title} type="checkbox"/>
                <p>{eventObj["title"]}</p>
                <div className="button button-details" onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  this._detailToggle('' + id)
                }}> مشاهدهٔ
                  جزییات <span><RightArrow className="arrow"/></span>
                </div>
                <span className="checkmark"> </span>
              </label>
              <div style={attrsStyle}
                   className={showDetails ? "attributes-list slide-in" : "attributes-list slide-out"}>
                {
                  (detail && detail.length > 0) ? (
                      detail.map((el, i) => (
                              <div key={`element-${i}`} className="attribute-item">
                                <div className="key item-box">{el && el[0]}</div>
                                <div className="value item-box">{el && el[1]}</div>
                              </div>
                          )
                      )) : ""
                }
              </div>
            </div>)
      }
      return result
    }
    return (
        <React.Fragment>
          <div className="event-list-wrapper">
            <div className="list">
              {
                list()
              }
            </div>
          </div>
          <div className="buttons">
            <div onClick={setForm} className="button save">ثبت</div>
            <div onClick={cancelForm} className="button cancel">لغو</div>
          </div>
        </React.Fragment>
    )
  }
}

export default EventsList