const {validationResult} = require("express-validator");
const StudentService = require("../services/StudentService");
const {
    validationResponse,
    successResponse,
    getResultFormat,
    nextError
} = require("../util/ResponseUtill");
const studentService = new StudentService();

exports.login = async (req, res, next) => {
    try {

        let error= validationResponse(res,req)
        if(error!=null){ return error}
        // We only pass the body object, never the req object
        let result = await studentService.StudentLogin(req.body);
        if (result) {
            if (result.code === 200) {
                return res
                    .status(200)
                    .json(result);
            }
            else if(result.code==203)
            {
                 let message = "Email or Password Invalid!";
                 let ress={
                    status: false,
                    code: 203,
                    message: message,
                    data: null
                 }
                return res
                    .status(200)
                    .json(ress);
            }
            else {
               nextError(next,err)
            }
        } else {
           nextError(next,err)
        }
    } catch (err) {
      nextError(next,err)
    }
};

exports.create = async (req, res, next) => {
    try {
        let error = validationResponse(res, req)
        if (error != null) {
            return error
        }
        // We only pass the body object, never the req object
        let result = await studentService.StudentCreate(req.body);
         return  getResultFormat(res,next,result);
    } catch (err) {
      nextError(next,err)
    }
};

exports.EnrollClassList = async (req, res, next) => {
    try {
        let studentId = req.user._id;
        let result = await studentService.EnrollClassList(studentId);
        return getResultFormat(res, next, result)

    } catch
        (err) {
        nextError(next, err.message);
    }
}
exports.ArchiveClassList = async (req, res, next) => {
    try {
        let studentId = req.user._id;
        let result = await studentService.ArchiveClassList(studentId);
        return getResultFormat(res, next, result)

    } catch
        (err) {
        nextError(next, err.message);
    }
}