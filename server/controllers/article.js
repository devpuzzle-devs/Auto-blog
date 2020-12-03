import * as UserService from "../services/UserService";
import Article from "../models/article";




export const all =async (req,res,next)=>{
  let articles;
  try{
    articles=await Article.find({});
  }catch ({message}) {
    next({
      status: 400,
      message
    });
  }
  res.json(articles);
};

export const create=async (req,res,next)=>{
  const articleTmp=req.body;
  let article;
  try{
    if(req.file) {
      articleTmp.pathToPicture=req.file.path;
    }
    else{
      throw new Error(
          "Картинка объязательна" ,
        )
    }

    article=await Article.create(articleTmp);

  }catch ({message}) {
    console.log(message);
    next({
      status: 400,
      message
    });
  }
  res.json(article);
};

export const deleteArticle=async (req,res,next)=>{
  let article;
  try{
    article=await Article.findOneAndRemove({hash: req.params.hash});
  } catch ({message}) {
    next({
      status: 400,
      message
    });
  }
  res.json(article);
};
//update

export const update=async (req,res,next)=>{
  let article;
  let {hash} = req.params;
//  console.dir(req.body);
  try{
    const articleTmp=req.body;
    if(req.file){
      articleTmp.pathToPicture=req.file.path;
    }

    article=await Article.findOneAndUpdate({hash: hash },articleTmp);
//console.dir(req.body);
  } catch ({message}) {
    next({
      status: 400,
      message
    });
  }
  res.json(article);
};
export const searchByHash=async (req,res,next)=> {
  let article;
  let {hash} = req.params;
  try {
    article = await Article.findOne({hash});
  } catch ({message}) {
    next({
      status: 400,
      message
    });

  }
  // console.dir(contact);
  res.json(article);
};