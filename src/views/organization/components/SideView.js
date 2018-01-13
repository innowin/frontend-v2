import React,{Component} from 'react';
import PropTypes from 'prop-types';
export class OrganizationSideView extends Component {
	render() {

			const {organization} = this.props;
			// TODO keep ltr and uncomment components
			return <div style={{padding:10}}>

					<img alt="" src={organization.logo.url} style={{maxWidth:100}}/>
					<h6 style={{padding:20}}>شرکت :{organization.nikeName || "نام شرکت"}</h6>
					<h6 style={{padding:5,fontWeight:0,fontSize:13}}>{organization.officialName}</h6>
					<h6 style={{padding:5,fontWeight:0,fontSize:13}}>{organization.description}</h6>
					<div className="row" style={{marginTop:30}}>
							<div className="col">
									<button type="button" style={{fontFamily:'IRANSans',borderColor:'#606060',color:'#606060'}} className="btn btn-outline-secondary btn-block">دنبال کردن</button>
							</div>
							<div className="col">
									<button type="button" style={{fontFamily:'IRANSans',borderColor:'#606060',color:'#606060'}} className="btn btn-outline-secondary btn-block">ارسال پیام</button>
							</div>
					</div>
					</div>

	}
}
OrganizationSideView.propTypes = {
	organization: PropTypes.object.isRequired,
}

export default OrganizationSideView;