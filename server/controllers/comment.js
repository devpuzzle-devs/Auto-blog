import Comment from '../models/comment';
import Article from "../models/article";
import *as UserService from '../services/UserService';

export const create = async (req, res, next) => {
  const commentTmp = req.body;
  const token = req.headers['authorization'];
  let article;
  let articleTmp;
  try {
    const userTmp = await UserService.getUserByToken(token);
    commentTmp.author = userTmp.nickName;
    let comment = await Comment.create(commentTmp);
    articleTmp = await Article.findOne({hash: req.params.hash});
    articleTmp.comments.push(comment);
    await Article.findOneAndUpdate({hash: req.params.hash}, articleTmp);
    await Comment.findOneAndDelete({hash: comment.hash});
    articleTmp=await Article.find({});
  } catch ({message}) {
    console.log(message);
    next({
      status: 400,
      message
    });
  }
  res.json(articleTmp);
};


export const deleteComment = async (req, res, next) => {
  let articleTmp;
  let commentToDelete;
  try {
     articleTmp = await Article.findOne({hash: req.params.hashArticle});
     commentToDelete=articleTmp.comments.find(obj=> obj.hash===req.params.hashComment);
     articleTmp.comments.remove(commentToDelete);
     await Article.findOneAndUpdate({hash: req.params.hashArticle}, articleTmp);
     articleTmp=await Article.find({});
  } catch ({message}) {
    console.log(message);
    next({
      status: 400,
      message
    });
  }



  res.json(articleTmp );
};
