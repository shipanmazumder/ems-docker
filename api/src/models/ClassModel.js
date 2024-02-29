const mongoose = require("mongoose");
const Teacher =require("../models/Teacher")
const Student =require("../models/Student")

const Schema = mongoose.Schema;
const students = new Schema(
    {
        studentId: {
            type: Schema.Types.ObjectId,
            ref: 'Student',
        },
        isActive: {
            type: Boolean,
            default:true
        }
    },
    {
        timestamps: true,
    }
);
const classMaterial = new Schema(
    {
        name: {
            type: String
        },
        fileUrl: {
            type: String
        },
        key: {
            type: String
        }
    },
    {
        timestamps: true,
    }
);

const classSchema = new Schema(
    {
        teacherId: {
            type: Schema.Types.ObjectId,
            ref: 'Teacher',
            required: true
        },
        students: [students],
        classMaterials:[classMaterial],
        classCode: {
            type: String,
            required: true
        },
        subjectName: {
            type: String,
            required: true,
        },
        subjectCode: {
            type: String,
            required: true,
        },
        batchNumber: {
            type: String
        }
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("ClassModel", classSchema);
