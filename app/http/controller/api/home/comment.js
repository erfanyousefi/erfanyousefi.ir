const commentModel = require("app/models/comment");
const controller = require("app/http/controller/controller");
const { validationResult } = require("express-validator");
let validator = {}
class commentController extends controller {
    async insert(req, res, next) {
        let data = {};
        this.fetchDataFromBody(req.body, data);
        if (!data.text || data.text.length < 5) {
            return res.json({
                status: false,
                message: "متن نظر نمیتواند خالی یا کمتر از 5 کاراکتر باشد"
            })
        } else {
            data.user = req.user._id;
            data.show = false;
            if (data.blog && this.isObjectID(data.blog)) {
                if (data.course) {
                    delete data.course
                }
                this.insertMethod(data, res)
            } else if (data.course && this.isObjectID(data.course)) {
                if (data.blog) {
                    delete data.blog
                }
                this.insertMethod(data, res)
            } else {
                this.insertMethod(data, res)
            }
        }



    }
    async insertMethod(data, res) {
        await commentModel.create({...data }).then(comment => {
            if (comment) {
                return res.json({
                    status: true,
                    message: "نظر شما با موفقیت ثبت شد پس از تایید نمایش داده خواهد شد"
                })
            } else {
                return res.json({
                    status: false,
                    message: "نظر شما ثبت نشد لطفا مجددا تلاش کنید"
                })
            }
        })
    }
    async comments(req, res, next) {
        let id = req.params.id;
        let flag = req.params.flag;
        if (this.isObjectID(id)) {
            if (flag == "blog") {
                // let comments = await commentModel.find({ blog: id }).populate([{ path: "user", select: { email: 1, name: 1 } }, { path: "children", populate: [{ path: "children" }, { path: "user", select: { email: 1, name: 1 } }] }])
                let comments = await commentModel.find({ blog: id }).populate("comment").sort({ createdAt: -1 })
                return res.json({
                    status: true,
                    comments
                })
            } else if (flag == " course") {
                let comments = await commentModel.find({ course: id }).populate([{ path: "user", select: { email: 1, name: 1 } }, { path: "children", populate: { path: "children" } }])
                return res.json({
                    status: true,
                    comments
                })
            } else {
                return res.json({
                    status: true,
                    comments: [],
                    message: "flag-not-fount"
                })
            }
        } else {
            return res.json({
                status: true,
                comments: [],
                message: "id-not-fount"
            })
        }

    }
}

module.exports = new commentController();