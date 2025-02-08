const response = {
  errors: {
    INVALID_ID: {
      status: 400,
      message: "ID inválido. Forneça um ID válido.",
    },
    USER_NOT_FOUND: {
      status: 404,
      message: "Usuário não encontrado.",
    },
    ADMIN_PERMISSION_ERROR: {
      status: 404,
      message:
        "Usuário não encontrado para conceder permissão de administrador.",
    },
    USERS_NOT_FOUND: {
      status: 404,
      message: "Nenhum usuário encontrado com os critérios especificados.",
    },
    PROJECT: {
      NOT_FOUND: {
        status: 404,
        message: "Projeto não encontrado.",
      },
      CREATE_FAILED: {
        status: 500,
        message: "Não foi possível criar o projeto.",
      },
      UPDATE_FAILED: {
        status: 500,
        message: "Erro ao atualizar o projeto.",
      },
      DELETE_FAILED: {
        status: 500,
        message: "Erro ao excluir o projeto.",
      },
      ERROR: {
        status: 404,
        message: "Houve um erro com o projeto.",
      },
    },
    SERVER_ERROR: {
      status: 500,
      message: "Erro interno do servidor. Tente novamente mais tarde.",
    },
    EMAIL_IN_USE: {
      status: 409,
      message: "Este e-mail já está em uso. Por favor, utilize outro.",
    },
    INVALID_CREDENTIALS: {
      status: 401,
      message: "E-mail ou senha incorretos.",
    },
  },
  success: {
    ADMIN_PERMISSION_GRANTED: {
      status: 200,
      message: "Permissão de administrador concedida com sucesso.",
    },
    USER_CREATED: {
      status: 201,
      message: "Usuário criado com sucesso.",
    },
    USER_UPDATED: {
      status: 200,
      message: "Usuário atualizado com sucesso.",
    },
    USER_FETCHED: {
      status: 200,
      message: "Usuário recuperado com sucesso.",
    },
    LOGIN_SUCCESS: {
      status: 200,
      message: "Login realizado com sucesso.",
    },
    PROJECT: {
      CREATED: {
        status: 201,
        message: "Projeto criado com sucesso.",
      },
      UPDATED: {
        status: 200,
        message: "Projeto atualizado com sucesso.",
      },
      DELETED: {
        status: 200,
        message: "Projeto excluído com sucesso.",
      },
      FETCHED: {
        status: 200,
        message: "Projetos recuperados com sucesso.",
      },
    },
  },
};


module.exports = response