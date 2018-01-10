import React from 'react';
import { action } from '@storybook/addon-actions';
import {FrameCard, ListGroup} from "src/views/common/cards/Frames";

export const CenterDecorator = (width) => (story) => (
    <div style={{margin: "50px auto", width, padding: 30, backgroundColor: '#f7f7f7'}}>
        {story()}
    </div>
);

export const RowDecorator = (story) => (
    <div className="row">
        {story()}
    </div>
);

export const ListGroupDecorator = (story) => {
    return <div className="list-group list-group-flush">
        {story()}
    </div>;
};


export const ProfileCardDecorator = (story) => {
    return <FrameCard>
        <ListGroup>
            {story()}
        </ListGroup>
    </FrameCard>;
};

export const stateDecorator = (story) => {
    let input = null;
    const ref = (e) => {
        input = e;
    };
    const onClick = () => {
        if (input) {
            const err = input.validate();
            if (err) {
                action('invalid')(err);
                return;
            }
            const value = input.getValue();
            action('value')(value);
        }
    };

    return <div>
        {React.cloneElement(story(), {ref})}
        <button onClick={onClick} className="btn btn-secondary">check</button>
    </div>;
};