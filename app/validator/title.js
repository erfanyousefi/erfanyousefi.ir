const { body } = require("express-validator");
class titleValidator {
    insert() {
        return [
            body("title")
            .notEmpty()
            .withMessage("عنوان نمیتواند خالی باشد")
        ]
    }


}
module.exports = new titleValidator();