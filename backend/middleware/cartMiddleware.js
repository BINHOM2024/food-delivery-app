import jwt from "jsonwebtoken";

export const cartMiddleware =  (req, res, next) => {
  const token = req.headers.token;
    if(!token) return res.json({success:false, message: "user not authorized.login again please." })
    try {
      const token_decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.body.userId = token_decoded.id;
    next() 
    } catch (error) {
      res.json({message:"wrong token: "+error})  
    }
   
}