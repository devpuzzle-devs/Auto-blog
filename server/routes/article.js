import express from 'express';
import * as ArticleController from '../controllers/article';
import imageUpload from '../middlewares/imageUpload';
import isAdmin from '../middlewares/isAdmin'

const router = express.Router();

router.get('/articles', ArticleController.all)
  .get('/:hash', ArticleController.searchByHash)
  .post('/article/create', isAdmin,imageUpload.single('photo'), ArticleController.create)
  .patch('/:hash',imageUpload.single('photo'), ArticleController.update)
  .delete('/article/:hash', isAdmin, ArticleController.deleteArticle);
export default router;