const commentModel = require("app/models/comment");
const controller = require("app/http/controller/controller");
const { validationResult } = require("express-validator");
let validator = {}
class commentController extends controller {
    async comments(req, res, next) {
        // let comments = await commentModel.find({ blog: id }).populate([{ path: "user", select: { email: 1, name: 1 } }, { path: "children", populate: [{ path: "children" }, { path: "user", select: { email: 1, name: 1 } }] }])
        let comments = await commentModel.find({}).populate([{ path: 'comment' }, { path: 'parent', select: { title: 1 } }, { path: 'blog', select: { title: 1 } }, { path: 'course', select: { title: 1 } }]).sort({ createdAt: -1 })
        return res.json({
            status: true,
            comments
        })
    }
}

module.exports = new commentController();