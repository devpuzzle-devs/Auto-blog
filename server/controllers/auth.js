import User from '../models/user';
import jwt from 'jsonwebtoken';
import config from '../config'

export const signup = async (req, res, next) => {
  const credentials = req.body;

  if(credentials.nickName===config.adminLogin
    && credentials.password===config.adminPassword){
    credentials.role="Admin";
  }
  let user;
  try {
    user = await User.create(credentials);
  } catch ({message}) {
    console.log(message);
    next({
      status: 400,
      message
    });
  }

   const token=jwt.sign({hash: user.hash},config.secret);
  const data={
    user,
    token,
  };
  res.json(data);
};

export const signin = async (req, res, next) => {

  const {nickName, password} = req.body;
  const user = await User.findOne({nickName});

  if (!user) {
    return next({
      status: 400,
      message: "User not found"
    });
  }
  const result = await user.comparePasswords(password);

  if (result === false) {
    return next({
      status: 400,
      message: "Wrong password"
    });
  }

  const token = jwt.sign({hash: user.hash,role: user.role,nickName: user.nickName}, config.secret);
  res.json(token);
};


