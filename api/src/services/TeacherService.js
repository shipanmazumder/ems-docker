const Teacher = require("../models/Teacher");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");

module.exports = class TeacherService {
    async TeacherCreate(body) {
        try {
            let firstName = body.firstName;
            let lastName = body.lastName;
            let email = body.email;
            let password = body.password;
            let user = await Teacher.findOne({email: email});
            if (user) {
                return {
                    code: 204,
                    message:"Teacher email already exits",
                    data: null
                };
            }
            try {
                let hashPassword = await bcrypt.hash(password, 12);
                password = hashPassword;
                let newTeacher = new Teacher({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password
                });
                let saveTeacher = await newTeacher.save();
                if (saveTeacher) {
                    return {
                        code: 200,
                        message:"Teacher create success",
                        data: saveTeacher
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

    async TeacherLogin(body) {
        try {
            let email = body.email;
            let password = body.password;
            const teacher = await Teacher.findOne({email: email});
            if (!teacher) {
                return {
                    code: 203,
                    message: "Username/Password Invalid",
                    data: null
                };
            }
            const doMatch = await bcrypt.compare(password, teacher.password);
            if (!doMatch) {
                return {
                    code: 203,
                    message: "Username/Password Invalid",
                    data: null
                };
            }
            let token = this.generateJwtToken(teacher);
            return {
                status: true,
                code: 200,
                token: `${token}`,
                message: "Login Success",
                data: teacher,
            };
        } catch (e) {
            return {
                code: 500,
                message: e.message,
                data: null
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
                    type: "Teacher",
                    firstName: user.firstName,
                    lastName: user.lastName,
                    id: user._id
                },
            },
            privateKey,
            {
                algorithm: "RS256",
                expiresIn: "720h",
            }
        );
        return `Bearer ${token}`;
    };
};
