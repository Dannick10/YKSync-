const { body } = require("express-validator");

const taskCreateValidator = () => {
  return [
    body("title")
      .isString()
      .withMessage("Titulo obrigatório")
      .isLength({ min: 3 })
      .withMessage("Nome do projeto não pode ser menor que 3 caracteres"),

    body("description")
      .isString()
      .withMessage("Descrição obrigatória")
      .isLength({ min: 5 })
      .withMessage("Descrição não pode ser menor que 5 caracteres"),
  ];
};

const taskUpdateValidator = () => {
  return [
    body("status")
      .isString()
      .withMessage("Status obrigatório")
      .custom((value) => {
        const mapStatus = ["pending", "current", "finish"];
        const status = mapStatus.includes(value) ? value : null;
        if (!status) throw new Error("Status não existe");
        return true;
      }),
  ];
};

module.exports = {
  taskCreateValidator,
  taskUpdateValidator,
};
