const express = require("express");
const controller = require("../controllers/vendor");
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

// Modification operations on Items
router.post("/item", uploadOptions.single("image"), controller.postAddItem);
router.put("/item/:id", uploadOptions.single("image"), controller.putItem);
router.delete("/item/:id", controller.deleteItem);
router.put("/vendor", uploadOptions.single("image"), controller.putVendor);

// Non modification operations on Items
router.get("/items", controller.getItems);

module.exports = router;
