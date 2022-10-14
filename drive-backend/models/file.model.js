const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    original: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    parentFolder: {
      type: String,
    },
    status: {
      type: String,
      default: "true",
    },
    size: {
      type: String,
      require: true,
    },
    location: {
      type: String,
    },
    extension: {
      type: String,
    },
    isTrashed: {
      type: Boolean,
      default: false,
    },
    type:String
  },
  { timestamps: true }
);

module.exports = mongoose.model("file", FileSchema);
