const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const fs = require("fs");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");

module.exports = class Passport {
    initialize(passport) {
        var privateKey = fs.readFileSync("./jwtRS256.key");
        const opts = {};
        opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
        opts.secretOrKey = privateKey;
        passport.use("teacher",
            new JwtStrategy(opts, (payload, done) => {
                switch (payload.data.type) {
                    case "Teacher":
                        Teacher.findOne({_id: payload.data.id})
                            .then((teacher) => {
                                if (!teacher) {
                                    return done(null, false);
                                } else {
                                    return done(null, teacher);
                                }
                            })
                            .catch((error) => {
                                return done(error);
                            });
                        break;
                    default:
                        return done(null, false);
                        break;
                }
            })
        );
        passport.use("student",
            new JwtStrategy(opts, (payload, done) => {
                switch (payload.data.type) {
                    case "Student":
                         Student.findOne({_id: payload.data.id})
                            .then((student) => {
                                if (!student) {
                                    return done(null, false);
                                } else {
                                    return done(null, student);
                                }
                            })
                            .catch((error) => {
                                return done(error);
                            });
                        break;
                    default:
                        return done(null, false);
                        break;
                }
            })
        );
    }
};
