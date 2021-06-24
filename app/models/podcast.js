const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const podcastSchema = new Schema({
    title : {type : String, required : true},
    text : {type : String, required : true},
    img : {type : String, required : false},
    recorder : {type : mongoose.Types.ObjectId, ref : "user", required : true},
    audio : {type : String, required : true},
})

const podcastModel = mongoose.model("podcast", podcastSchema);
module.exports = categoryModel;