const CourseSection = require("../model/CourseSection");
const mongoose = require("mongoose");

const Course = require("../model/Courses");
const sectionCtrl = {
  create: async (req, res) => {
    //create sectiom
    const { sectionName } = req.body;
    const { courseId } = req.params;
    if (!mongoose.isValidObjectId(courseId)) {
      res.status(400);
      throw new Error("Invalid course id");
    }
    //find course
    const course = await Course.findById(courseId);
    // Validate course input
    if (!course) {
      res.status(404).json({ message: "Course not Found" });
    }
    // Validate section input
    if (!sectionName) res.status(404).json({ message: "Section not Found" });
    // Create section
    const createSection = await CourseSection.create({
      sectionName,
      user: req.user,
    });
    // Add section to course
    course.section.push(createSection._id);
    await course.save({
      validateBeforeSave: false,
    });
    //send response
    res.status(201).json({
      status: "success",
      data: createSection,
      message: "Section created successfully",
    });
  },
};
module.exports = sectionCtrl;
