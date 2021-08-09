const { body } = require("express-validator");
const path = require("path");
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
            body("img").custom((value) => {
                if (value) {
                    let ext = path.extname(value);
                    let exts = ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg'];
                    if (exts.includes(ext)) {
                        return true
                    } else {
                        throw new Error("فرمت تصویر باید یکی از فرمت های '.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg' باشد")
                    }
                } else {
                    throw new Error("لطفا یک تصویر را انتخاب نمایید")
                }
            })
        ]
    }
    insertChapter() {
        return [
            body("title")
            .notEmpty()
            .withMessage("عنوان نمیتواند خالی باشد")
        ]
    }
    insertLesson() {
        return [
            body("title")
            .notEmpty()
            .withMessage("عنوان نمیتواند خالی باشد"),
            body("text")
            .notEmpty()
            .withMessage("متن بخش نمیتواند خالی باشد"),
            body("tags")
            .notEmpty()
            .withMessage("حداقل یک برچسب را انتخاب کنید"),
            body("category")
            .notEmpty()
            .withMessage("یک دسته بندی را انتخاب کنید"),
            body("img").custom((value, req) => {
                if (value) {
                    let ext = path.extname(value);
                    let exts = ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg'];
                    if (exts.includes(ext)) {
                        return true
                    } else {
                        throw new Error("فرمت تصویر باید یکی از فرمت های '.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg' باشد")
                    }
                } else {
                    throw new Error("لطفا یک تصویر را انتخاب کنید")
                }
            })
        ]
    }

}
module.exports = new courseValidator();