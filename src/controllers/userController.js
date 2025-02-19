const mongoose = require("mongoose");
const User = require("../models/User");
const generateWebToken = require("../utils/generateWebToken");
const bycript = require("bcryptjs");
const response = require('../utils/response')

const SignUser = async (req, res) => {
  const { name, password, email } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    res
      .status(response.errors.EMAIL_IN_USE.status)
      .json({ erros: [response.errors.EMAIL_IN_USE.message] });
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
    res
      .status(response.errors.SERVER_ERROR)
      .json({ erros: [response.errors.SERVER_ERROR] });
  }

  res.status(response.success.USER_CREATED.status).json({
    _id: data._id,
    token: generateWebToken(data._id),
    message: response.success.USER_CREATED.message,
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if(!user) {
    return res.status(response.errors.USER_NOT_FOUND.status).json({erros: [response.errors.USER_NOT_FOUND.message]})
  }

  if (!(await bycript.compare(password, user.password))) {
    res
      .status(response.errors.INVALID_CREDENTIALS.status)
      .json({ erros: [response.errors.INVALID_CREDENTIALS.message] });
    return;
  }

  res.status(response.success.LOGIN_SUCCESS.status).json({
    _id: user._id,
    admin: user.admin,
    token: generateWebToken(user._id),
    message: response.success.LOGIN_SUCCESS.message,
  });
};

const getCurrentUser = async (req, res) => {
  const user = req.user;

  res.status(response.success.USER_FETCHED.status).json({ user });
};

const updateUser = async (req, res) => {
  const { name, password } = req.body;

  const user = await User.findOne(req.user._id).select("-password");

  if (!user) {
    res
      .status(response.errors.USER_NOT_FOUND.status)
      .json({ erros: [response.errors.USER_NOT_FOUND.message] });
  }

  if (name) {
    user.name = name;
  }

  if (password) {
    const salt = await bycript.genSalt();
    const passwordHash = await bycript.hash(password, salt);
    user.password = passwordHash;
  }

  await user.save();

  res
    .status(response.success.USER_UPDATED.status)
    .json({ message: response.success.USER_UPDATED.message });
};

module.exports = {
  SignUser,
  loginUser,
  getCurrentUser,
  updateUser,
};
