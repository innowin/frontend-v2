import {createSelector} from "reselect";
import helpers from 'src/consts/helperFunctions/helperFunctions'


/**
 takes a list off ids and select the files that their ids including in the list.
**/
const getFilesByIdList = (state, ids) => helpers.selectByKeyList(state.common.file.list, ids)


/**

 **/
const makeFileSelectorByIDList = () => createSelector(getFilesByIdList, list => list || {})

export default makeFileSelectorByIDList