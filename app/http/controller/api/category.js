const categoryModel = require("app/models/category");
const controller = require("app/http/controller/controller");
const { validationResult } = require("express-validator");
let validator = {}
class categoryController extends controller {
    async insert(req, res, next) {
        let result = await validationResult(req);
        if (!result.isEmpty()) {
            validator = {}
            this.errorHandlerValidator(result.errors, validator);
            return res.json({
                status: false,
                msg: {...validator }
            })
        } else {
            let data = {};
            this.fetchDataFromBody(req.body, data);
            categoryModel.create({...data }).then(category => {
                if (category) {
                    return res.json({
                        status: true,
                        message: "افزودن دسته بندی با موفقیت انجام شد"
                    })
                } else {
                    return res.json({
                        status: true,
                        message: "افزودن دسته بندی انجام نشد لطفا بعدا یا مجددا تلاش بفرمائید"
                    })
                }
            })
        }

    }
    async list(req, res, next) {
        const categories = await categoryModel.find({})
        return res.json({
            status: true,
            categories
        })
    }
    async update(req, res, next) {
        const id = req.params.id;
        if (this.isObjectID(id)) {
            let data = {};
            this.fetchDataFromBody(req.body, data)
            await categoryModel.findByIdAndUpdate(id, { $set: {...data } }, (err, category) => {
                if (category) {
                    return res.json({
                        status: true,
                        message: "به روزرسانی با موفقیت انجام شد"
                    })
                }
                return res.json({
                    status: false,
                    message: "به روز رسانی انجام نشد لطفا مجددا یا بعدا تلاش بفرمائید"
                })

            })
        } else {
            return res.json({
                status: false,
                message: "Not-Found"
            })
        }
    }
    async find(req, res, next) {
        const id = req.params.id;
        if (this.isObjectID(id)) {
            const category = await categoryModel.findById(id);
            return res.json({
                status: true,
                category
            })
        } else {
            return res.json({
                status: false,
                message: "Not-Found"
            })

        }
    }
    async remove(req, res, next) {
        const id = req.params.id;
        if (this.isObjectID(id)) {
            await categoryModel.findByIdAndDelete(id, (err, category) => {
                if (category) {
                    return res.json({
                        status: true,
                        message: "حدف با موفقیت انجام شد"
                    })
                } else {
                    return res.json({
                        status: false,
                        message: "حذف انجام نشد لطفا بعدا یا مجددا تلاش بفرمائید"
                    })
                }
            });

        } else {
            return res.json({
                status: false,
                message: "Not-Found"
            })
        }
    }
}

module.exports = new categoryController();