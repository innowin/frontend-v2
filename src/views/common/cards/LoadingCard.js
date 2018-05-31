import React from 'react';
import {ClipLoader} from 'react-spinners';

export const LoadingCard = () => {
  return (
    <div className="-loading">
      <div className="loading-box">
        <ClipLoader color="#999" size={40} margin="4px" loading={true}/>
      </div>
    </div>
  )
};


