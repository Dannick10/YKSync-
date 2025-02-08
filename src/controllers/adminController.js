const mongoose = require("mongoose");
const User = require("../models/User");

const admPermissionUser = async (req, res) => {
  const { _id } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  try {
    const user = await User.findById({ _id }).select("-password");

    if (!user) {
      res
        .status(404)
        .json({ erros: ["Não existe esse usuario para agregar permissao"] });
    }

    user.admin = true;

    await user.save();

    res.status(202).json({ user });
  } catch (err) {
    res.status(404).send({ erros: ["error no servidor"] });
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
    res.status(404).json({ erros: ["houve um erro"] });
  }
};

module.exports = {
  admPermissionUser,
  getusers,
};
