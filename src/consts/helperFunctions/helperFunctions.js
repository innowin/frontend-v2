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

const arrayToIdKeyedObjectWithIds = (arr) => {

  /**
   this function converts an array of objects (that any object has 'id' in
   its keys ) to an object with keys of ids and values of correspond object.
   and an array of ids of objects.
   [ {id: 1, num: 10}, {id: 2, num: 20} ] ===> { 1: {num: 10}, 2: {num: 20} }
   **/
  const items = {}
  const ids = []
  arr.forEach(obj => {
    items[obj.id] = {...obj}
    ids.push(obj.id)
  })
  return {items, ids}
}


const arrayToDefaultObject = (arr) => {
  const newArr = arr.map(data => ({exchange: {content: {...data}, isLoading: false, error: null}}))
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
    if (item[wantedKey] === wantedValue) {
      return ({...acc, [key]: {...item}})
    }
    else return acc
  }, {})
}


/** this function converts a nested object like: someObject = {someKey: {[valueKey]: foo, [valueLabel]: bar, ... }, ...}
 to an array of objects like: [{value: foo, label: bar}, ... ]
 to use that in react-select.
 EXAMPLE: addingContribution > initialInfo.
 **/
const objToArrayAsOptions = (obj, valueKey, labelKey, otherKeys) => {
  // console.log('--- helper ---- >> objToArrayAsOptions >> obj >> ' , obj)
  if (obj) {
    return Object.values(obj).map(item => {
      const option = ({value: item[valueKey], label: item[labelKey]})
      if (otherKeys) {
        otherKeys.forEach(key => {
          option[key] = item[key]
        })
      }
      return option
    })
  }
}

/**
 this function takes:
 an object like >> {[1]: {}, [2]: {}, [3]: {}, [4]: {}}
 and return array >> [{id attributes}, {id attributes}, {id attributes}]
 **/
const changeObjectKeyValueToArray = (objectArray) => {
  let resultArray = []
  for (let id in objectArray) {
    resultArray.push({id: id, ...objectArray[id]})
  }
  return resultArray
}

/**
 this function takes:
 an array like >> [1, 2, 3]
 an object like >> {[1]: {}, [2]: {}, [3]: {}, [4]: {}}
 and return object that keys are equal to array input like >> [{1 id attributes}, {2 id attributes}, {3 id attributes}]
 **/
const getObjectOfArrayKeys = (array, objectArray) => array.reduce((acc, arrayId) => [...acc, objectArray[arrayId]], [])

/**
 this function takes:
 an array like >> [1, 2, 3]
 an object like >> {[1]: {}, [2]: {}, [3]: {}, [4]: {}}
 and return object that keys are equal to array input like >> [{1 id attributes}, {2 id attributes}, {3 id attributes}]
 **/
const getObjectOfArrayKeysSortByCreateTime = (array, objectArray) => {
  const sortedArray = array.sort((element1, element2) => {
    let a = new Date(objectArray[element1].created_time);
    let b = new Date(objectArray[element2].created_time);
    return a > b ? -1 : a < b ? 1 : 0
  })
  return sortedArray.reduce((acc, arrayId) => [...acc, objectArray[arrayId]], [])
}

const getObjectOfArrayKeysSortByReverseCreateTime = (array, objectArray) => {
  const sortedArray = array.sort((element1, element2) => {
    let a = new Date(objectArray[element1].created_time);
    let b = new Date(objectArray[element2].created_time);
    return a < b ? -1 : a > b ? 1 : 0
  })
  return sortedArray.reduce((acc, arrayId) => [...acc, objectArray[arrayId]], [])
}

const abbreviation = (names, num) => names.reduce((result, part) => {
  if (result.length < num + 1) {
    if (part) return result + '‌' + part[0]
  }
  return result
}, '')


const normalizer = (arr) => {
  const ids = []
  const idKeyedObj = {}
  arr.forEach(item => {
    ids.push(item.id)
    idKeyedObj[item.id] = item
  })
  return {
    ids,
    idKeyedObj
  }
}

/*
this function takes an object and an array(list of wanted keys) and create a new object that
contains array(of keys) and correspond value as the same as in main object.
*/
const selectByKeyList = (obj, keyList) => {
  return keyList.reduce((result, key) => {
    if (obj[key]) return {...result, [key]: obj[key]}
    return result
  }, {})
}

export default {
  arrayToIdKeyedObject,
  arrayToDefaultObject,
  arrayToIdKeyedObjectWithIds,
  deleteKeyFromObj,
  abbreviation,
  filterNestedObjByKey,
  objToArrayAsOptions,
  changeObjectKeyValueToArray,
  getObjectOfArrayKeys,
  getObjectOfArrayKeysSortByCreateTime,
  getObjectOfArrayKeysSortByReverseCreateTime,
  normalizer,
  selectByKeyList
}