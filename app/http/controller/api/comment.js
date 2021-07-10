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
    async ignoreComment(req, res, next) {
        let id = req.params.id
        if (this.isObjectID(id)) {
            let comment = await commentModel.findById(id);
            if (comment) {
                comment.show = false;
                comment.save().then(response => {
                    if (response) {
                        return res.json({
                            status: true,
                            message: "نظر با موفقیت رد شد"
                        })
                    } else {
                        return res.json({
                            status: false,
                            message: "رد کردن نظر انجام نشد لطفا مجددا سعی کنید"
                        })
                    }
                })
            } else {
                return res.json({
                    status: false,
                    message: "نظری یافت نشد"
                })
            }
        } else {
            return res.json({
                status: false,
                message: "not-found"
            })
        }
    }
    async acceptComment(req, res, next) {
        let id = req.params.id
        if (this.isObjectID(id)) {
            let comment = await commentModel.findById(id);
            if (comment) {
                comment.show = true;
                comment.save().then(response => {
                    if (response) {
                        return res.json({
                            status: true,
                            message: "نظر با موفقیت تایید شد"
                        })
                    } else {
                        return res.json({
                            status: false,
                            message: "تایید نظر انجام نشد لطفا مجددا سعی کنید"
                        })
                    }
                })
            } else {
                return res.json({
                    status: false,
                    message: "نظری یافت نشد"
                })
            }
        } else {
            return res.json({
                status: false,
                message: "not-found"
            })
        }
    }
    async deleteComment(req, res, next) {
        let id = req.params.id
        if (this.isObjectID(id)) {
            await commentModel.findByIdAndDelete(id, (err, comment) => {
                if (comment) {
                    return res.json({
                        status: true,
                        message: "حذف نظر با موفقیت حذف شد"
                    })
                } else {
                    return res.json({
                        status: false,
                        message: "حذف نظر انجام نشد لطفا مجددا سعی کنید"
                    })
                }
            })
        } else {
            return res.json({
                status: false,
                message: "not-found"
            })
        }
    }
}

module.exports = new commentController();