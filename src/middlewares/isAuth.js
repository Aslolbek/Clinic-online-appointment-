const { verify } = require("../libs/jwt");

const isAuth =  (req, res, next) => {
  try {
    const {token}= req.cookies

    if (!token) return res.status(400).json("Token topilmadi")
    
    const Verify =verify(token);
    req.user = Verify;
    next();
  } catch (error) {
    res.status(403).json({message:"error in token", data:`${error.message}`});
  }
};

module.exports = isAuth;