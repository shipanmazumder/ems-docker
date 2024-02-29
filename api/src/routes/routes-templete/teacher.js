const express = require('express');
const {isTeacherAuth} = require('../../middlewares/AuthCheck');
const {
    teacherCreateValidation,
    teacherLoginValidation,
    classCreateValidation,
    examCreateValidation
} = require('../../util/ValidationUtill');
const {login, create} = require('../../controllers/TeacherController');
const {classCreate, classList, singleClass,ClassMaterial} = require('../../controllers/ClassController');
const {examCreate, examList, singleExam, singleExamMarks} = require('../../controllers/ExamController');

const multer = require("multer");
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "files");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `${Date.now()}.${ext}`);
    },
});
const upload = multer({
    storage: multerStorage
});
let route = express.Router();
route.all('/', (req, res) => {
    res.send({message: 'Hello from Express!'});
});
route.post("/teacherLogin", teacherLoginValidation, login)
route.post("/teacherCreate", teacherCreateValidation, create)
route.post("/classCreate", classCreateValidation, isTeacherAuth, classCreate)
route.get("/classList", isTeacherAuth, classList)
route.get("/singleClass", isTeacherAuth, singleClass)
route.post("/examCreate", examCreateValidation, isTeacherAuth, examCreate)
route.get("/examList", isTeacherAuth, examList)
route.get("/singleExam", isTeacherAuth, singleExam)
route.get("/singleExamMarks", isTeacherAuth, singleExamMarks)
route.post("/uploadClassMaterial", isTeacherAuth, ClassMaterial)

module.exports = route;