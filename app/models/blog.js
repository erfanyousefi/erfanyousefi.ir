const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const lessonSchema = new Schema({
    title : {type : String, required : true},
    text : {type : String, required : true},
    img : {type : String, required : true},
    tags : [{type : mongoose.Types.ObjectId, ref : "tag", required : true}],
    category : {type : mongoose.Types.ObjectId, ref : "category", required : true}
}, {
    timestamps : true
})
const chapterSchema = new Schema({
    title : {type : String, required : true},
    episodes : [lessonSchema],
})
const blogSchema = new Schema({
    title : {type : String, required : true},
    text : {type : String, required : true},
    author : {type : mongoose.Types.ObjectId, ref : "user", required : true},
    tags :[ {type : mongoose.Types.ObjectId, ref : "tag", required : true}],
    category : {type : mongoose.Types.ObjectId, ref : "category", required : true},
    img : {type : String, required : true},
    type : {type : String, required : true},
    chapters : [chapterSchema]
}, {
    timestamps : true
})
const blogModel = mongoose.model("blog", blogSchema);
module.exports = blogModel;