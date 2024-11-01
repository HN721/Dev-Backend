const express = require("express");
const isAuthenticated = require("../middleware/isAuth");
const courseCtrl = require("../controller/Course-Controller");
const courseRouter = express.Router();

courseRouter.post("/api/v1/course/create", isAuthenticated, courseCtrl.create);
courseRouter.get("/api/v1/course/list", courseCtrl.list);
courseRouter.get("/api/v1/course/:courseId", courseCtrl.getSingle);
courseRouter.post("/api/v1/course/:courseId", courseCtrl.update);
courseRouter.delete("/api/v1/course/:courseId", courseCtrl.delete);

module.exports = courseRouter;
