const mongoose = require("mongoose");
const Project = require("../models/Project");

const createProject = async (req, res) => {
  try {
    const {
      name,
      description,
      answerable,
      startDate,
      endDate,
      frontend,
      backend,
      database,
      apis,
      methodology,
      tests,
      deploy,
      cicd,
      rollback,
      documentation,
      updateDocumentation,
      projectManager,
      supportLead,
      supportTeam,
      supportAvailable,
    } = req.body;

    const newProject = new Project({
      userId: req.user._id,
      name,
      description,
      answerable,
      startDate,
      endDate,
      frontend,
      backend,
      database,
      apis,
      methodology,
      tests,
      deploy,
      cicd,
      rollback,
      documentation,
      updateDocumentation,
      projectManager,
      supportLead,
      supportTeam,
      supportAvailable,
    });

    if (!newProject) {
      res.status(404).json({ erros: ["não foi possivel criar"] });
      return;
    }

    await newProject.save();

    res.status(200).json({ newProject });
  } catch (err) {
    console.log(err);
    res.status(500).json({ erros: ["não foi possivel criar"] });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByIdAndUpdate({ _id: id }, req.body);

    if (!project) {
      return res.status(304).json({ erros: ["Projeto não encontrado."] });
    }

    res.status(202).json({ project });
  } catch (err) {
    console.log(err);
    res.status(404).json({ erros: ["houve um erro volte mais tarde"] });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ erros: ["precisa de um projeto válido"] });
    }

    const project = await Project.findByIdAndDelete({ _id: id });

    if (!project) {
      return res.status(400).json({ erros: ["Projeto não encontrado"] });
    }

    res.status(202).json({ project });
  } catch (err) {
    console.log(err);
    res.status(404).json({ erros: ["houve um erro volte mais tarde"] });
  }
};

const getAllProject = async (req, res) => {
  try {
    const project = await Project.find()
      .select("name")
      .select("description")
      .select("answerable")
      .select("startDate")
      .select("endDate");
    res.status(202).json({ project });
  } catch (err) {
    res.status(404).json({ erros: ["houve um erro volte mais tarde"] });
  }
};

const getUserProject = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ erros: ["precisa de um usuario válido"] });
    }

    const project = await Project.find({ userId: id })
      .select("name")
      .select("description")
      .select("answerable")
      .select("startDate")
      .select("endDate");

    if (!project) {
      return res
        .status(400)
        .json({ erros: ["não foi possivel achar projetos do usuario"] });
    }

    res.status(202).json({ project });
  } catch (err) {
    res.status(404).json({ erros: ["houve um erro volte mais tarde"] });
  }
};

const getProject = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ erros: ["precisa de um usuario válido"] });
      }

    const project = await Project.findOne({_id: id})

    if (!project) {
        return res
          .status(400)
          .json({ erros: ["não foi possivel achar projeto"] });
      }


    res.status(202).json({project})

  } catch (err) {
    res.status(404).json({ erros: ["houve um erro volte mais tarde"] });
  }
};

module.exports = {
  createProject,
  updateProject,
  deleteProject,
  getAllProject,
  getUserProject,
  getProject,
};
