const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const commentSchema = new Schema({
    user: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    text: { type: String, required: true },
    blog: { type: mongoose.Types.ObjectId, ref: "blog", default: undefined },
    course: { type: mongoose.Types.ObjectId, ref: "course", default: undefined },
    show: { type: Boolean, default: false },
    parent: { type: mongoose.Types.ObjectId, ref: "comment", default: undefined }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
})
commentSchema.virtual("children", {
    ref: "comment",
    localField: "_id",
    foreignField: "parent"
})
const autoPopulateComment = function(next) {
    this.populate([{ path: "children", match: { show: true } }, { path: "user", select: { email: 1, name: 1, avatar: 1 } }]);
    next()
}
commentSchema.pre('findOne', autoPopulateComment).
pre('find', autoPopulateComment);
const commentModel = mongoose.model("comment", commentSchema);
module.exports = commentModel;