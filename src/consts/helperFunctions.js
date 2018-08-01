const arrayToIdKeyedObject = (arr) => { // this function converts an array of objects (that any object has 'id' in
    // its keys ) to an object with keys of ids and values of correspond object.
    // [ {id: 1, num: 10}, {id: 2, num: 20} ] ===> { 1: {num: 10}, 2: {num: 20} }
    return arr.reduce((acc, item) => {
        const shadow = {...item}
        delete shadow['id']
        return {
            ...acc,
            [item.id]: shadow
        }
    }, {})
}

export default {
    arrayToIdKeyedObject
}