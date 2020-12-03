import * as actionTypes from '../actions/actionTypes';

const initioalState=({
  loading: false,
  article: {},
});

export default ( state=initioalState,action)=>{
  switch (action.type) {
    case actionTypes.START_CREATE_COMMENT:
      return{
        loading: true,
      };
    case actionTypes.CREATE_COMMENT:
      return{
        loading: false,
        article: state.article
      };
    case actionTypes.DELETE_COMMENT:
      return{
        loading: false,
        article: state.article
      };
    default:
      return state;
  }
}