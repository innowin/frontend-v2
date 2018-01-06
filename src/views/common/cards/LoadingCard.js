/*global __*/
import React from "react";

export const LoadingCard = ({header}) => {
    return (
        <div className="card mt-5">
            <div className="card-block">
                <h3>{header}</h3>
                {__('Loading ...')}
            </div>
        </div>
    )
};


