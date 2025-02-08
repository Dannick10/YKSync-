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

    body("apis")
      .isArray()
      .withMessage("necessário informar api utilizada")
      .optional(),

    body("methodology")
      .isString()
      .withMessage("Necessário informar a metodologia")
      .optional(),

    body("tests").isArray().withMessage("testes não preenchido"),

    body("deploy").isString().withMessage("Deploy não preenchido"),

    body("cicd")
      .isString()
      .withMessage("Necessário informar se há integração contínua (CI/CD)"),

    body("rollback")
      .isString()
      .withMessage("Necessário informar se há possibilidade de rollback"),

    body("documentation")
      .isString()
      .withMessage("Necessário informar se há documentação"),

    body("updateDocumentation")
      .isString()
      .withMessage("Necessário informar se há documentação atualizada"),

    body("projectManager")
      .isString()
      .withMessage("Necessário informar o gerente do projeto"),

    body("supportLead")
      .isString()
      .withMessage("Necessário informar o líder de suporte"),

    body("supportTeam")
      .isArray()
      .withMessage("Necessário informar a equipe de suporte"),

    body("supportAvailable")
      .isString()
      .withMessage("Necessário informar se o suporte está disponível"),
  ];
};

const projectUpdateValidate = () => {
    return [
        body("name")
      .isString()
      .withMessage("Nome é obrigatório")
      .isLength({ min: 3 })
      .withMessage("Nome do projeto não pode ser menor que 3 caracteres")
      .optional(),

    body("description")
      .isString()
      .withMessage("Descrição obrigatória")
      .isLength({ min: 10 })
      .withMessage("Descrição não pode ser menor que 10 caracteres")
      .optional(),

    body("answerable")
      .isString()
      .withMessage("Necessário nome do responsável")
      .isLength({ min: 3 })
      .withMessage("Nome do responsável deve ter no mínimo 3 caracteres")
      .optional(),

    body("startDate")
      .isString()
      .withMessage("Necessário informar uma data de início válida")
      .optional(),

    body("endDate")
      .isString()
      .withMessage("Necessário informar uma data de término válida")
      .optional(),

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

    body("apis")
      .isArray()
      .withMessage("necessário informar api utilizada")
      .optional(),

    body("methodology")
      .isString()
      .withMessage("Necessário informar a metodologia")   
      .optional(),

    body("tests").isArray().withMessage("testes não preenchido").optional(),

    body("deploy").isString().withMessage("Deploy não preenchido")
    .optional(),

    body("cicd")
      .isString()
      .withMessage("Necessário informar se há integração contínua (CI/CD)")
      .optional(),

    body("rollback")
      .isString()
      .withMessage("Necessário informar se há possibilidade de rollback")
      .optional(),

    body("documentation")
      .isString()
      .withMessage("Necessário informar se há documentação")
      .optional(),

    body("updateDocumentation")
      .isString()
      .withMessage("Necessário informar se há documentação atualizada")
      .optional(),

    body("projectManager")
      .isString()
      .withMessage("Necessário informar o gerente do projeto")
      .optional(),

    body("supportLead")
      .isString()
      .withMessage("Necessário informar o líder de suporte")
      .optional(),

    body("supportTeam")
      .isArray()
      .withMessage("Necessário informar a equipe de suporte")
      .optional(),

    body("supportAvailable")
      .isString()
      .withMessage("Necessário informar se o suporte está disponível")
      .optional(),
    ]
}

module.exports = {
  projectCreateValidate,
  projectUpdateValidate
};
