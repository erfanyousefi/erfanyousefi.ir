const { body } = require("express-validator");
class courseValidator {
    insert() {
        return [
            body("title")
            .notEmpty()
            .withMessage("عنوان نمیتواند خالی باشد"),
            body("text")
            .notEmpty()
            .withMessage("توضیحات نمیتواند خالی باشد"),
            body("tags")
            .notEmpty()
            .withMessage("حداقل یک برچسب را باید انتخاب کنید"),
            body("category")
            .notEmpty()
            .withMessage("یک دسته بندی را انتخاب کنید"),
            body("type")
            .notEmpty()
            .withMessage("نوع دوره نمیتواند خالی باشد")
        ]
    }
    insertChapter() {
        return [
            body("title")
            .notEmpty()
            .withMessage("عنوان نمیتواند خالی باشد")
        ]
    }
    insertEpisode() {
        return [
            body("title")
            .notEmpty()
            .withMessage("عنوان نمیتواند خالی باشد"),
            body("time")
            .custom(value => {
                if (value) {
                    let time = value.split(':');
                    if (time.length === 3) {
                        time.forEach(t => {
                            t = Number(t)
                            if (isNaN(t)) {
                                throw new Error("لطفا زمان را با فرمت درست (hh:mm:ss)  وارد کنید")
                            }
                        })
                    } else {
                        throw new Error("لطفا زمان را با فرمت درست (hh:mm:ss)  وارد کنید")
                    }
                } else {
                    throw new Error("لطفا زمان اپیزود را بر اساس  hh:mm:ss وارد کنید")
                }
                return true;
            }),
            body("number")
            .notEmpty()
            .withMessage("شماره اپیزود را وارد کنید"),
            body("type")
            .notEmpty()
            .withMessage("نوع اپیزود نمیتواند خالی باشد")
        ]
    }

}
module.exports = new courseValidator();