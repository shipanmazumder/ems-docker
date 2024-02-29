const { check } = require("express-validator");

module.exports = class ValidationUtil {
  static teacherCreateValidation = [
    check("firstName").not().isEmpty().withMessage("First Name Required"),
    check("lastName").not().isEmpty().withMessage("Last Name Required"),
    check("email").not().isEmpty().withMessage("Email Required"),
    check("password").not().isEmpty().withMessage("Password Required")
  ];
  static teacherLoginValidation = [
    check("email").not().isEmpty().withMessage("Email Required"),
    check("password").not().isEmpty().withMessage("Password Required")
  ];
  static studentCreateValidation = [
    check("firstName").not().isEmpty().withMessage("First Name Required"),
    check("lastName").not().isEmpty().withMessage("Last Name Required"),
    check("email").not().isEmpty().withMessage("Email Required"),
    check("password").not().isEmpty().withMessage("Password Required")
  ];
  static studentClassEnrollValidation = [
    check("classCode").not().isEmpty().withMessage("Class Code Required")
  ];
  static studentLoginValidation = [
    check("email").not().isEmpty().withMessage("Email Required"),
    check("password").not().isEmpty().withMessage("Password Required")
  ];
  static classCreateValidation = [
    check("subjectName").not().isEmpty().withMessage("Subject Name Required"),
    check("subjectCode").not().isEmpty().withMessage("Subject Code Required")
  ];
  static examCreateValidation = [
    check("classCode").not().isEmpty().withMessage("Class Code Required"),
    check("examName").not().isEmpty().withMessage("Exam Name Required"),
    check("perQuestionMark").not().isEmpty().withMessage("Question Mark Required"),
    check("startExamDate").not().isEmpty().withMessage("Start Exam Date Required"),
    check("endExamDate").not().isEmpty().withMessage("End Exam Date Required"),
    check("startExamTime").not().isEmpty().withMessage("Start Exam Time Required"),
    check("endExamTime").not().isEmpty().withMessage("End Exam Time Required")
  ];
};
