import React from 'react'
import {Route} from 'react-router-dom'

//Some functions to make properiate Route with render function to pass props down
const renderMergedProps = (component, ...rest) => {
	const finalProps = Object.assign({}, ...rest);
	return (
		React.createElement(component, finalProps)
	);
};

const PropsRoute = ({ component, ...rest }) => {
	return (
		<Route {...rest} render={routeProps => {
			return renderMergedProps(component, routeProps, rest);
		}}/>
	);
};

export default PropsRoute;