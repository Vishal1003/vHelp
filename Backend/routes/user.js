const express = require("express");
const controller = require("../controllers/user");
const router = express.Router();
const multer = require("multer");

const FILE_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpeg",
    "image/jpg": "jpg"
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error("invalid image type");

        if (isValid) {
            uploadError = null;
        }
        cb(uploadError, "public/uploads");
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.split(" ").join("-");
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`);
    }
});

const uploadOptions = multer({ storage: storage });
router.put("profile", uploadOptions.single("image"), controller.putProfile);
module.exports = router;
