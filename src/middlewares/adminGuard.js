const adminGuard = (req, res, next) => {
    const user = req.user;

    if (!user || !user.admin) {
      return res.status(401).json({ erros: ["Acesso negado, apenas admin"] });
    }
  

    next();
};

module.exports = adminGuard