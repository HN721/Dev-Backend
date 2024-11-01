const express = require("express");
const userCtrl = require("../controller/User-Controller");
const isAuthenticated = require("../middleware/isAuth");
const userRoute = express.Router();

userRoute.post("/api/v1/users/register", userCtrl.register);
userRoute.post("/api/v1/users/login", userCtrl.login);
userRoute.get("/api/v1/users/profile", isAuthenticated, userCtrl.profile);

module.exports = userRoute;
