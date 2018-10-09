import country from "./country";
import city from "./city";
import province from "./province";
import {combineReducers} from "redux";
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";
import createEncryptor from "redux-persist-transform-encrypt";

const countryEncryptor = createEncryptor({
  secretKey: 'country-secret-key-is:pf;kldkpokmcjjjjjjjjjjjjjjjjjjjjkkkkkkkkkkkgggj0lkf',
  onError: (error) => {
    throw new Error(error)
  }
})
const provinceEncryptor = createEncryptor({
  secretKey: 'province-secret-key-is:pf;kldkpokmciiiiiiiiiiiiiiiiiiiiiiiiityjvtgrg0lkf',
  onError: (error) => {
    throw new Error(error)
  }
})
const cityEncryptor = createEncryptor({
  secretKey: 'city-secret-key-is:pf;kldkpokmcjppppppppppppppppppptyujjjjjjjjjjjgdfdht0lkf',
  onError: (error) => {
    throw new Error(error)
  }
})

const countryPersistConfig = {
  key: 'country',
  transforms: [countryEncryptor],
  storage: storage,
}

const provincePersistConfig = {
  key: 'province',
  transforms: [provinceEncryptor],
  storage: storage
}

const cityPersistConfig = {
  key: 'city',
  transforms: [cityEncryptor],
  storage: storage
}

export default combineReducers({
    country: persistReducer(countryPersistConfig, country),
    province: persistReducer(provincePersistConfig, province),
    city: persistReducer(cityPersistConfig, city)
})
