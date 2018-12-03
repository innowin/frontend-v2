// @flow
import * as React from "react"
import cx from 'classnames'
import FontAwesome from 'react-fontawesome'
import PropTypes from 'prop-types'
import {EditIcon} from 'src/images/icons'
import ErrorCard from "./ErrorCard"
import {loadingCard} from "./LoadingCard"
import client from "src/consts/client"
import CheckOwner from "../CheckOwner";
import {connect} from "react-redux"
import type {paramType} from "src/consts/flowTypes/paramType";

type div = React.Element<'div'>
type PropsTabs = {
  children?: React.Node
}

export const Tabs = (props: PropsTabs): div => {
  return (
      <div className="tab-container">
        <div className="-tabs">
          {props.children}
        </div>
      </div>
  )
}

type PropsItemWrapper = {
  children?: React.Node,
  icon: React.Element<any>,
  className?: string
}

export const ItemWrapper = (props: PropsItemWrapper): div => {
  const {icon, children} = props
  const className = props.className || ''
  return (
      <div className={"-itemWrapper " + className}>
        <div className="-item-icon">{icon}</div>
        <div className="-item-content">
          {children}
        </div>
      </div>
  )
}
ItemWrapper.propTypes = {
  icon: PropTypes.node,
  className: PropTypes.string
}


type PropsListGroup = {
  children?: React.Node
}

export const ListGroup = (props: PropsListGroup): div => {
  return (
      <div className="list-group list-group-flush">
        {props.children}
      </div>
  )
}

type PropsItemHeader = {
  showEdit?: Function,
  title: string,
  param: paramType,
}

let ItemHeader = (props: PropsItemHeader): div => {
  const {showEdit, param} = props
  const id = param.user || param.organization
  return (
      <div className="-item-header">
        <div className="-item-title">{props.title}</div>
        {showEdit ?
            <div className="-item-edit-btn pulse">
              <CheckOwner id={id}>
                <div onClick={showEdit}><EditIcon/></div>
              </CheckOwner>
            </div>
            : ''
        }
      </div>
  )
}

const mapStateItemHeaderToProps = (state, props) => {
  return {
    param: state.param
  }
}
ItemHeader = connect(mapStateItemHeaderToProps)(ItemHeader)
export {ItemHeader}

ItemHeader.propTypes = {
  title: PropTypes.node,
  showEdit: PropTypes.func
}


type PropsFrameCard = {
  children?: React.Node,
  className?: string
}

export const FrameCard = (props: PropsFrameCard): div => {
  const className = props.className || ''
  return (
      <div className={cx("-frameCard\u0020" + className)}>
        {props.children}
      </div>
  )
}
FrameCard.propTypes = {
  className: PropTypes.string
}

type PropsCategoryTitle = {
  title: string,
  createForm?: boolean,
  showCreateForm?: Function,
  showEditBtn?: boolean,
  showEditHandler?: Function,
  param: paramType,
}

let CategoryTitle = ({
                       title, createForm = true,
                       showEditBtn = false,
                       showCreateForm = () => false,
                       showEditHandler = () => 0,
                       param,
                     }: PropsCategoryTitle): div => {
  const id = param.user || param.organization
  return (
      <div className="category-title-container">
        <div className="-categoryTitle">
          <span>{title}</span>
          {
            !createForm && param && client.checkIdWithQueryId(id) &&
            <button className="btn btn-sm btn-outline-success pulse add-user" onClick={showCreateForm}>
              <FontAwesome name="plus"/>
            </button>
          }
          {showEditBtn && param && client.checkIdWithQueryId(id) &&
          <div className="edit-btn-wrapper" onClick={showEditHandler}><EditIcon className="edit-btn"/></div>
          }
        </div>
        <div className="category-divider"/>
      </div>
  )
}
CategoryTitle.propTypes = {
  title: PropTypes.node,
  createForm: PropTypes.bool,
  showCreateForm: PropTypes.func,
  param: PropTypes.object,
}
const mapStateCategoryTitleToProps = (state, props) => {
  return {
    param: state.param
  }
}
CategoryTitle = connect(mapStateCategoryTitleToProps)(CategoryTitle)
export {CategoryTitle}


type PropsFieldLabel = {
  label: string
}

export const FieldLabel = (props: PropsFieldLabel): div => {
  return (
      <div className="field-label">
        {props.label}
      </div>
  )
}
FieldLabel.propTypes = {
  label: PropTypes.string.isRequired,
}


type PropsFieldValue = {
  value: string | React.Element<'span'>
}

export const FieldValue = (props: PropsFieldValue) => {
  return (
      <div className="field-value break-word">
        {props.value}
      </div>
  )
}
FieldValue.propTypes = {
  value: PropTypes.any
}

type PropsField = {
  children?: React.Node
}
export const Field = (props: PropsField): div => {
  return (
      <div className="row col-form-label">
        {props.children}
      </div>
  )
}

type PropsVerifyWrapper = {
  error: ?(boolean | string),
  retry?: Function,
  children?: React.Node,
  className?: string,
  isLoading?: boolean
}

export const VerifyWrapper = ({error, retry = () => alert("retry"), ...props}: PropsVerifyWrapper): div => {
  const {isLoading, children, className} = props
  if (!isLoading) {
    if (!error) {
      return (
          <div className={className}>
            {children}
          </div>
      )
    }
    // TODO mohsen #32 handel error message and retry in ErrorCard
    return <ErrorCard retry={retry} header={error}/>
  }
  return loadingCard()
}
VerifyWrapper.propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  retry: PropTypes.func,
  className: PropTypes.string
}

