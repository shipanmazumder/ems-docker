const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const options = new Schema(
    {
        option: {
            type: String
        }
    }
);
const student = new Schema(
    {
        studentId: {
            type: Schema.Types.ObjectId,
            ref: 'Student',
        },
        examMarks: {
            type: String
        }
    }
);
const questions = new Schema(
    {
        title: {
            type: String
        },
        options: [options],
        answer: {
            type: String
        },
    }
);
const examSchema = new Schema(
    {
        teacherId: {
            type: Schema.Types.ObjectId,
            ref: 'Teacher',
            required: true
        },
        classId: {
            type: Schema.Types.ObjectId,
            ref: 'ClassModel',
            required: true
        },
        examId: {
            type: String,
            required: true
        },
        examName: {
            type: String,
            required: true,
        },
        perQuestionMark: {
            type: Number,
            required: true,
        },
        examMarks: {
            type: String,
            required: true,
        },
        startExamDate: {
            type: Date,
            required: true,
        },
        endExamDate: {
            type: Date,
            required: true,
        },
        // startExamTime: {
        //     type: Date,
        //     required: true,
        // },
        // endExamTime: {
        //     type: String,
        //     required: true,
        // },
        isActive: {
            type: Boolean,
            default:true
        },
        questions: [questions],
        students: [student]
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("Exam", examSchema);
