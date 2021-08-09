const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const tagSchema = new Schema({
    title: { type: String, required: true }
})

const tagModel = mongoose.model("tag", tagSchema);
module.exports = tagModel;