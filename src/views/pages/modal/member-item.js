import React, { Component } from "react"
import PropTypes from "prop-types"
import {AgentSvgIcon, TipsIcon} from "src/images/icons"
class MemberItem extends Component {
  constructor(props){
    super(props)
  }
  handleClick(){
    this.props.onAdd(this.props.index)
  }
  render(){
    const {added, name, skill} = this.props
    var btnClass = added==true ? "added" :'toadd'
    var label = added ? "افزوده شده" : 'افزودن'
    
    return(
      <div className="member-item">
        <div className="row" dir='rtl'>
          <div className="col">
            <img src="http://restful.daneshboom.ir/media/2fe29b711caf405cbc2344cad5661bd3.jpeg" className="member-img"/>
          </div>
          <div className="col">
            <p><strong>{name}</strong></p>
            <p>{skill}</p>
          </div>
          <div className="col">
            <button className={`btn btn-sm ${btnClass}`} onClick={this.handleClick.bind(this)}> {label}</button>
          </div>
        </div>
      </div>
    )
  }
}
export default MemberItem