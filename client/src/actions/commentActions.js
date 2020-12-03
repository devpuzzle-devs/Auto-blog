import axios from 'axios';
import { apiPrefix } from '../config.json';
import * as actionTypes from './actionTypes';

// export function createComment(comment) {
//   return {
//     type: actionTypes.CREATE_COMMENT,
//   }
// }

export function startCreateComment() {
  return {
    type: actionTypes.START_CREATE_COMMENT,
  }
}

export function creatNewComment(articles) {
  return {
    type: actionTypes.CREATE_COMMENT,
    articles
  }
}

export function deleteCommentFromState(articles) {
  return{
    type: actionTypes.DELETE_COMMENT,
    articles
  }
}

export function createComment(hash,commentData) {
  return dispatch => {
    return axios.post(`${apiPrefix}/api/comment/${hash}`, commentData)
      .then(res=>{
        dispatch(creatNewComment(res.data));
      });
  }
}
export function deleteComment(hashArticle,hashComment) {
  return dispatch => {
    return axios.delete(`${apiPrefix}/api/comment/${hashArticle}/${hashComment}`)
      .then(res=>{
        dispatch(deleteCommentFromState(res.data));
      });
  }
}