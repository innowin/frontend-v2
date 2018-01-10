import React from 'react';

const ErrorMessage = ({message , error})=> {
	const errorStyle = {color : 'red'};
	const successStyle = {color : 'green'};
	
	return (
			<div style={(error) ? (errorStyle) : (successStyle)}>{message}</div>
	)
}

export default ErrorMessage;