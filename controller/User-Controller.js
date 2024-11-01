const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const asynchandler = require("express");
const User = require("../model/User");

const userCtrl = {
  register: async (req, res, next) => {
    const { username, email, password } = req.body;
    //validate
    if (!username || !email || !password)
      throw new Error("Plase all field are required");
    const userExist = await User.findOne({ email });
    if (userExist) {
      throw new Error("Email already taken");
    }
    //hash pssword
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //created user
    const userCreated = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    //send the respond
    res.json({
      username: userCreated.username,
      email: userCreated.email,
      role: userCreated.role,
      id: userCreated.id,
    });
  },
  login: async (req, res, next) => {
    const { email, password } = req.body;
    //!check if user email exist
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid Error");
    }
    //!check if user password is valid
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Password Incorrect" }); // Langsung kirim response
    }
    // generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    // send the response
    res.json({
      message: "Login Success",
      token,
      id: user._id,
      email: user.email,
    });
  },
  profile: async (req, res) => {
    res.json({ message: "Welcome to Your Profile" });
  },
};
module.exports = userCtrl;
