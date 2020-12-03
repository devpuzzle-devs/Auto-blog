import jwt from 'jsonwebtoken';
import config from '../config'
import User from "../models/user";

export default async(req,res,next)=> {
  console.log("isAdmin");
  const token = req.headers['authorization'];
  if (!token) {
    return next({
      status: 403,
      message: "Forbidden!NO token"
    })
  }
  let user;
  try {
    var {hash} = jwt.verify(token, config.secret);
    user = await User.findOne({hash}, {password: 0});
  } catch ({message}) {
    return next({
      status: 400,
      message
    })
  }

  if (user.role==='Admin') {
    next();
  } else {
    next({
      status: 400,
      message: 'you do not have administrator rights'
    })

  }
}