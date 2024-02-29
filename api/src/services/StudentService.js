const Student = require("../models/Student");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");

module.exports = class StudentService {
    async StudentCreate(body) {
        try {
            let firstName = body.firstName;
            let lastName = body.lastName;
            let email = body.email;
            let password = body.password;
            let user = await Student.findOne({email: email});
            if (user) {
                return {
                    code: 204,
                    message: "Student email already exits",
                    data: null
                };
            }
            try {
                let hashPassword = await bcrypt.hash(password, 12);
                password = hashPassword;
                let newStudent = new Student({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password
                });
                let saveStudent = await newStudent.save();
                if (saveStudent) {
                    return {
                        code: 200,
                        message: "Student create success",
                        data: saveStudent
                    };
                }

            } catch (e) {
                return {
                    code: 500,
                    message: e.message,
                    data: null
                };
            }
        } catch (e) {
            return {
                code: 500,
                message: e.message,
                data: null
            };
        }
    }

    async StudentLogin(body) {
        try {
            let email = body.email;
            let password = body.password;
            const student = await Student.findOne({email: email});
            if (!student) {
                return {
                    code: 203,
                    message: "Username/Password Invalid",
                    data: null
                };
            }
            const doMatch = await bcrypt.compare(password, student.password);
            if (!doMatch) {
                return {
                    code: 203,
                    message: "Username/Password Invalid",
                    data: null
                };
            }
            let token = this.generateJwtToken(student);
            return {
                status: true,
                code: 200,
                token: `${token}`,
                message: "Login Success",
                data: student,
            };
        } catch (e) {
            return {
                code: 500,
                message: e.message,
                data: null
            };
        }

    }

    async EnrollClassList(studentId) {
        try {
            let student = await Student.findOne({_id: studentId})
                .sort([['createdAt', -1]])
                // .populate("classes.classId",'_id className classCode sectionName subjectName subjectCode students');
                .populate({
                    path: 'classes.classId',
                    select: '_id className classCode sectionName subjectName subjectCode students',
                    populate: {
                        path: 'teacherId',
                        model: 'Teacher',
                        select: 'firstName lastName'
                    },
                    match:{"classes.isActive":true}
                })
            let classes = student.classes;

            if (classes.length <= 0) {
                return {
                    code: 404,
                    message: "No Classes Found",
                    data: null,
                };
            }
            let modifyClasses = classes.filter((c) => {
                    if(c.isActive){
                        return c;
                    }
                })
            let newClasses = [];
            modifyClasses.map((c) => {
                newClasses.push(c.classId);
            });
            return {
                code: 200,
                message: "All Enrolled Class",
                data: newClasses,
            };
        } catch (e) {
            return {
                code: 500,
                message: e.message,
                data: null,
            };
        }
    }
    async ArchiveClassList(studentId) {
        try {
            let student = await Student.findOne({_id: studentId})
                .sort([['updatedAt', -1]])
                // .populate("classes.classId",'_id className classCode sectionName subjectName subjectCode students');
                .populate({
                    path: 'classes.classId',
                    select: '_id className classCode sectionName subjectName subjectCode students',
                    populate: {
                        path: 'teacherId',
                        model: 'Teacher',
                        select: 'firstName lastName'
                    },
                    match:{"classes.isActive":true}
                })
            let classes = student.classes;

            if (classes.length <= 0) {
                return {
                    code: 404,
                    message: "No Classes Found",
                    data: null,
                };
            }
            let modifyClasses = classes.filter((c) => {
                    if(!c.isActive){
                        return c;
                    }
                })
            let newClasses = [];
            modifyClasses.map((c) => {
                newClasses.push(c.classId);
            });
            return {
                code: 200,
                message: "All Enrolled Class",
                data: newClasses,
            };
        } catch (e) {
            return {
                code: 500,
                message: e.message,
                data: null,
            };
        }
    }

    /**
     * generate jwt token for login auth
     * @param {*} player
     * @return jwt token
     */
    generateJwtToken = (user) => {
        var privateKey = fs.readFileSync('./jwtRS256.key');
        var token = jsonwebtoken.sign(
            {
                data: {
                    email: user.email,
                    type: "Student",
                    firstName: user.firstName,
                    lastName: user.lastName,
                    id: user._id
                },
            },
            privateKey,
            {
                // algorithm: "RS256",
                expiresIn: "720h",
            }
        );
        return `Bearer ${token}`;
    };
};
