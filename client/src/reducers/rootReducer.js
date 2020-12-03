import { combineReducers } from 'redux';
import auth from './auth';
import articles from './articles';
// import comment from './comment';

export default combineReducers({ auth,articles });