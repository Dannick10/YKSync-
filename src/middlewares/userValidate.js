const { body } = require("express-validator");

const userSignInValidator = () => {
  return [
    body("name")
      .isString()
      .withMessage("nome Obrigatorio")
      .notEmpty()
      .withMessage("O nome nao pode ser vazio")
      .isLength({ min: 3 })
      .withMessage("O nome precisa de no minimo 3 caracteres")
      .custom((value) => {
        let completName = value ? value.trim().split(/\s+/) : [];

        if (completName.length < 2) {
          throw new Error("Obrigatório nome e sobrenome");
        }

        return true;
      }),
    body("email")
      .isString()
      .withMessage("Email obrigatorio")
      .isEmail()
      .withMessage("Digite um email valido"),
    body("password")
      .isString()
      .withMessage("A senha é obrigatoria")
      .isLength({ min: 5 })
      .withMessage("A senha precisa ter no minimo 5 caracteres."),
    body("confirmPassword")
      .isString()
      .withMessage("confirme a sednha")
      .custom((value, {req}) => {
        if(value !== req.body.password) {
                throw new Error("A senha não coincidem")
        }
        return true
      })
  ];
};

const userLoginValidator = () => {
    return [
      body("email")
        .isString()
        .withMessage("Email obrigatorio")
        .isEmail()
        .withMessage("adicione um email válido"),
      body("password")
        .isString()
        .withMessage("senha obrigatoria")
    ]
}

const userUpdateValidator = () => {
  return [
    body("name")
      .isString()
      .withMessage("nome Obrigatorio")
      .notEmpty()
      .withMessage("O nome nao pode ser vazio")
      .isLength({ min: 3 })
      .withMessage("O nome precisa de no minimo 3 caracteres")
      .custom((value) => {
        let completName = value ? value.trim().split(/\s+/) : [];

        if (completName.length < 2) {
          throw new Error("Obrigatório nome e sobrenome");
        }

        return true;
      }),
  ]
}

module.exports = {
  userSignInValidator,
  userLoginValidator,
  userUpdateValidator
};
