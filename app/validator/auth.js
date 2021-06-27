const { body } = require("express-validator");
class authValidator {
    register() {
        return [
            body("name")
            .notEmpty()
            .isLength({ min: 3 })
            .withMessage("نام و نام خانوادگی نمیتواند خالی باشد"),
            body("email")
            .notEmpty()
            .isEmail()
            .withMessage("لطفا ایمیل را با فرمت صحیح وارد کنید"),
            body("password")
            .notEmpty()
            .isLength({ min: 6, max: 16 })
            .withMessage("رمز عبور حداقل 6 و حداکثر 16 کاراکتر باشد")
        ]
    }


}
module.exports = new authValidator();