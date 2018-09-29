// @flow
import * as  React from "react"
import {Component} from "react"
import PropTypes from "prop-types"
import "moment/locale/fa"
import Moment from "react-moment"
import {EditIcon, DefaultUserIcon} from "src/images/icons"
import {NEW_VIEW, GET_VIEWS_COUNT} from "src/consts/Events"
import {SOCKET as socket} from "src/consts/URLS"
import {TOKEN} from "src/consts/data"
import {VerifyWrapper} from "src/views/common/cards/Frames"
import {getFile} from "../../../crud/media/media"
import {ProductContainer} from './Product/index'
import FontAwesome from "react-fontawesome"
import type {RepresentType, UserType, ProfileType} from "src/consts/flowTypes/product/productTypes"
import type {TranslatorType} from "src/consts/flowTypes/common/commonTypes"

type RepresentItemWrapperProps = {
	children: React.Node
}

export const RepresentItemWrapper = (props: RepresentItemWrapperProps) => {
	const {children} = props
	return <div className="-itemWrapperPost">{children}</div>
}

type RepresentItemHeaderProps = {
	name: ?string,
	username: string,
	represent: RepresentType,
	showEdit: Function,
}

const RepresentItemHeader = (props: RepresentItemHeaderProps) => {
	const {name, showEdit, username, represent} = props
	return (
			<div className="-item-headerPost">
				<div className="-item-titlePost">
					<span className="mr-2">{name}</span>
					<span className="mr-2 -green2">{username}</span>
					<Moment className="mr-3 -green2" element="span" fromNow ago>{represent.created_time}</Moment>
					<span className="mr-1 -green2"> پیش</span>
				</div>
				<div className="-item-edit-btn pulse">
					<div onClick={showEdit}><EditIcon/></div>
				</div>
			</div>
	)
}

type RepresentBodyProps = {
	description: string
}

export const RepresentBody = (props: RepresentBodyProps) => {
	const {description} = props
	return <div className="-line-height">{description}</div>
}

type RepresentFooterProps = {
	viewerCount: number,
	addViewer: Function
}
const RepresentFooter = (props: RepresentFooterProps) => {
	const {viewerCount, addViewer} = props
	return (
			<div className="-item-footerPost">
				<div>
					<span className="ml-1">{viewerCount}</span>
					<FontAwesome name="eye"/>
				</div>
				<div>
					<span className="ml-1">\</span>
					<FontAwesome name="share"/>
				</div>
				<span>
          <a href="#" onClick={addViewer}><FontAwesome name="ellipsis-h"/></a>
        </span>
			</div>
	)
}
type RepresentViewProps = {
	showEdit: Function,
	represent: RepresentType,
	profile: ProfileType,
	user: UserType,
	productId: number,
	profile_media_File?: string,
	error: boolean | string,
	isLoading: boolean,
	organization: {},
	translator: TranslatorType
}

type RepresentViewState = {
	viewerCount: number,
	isLoading: boolean,
	error: string | boolean,
	profile_media_File: ?string,
}

export class RepresentView extends Component<RepresentViewProps, RepresentViewState> {
	static propTypes = {
		showEdit: PropTypes.func.isRequired,
		represent: PropTypes.object.isRequired,
		profile: PropTypes.object.isRequired,
		user: PropTypes.object.isRequired,
	}
	
	constructor() {
		super()
		this.state = {viewerCount: 0, isLoading: false, error: false, profile_media_File: null}
	}
	
	_getViewerCount = () => {
		const representId = this.props.represent.id
		const id = `represent-${representId}`
		const emitting = () => {
			const newState = {...this.state, isLoading: true}
			this.setState(newState)
			socket.emit(GET_VIEWS_COUNT, {
				id: id,
				result: `${representId}-_getViewerCount`
			})
		}
		emitting()
		socket.on(`${representId}-_getViewerCount`, (res) => {
			if (res.detail) {
				const newState = {...this.state, error: res.detail, isLoading: false}
				this.setState(newState)
			} else {
				const newState = {...this.state, viewerCount: res, isLoading: false}
				this.setState(newState)
			}
		})
	}
	
	_addViewer = (e: SyntheticEvent<>) => {
		e.preventDefault()
		const representId = this.props.represent.id
		const id = `represent-${representId}`
		const emitting = () => {
			const newState = {...this.state, isLoading: true}
			this.setState(newState)
			socket.emit(NEW_VIEW, {
				id: id,
				token: TOKEN,
				result: "_addViewer-result"
			})
		}
		emitting()
		socket.on("_addViewer-result", (res) => {
			if (res.detail) {
				const newState = {...this.state, error: res.detail, isLoading: false}
				this.setState(newState)
			} else {
				const newState = {...this.state, isLoading: false}
				this.setState(newState)
			}
		})
		
		this._getViewerCount()
	}
	
	_getFile = (mediaId: number) => {
		if (mediaId) {
			const mediaResult = (res) => {
				this.setState({...this.state, profile_media_File: res.file})
			}
			return getFile(mediaId, mediaResult)
		}
	}
	
	componentDidMount() {
		this._getViewerCount()
		this._getFile(this.props.profile.profile_media)
	}
	
	componentWillUnmount() {
		const representId = this.props.represent.id
		socket.off(`${representId}-_getViewerCount`, (res) => {
			if (res.detail) {
				const newState = {...this.state, error: res.detail, isLoading: false}
				this.setState(newState)
			} else {
				const newState = {...this.state, viewerCount: res, isLoading: false}
				this.setState(newState)
			}
		})
		socket.off("_addViewer-result", (res) => {
			if (res.detail) {
				const newState = {...this.state, error: res.detail, isLoading: false}
				this.setState(newState)
			} else {
				const newState = {...this.state, isLoading: false}
				this.setState(newState)
			}
		})
	}
	
	render() {
		const {showEdit, represent, productId, user, organization, translator, profile_media_File, isLoading, error} = this.props
		const {viewerCount} = this.state
		return (
				<VerifyWrapper isLoading={isLoading} error={error}>
					<RepresentItemWrapper>
						<div className="-img-col"> // TODO mohsen: handle src of img
							{
								(!profile_media_File) ? (<DefaultUserIcon className="-item-imgPost"/>) : (
										<img className="-item-imgPost rounded-circle" src={profile_media_File} alt=""/>)
							}
						</div>
						<div className="-content-col">
							
							<RepresentItemHeader
									name={user.first_name + " " + user.last_name}
									username={user.username}
									represent={represent}
									showEdit={showEdit}
							/>
							<RepresentBody description={represent.post_description}/>
							<ProductContainer
									productId={productId}
									translator={translator}
									organization={organization}
							/>
							<RepresentFooter
									representId={represent.id}
									viewerCount={viewerCount}
									addViewer={this._addViewer}
							/>
						</div>
					</RepresentItemWrapper>
				</VerifyWrapper>
		)
	}
}
