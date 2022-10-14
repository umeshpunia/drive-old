const multer = require("multer");
const FileSchema = require("../../models/file.model");
const FolderSchema = require("../../models/folder.model");
const { sendResponse } = require("../../services/sendResponse");
const randomstring = require("randomstring");
const fs = require("fs");
const { HOME_URL } = process.env;
// file uploading

function fileOptions(path) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path);
    },
    filename: function (req, file, cb) {
      const uniqueName = randomstring.generate({
        length: 12,
        charset: "alphabetic",
      });
      cb(null, `${uniqueName}-${file.originalname}`);
    },
  });
  return storage;
}

// file uploading

function uploadFile(req, res) {
  const upload = multer({
    storage: fileOptions("assets/drive/files"),
  }).single("picture");
  upload(req, res, function (err) {
    if (err) {
      return sendResponse(res, 500, err.message);
    }

    const { email, parentFolderId } = req.body;
    if (!email) {
      fs.unlink("assets/drive/files/" + req.file.filename, (err) => {
        if (err) return sendResponse(res, 401, "File Not Deleted");
      });
      return res.json({ status: 400, msg: "Bad Request" });
    }

    const name = req.file.filename;
    const original = req.file.originalname;
    const size = req.file.size;

    let fileNameArr = name.split(".");

    let ext = fileNameArr[fileNameArr.length - 1];

    const location = "assets/drive/files/";

    let updFile = new FileSchema({
      name,
      createdBy: email,
      parentFolder: parentFolderId,
      size,
      location,
      original,
      extension: ext,
    });

    updFile.save((err, data) => {
      if (err) {
        return sendResponse(res, 500, err.message);
      }
      if (!data) {
        return sendResponse(res, 400, "Please Try Again");
      }
      return sendResponse(res, 200, data);
    });
    // Everything went fine.
  });
}
function uploadFileInFolder(req, res) {
  const { _id } = req.params;

  FolderSchema.findOne({ _id }, (err, folder) => {
    if (err) return sendResponse(res, 500, err.message);
    if (!folder) return sendResponse(res, 400, "Please Try Again");
    // console.log(folder)
    const upload = multer({
      storage: fileOptions(folder.location + "/"),
    }).single("picture");
    upload(req, res, function (err) {
      if (err) {
        return sendResponse(res, 500, err.message);
      }

      const { email, parentFolderId } = req.body;
      if (!email) return res.json({ status: 400, msg: "Bad Request" });

      const sizeLimit = parseFloat(
        (req.file.size / 1024 / 1024).toPrecision(2)
      );

      if (sizeLimit > 10)
        return sendResponse(res, 400, "File Size Not Greater Than 10Mb");

      const picture = req.file.filename;
      const original = req.file.originalname;
      const size = req.file.size;

      let fileType=picture.split(".")

      let type=fileType[fileType.length-1]

      const location = folder.location+"/";

      let updFile = new FileSchema({
        name: picture,
        createdBy: email,
        parentFolder: parentFolderId,
        size,
        location,
        original,
        extension:type
      });

      updFile.save((err, data) => {
        if (err) {
          return sendResponse(res, 500, err.message);
        }
        if (!data) {
          return sendResponse(res, 400, "Please Try Again");
        }
        console.log(data)
        return sendResponse(res, 200, data);
      });
      // Everything went fine.
    });
  });
}

function getFiles(req, res) {
  const { email } = req.body;
  FileSchema.find({ email ,parentFolder:''}, (err, data) => {
    if (err) return sendResponse(res, 500, err.message);
    if (!data) return sendResponse(res, 400, "Please Try Again");
    sendResponse(res, 200, data);
  });
}

function getFilesInsideFolder(req,res){
  const { email,id } = req.body;
  FileSchema.find({ email ,parentFolder:id}, (err, data) => {
    if (err) return sendResponse(res, 500, err.message);
    if (!data) return sendResponse(res, 400, "Please Try Again");
    console.log(data)
    sendResponse(res, 200, data);
  });
}

function deleteAllFiles(req, res) {
  FileSchema.remove({}, (err) => {
    if (err) sendResponse(res, 500, "Please Try Again");
    sendResponse(res, 200, "Deleted");
  });
}

module.exports = { uploadFile, uploadFileInFolder, deleteAllFiles, getFiles,getFilesInsideFolder };
