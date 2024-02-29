const ExamService = require("../services/ExamService");
const {
    validationResponse,
    nextError,
    getResultFormat
} = require("../util/ResponseUtill");
const examService = new ExamService();

exports.examCreate = async (req, res, next) => {
    try {
        let error = validationResponse(res, req)
        if (error != null) {
            return error
        }
        let result = await examService.ExamCreate(req.body, req.user._id);
        return getResultFormat(res, next, result);
    } catch (err) {
        nextError(next, err.message)
    }
};


exports.examList = async (req, res, next) => {
    try {
        let teacherId = req.user._id;
        let classId = req.query.classId;
        let result = await examService.ExamList(teacherId,classId);
        return getResultFormat(res, next, result)

    } catch
        (err) {
        nextError(next, err.message);
    }
}
exports.studentExamList = async (req, res, next) => {
    try {
        let classId = req.query.classId;
        let result = await examService.StudentExamList(req.user,classId);
        return getResultFormat(res, next, result)

    } catch
        (err) {
        nextError(next, err.message);
    }
}
exports.singleExam = async (req, res, next) => {
    try {
        let teacherId = req.user._id;
        let classId = req.query.classId;
        let examId = req.query.examId;
        console.log(examId)
        let result = await examService.SingleExam(teacherId,classId,examId);
        return getResultFormat(res, next, result)

    } catch
        (err) {
        nextError(next, err.message);
    }
}
exports.singleExamMarks = async (req, res, next) => {
    try {
        let teacherId = req.user._id;
        let classId = req.query.classCode;
        let examId = req.query.examId;
        console.log(examId)
        let result = await examService.SingleExamMarks(teacherId,classId,examId);
        return getResultFormat(res, next, result)

    } catch
        (err) {
        nextError(next, err.message);
    }
}
exports.singleStudentExam = async (req, res, next) => {
    try {
        let studentId = req.user._id;
        let classId = req.query.classCode;
        let examId = req.query.examId;
        console.log(examId)
        let result = await examService.SingleStudentExam(req.user,studentId,classId,examId);
        return getResultFormat(res, next, result)

    } catch
        (err) {
        nextError(next, err.message);
    }
}
exports.giveExam = async (req, res, next) => {
    try {
        let studentId = req.user._id;
        let classId = req.body.classCode;
        let examId = req.body.examId;
        let result = await examService.GiveExam(req.user,studentId,classId,examId,req.body);
        return getResultFormat(res, next, result)

    } catch
        (err) {
        nextError(next, err.message);
    }
}