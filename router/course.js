const express = require("express");
const router = express.Router();
const multer = require("multer");
const md5 = require("md5");
const path = require("path");
const course = require("../controller/course");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/course");  
  },
  filename: function (req, file, cb) {
    cb(null, `${md5(Date.now())}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage: storage });


// MIDDLEWARE

// const { isAuth, authorize, roles} = require("../middleware/isAuth");
// session, roles('admin','moderator')


router.post("/add", upload.single("image"), course.createOne);
router.get("/all", course.getAll);
router.get("/axios", course.getAziosVourse);
router.get("/:id", course.getOne);
router.get("/info/:id",  course.getInfo);
router.put("/info/:id", course.updateInfo);
router.put("/image/:id", upload.single("image"), course.updateImage);
router.delete("/:id",  course.deleteOne);
router.delete("/addcourse/:id",  course.deleteADD_COURSE);

module.exports = router;
