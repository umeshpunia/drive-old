const FolderSchema = require("../../models/folder.model");
const FileSchema = require("../../models/file.model");
const fs = require("fs");
const multer = require("multer");
const { sendResponse } = require("../../services/sendResponse");

const drivePath = "assets/drive/folders";
function createFolder(req, res) {
  const { email, name, parentFolderId } = req.body;

  if (!email || !name)
    return res.status(400).json({ status: 400, msg: "Bad Request" });

  var mainFolder = drivePath + "/" + email + "/" + name;

  fs.mkdir(mainFolder, (err) => {
    if (err) return res.status(500).json({ status: 500, msg: err.message });

    let insFolder = new FolderSchema({
      createdBy: email,
      name,
      parentFolder: parentFolderId,
      location: mainFolder,
      extension:"folder"
    });

    insFolder.save((err, data) => {
      if (err) return res.status(501).json({ status: 501, msg: err.message });
      if (!data)
        return res.status(401).json({ status: 401, msg: "Please Try Again" });

      res.status(200).json({ status: 200, msg: "Folder Created Successfully" });
    });
  });
}

function createSubFolder(req, res) {
  const { email, name, parentFolderId } = req.body;

  if (!email || !name || !parentFolderId)
    return res.json({ status: 400, msg: "Bad Request" });

  FolderSchema.findOne({ _id: parentFolderId }, (err, data) => {
    if (err) sendResponse(res, 500, err.message);
    if (!data) sendResponse(res, 400, "No Data Found");
    var mainFolder = data.location + "/" + name;
    fs.mkdir(mainFolder, (err) => {
      if (err) return res.json({ status: 500, msg: err.message });

      let insFolder = new FolderSchema({
        createdBy: email,
        name,
        parentFolder: parentFolderId,
        location: mainFolder,
        extension:"folder"
      });

      insFolder.save((err, data) => {
        console.log(data);
        if (err) return res.json({ status: 501, msg: err.message });
        if (!data) return res.json({ status: 401, msg: "Please Try Again" });

        res
          .status(200)
          .json({ status: 200, msg: "Folder Created Successfully" });
      });
    });
  });
}

function deleteData(req, res) {
  FolderSchema.remove({}, (err) => {
    if (err) return console.log(err);
    console.log("deleted");
  });
}
module.exports = { createFolder, createSubFolder, deleteData };
