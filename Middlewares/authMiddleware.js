const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
  const token = req.headers.authorization;
//   console.log(token)
  if (token) {
    try {
      var decoded = jwt.verify(token, "masai");
      console.log(decoded);
      req.body.username = decoded.username;
      req.body.userId = decoded.userId;
      next();
    } catch (err) {
      res.status(400).send({ msg: err.message });
    }
  } 
  else {
    res.status(400).send({ msg: "You are not Authorized !" });
  }
};

module.exports = {
  auth,
};
