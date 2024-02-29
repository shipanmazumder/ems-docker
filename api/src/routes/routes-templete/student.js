const express = require('express');
const {isStudentAuth} = require('../../middlewares/AuthCheck');
const {studentCreateValidation, studentLoginValidation,studentClassEnrollValidation} = require('../../util/ValidationUtill');
const {login, create,EnrollClassList,ArchiveClassList} = require('../../controllers/StudentController');
const {ClassEnroll,studentSingleClass, ClassUnroll,ClassReEnroll} = require('../../controllers/ClassController');
const {studentExamList,singleStudentExam,giveExam} = require('../../controllers/ExamController');

let route = express.Router();

route.all('/', (req, res) => {
    res.send({message: 'Hello from Express!'});
});

route.post("/studentLogin", studentLoginValidation, login)
route.post("/studentCreate", studentCreateValidation, create)
route.post("/classEnroll", isStudentAuth,studentClassEnrollValidation, ClassEnroll)
route.get("/classUnroll", isStudentAuth, ClassUnroll)
route.post("/classReEnroll", isStudentAuth, ClassReEnroll)
route.get("/singleClass",isStudentAuth, studentSingleClass)
route.get("/studentEnrollClasses", isStudentAuth, EnrollClassList)
route.get("/studentArchiveClasses", isStudentAuth, ArchiveClassList)
route.get("/examList", isStudentAuth, studentExamList)
route.get("/singleExam", isStudentAuth, singleStudentExam)
route.post("/giveExam", isStudentAuth, giveExam)

module.exports = route;