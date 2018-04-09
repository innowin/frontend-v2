import React from 'react';
import {ClipLoader} from 'react-spinners';

export const LoadingCard = () => {
    return (
        <div className="card mt-5">
            <div className="card-block">
              <ClipLoader color="#999" size={40} margin="4px" loading={true}/>
            </div>
        </div>
    )
};


