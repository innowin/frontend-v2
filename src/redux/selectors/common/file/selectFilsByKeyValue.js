import {createSelector} from "reselect";
import helpers from 'src/consts/helperFunctions/helperFunctions'


const getFiles = (state) => state.common.file.list
const getWantedKey = (state, wantedKey) => wantedKey
const getWantedValue = (state, wantedKey, wantedValue) => wantedValue
/*
make a selector that filters files by wantedValue in wantedKey
*/
const makeFileSelectorByKeyValue = () => {
  return createSelector(
      [getFiles, getWantedKey, getWantedValue],
      (list, wantedKey, wantedValue) => {
        const files = list ? helpers.filterNestedObjByKey(list, wantedKey, wantedValue) : {}
        return Object.values(files).map(file => file)
      })
}

export default makeFileSelectorByKeyValue