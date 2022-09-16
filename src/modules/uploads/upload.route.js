const express = require("express");
const multer = require("multer");
const path = require("path");
const slugify = require("slugify");
const router = express.Router();

const { default: catchAsync } = require("../../utils/catchAsync");

const MAX_FILE_SIZE = 5242880; // bytes (5 megabytes)

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      slugify(file.originalname) +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    ); //Appending extension
  },
});
const upload = multer({ storage, limits: { fileSize: MAX_FILE_SIZE } });

router.get("/", (req, res) => {
  res.send("Upload Route");
});

router.post(
  "/",
  [upload.array("files", 5)],
  catchAsync(async (req, res) => {
    const fileUrls = req.files.map((file) => {
      const cleaned = file.path.replace(
        String.fromCharCode(92),
        String.fromCharCode(92, 92)
      );
      return cleaned;
    });

    return res.status(200).json({
      success: true,
      fileUrls,
    });
  })
);

export default router;
