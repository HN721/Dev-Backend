const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const asynchandler = require("express");
const User = require("../model/User");
const Course = require("../model/Courses");

const courseCtrl = {
  create: async (req, res) => {
    const { title, description, difficulty, duration } = req.body;
    //find the user
    const userFound = await User.findById(req.user);
    if (!userFound) {
      res.status(404).json({ message: "User Not Found" });
    }
    console.log(userFound);
    // if (userFound !== "instructor") {
    //   res
    //     .status(401)
    //     .json({
    //       message: "Your Are Not Authorized to create a course,instructur only",
    //     });
    // }
    //validate user input
    if (!title || !description || !difficulty || !duration) {
      res.status(400).json({ message: "Please Provide all Fields" });
    }
    //check if course aleready exist
    const courseFound = await Course.findOne({ title });
    if (courseFound) {
      res.status(404).json({ message: "Course aleready exist" });
    }
    //create the course
    const createCourse = await Course.create({
      title,
      description,
      difficulty,
      duration,
      user: req.user,
    });
    //push the courses
    userFound.coursesCreated.push(createCourse._id);
    // resave user
    await userFound.save();
    // send the respon
    res.json(createCourse);
  },
  //get all course
  list: async (req, res) => {
    const course = await Course.find().populate("section").populate({
      path: "user",
      model: "User",
      select: "username email",
    });
    res.json(course);
  },
  //get single course
  getSingle: async (req, res) => {
    const course = await Course.findById(req.params.courseId)
      .populate("section")
      .populate({
        path: "user",
        model: "User",
        select: "username email",
      });
    res.json(course);
  },
  //update course
  update: async (req, res) => {
    const course = await Course.findByIdAndUpdate(
      req.params.courseId,
      req.body,
      { new: true }
    );
    if (course) {
      res.json(course);
    } else {
      res.status(404);
      throw new Error("Course not found");
    }
  },
  //Delete
  delete: async (req, res) => {
    // !Find the course
    const courseFound = await Course.findById(req.params.courseId);
    // Prevent delteion if a course a exist
    if (courseFound && courseFound.student.length < 0) {
      res.status(400);
      res.json({ message: " Course has student canot delete " });
      return;
    }
    //milai delete
    const course = await Course.findByIdAndDelete(req.params.courseId);
    if (course) {
      //mual idelete
      await User.updateMany(
        { coursesCreated: req.params.courseId },
        { $pull: { coursesCreated: req.params.courseId } }
      );
    }
    res.json(course);
  },
};
module.exports = courseCtrl;
