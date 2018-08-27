// @flow
import * as React from "react"
import cx from 'classnames'
import FontAwesome from 'react-fontawesome'
import PropTypes from 'prop-types'
import {EditIcon} from 'src/images/icons'
import ErrorCard from "./ErrorCard"
import {loadingCard} from "./LoadingCard"
import client from "src/consts/client"

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
  title: string
}

export const ItemHeader = (props: PropsItemHeader): div => {
  const {showEdit} = props
  return (
      <div className="-item-header">
        <div className="-item-title">{props.title}</div>
        <div className="-item-edit-btn"> 
        {
        (showEdit !== null) ?
        <div onClick={showEdit}><EditIcon/></div> : <span/>
        }
        </div>
      </div>
  )
}
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
  //TODO: mohammad get userId from redux
	userId?: string
}

export const CategoryTitle = ({
                                title, createForm = true,
                                showEditBtn = false,
                                showCreateForm = () => false,
                                showEditHandler = () => 0,
																userId
                              }: PropsCategoryTitle): div => {
  return (
      <div className="category-title-container">
        <div className="-categoryTitle">
          <span>{title}</span>
          {
            !createForm && client.checkIdWithQueryId(userId) &&
            <button className="btn btn-sm btn-outline-success" onClick={showCreateForm}>
              <FontAwesome name="plus"/>
            </button>
          }
          {showEditBtn && client.checkIdWithQueryId(userId) &&
            <div className="edit-btn-wrapper" onClick={showEditHandler}><EditIcon className="edit-btn"/></div>
          }
        </div>
        <div className="category-divider"></div>
      </div>
  )
}
CategoryTitle.propTypes = {
  title: PropTypes.node,
  createForm: PropTypes.bool,
  showCreateForm: PropTypes.func,
}


type PropsFieldLabel = {
  label: string
}

export const FieldLabel = (props: PropsFieldLabel): div => {
  return (
      <div className="col-5">
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
      <div className="col-7 font-weight-bold break-word">
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
  isLoading: boolean
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
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  retry: PropTypes.func,
  className: PropTypes.string
}

