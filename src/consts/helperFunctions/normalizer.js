// export const normalizer = (arr) => {
//   return arr.reduce((result, obj) => {
//     return {...result, [obj.id]: objNormalizer(obj)}
//   }, {})
// }
//
// const checkForDataAndOtherData = (arr) => {
//   return (arr.includes('otherData') && arr.includes('data'))
// }
//
// export const takeOutData = (obj) => {
//   const {otherData} = obj
//   const nestKeys = Object.keys(otherData).filter(key => {
//     return checkForDataAndOtherData(Object.keys(otherData[key]))
//   })
//   nestKeys.forEach(nestKey => {
//     otherData[nestKey] = otherData[nestKey].data
//   })
// }
// export const normalData = {data: {}, otherData: {}}
// export const objNormalizer = (obj) => {
//   const nestKeys = Object.keys(obj).filter(key => typeof obj[key] === "object")
//   const flatKeys = Object.keys(obj).filter(key => typeof obj[key] !== "object")
//   const data = flatKeys.forEach(key => {
//     normalData.data[key] = obj[key]
//   })
//   const otherData = nestKeys.reduce((res, key) => {
//     const subObj = obj[key]
//     data[key] = subObj.id
//     const withNestValueKeys = Object.keys(subObj).filter(theKey => typeof subObj[theKey] === "object")
//     if (withNestValueKeys.length > 0) {
//       return {...res, [key]: objNormalizer(obj[key])}
//     }
//     else return {...res, [key]: obj[key]}
//   }, {})
//   nestKeys.forEach(key => {
//     if (Array.isArray(obj[key])) {
//       normalData.data[key] = obj[key].id
//     }
//   })
//   return {data, otherData}
// }
//
//
// export const testNormalizer = (obj, hasFake) => {
//   Object.keys(obj).forEach(key => {
//     if (typeof obj[key] !== "object") {
//       if (hasFake) {
//         normalData.data['thisIsSomeFakeData' + key] = obj[key]
//       }
//       else normalData.data[key] = obj[key]
//     }
//     else if (Array.isArray(obj[key])) {
//     }
//     else {
//       normalData.data[key] = obj[key].id
//       const subObj = obj[key]
//       const hasNest = Object.keys(subObj).some(theKey => typeof subObj[theKey] === "object")
//       if (hasNest) {
//         normalData.otherData[key] = testNormalizer(subObj, true)
//       }
//     }
//   })
//   return normalData
// }
//
// export const normalizerByWhile = (obj) => {
//   const data = {}
//   let currentKey = 'entity'
//   const fakeObj = {...obj}
//   const checkingObjs = [fakeObj]
//   console.log('normalizer >> checkingObjs1: ', checkingObjs)
//   let j = 0
//   while (checkingObjs.length > 0) {
//     let currentObj = checkingObjs[checkingObjs.length - 1]
//     console.log('normalizer >> checkingObjs: ', checkingObjs)
//     console.log('normalizer >> currentObj: ', currentObj)
//     const flatKeys = Object.keys(currentObj).filter(key => typeof currentObj[key] !== 'object')
//     const currentResult = {normalizerLengthField: Object.keys(currentObj).length}
//     flatKeys.forEach(key => currentResult[key] = currentObj[key])
//     const nestKeys = Object.keys(currentObj).filter(key => typeof currentObj[key] === 'object')
//     if (nestKeys.length === 0) {
//       const currentObjIndex = checkingObjs.findIndex(obj => obj.id === currentObj.id)
//       checkingObjs.splice(currentObjIndex, 1)
//     }
//     else {
//       for (let i = 0; i < nestKeys.length; i++) {
//         let nestKey = nestKeys[i]
//         if (Array.isArray(currentObj[nestKey])) {
//
//         }
//         else {
//           currentResult[nestKey] = currentObj[nestKey].id
//           checkingObjs.push({...currentObj[currentKey]})
//           currentKey = nestKey
//         }
//       }
//     }
//     j++
//     if (j === 2000) break
//     data[currentKey] = currentResult
//   }
//   return data
// }
// // const norm2= (obj) => {
// //   const data = {}
// //   let currentKey = 'entity'
// //   let checkingObjs = [obj]
// //   let currentObj = checkingObjs[checkingObjs.length -1]
// //   let hasObj = Object.values(currentObj).some(value => typeof value === 'object')
// //
// //   do {
// //     const flatKeys = Object.keys(currentObj).filter(key => typeof currentObj[key] !== 'object')
// //     const currentResult = {normalizerLengthField: Object.keys(currentObj).length}
// //     flatKeys.forEach(key => currentResult[key] = currentObj[key])
// //     const nestKeys = Object.keys(currentObj).filter(key => typeof currentObj[key] === 'object')
// //     console.time('norm2')
// //     for (let i = 0; i < nestKeys.length; i++) {
// //       console.log('-------------- i is: ', i)
// //       let nestKey = nestKeys[i]
// //       if (Array.isArray(currentObj[nestKey])) {}
// //       else {
// //         currentResult[nestKey] = currentObj[nestKey].id
// //         console.log(' ---------------- currentResult', currentResult)
// //         data[currentKey] = currentResult
// //         currentKey = nestKey
// //         checkingObjs.push(currentObj[currentKey])
// //       }
// //     }
// //     console.timeEnd('norm2')
// //   } while (hasObj === true)
// //   return data
// // }

const flattenEr = (obj, nestKeys) => {
  return Object.keys(obj).reduce((data, key) => {
    if (nestKeys.includes(key)) return {...data, [key]: obj[key].id}
    else return {...data, [key]: obj[key]}
  }, {})
}

export const normalizer = (arr) => {
  const data = {}
  const ids = []
  arr.forEach(mainObj => {
    ids.push(mainObj.id)
    const objs = {entity: {...mainObj}}
    for (let i = 0; i < Object.keys(objs).length; i++) {
      const normalKey = Object.keys(objs)[i]
      const obj = objs[normalKey]
      const nestKeys = Object.keys(obj).filter(key => {
        const objInKey = obj[key]
        if (objInKey) {
          if (typeof objInKey === 'object') {
            if (!Array.isArray(objInKey)) {
              if (Object.keys(objInKey).includes('id')) return true
            }
          }
        }
        return false
      })
      const normalValue = data[normalKey] || {}
      normalValue[obj.id] = flattenEr(obj, nestKeys)
      data[normalKey] = normalValue
      nestKeys.forEach(nestKey => {
        objs[nestKey] = obj[nestKey]
      })
    }
  })
  return {...data, ids}
}

export const objNormalizer = (mainObj) => {
  const data = {}
  const objs = {entity: {...mainObj}}
  for (let i = 0; i < Object.keys(objs).length; i++) {
    const normalKey = Object.keys(objs)[i]
    const obj = objs[normalKey]
    const nestKeys = Object.keys(obj).filter(key => {
      const objInKey = obj[key]
      if (objInKey) {
        if (typeof objInKey === 'object') {
          if (!Array.isArray(objInKey)) {
            if (Object.keys(objInKey).includes('id')) return true
          }
        }
      }
      return false
    })
    data[normalKey] = flattenEr(obj, nestKeys)
    nestKeys.forEach(nestKey => {
      objs[nestKey] = obj[nestKey]
    })
  }
  return {...data}
}