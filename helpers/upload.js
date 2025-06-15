import multer from "multer";
import path from "node:path";
import HttpError from "./HttpError.js";

const tempDir = path.resolve("temp");

const storage = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, callback) => {
    const uniquePrefix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniquePrefix}_${file.originalname}`;
    callback(null, filename);
  },
});

const limits = {
  fileSize: 1024 * 1024 * 5,
};

const fileFilter = (req, file, callback) => {
  const extension = file.originalname.split(".").pop().toLowerCase();
  if (extension === "exe") {
    return callback(
      HttpError(400, "File type not allowed: .exe files are not permitted")
    );
  }
  callback(null, true);
};

const updload = multer({
  storage,
  limits,
  fileFilter,
});

export default updload;
