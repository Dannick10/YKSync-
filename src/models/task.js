const mongoose = require("mongoose")
const { Schema } = mongoose

const taskSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
    title: String,
    status: { type: String, default: "pending" },
    description: String,
}, {
    timestamps: true,
})

const task = mongoose.model("task",taskSchema)

module.exports = task