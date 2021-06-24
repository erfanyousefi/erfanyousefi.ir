const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: { type: String, required: false },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: false },
    password: { type: String, required: true },
    phone: { type: String, required: false },
    role: { type: String, required: true, default: "user" },
    courses: [{ type: mongoose.Types.ObjectId, ref: "course" }],
    courseArchive: [{ type: mongoose.Types.ObjectId, ref: "course" }],
    blogArchive: [{ type: mongoose.Types.ObjectId, ref: "blog" }],
    token: { type: String, required: false }
}, {
    timestamps: true
})

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;