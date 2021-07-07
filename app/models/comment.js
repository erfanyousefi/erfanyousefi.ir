const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const commentSchema = new Schema({
    user: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    text: { type: String, required: true },
    blog: { type: mongoose.Types.ObjectId, ref: "blog", default: undefined },
    course: { type: mongoose.Types.ObjectId, ref: "course", default: undefined },
    show: { type: Boolean, default: false },
    parent: { type: mongoose.Types.ObjectId, ref: "comment", default: undefined }
})
const commentModel = mongoose.model("comment", commentSchema);
module.exports = commentModel;