const mongoose = require("mongoose");
const ClassModel=require("./ClassModel");

const Schema = mongoose.Schema;

const classes = new Schema(
    {
        classId: {
            type: Schema.Types.ObjectId,
            ref: 'ClassModel',
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

const studentSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        classes:[classes],
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

studentSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.password
    return obj;
};
module.exports = mongoose.model("Student", studentSchema);
