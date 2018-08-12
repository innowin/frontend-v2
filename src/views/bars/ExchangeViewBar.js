import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {DefaultExchangeIcon} from "../../images/icons"
import {VerifyWrapper} from "../common/cards/Frames"
import {BadgesCard, TagsBox} from "./SideBar"
import exchangeActions from "src/redux/actions/exchangeActions"
import {
	getExchange,
	getExchangeMembers,
	getExchangeMemberIdentity,
	getExchangeMember
} from "../../crud/exchange/exchange"
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {ExchangeIcon} from "src/images/icons"
import {getExchangePostsByPostType, getExchangePostsHasProduct} from "../../crud/post/exchangePost"

class ExchangeViewBar extends Component {
	static propTypes = {
		exchangeId: PropTypes.number.isRequired
	}
	
	constructor(props) {
		super(props)
		this.state = {
			exchange: {},
			demandCount: 0,
			supplyCount: 0,
			productCount: 0,
			badgesImgUrl: [],
			tags: [],
			members: [],
			membersViewSide: false,
			isLoading: true,
			error: null,
		}
	}

	_MockData = () => {
		this._test()
		const tags = [{title: "چادر مشکی"}, {title: "پوشاک مردانه"}]
		const badges = ["http://restful.daneshboom.ir/media/14ba7946fe394deca765cad2fc02c848.jpeg"]
		this.setState({...this.state, tags: tags, badgesImgUrl: badges})
	}
	
	_getExchange = (exchangeId) => {
		var self = this
		const handleResult = (res) => {
			this.setState({...this.state, exchange: res, loading: true})
			// TODO mohsen: socket.emit of badges
			// TODO mohsen: socket.emit of tags
			getExchangeMembers(exchangeId, (err) => {}, (identities) => {
				var members = []
				var j = 0
				//callback hell 201 requests just to get user names and profile Media TODO amir
				// TODO amir: tell backend to fix this mess
				for (var i = 0; i < identities.length; i++) {
					var member = identities[i].exchange_identity_related_identity
					members.push(member) //todo add profile media to identity_user
					j = j + 1
					if (j >= identities.length) {
						self.setState({...self.state, members: members, loading: false})
					}
				}
			})
		}
		getExchange(exchangeId, handleResult)
	}
	
	_getCounts = (exchangeId) => {
		const handleCountProduct = (res) => this.setState({...this.state, productCount: res.length, isLoading: false})
		const handleCountSupply = (res) => this.setState({...this.state, supplyCount: res.length},
				() => getExchangePostsHasProduct(exchangeId, handleCountProduct))
		const handleCountDemand = (res) => this.setState({...this.state, demandCount: res.length},
				() => getExchangePostsByPostType(exchangeId, 'supply', handleCountSupply))
		getExchangePostsByPostType(exchangeId, 'demand', handleCountDemand)
	}
	
	_handleMembersClick = (e) => {
		this.setState({...this.state, membersViewSide: !this.state.membersViewSide})
	}
	
	componentDidMount() {
		const {actions ,exchangeId} = this.props
		const {getExchangeMembersByExId} = actions
		getExchangeMembersByExId ( exchangeId )
		// this._getExchange(exchangeId)
		// this._getCounts(exchangeId)
		this._getCounts(exchangeId)
	}
	
	render() {
		const {exchange, badgesImgUrl, demandCount, supplyCount, productCount, tags, members, isLoading, error} = this.state
		const {translate} = this.props
		var membersView = members.map((val, idx) => {
			return (<div className="" key={idx}>
				<span>{val.username || val.name}</span>
				<img src={val.profile_media || "#"}></img>
			</div>)
		})
		return (
				<VerifyWrapper isLoading={isLoading} error={error}>
					<div className="-sidebar-child-wrapper col">
						<div className="align-items-center flex-column">
							{this.state.membersViewSide ?
									<i className="fa fa-arrow-left menuBottom" onClick={this._handleMembersClick.bind(this)}></i>
									:
									<i className="fa fa-ellipsis-v menuBottom"/>
							}
							{/*//TODO mohsen: set dafault image for exchange */}
							{
								(!exchange.link) ?
										(<DefaultExchangeIcon className="exchangeViewBarImg"/>) : (
												<img className="rounded-circle exchangeViewBarImg" alt="" src={exchange.link}/>)
							}
							<div className="exchangeName">
								<ExchangeIcon/>
								<div>
									<span className="fontSize-13px">{translate['Exchange']}: </span>
									<span>{exchange.name}</span>
								</div>
							</div>
							<span className="-grey1 fontSize-13px">{exchange.description}</span>
						</div>
						{this.state.membersViewSide ?
								<div className="numbersSection flex-column pl-3">
									<div className="">
										<span>اعضا:</span>
										<span>{membersView.length}</span>
									</div>
									{membersView}
								</div>
								:
								<div className="numbersSection flex-column pl-3">
									<div className="" onClick={this._handleMembersClick.bind(this)}>
										<span>اعضا:</span>
										<span>{membersView.length}</span>
									</div>
									<div className="">
										<span>عرضه:</span>
										<span>{supplyCount}</span>
									</div>
									<div className="">
										<span>تقاضا:</span>
										<span>{demandCount}</span>
									</div>
									<div className="">
										<span>محصول عرضه شده:</span>
										<span>{productCount}</span>
									</div>
								</div>
						}
						{
							(badgesImgUrl.length > 0) ? (
									<div className="flex-wrap pb-3">
										<BadgesCard badgesImgUrl={badgesImgUrl}/>
									</div>
							) : ("")
						}
						{
							(tags.length > 0) ? (
									<div className="flex-wrap pb-3">
										<TagsBox tags={tags}/>
									</div>) : ("")
						}
						<div className="row mr-0 ml-0 pb-3 exchangeViewSidebarBottom flex-wrap justify-content-around">
							<div className="pb-2">
								<button
										type="button"
										className="btn btn-outline-secondary btn-block sidebarBottom">ارسال پیام به کارگزار
								</button>
							</div>
							<div className="pb-2">
								<button
										type="button"
										className="btn btn-outline-secondary btn-block sidebarBottom">درخواست عضویت
								</button>
							</div>
						</div>
					</div>
				</VerifyWrapper>
		)
	}
}

const StateToProps = (state) => ({translate:state.intl.messages,router: state.router})
const DispatchToProps = dispatch => ({actions:bindActionCreators({
	getExchangeMembersByExId: exchangeActions.getExchangeMembersByExId,
},dispatch)})

export default connect(StateToProps,DispatchToProps)(ExchangeViewBar)
