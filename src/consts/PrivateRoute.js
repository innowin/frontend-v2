import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {default as client} from './client'

const PrivateRoute = ({component,...rest}) => (
		<Route {...rest} render={(props)=> (
			client.isAuthenticated() ?
					React.createElement(component , props)
					:
					<Redirect to={{
						pathname: '/login',
						state: {from: props.location},
					}}/>
			)}
		/>
);

export default PrivateRoute;