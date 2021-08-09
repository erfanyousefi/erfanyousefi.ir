const controller = require("app/http/controller/controller")
const contactModel = require("app/models/contactus")
class user extends controller {
    async saveContactUs(req, res, next) {
        let data = {};
        this.fetchDataFromBody(req.body, data);
        if (data.name && data.email && data.message) {
            contactModel.create({...data }, (err, contact) => {
                if (contact) {
                    return res.json({
                        status: true,
                        message: "پیغام شما با موفقیت ثبت شد، در اسرع وقت به پیغام شما از طریق راه ارتباطی که وارد کرده اید جواب خواهم داد"
                    })
                } else {
                    return res.json({
                        status: false,
                        message: "پیغام شما ثبت نشد لطفا بعدا یا مجددا تلاش فرمائید"
                    })
                }
            })
        } else {
            return res.json({
                status: false,
                message: "لطفا تمامی فیلد ها را به درستی پر کنید"
            })
        }
    }
}
module.exports = new user();