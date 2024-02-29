const passport = require('passport')


module.exports= class AuthCheck{
    static isTeacherAuth(req,res,next){
        passport.authenticate('teacher', (err, user, info) => {
            console.log("user")
            if (err) {
                console.log("Error")
                console.log(info)
                console.log(err)
                return next(err)
            }
            if (!user) {
                let data={
                    "status":false,
                    "code":401,
                    "message":"Unuthorized",
                    "data":null
                }
                return res.status(401).json(data);
            }
            req.user = user
            return next()
        })(req, res, next)
    }

    static isStudentAuth(req,res,next){
        passport.authenticate('student', (err, user, info) => {
            if (err) {
                console.log("Error")
                console.log(info)
                console.log(err)
                return next(err)
            }
            if (!user) {
                let data={
                    "status":false,
                    "code":401,
                    "message":"Unuthorized",
                    "data":null
                }
                return res.status(401).json(data);
            }

            req.user = user
            return next()
        })(req, res, next)
    }
}