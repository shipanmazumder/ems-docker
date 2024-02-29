const ClasService = require("../services/ClassService");
const StudentService = require("../services/StudentService");
const {v4: uuidv4} = require("uuid");
const {getValueByKey,setKeyValue,delCacheKey} = require('../config/cache');
const {
    validationResponse,
    successResponse,
    nextError,
    getResultFormat
} = require("../util/ResponseUtill");
const classService = new ClasService();
const studentService = new StudentService();

const {uploadFile} = require("../s3");
const { json } = require("body-parser");

exports.classCreate = async (req, res, next) => {
    try {
        let error = validationResponse(res, req)
        if (error != null) {
            return error
        }
        let cacheKey=`class_${req.user._id}`;
        let result = await classService.ClassCreate(req.body, req.user._id);
        delCacheKey(cacheKey)
        return getResultFormat(res, next, result);
    } catch (err) {
        nextError(next, err.message)
    }
};

exports.ClassMaterial = async (req, res, next) => {
    try {
        // let filename=req.file;
        
        let myFile = req.file.originalname.split(".");
        const fileType = myFile[myFile.length - 1];
        // console.log(req.file.originalname);
        // const filename = `${uuidv4()}.${fileType}`;
        const filename = req.file.originalname;
        try {
            let fileUpload = await uploadFile(req.file, filename);
            console.log(fileUpload.Key)
            let teacherId = req.user._id;
            let classCode = req.body.classCode;
            let result = await classService.ClassMaterial(req, fileUpload, teacherId, classCode);
            if (result.code == 200) {
                let singleClass = await classService.SingleClass(teacherId, classCode);

                return getResultFormat(res, next, singleClass)
            }
            return getResultFormat(res, next, result)
        } catch (err) {
            nextError(next, err.message);
        }

    } catch
        (err) {
        nextError(next, err.message);
    }
}

exports.classList = async (req, res, next) => {
    try {
        let teacherId = req.user._id;
        let cacheKey=`class_${teacherId}`;
        let result=await getValueByKey(cacheKey);
        if(result)
        {
            console.log("Data from Cache")
            return getResultFormat(res, next, JSON.parse(result))    
        }
         result = await classService.ClassList(teacherId);
         if(result.code==200)
         {
            console.log("Data Save Cache")
            await setKeyValue(cacheKey, JSON.stringify(result));
         }
         
         console.log("Data from DB")
        return getResultFormat(res, next, result)

    } catch
        (err) {
        nextError(next, err.message);
    }
}
exports.singleClass = async (req, res, next) => {
    try {
        let teacherId = req.user._id;
        let classCode = req.query.classCode;
        let result = await classService.SingleClass(teacherId, classCode);
        return getResultFormat(res, next, result)

    } catch
        (err) {
        nextError(next, err.message);
    }
}
exports.studentSingleClass = async (req, res, next) => {
    try {
        let studentId = req.user._id;
        let classCode = req.query.classCode;
        let result = await classService.StudentSingleClass(studentId, classCode);
        return getResultFormat(res, next, result)

    } catch
        (err) {
        nextError(next, err.message);
    }
}
exports.ClassEnroll = async (req, res, next) => {
    try {
        let studentId = req.user._id;
        let classCode = req.body.classCode;
        let result = await classService.ClassEnroll(req.user, studentId, classCode);
        return getResultFormat(res, next, result)

    } catch
        (err) {
        nextError(next, err.message);
    }
}
exports.ClassReEnroll = async (req, res, next) => {
    try {
        let studentId = req.user._id;
        let classCode = req.body.classCode;
        let result = await classService.ClassReEnroll(req.user, studentId, classCode);
        if (result.code == 200) {
            let enrollCLass = await studentService.ArchiveClassList(studentId);

            return getResultFormat(res, next, enrollCLass)
        }
        return getResultFormat(res, next, result)

    } catch
        (err) {
        nextError(next, err.message);
    }
}
exports.ClassUnroll = async (req, res, next) => {
    try {
        let studentId = req.user._id;
        let classCode = req.query.classCode;
        let result = await classService.ClassUnroll(req.user, studentId, classCode);
        if (result.code == 200) {
            let enrollCLass = await studentService.EnrollClassList(studentId);

            return getResultFormat(res, next, enrollCLass)
        }
        return getResultFormat(res, next, result)

    } catch
        (err) {
        nextError(next, err.message);
    }
}