import mongoose, {Schema} from 'mongoose';
import uuid from 'uuid/v4';

const CommentSchema=new Schema({
  text: {
    type: String,
    required: 'text is required',
  },
  author: {
    type: String,
  },
  hash: {
    type: String,
    unique: 'Hash mast be unique',
  },

},{
  timestamps: true,
});

CommentSchema.pre('save', function (next) {
  if (!this.hash) {
    this.hash = uuid();
  }

  next();
});


export default mongoose.model('comment', CommentSchema);
// export  CommentSchema