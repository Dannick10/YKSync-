const mongoose = require("mongoose");
const { Schema } = mongoose;

const projectSchema   = new Schema(
  {
    userId: mongoose.ObjectId,
    name: String,
    description: String,
    answerable: String,
    startDate: Date,
    endDate: Date,
    frontend: [String],
    backend: [String],
    database: [String],
    apis: [String],
    methodology: String,
    tests: [String],
    deploy: String,
    cicd: String,
    rollback: String,
    documentation: String,
    updateDocumentation: String,
    projectManager: String,
    supportLead: String,
    supportTeam: [String],
    supportAvailable: String,
  },
  {
    timestamps: true,
  }
);

const project = mongoose.model("project", projectSchema);

module.exports = project;
