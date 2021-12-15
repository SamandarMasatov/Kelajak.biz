const express = require("express");
const router = express.Router();
const category = require("../controller/category");


// MIDDLEWARE

// const { isAuth, authorize, roles} = require("../middleware/isAuth");
// session, roles('admin','moderator')

router.post("/add", category.createOne);
router.get("/all", category.getAll);
router.get("/:id", category.getOne);
router.put("/:id", category.updateOne);
router.delete("/:id", category.deleteOne);

module.exports = router;
