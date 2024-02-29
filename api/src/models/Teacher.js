const mongoose = require("mongoose");



const Schema = mongoose.Schema;

const classes = new Schema(
    {
        classId: {
            type: Schema.Types.ObjectId,
            ref: "ClassModel",
        }
    },
    {
        timestamps: true,
    }
);

const teacherSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        classes: [classes],
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
            required: true
        },
    },
    {
        timestamps: true,
    }
);

teacherSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.password
    return obj;
};
module.exports = mongoose.model("Teacher", teacherSchema);
