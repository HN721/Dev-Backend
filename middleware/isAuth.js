const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  //get the token  from header
  const headerObj = req.headers;
  const token = headerObj?.authorization?.split(" ")[1];
  //verify token
  const verify = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return false;
    } else {
      return decoded;
    }
  });
  //find user
  if (verify) {
    //save the user into req obj
    req.user = verify.id;
    next();
  } else {
    const err = new Error("Tojen Expired");
    next(err);
  }
};
module.exports = isAuthenticated;
