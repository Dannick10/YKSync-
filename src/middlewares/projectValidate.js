const { body } = require("express-validator");

const projectCreateValidate = () => {
  return [
    body("name")
      .isString()
      .withMessage("Nome é obrigatório")
      .isLength({ min: 3 })
      .withMessage("Nome do projeto não pode ser menor que 3 caracteres"),

    body("description")
      .isString()
      .withMessage("Descrição obrigatória")
      .isLength({ min: 10 })
      .withMessage("Descrição não pode ser menor que 10 caracteres"),

    body("answerable")
      .isString()
      .withMessage("Necessário nome do responsável")
      .isLength({ min: 3 })
      .withMessage("Nome do responsável deve ter no mínimo 3 caracteres"),

    body("startDate")
      .isString()
      .withMessage("Necessário informar uma data de início válida"),

    body("endDate")
      .isString()
      .withMessage("Necessário informar uma data de término válida"),

    body("frontend")
      .isArray()
      .withMessage("necessário as tecnologias frontend utilizadas")
      .optional(),

    body("backend")
      .isArray()
      .withMessage("necessário as tecnologias frontend utilizadas")
      .optional(),

    body("database")
      .isArray()
      .withMessage("necessário as tecnologias banco de dados utilizado")
      .optional(),

    body("tests").isArray().withMessage("testes não preenchido"),

    body("deploy").isString().withMessage("Deploy não preenchido"),
  ];
};

module.exports = {
  projectCreateValidate,
};
