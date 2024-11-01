const express = require("express");
// const isAuthenticated = require("../middleware/isAuth");
const sectionCtrl = require("../controller/Courses-Section");
const sectionRouter = express.Router();

sectionRouter.post("/api/v1/course/section/:courseId", sectionCtrl.create);

module.exports = sectionRouter;
