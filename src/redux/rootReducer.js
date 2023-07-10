import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import formDReducer from './reducer';

const rootReducer = combineReducers({
  form: formReducer,
  details: formDReducer,
});
export default rootReducer;
