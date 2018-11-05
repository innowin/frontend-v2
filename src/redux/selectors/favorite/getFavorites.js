import {createSelector} from 'reselect'
import helpers from "src/consts/helperFunctions/helperFunctions"

const getFavorites = state => state.favorite.list
const getFiles = state => state.common.file.list

/** this selector selects favorites by identity **/
export const getFavoritesSelector = createSelector(
    [getFavorites, getFiles],
    (favorites, files) => {
      if (favorites && Object.keys(favorites).length !== 0 && favorites.constructor === Object) {
        const arrayFavorites = helpers.changeObjectKeyValueToArray(favorites)
        return arrayFavorites.map(favorite => {
          if (files.favorite_related_media.file) {
            return {
              ...favorite,
              img: files.favorite_related_media.file
            }
          }
          else {
            return {
              ...favorite,
            }
          }
        })
      }
      return []
    }
)