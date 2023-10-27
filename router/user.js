const express = require("express");
const multer = require("multer");

const {
  addUser,
  getUser,
  updateUser,
  deleteUser,
  addImage,
} = require("../controllers/userController");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("jbfkjfsak");
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./data");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

router.post("/user", addUser);

router.get("/user", getUser);

router.put("/user/:id", updateUser);

router.delete("/user/:id", deleteUser);

const upload = multer({ storage: storage });

router.post("/upload/:id", upload.single("file"), addImage);

module.exports = router;
