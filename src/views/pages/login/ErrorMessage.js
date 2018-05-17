import React from 'react';

const ErrorMessage = ({message, error}) => {
  const className = (error) ? ('error-message') : ('success-message')
  return (
    <div className={className}>{message}</div>
  )
}

export default ErrorMessage;