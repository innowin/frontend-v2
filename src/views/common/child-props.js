import React from 'react';

export const childProps = ({props, children}) => {
    return React.Children.map(children,
        (child) => React.cloneElement(child, props)
    );
};

