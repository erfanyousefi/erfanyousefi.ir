const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: false, default: "" },
    avatar: { type: String, required: false, default: "" },
    address: { type: String, required: false, default: "" },
    bio: { type: String, required: false, default: "" },
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