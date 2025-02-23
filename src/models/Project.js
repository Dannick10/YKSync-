const mongoose = require("mongoose");
const { Schema } = mongoose;

const projectSchema = new Schema(
  {
    userId: mongoose.ObjectId,
    name: String,
    status: { type: String, default: "current" },
    description: String,
    answerable: String,
    startDate: Date,
    endDate: Date,
    frontend: [String],
    backend: [String],
    database: [String],
    tests: [String],
    deploy: String,
  },
  {
    timestamps: true,
  }
);

const project = mongoose.model("project", projectSchema);

module.exports = project;
