import { SET_CURRENT_USER } from '../actions/actionTypes';
import isEmpty from 'lodash/isEmpty';

const initialState = ({
  isAuthenticated: false,
  isAdmin:false,
  user: null
});

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.user),
        isAdmin:action.user.role==="Admin",
        user: action.user
      };
    default:
      return state;
  }
};