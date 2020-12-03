import express from 'express';
import * as CommentController from '../controllers/comment';
import imageUpload from '../middlewares/imageUpload';
import isAdmin from '../middlewares/isAdmin';
import checkToken from '../middlewares/checkToken';


const router = express.Router();

router.post('/comment/:hash',checkToken,CommentController.create)
  .delete('/comment/:hashArticle/:hashComment',isAdmin,CommentController.deleteComment)





export default router;