import { applyMiddleware } from 'redux';
import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

export const store = (context) =>
  createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
