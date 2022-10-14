const mongoose = require("mongoose");

const FolderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
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
    location: {
      type: String,
    },
    isTrashed: {
      type: Boolean,
      default: false,
    },
    extension:String
  },
  { timestamps: true }
);

module.exports = mongoose.model("folder", FolderSchema);
