
import React, { Component } from 'react'
import PropTypes from "prop-types"
import LabelTag from '../../common/tag-label.js'
export class SuperTag extends React.Component{
  constructor(props){
    super(props)
  }
  showRemove(){

  }
  removeTag(){
    this.props.removeTag(this.props.idx)
  }
  render(){
    return(
      <div onMouseOver={this.showRemove.bind(this)} className="super-tag">
        <img className="close-img" 
          src="https://banner2.kisspng.com/20180403/sww/kisspng-x-mark-check-mark-cross-sign-clip-art-x-mark-5ac40246df0502.6028199815227950789135.jpg"
          width="10px"
          height="10px"
          onClick={this.removeTag.bind(this)}/>
        <LabelTag
          name={this.props.name}
          number={this.props.number}
        />
      </div>
    )
  }
}

export default SuperTag