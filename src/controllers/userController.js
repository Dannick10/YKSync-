const mongoose = require("mongoose");
const User = require("../models/User");
const generateWebToken = require("../utils/generateWebToken");
const bycript = require("bcryptjs");

const SignUser = async (req, res) => {
  const { name, password, email } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    res.status(202).json({ erros: ["por favor utilized outro e-mail"] });
    return;
  }

  const salt = await bycript.genSalt();
  const passwordHash = await bycript.hash(password, salt);

  const data = await User.create({
    name,
    password: passwordHash,
    email,
  });

  if (!data) {
    res.status(422).json({ erros: ["houve um erro, tente mais tarde"] });
  }

  res.status(202).json({
    _id: data._id,
    token: generateWebToken(data._id),
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404).json({ erros: ["Essa conta não existe"] });
    return;
  }

  if (!(await bycript.compare(password, user.password))) {
    res.status(422).json({ erros: ["senha incorreta"] });
    return;
  }

  res.status(201).json({
    _id: user._id,
    admin: user.admin,
    token: generateWebToken(user._id),
  });
};

const getCurrentUser = async (req, res) => {
  const user = req.user;

  res.status(200).json({ user });
};

const updateUser = async (req,res) => {

  const {name,password} = req.body

  const user = await User.findOne(req.user._id).select('-password')
  
    if(!user) {
      res.status(404).json({erros: ["Não foi possivel encontrar esse usuario"]})
    }

  if(name) {
    user.name = name 
  }

  if(password) {
    const salt =  await bycript.genSalt()
    const passwordHash = await bycript.hash(password, salt)
    user.password = passwordHash 
  }

  await user.save()

  res.status(202).json({user})

}

module.exports = {
  SignUser,
  loginUser,
  getCurrentUser,
  updateUser
};
