import exchange from "../redux/actions/types/exchange";

const deleteKeyFromObj = (obj, delKey) => {

  /**
   this function takes an object and a key (that include in the object keys) and remove this
   key from object keys immutably
   **/

  return Object.keys(obj).reduce((res, key) => {
    if (key === delKey) return res
    else return ({...res, [key]: obj[key]})
  }, {})
}

const arrayToIdKeyedObject = (arr) => {

  /**
   this function converts an array of objects (that any object has 'id' in
   its keys ) to an object with keys of ids and values of correspond object.
   [ {id: 1, num: 10}, {id: 2, num: 20} ] ===> { 1: {num: 10}, 2: {num: 20} }
   **/

  return arr.reduce((acc, item) => {
    const shadow = {...item}
    // delete shadow['id'] this line commented by ali orj.
    return {
      ...acc,
      [item.id]: shadow
    }
  }, {})
}

const arrayToDefaultObject = (arr) => {
  const newArr = arr.map(data => ({exchange:{content: {...data}, isLoading: false, error: null}}))
  return newArr.reduce((acc, item) => {
    const shadow = {...item}
    return {
      ...acc,
      [item.exchange.content.id]: shadow
    }
  }, {})
}


/**
 this function takes:
 a nested object like >> {12: {name: 'Ali', ... }, 14: {name: 'hasan', ... }, ... }
 a wanted key like >> 'id'
 a wanted value like >> 1247
 and selects any children of object that has wantedValue in wantedKey.
 **/
const filterNestedObjByKey = (obj, wantedKey, wantedValue) => {
  return Object.keys(obj).reduce((acc, key) => {
    const item = obj[key]
    if (item[wantedKey] === wantedValue) return ({...acc, [key]: {...item}})
    else return acc
  }, {})
}


/** this function converts a nested object like: someObject = {someKey: {[valueKey]: foo, [valueLabel]: bar, ... }, ...}
 to an array of objects like: [{value: foo, label: bar}, ... ]
 to use that in react-select.
 EXAMPLE: addingContribution > initialInfo.
 **/
const objToArrayAsOptions = (obj, valueKey, labelKey) => {
  // console.log('--- helper ---- >> objToArrayAsOptions >> obj >> ' , obj)
  if (obj) return Object.values(obj).map(item => ({value: item[valueKey], label: item[labelKey]}))
}

/**
 this function takes:
 an array like >> [1, 2, 3]
 an object like >> {[1]: {}, [2]: {}, [3]: {}, [4]: {}}
 and return object that keys are equal to array input like >> [{1 id attributes}, {2 id attributes}, {3 id attributes}]
 **/
const getObjectOfArrayKeys = (array, objectArray) => {
  return array.reduce((acc, arrayId) => {
    if(Object.keys(objectArray).includes(`${arrayId}`)) {
      const shadow = {...objectArray[arrayId]}
      return [...acc, shadow]
    }
    else
      return [...acc]
  }, {})
}


export default {
  arrayToIdKeyedObject,
  arrayToDefaultObject,
  deleteKeyFromObj,
  filterNestedObjByKey,
  objToArrayAsOptions,
  getObjectOfArrayKeys,
}