const Exam = require("../models/Exam");
const ClassModel = require("../models/ClassModel");
const {nanoid} = require("nanoid");
const {getFormatDate, getLocalTime, getConvertDateTime,toLocal} = require("../util/Helpers");

module.exports = class ClassService {
    async ExamCreate(body, teacherId) {
        try {
            let classCode = body.classCode;
            let tempExamId = nanoid(6);
            let classModel = await ClassModel.findOne({classCode: classCode});
            if (!classModel) {
                return {
                    code: 404,
                    message: "No class found",
                    data: null,
                };
            }
            while (await Exam.findOne({examId: tempExamId})) {
                tempExamId = nanoid(6);
            }
            let classId = classModel._id;
            let examName = body.examName;
            let startNewDate=body.startExamDate.split("-");
            let startNewTime=body.startExamTime.split(":");
            const startD = new Date(parseInt(startNewDate[0]), parseInt(startNewDate[1]), parseInt(startNewDate[2]), parseInt(startNewTime[0]), parseInt(startNewTime[1]), 0, 0);
            let set = startD;

            console.log("start time "+set);


            let endNewDate=body.endExamDate.split("-");
            let endNewTime=body.endExamTime.split(":");

            const endD = new Date(parseInt(endNewDate[0]), parseInt(endNewDate[1]), parseInt(endNewDate[2]), parseInt(endNewTime[0]), parseInt(endNewTime[1]), 0, 0);
            let ene = endD;
            let endExamDate = ene;
            let startExamDate = set;
            let startExamTime = body.startExamTime;
            let endExamTime = body.endExamTime;
            let questions = body.questions;
            let perQuestionMark = body.perQuestionMark;
            let newExam = new Exam({
                teacherId: teacherId,
                examId: tempExamId,
                classId: classId,
                examName: examName,
                startExamDate: startExamDate,
                endExamDate: endExamDate,
                perQuestionMark: perQuestionMark,
                examMarks: Math.round(perQuestionMark * questions.length),
                startExamTime: startExamTime,
                endExamTime: endExamTime,
                questions: questions,
            });
            let saveData = await newExam.save();
            // let saveData ="s";
            if (saveData) {
                return {
                    code: 200,
                    message: "Exam Create Success",
                    data: saveData,
                };
            }
        } catch (e) {
            return {
                code: 500,
                message: e.message,
                data: null,
            };
        }
    }

    async ExamList(teacherId, classId) {
        try {
            //
            let test=new Date(2022,10,14,19,16,0);
            // console.log(getConvertDateTime(new Date()));
            let today=new Date();
            console.log("now time ",today);

            let running = await Exam.find({
                teacherId: teacherId,
                classId: classId,
                startExamDate: {$lte: today},
                endExamDate: {$gte: today}
            });
            let past = await Exam.find({teacherId: teacherId, classId: classId, endExamDate: {$lt: today}});
            let upComing = await Exam.find({teacherId: teacherId, classId: classId, startExamDate: {$gt: today}});
            // if (!exams) {
            //   return {
            //     code: 404,
            //     message: "No Exams Found",
            //     data: null,
            //   };
            // }
            return {
                code: 200,
                message: "All Exams",
                data: {
                    "running": running,
                    "past": past,
                    "upcoming": upComing,
                },
            };
        } catch (e) {
            return {
                code: 500,
                message: e.message,
                data: null,
            };
        }
    }

    async StudentExamList(user, classId) {
        try {
            let today = toLocal(new Date());
            let isMyClass = user.classes.find((c) => c.classId == classId.toString());
            if (isMyClass == undefined) {
                return {
                    code: 404,
                    message: "No Exams Found",
                    data: null,
                };
            }
            //    let running = await Exam.find({
            //     teacherId: teacherId,
            //     classId: classId,
            //     startExamDate: {$lte: today},
            //     endExamDate: {$gte: today}
            // });
            let running = await Exam.find({
                classId: classId,
                startExamDate: {$lte: today},
                endExamDate: {$gte: today}
            }, null, {lean: true})
                .populate("classId", "classCode")
                .sort([['createdAt', -1]])
                .exec()
                .then(async (docs) => {
                    return docs;
                });
            let modifyRunning = running.filter((exam) => {
                console.log(getConvertDateTime(toLocal(exam.startExamDate)))
                if (exam.students == undefined) {
                    return exam;
                }
                let student = exam.students.find((s) => s.studentId == user._id.toString());
                if (student == undefined) {
                    return exam;
                } else {
                    exam.isGiveExam = true
                    exam.studentMarks = student.examMarks;
                }
                return exam;
            })
            let past = await Exam.find({classId: classId, endExamDate: {$lt: today}}, null, {lean: true}).sort([['createdAt', -1]]);
            let modifyPast = past.filter((exam) => {
                if (exam.students == undefined) {
                    exam.isAbsent = true;
                    return exam;
                }
                let student = exam.students.find((s) => s.studentId == user._id.toString());
                if (student == undefined) {
                    exam.isAbsent = true;
                } else {
                    exam.studentMarks = student.examMarks;
                }
                return exam;
            })
            let upComing = await Exam.find({classId: classId, startExamDate: {$gt: today}}, null, {lean: true}).sort([['createdAt', -1]]);
            let modifyUpcoming = upComing.filter((exam) => {
                exam.startExamDate = getConvertDateTime(exam.startExamDate)
                return exam;
            })
            // if (!exams) {
            //   return {
            //     code: 404,
            //     message: "No Exams Found",
            //     data: null,
            //   };
            // }
            return {
                code: 200,
                message: "All Exams",
                data: {
                    "running": modifyRunning,
                    "past": modifyPast,
                    "upcoming": modifyUpcoming,
                },
            };
        } catch (e) {
            return {
                code: 500,
                message: e.message,
                data: null,
            };
        }
    }

    async SingleExam(teacherId, classId, examId) {
        try {
            let exam = await Exam.findOne({
                teacherId: teacherId,
                _id: examId,
                classId: classId,
            });
            if (!exam) {
                return {
                    code: 404,
                    message: "No Exam Found",
                    data: null,
                };
            }
            return {
                code: 200,
                message: "Single Exam Info",
                data: exam,
            };
        } catch (e) {
            return {
                code: 500,
                message: e.message,
                data: null,
            };
        }
    }

    async SingleExamMarks(teacherId, classCode, examId) {
        try {
            let classModel = await ClassModel.findOne({classCode: classCode});
            if (!classModel) {
                return {
                    code: 404,
                    message: "No class found",
                    data: null,
                };
            }
            let classId = classModel._id;
            let exam = await Exam.findOne({
                teacherId: teacherId,
                examId: examId,
                classId: classId,
            }).populate({
                path: 'students.studentId',
                select: '_id firstName lastName email'
            })
            .populate({
                path: 'teacherId',
                select: '_id firstName lastName email'
            });
            if (!exam) {
                return {
                    code: 404,
                    message: "No Exam Found",
                    data: null,
                };
            }
            return {
                code: 200,
                message: "Single Exam Info",
                data: exam,
            };
        } catch (e) {
            return {
                code: 500,
                message: e.message,
                data: null,
            };
        }
    }

    async SingleStudentExam(user, studentId, classId, examId) {
        try {
            let classModel = await ClassModel.findOne({classCode: classId});
            let isMyClass = user.classes.find((c) => c.classId == classModel._id.toString());
            if (isMyClass == undefined) {
                return {
                    code: 404,
                    message: "No Exam Found",
                    data: null,
                };
            }
            let exam = await Exam.findOne({
                examId: examId,
                classId: classModel._id,
            }, null, {lean: true});
            exam.startExamDate = getConvertDateTime(exam.startExamDate);
            exam.endExamDate = getConvertDateTime(exam.endExamDate);
            if (!exam) {
                return {
                    code: 404,
                    message: "No Exam Found",
                    data: null,
                };
            }
            return {
                code: 200,
                message: "Single Exam Info",
                data: exam,
            };
        } catch (e) {
            return {
                code: 500,
                message: e.message,
                data: null,
            };
        }
    }

    nextChar(c, index) {
        return String.fromCharCode(c.charCodeAt(0) + index);
    }

    async GiveExam(user, studentId, classId, examId, body) {
        try {
            let classModel = await ClassModel.findOne({classCode: classId});
            let isMyClass = user.classes.find((c) => c.classId == classModel._id.toString());
            if (isMyClass == undefined) {
                return {
                    code: 404,
                    message: "No Exam Found",
                    data: null,
                };
            }
            let exam = await Exam.findOne({
                examId: examId,
                classId: classModel._id,
            });
            if (!exam) {
                return {
                    code: 404,
                    message: "No Exam Found",
                    data: null,
                };
            }
            let totalCorrect = 0;
            for (let i = 0; i < exam.questions.length; i++) {
                var singleQ = exam.questions[i];
                if (i == body.questions[i].questionIndex) {
                    if (singleQ.answer == this.nextChar("A", body.questions[i].answer)) {
                        totalCorrect++;
                    }
                }
            }
            let totalMarks = totalCorrect * exam.perQuestionMark;
            let newStudent = {
                studentId: user._id,
                examMarks: totalMarks
            }
            exam.students.push(newStudent);
            exam.save();
            return {
                code: 200,
                message: "Single Exam Info",
                data: exam,
            };
        } catch (e) {
            return {
                code: 500,
                message: e.message,
                data: null,
            };
        }
    }
};
