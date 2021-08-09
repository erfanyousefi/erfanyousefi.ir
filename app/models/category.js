const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const categorySchema = new Schema({
    title: { type: String, required: true }
})

const categoryModel = mongoose.model("category", categorySchema);
module.exports = categoryModel;