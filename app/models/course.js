const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const episodeSchema = new Schema({
    number: { type: Number, required: true },
    title: { type: String, required: true },
    time: { type: String, required: true },
    type: { type: String, required: true },
    file: { type: String, required: true }
}, {
    timestamps: true
})
const chapterSchema = new Schema({
    title: { type: String, required: true },
    episodes: [episodeSchema],
})
const courseSchema = new Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    teacher: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    tags: [{ type: mongoose.Types.ObjectId, ref: "tag", required: true }],
    category: { type: mongoose.Types.ObjectId, ref: "category", required: true },
    img: { type: String, required: true },
    type: { type: String, required: true },
    chapters: [chapterSchema]
}, {
    timestamps: true
})
const courseModel = mongoose.model("course", courseSchema);
module.exports = courseModel;