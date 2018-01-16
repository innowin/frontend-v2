/*global __*/
import React,{Component} from "react";
import PropTypes from 'prop-types';
import {
	VerifyWrapper,
	ListGroup
	} from "../../common/cards/Frames";
import {UserCareerView} from "./view";
import {REST_URL as url, SOCKET as socket} from "../../../consts/URLS"
import {REST_REQUEST} from "../../../consts/Events"

//TODO amir #5  get data with SOCKET and review component
export class UserCareers extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			edit: false,
			isLoading: false,
			careers:[
			]
		};
	}

	static propTypes = {
		updateUser: PropTypes.func.isRequired,
		userId: PropTypes.string.isRequired,
	};

	componentDidMount(){
		const {userId } = this.props;
		const emitting = () => {
			const newState = {...this.state, isLoading: true};
			this.setState(newState);
			socket.emit(REST_REQUEST,
				{
					method: "get",
					url: `${url}/users/work-experiences/${userId}/`,
					result: `UserCareers-get/${userId}`,
					token: "",
				}
			);
		};

		emitting();

		socket.on(`UserCareers-get/${userId}`, (res) => {
			if (res.detail) {
				const newState = {...this.state, error: res.detail, isLoading: false};
				this.setState(newState);
			}else{
				const newState = {...this.state, careers: res, isLoading: false};
				this.setState(newState);
			}

		});
	}
	render() {
		const {careers, edit, isLoading, error} = this.state;
		const careersView = careers.map((career,index)=>{
			return <UserCareerView career={career} key={index}/>
		})
		return(
			<VerifyWrapper isLoading={isLoading} error={error}>
				{
					<ListGroup>
						{careersView}
					</ListGroup>
				}
			</VerifyWrapper>
		)
	}
}

export default UserCareers;
