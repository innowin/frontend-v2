import country from "./country";
import city from "./city";
import province from "./province";
import {combineReducers} from "redux";
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";


const countryPersistConfig = {
  key: 'country',
  storage: storage,
}

const provincePersistConfig = {
  key: 'province',
  storage: storage
}

const cityPersistConfig = {
  key: 'province',
  storage: storage
}

export default combineReducers({
    country: persistReducer(countryPersistConfig, country),
    province: persistReducer(provincePersistConfig, province),
    city: persistReducer(cityPersistConfig, city)
})
