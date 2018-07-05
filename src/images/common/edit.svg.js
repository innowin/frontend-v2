import React from "react";

const EditIcon = ({className, clickHandler}) => (
    <svg viewBox="0 0 94 94" className={className} onClick={clickHandler}>
        <path
            d="M29 50l37 -36 15 15 -37 37 -15 -1 0 -15zm-14 -50l45 0 0 13 -47 0 0 68 68 0 0 -47 13 0 0 45c0,8 -7,15 -15,15l-64 0c-8,0 -15,-7 -15,-15l0 -64c0,-8 7,-15 15,-15zm56 9l8 -9 15 15 -8 9 -15 -15z"/>
    </svg>
)

export default EditIcon;