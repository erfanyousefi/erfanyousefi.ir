const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const postSchema = new Schema({
    title : {type : String, required : true},
    text : {type : String, required : true},
    img : {type : String, required : true},
    author : {type : mongoose.Types.ObjectId, ref : "user", required : true},
    category : {type : mongoose.Types.ObjectId, ref : "category", required : true},
    tags : [{type : mongoose.Types.ObjectId, ref : "tag", required : true}],
})

const postModel = mongoose.model("post", postSchema);
module.exports = categoryModel;