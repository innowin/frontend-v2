import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import client from './client'

const renderMergedProps = (component, ...rest) => {
	const finalProps = Object.assign({}, ...rest);
	return (
			React.createElement(component, finalProps)
	);
};


const PrivateRoute = ({component,...rest}) => (
		<Route {...rest} render={ routeProps => (
			client.isAuthenticated() ?
					renderMergedProps(component,routeProps , rest)
					:
					<Redirect to={{
						pathname: '/login',
						state: routeProps.location,
					}}/>
			)}
		/>
);

export default PrivateRoute;