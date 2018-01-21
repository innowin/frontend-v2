import React from 'react'

export const childProps = ({props, children}) => {
    const _setPropsToChildren = (child) => {
      return React.cloneElement(child, props)
    };
    return React.Children.map(children, _setPropsToChildren);
};

