import {reducer as preFormReducer} from 'redux-form';
import types from "src/redux/actions/types"
export default preFormReducer.plugin({
  RegisterForm : (state, action) => {
    switch (action.type) {
      default:
        return state;
    }
  }
})