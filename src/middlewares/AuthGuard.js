const User = require("../models/User");
const jwt = require("jsonwebtoken");
const secret = process.env.JWTSECRET;

const authGuard = async (req, res, next) => {
  const authHeader = req.header("authorization");

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ erros: ["acesso negado"] });

  try {
    const verify = jwt.verify(token, secret);
    req.user = await User.findById(verify.id).select("-password");
    next();
  } catch (err) {
    res.status(401).json({ erros: ["token invalido."] });
  }
};

module.exports = authGuard;
