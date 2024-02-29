const ClassModel = require("../models/ClassModel");
const Teacher = require("../models/Teacher");
const {nanoid} = require("nanoid");
const {getConvertDateTime} = require("../util/Helpers");
module.exports = class ClassService {
    async ClassCreate(body, teacherId) {
        try {
            let batchNumber = body.batchNumber;
            let subjectName = body.subjectName;
            let subjectCode = body.subjectCode;
            let tempClassCode = nanoid(6);

            while (await ClassModel.findOne({classCode: tempClassCode})) {
                tempClassCode = nanoid(6);
            }
            let newClass = new ClassModel({
                teacherId: teacherId,
                batchNumber: batchNumber,
                subjectName: subjectName,
                students: [],
                classCode: tempClassCode,
                subjectCode: subjectCode,
            });
            let saveData = await newClass.save();
            await Teacher.findOneAndUpdate(
                {_id: teacherId},
                {$push: {classes: saveData._id}},
                {new: true}
            );
            if (saveData) {
                return {
                    code: 200,
                    message: "Class Create Success",
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

    async ClassList(teacherId) {
        try {
            let classes = await ClassModel.find({teacherId: teacherId},)
            .sort([['createdAt', -1]]);
            if (!classes) {
                return {
                    code: 404,
                    message: "No Classes Found",
                    data: null,
                };
            }
            return {
                code: 200,
                message: "All Class",
                data: classes,
            };
        } catch (e) {
            return {
                code: 500,
                message: e.message,
                data: null,
            };
        }
    }

    async SingleClass(teacherId, classCode) {
        try {
            let classes = await ClassModel.findOne({
                teacherId: teacherId,
                classCode: classCode,
            }, null, {lean: true}).populate({
                path: 'students.studentId',
                select: '_id firstName lastName email'
            }).populate({
                path: 'teacherId',
                model: 'Teacher',
                select: 'firstName lastName'
            });
            if (!classes) {
                return {
                    code: 404,
                    message: "No Class Found",
                    data: null,
                };
            }
            if (classes.classMaterials != null) {
                classes.classMaterials.reverse();
                let materials = classes.classMaterials.map((cm) => {
                    cm.createdAt = getConvertDateTime(cm.createdAt);
                    return cm;
                })
                classes.classMaterials = materials;

            }
            return {
                code: 200,
                message: "Single Class Info",
                data: classes,
            };
        } catch (e) {
            return {
                code: 500,
                message: e.message,
                data: null,
            };
        }
    }

    async StudentSingleClass(studentId, classCode) {
        try {
            console.log("st ",studentId)
            let classes = await ClassModel.findOne({
                classCode: classCode
            }, null, {lean: true}).populate({
                path: 'students.studentId',
                select: '_id firstName lastName email'
            }).populate({
                path: 'teacherId',
                model: 'Teacher',
                select: 'firstName lastName'
            });

            if (!classes) {
                return {
                    code: 404,
                    message: "No Class Found",
                    data: null,
                };
            }
            let found = classes.students.find(s => s.studentId._id == studentId.toString());
            if (found == undefined) {
                return {
                    code: 404,
                    message: "No user Class Found",
                    data: null,
                };
            }
            if (classes.classMaterials != null) {
                classes.classMaterials.reverse();
                let materials = classes.classMaterials.map((cm) => {
                    cm.createdAt = getConvertDateTime(cm.createdAt);
                    return cm;
                })
                classes.classMaterials = materials;

            }
            // exam.startExamDate = getConvertDateTime(exam.startExamDate);
            // exam.endExamDate = getConvertDateTime(exam.endExamDate);
            return {
                code: 200,
                message: "Single Class Info",
                data: classes,
            };
        } catch (e) {
            return {
                code: 500,
                message: e.message,
                data: null,
            };
        }
    }

    async ClassMaterial(req, fileInfo, teacherId, classCode) {
        try {
            let classes = await ClassModel.findOne({
                classCode: classCode
            });
            if (!classes) {
                return {
                    code: 404,
                    message: "No Class Found",
                    data: null,
                };
            }
            let newMaterial = {
                name: req.body.name,
                key: fileInfo.Key,
                fileUrl: fileInfo.Location
            }
            classes.classMaterials.push(newMaterial);
            let saveData = await classes.save();
            return {
                code: 200,
                message: "New Material Add",
                data: saveData,
            };
        } catch (e) {
            return {
                code: 500,
                message: e.message,
                data: null,
            };
        }
    }

    async ClassEnroll(student, studentId, classCode) {
        try {
            let classes = await ClassModel.findOne({
                classCode: classCode
            });
            if (!classes) {
                return {
                    code: 404,
                    message: "No Class Found",
                    data: null,
                };
            }
            let oldStudent = classes.students.find((student) => student.studentId.toString() == studentId.toString());
            if (oldStudent != undefined) {
                return {
                    code: 204,
                    message: "You already enroll this class",
                    data: null,
                };
            }
            let newStudent = {
                studentId: studentId
            }
            classes.students.push(newStudent);
            student.classes.push({classId: classes._id});
            await student.save()
            let saveData = await classes.save();
            return {
                code: 200,
                message: "New Enroll Classes",
                data: saveData,
            };
        } catch (e) {
            return {
                code: 500,
                message: e.message,
                data: null,
            };
        }
    }

    async ClassReEnroll(student, studentId, classCode) {
        try {
            let classes = await ClassModel.findOne({
                classCode: classCode
            });
            if (!classes) {
                return {
                    code: 404,
                    message: "No Class Found",
                    data: null,
                };
            }

            let filteredStudent = classes.students.map(function (student, index, arr) {
                return student;
            });
            let filteredClass = student.classes.map(function (classess, index, arr) {
                if (classess.classId.toString() == classes._id.toString()) {
                    classess.isActive = true;
                }
                return classess;
            });
            classes.students = filteredStudent;
            student.classes = filteredClass;
            await student.save()
            let saveData = await classes.save();
            return {
                code: 200,
                message: "ReEnroll Class Success",
                data: saveData,
            };
        } catch (e) {
            return {
                code: 500,
                message: e.message,
                data: null,
            };
        }
    }

    async ClassUnroll(student, studentId, classCode) {
        try {
            console.log(classCode)
            let classes = await ClassModel.findOne({
                classCode: classCode
            });
            if (!classes) {
                return {
                    code: 404,
                    message: "No Class Found",
                    data: null,
                };
            }

            let filteredStudent = classes.students.map(function (student, index, arr) {
                return student;
            });
            let filteredClass = student.classes.map(function (classess, index, arr) {
                if (classess.classId.toString() == classes._id.toString()) {
                    classess.isActive = false;
                }
                return classess;
            });

            console.log(filteredClass)
            classes.students = filteredStudent;
            student.classes = filteredClass;
            await student.save()
            let saveData = await classes.save();
            return {
                code: 200,
                message: "Unroll Classe Success",
                data: saveData,
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
