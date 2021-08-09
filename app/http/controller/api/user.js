const controller = require("app/http/controller/controller");
const userModel = require("app/models/user");
class userController extends controller {
    async updateProfile(req, res, next) {
        const id = req.params.id;
        const user = await userModel.findById(id);

        if (user) {
            let data = {}
            this.fetchDataFromBody(req.body, data);
            if (req.file) {
                data.avatar = this.checkReqFile(req.file);
            }
            Object.keys(data).forEach(key => {
                if (["password", "email", "role"].includes(key)) {
                    delete data[key]
                } else {
                    user[key] = data[key]
                }

                if (data[key] == undefined || data[key] == null || data[key] == "undefined" || data[key] == "null") {
                    data[key] = "";
                }
            });
            user.save().then(user => {
                if (user) {
                    return res.json({
                        status: true,
                        message: "به روزرسانی با موفقیت انجام شد"
                    })
                } else {
                    return res.json({
                        status: false,
                        message: "به روزرسانی انجام نشد لطفا بعدا یا مجددا تلاش کنید"
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
    async updateProfileLogined(req, res, next) {
        const id = req.user._id;
        const user = await userModel.findById(id)
        if (user) {
            let data = {}
            this.fetchDataFromBody(req.body, data);
            if (req.file) {
                data.avatar = this.checkReqFile(req.file);
            }
            Object.keys(data).forEach(key => {
                if (["password", "email", "role"].includes(key)) {
                    delete data[key]
                } else {
                    user[key] = data[key]
                }
                if (data[key] == undefined || data[key] == null || data[key] == "undefined" || data[key] == "null") {
                    data[key] = "";
                }
            });
            user.save().then(user => {
                if (user) {
                    return res.json({
                        status: true,
                        message: "به روزرسانی با موفقیت انجام شد"
                    })
                } else {
                    return res.json({
                        status: false,
                        message: "به روزرسانی انجام نشد لطفا بعدا یا مجددا تلاش کنید"
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
    async list(req, res, next) {
        const users = await userModel.find({})
        return res.json({
            status: true,
            users
        })
    }
    async remove(req, res, next) {
        let id = req.params.id;
        if (this.isObjectID(id)) {
            await userModel.findByIdAndDelete(id, (err, user) => {
                if (user) {
                    return res.json({
                        status: true,
                        message: "حذف کاربربا موفقیت انجام شد"
                    });
                } else {
                    return res.json({
                        status: false,
                        message: "حذف انجام نشد"
                    })
                }
            })
        } else {
            return res.json({
                status: "false",
                message: "Not-Found"
            })
        }
    }
    async find(req, res, next) {
        let id = req.params.id;
        if (this.isObjectID(id)) {
            let user = await userModel.findById(id);
            if (user) {
                return res.json({
                    status: true,
                    user
                });
            } else {
                return res.json({
                    status: false,
                    message: "کاربری یافت نشد"
                })
            }
        } else {
            return res.json({
                status: "false",
                message: "Not-Found"
            })
        }
    }
    async updatePassword(req, res, next) {
        let { password, newPassword, confirmNewPassword } = req.body;
        let id = req.user._id;
        let user = await userModel.findById(id);
        if (user) {
            // let hashedPasswird = this.hashString(password);
            const match = this.compareHashString(password, user.password);
            if (match) {
                user.password = this.hashString(newPassword);
                user.save().then(response => {
                    if (response) {
                        return res.json({
                            status: true,
                            message: "تغییر رمز عبور با موفقیت انجام شد"
                        })
                    } else {
                        return res.json({
                            status: false,
                            message: "تغییر رمز عبور انجام نشد لطفا بعدا یا مجددا تلاش کنید"
                        })
                    }
                })
            } else {
                return res.json({
                    status: false,
                    message: "رمز عبور فعلی را اشتباه وارد کرده اید لطفا در وارد کردن رمز عبور دقت کنید"
                })
            }
        } else {
            return res.json({
                status: false,
                message: "not-found"
            })
        }
    }
    async userLogined(req, res, next) {
        const id = req.user._id;
        const user = await userModel.findById(id).populate({ path: "courses", populate: { path: 'teacher' } })
        if (user) {
            user.courses.forEach(course => {
                course.totalTime = this.getTime(course.chapters)
            })
            return res.json({
                status: true,
                user
            })
        } else {
            return res.json({
                status: false,
                message: "not-found"
            })
        }
    }
}
module.exports = new userController();