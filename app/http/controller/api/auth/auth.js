const controller = require("app/http/controller/controller");
const userModel = require("app/models/user");
const { validationResult } = require("express-validator");
let validator = {}
class authController extends controller {
    async register(req, res, next) {

        let result = await validationResult(req);
        if (!result.isEmpty()) {
            validator = {}
            this.errorHandlerValidator(result.errors, validator)
            return res.json({
                status: false,
                msg: {...validator }
            })
        } else {
            let data = {};
            this.fetchDataFromBody(req.body, data);
            const user = await userModel.findOne({ username: data.username })
            if (user) {
                return res.json({
                    status: false,
                    message: "نام کاربری تکراری میباشد لطفا یک نام کاربری دیگر را برگزینید"
                })
            } else {
                data.password = await this.hashString(data.password);
                userModel.create({...data }, async(err, user) => {
                    if (user) {
                        const token = await this.jwtGenerator(user, 3);
                        user.token = token;
                        user.save().then(user => {
                            return res.json({
                                status: true,
                                message: "ایجاد حساب با موفقیت انجام شد",
                                token: user.token,
                            })
                        })
                    } else {
                        return res.json({
                            status: false,
                            err,
                            message: "ایجاد حساب انجام نشد لطفا مجددا یا بعدا تلاش کنید "
                        })
                    }
                });
            }
        }
    }
    async login(req, res, next) {
        let result = await validationResult(req);
        if (!result.isEmpty()) {
            validator = {}
            this.errorHandlerValidator(result.errors, validator)
            return res.json({
                status: false,
                msg: {...validator }
            })
        } else {
            let data = {};
            this.fetchDataFromBody(req.body, data);
            let user = await userModel.findOne({ username: data.username });
            if (user) {
                const match = this.compareHashString(data.password, user.password);
                if (match) {
                    const token = await this.jwtGenerator(user, 3);
                    user.token = token;
                    user.save().then(user => {
                        return res.json({
                            status: true,
                            message: "ورود به حساب با موفقیت انجام شد",
                            token: user.token,
                        })
                    })
                } else {
                    return res.json({
                        status: false,
                        message: "نام کاربری یا رمز عبور اشتباه میباشد لطفا در وارد کردن اطلاعات دقت فرمائید"
                    })
                }
            } else {
                return res.json({
                    status: false,
                    message: "نام کاربری یا رمز عبور اشتباه میباشد لطفا در وارد کردن اطلاعات دقت فرمائید"
                })
            }
        }
    }
}

module.exports = new authController();