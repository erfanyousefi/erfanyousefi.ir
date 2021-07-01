const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");
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
        price: { type: Number, required: true },
        discount: { type: Number, required: true },
        slug: { type: String, required: false },
        totalTime: { type: String, required: false },
        chapters: [chapterSchema]
    }, {
        timestamps: true,
        toJSON: {
            virtuals: true
        }
    })
    // courseSchema.pre("find", function() {
    //     this.chapters.forEach(chapter => {
    //         course.totalTime = this.getTime(chapter.episodes)
    //         console.log(course.totalTime);
    //     })
    // })
courseSchema.virtual("teachers", {
    ref: "user",
    localField: "_id",
    foreignField: "teacher",
})
courseSchema.virtual("tag", {
    ref: "tag",
    localField: "_id",
    foreignField: "tags",
})
courseSchema.virtual("categories", {
    ref: "category",
    localField: "_id",
    foreignField: "category",
})
const courseModel = mongoose.model("course", courseSchema);
module.exports = courseModel;