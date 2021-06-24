const { body } = require("express-validator");
class authValidator {
    register() {
        return [
            body("username")
            .notEmpty()
            .isLength({ min: 4 })
            .withMessage("نام کاربری حداقل 4 و حداکثر 30 کاراکتر باشد"),
            body("password")
            .notEmpty()
            .isLength({ min: 6, max: 16 })
            .withMessage("رمز عبور حداقل 6 و حداکثر 16 کاراکتر باشد")
        ]
    }


}
module.exports = new authValidator();