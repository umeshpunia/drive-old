const {
  uploadFile,
  uploadFileInFolder,
  deleteAllFiles,
  getFiles,
  getFilesInsideFolder,
} = require("../controllers/files/file.controller");

const router = require("express").Router();

router.post("/upload", uploadFile);
router.post("/folder-upload/:_id", uploadFileInFolder);
router.post("/get", getFiles);
router.post("/get-folder", getFilesInsideFolder);
router.get("/delete", deleteAllFiles);

module.exports = router;
