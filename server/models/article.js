import mongoose, {Schema} from 'mongoose';
import uuid from 'uuid/v4';
import {CommentSchema} from './comment'

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: 'Title is required',
  },
  text: {
    type: String,
    required: 'text is required',
  },
  author: {
    type: String,
    required: 'author is required',
  },
  rating: {
    type: Number,
    default: 0
  },
  hash: {
    type: String,
    unique: 'Hash mast be unique',
  },
  pathToPicture: {
    type: String,
    lowercase: true,
    trim: true,
    default: "https://www.google.com/search?biw=1366&bih=608&tbm=isch&sa=1&ei=6QHxXPyKLpqFk74P3dGcqAE&q=%D0%BC%D0%B5%D0%B4%D0%B8%D1%86%D0%B8%D0%BD%D0%B0&oq=%D0%BC%D0%B5%D0%B4%D0%B8%D1%86%D0%B8%D0%BD%D0%B0&gs_l=img.3..0l10.32520.33974..34176...0.0..0.106.486.4j1......0....1..gws-wiz-img.......35i39j0i67.3vKdwAQ_pbQ#imgrc=VS5XizrwluqvvM:"
  },
  comments: {
  type:  [CommentSchema]
  },
  // comments: [{
  //   type: Schema.Types.ObjectId, ref: 'Comment'
  // }],
}, {
  timestamps: true,
});

ArticleSchema.pre('save', function (next) {
  if (!this.hash) {
    this.hash = uuid();
  }

  next();
});


export default mongoose.model('article', ArticleSchema);