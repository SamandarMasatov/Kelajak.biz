const express = require("express");
const router = express.Router();
const davlat = require("../../controller/ariza/country");
const path = require('path');
const md5 = require('md5');
const multer = require('multer'); 

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploads/country')
    },
    filename: function (req, file, cb) {
        cb(null, `${md5(Date.now())}${path.extname(file.originalname)}`)
    }
  });
  
  const upload = multer({storage: storage});
  
  router.post("/add", upload.single("image"), davlat.createOne);
  router.get("/all",  davlat.getAll);
  router.get("/:id",  davlat.getOne);
  router.delete("/:id",  davlat.delete);



module.exports = router;