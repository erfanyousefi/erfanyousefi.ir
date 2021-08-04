const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const paymentSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true
    },
    course: {
        type: mongoose.Types.ObjectId,
        ref: "course",
        default: null
    },
    price: {
        type: Number,
        required: true
    },
    payment: {
        type: Boolean,
        default: false
    },
    paymentResult: {
        type: String,
        default: null
    },

}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});
paymentSchema.virtual("courses", {
    ref: "course",
    localField: "_id",
    foreignField: "course"
})
const paymentModel = mongoose.model("payment", paymentSchema);
module.exports = paymentModel;