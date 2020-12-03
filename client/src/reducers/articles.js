import * as actionTypes from '../actions/actionTypes';

const initialState = ({
  loading: false,
  articles: []
});

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ARTICLES_SUCCESS:
      return {
        loading: false,
        articles: action.articles
      };
    case actionTypes.GET_ARTICLES_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.CREATE_NEW_ARTICLE:
      return {
        ...state,
        articles: [...state.articles, action.article]
      };
    case actionTypes.DELETE_ARTICLE:
      return {
        ...state,
        articles: state.articles.filter(c => c.hash !== action.hash)
      };
    case actionTypes.START_CREATE_COMMENT:
      return{
        loading: true,
      };
      /////Коменты
    case actionTypes.CREATE_COMMENT:
      return{
        loading: false,
        articles: action.articles
      };
    case actionTypes.DELETE_COMMENT:
      return{
        loading: false,
        articles: action.articles
      };
    default:
      return state;
  }
};