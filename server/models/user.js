import mongoose, {Schema} from 'mongoose';
// import bcrypt from 'bcrypt';
import uniqueValidator from 'mongoose-unique-validator';
import uuid from 'uuid/v4';

var crypto = require('crypto');
mongoose.plugin(uniqueValidator);

const UserSchema = new Schema({
  email: {
    type: String,
    unique: 'User with email "{VALUE}" already exist',
    lowercase: true,
    trim: true,
  },
  role: {
    type: String,
    default: 'User'
  },
  hash: {
    type: String,
    unique: 'Hash mast be unique',
  },
  password: {
    type: String,
    required: 'Password is required',
    trim: true,
  },
  firstName: {
    type: String,
    lowercase: true,
    trim: true,
  },
  lastName: {
    type: String,
    lowercase: true,
    trim: true,
  },
  nickName: {
    type: String,
    lowercase: true,
    unique: 'Nick Name mast be unique',
    required: 'Nick name is required',
    trim: true,
  },
}, {
  timestamps: true,
});

UserSchema.methods.comparePasswords = function (password) {
  const HashPass = crypto.createHash('sha256').update(password).digest('base64');
  return !(this.password !== HashPass);
};

UserSchema.statics.createFiedls = ['email', 'password', 'firstName', 'lastName', 'phone'];

UserSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    const password = crypto.createHash('sha256').update(this.password).digest('base64');
    this.password = password;
  }
  if (!this.hash) {
    this.hash = uuid();
  }

  next();
});


export default mongoose.model('user', UserSchema);