const mongoose = require("mongoose");
const { Schema } = mongoose;

const StatusUserSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    projectsTotal: {
      type: Number,
      default: 0,
    },
    projectsCurrents: {
      type: Number,
      default: 0,
    },
    projectsFinish: {
      type: Number,
      default: 0,
    },
    projectsUnfinished: {
      type: Number,
      default: 0,
    },
    projectsOverdue: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const StatusUser = mongoose.model("statusUser", StatusUserSchema);

module.exports = StatusUser;
