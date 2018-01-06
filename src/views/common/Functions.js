import React from 'react'


export const str_to_option = (primary_string) => {
    const array_ = primary_string.replace(/'/g, "").replace(/\(/g, "").replace(/\)/g, "").split(', ');
    let option = [];
    for (let i = 0; i < array_.length; i += 2) {
        option.push({label: array_[i + 1], value: array_[i]});
    }
    return option
};

export const allUsers_to_option = (allUsers_) => {
    let option = [];
    for (let i = 0; i < allUsers_.length; i += 1) {
        option.push({label: allUsers_[i][0], value: allUsers_[i][1]});
    }
    return option
};

export const optionLabel = (options, value) => {
    let label = '';
    if (value) {
        if (typeof(value) === 'string') {
            value = value.toLowerCase();
            for (let i = 0; i < options.length; i += 1) {
                if (value === options[i].value) {
                    label = options[i].label
                }
            }
        }
        else {
            label = [];
            for (let i = 0; i < options.length; i += 1) {
                for (let j = 0; j < value.length; j += 1) {
                    if (value[j] === options[i].value) {
                        label[j] = options[i].label;
                    }
                }
            }
        }
    }
    return label
};

export const list_of_badge = (myValue) => {
    let myList = [];
    if (Array.isArray(myValue)) {
        myList = myValue.map((item, i) => {
            return (
                <span key={i} className="badge badge-success mr-2">{item}</span>
            )
        });
    }
    return myList
};
