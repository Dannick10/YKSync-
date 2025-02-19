const mongoose = require("mongoose");
const User = require("../models/User");
const response = require("../utils/response");

const admPermissionUser = async (req, res) => {
  const { _id } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res
      .status(response.errors.INVALID_ID.status)
      .json({ error: [response.errors.INVALID_ID.message] });
  }

  try {
    const user = await User.findById({ _id }).select("-password");

    if (!user) {
      res
        .status(response.errors.ADMIN_PERMISSION_ERROR.status)
        .json({ erros: [response.errors.ADMIN_PERMISSION_ERROR.message] });
    }

    user.admin = true;

    await user.save();

    res.status(202).json(response.success.ADMIN_PERMISSION_GRANTED);
  } catch (err) {
    res
      .status(response.errors.SERVER_ERROR.status)
      .send({ erros: [response.errors.SERVER_ERROR.message] });
  }
};

const getusers = async (req, res) => {
  try {
    const query = {};
    if (req.query.name) {
      query.name = { $regex: req.query.name, $options: "i" };
    }
 
    if (req.query.admin !== undefined) {
      query.admin = req.query.admin === "true";
    }

    const users = await User.find(query).select("-password");

    res.status(202).json(users);
  } catch (err) {
    res
      .status(response.errors.SERVER_ERROR.status)
      .send({ erros: [response.errors.SERVER_ERROR.message] });
  }
};

module.exports = {
  admPermissionUser,
  getusers,
};
