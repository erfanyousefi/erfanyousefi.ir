const controller = require("app/http/controller/controller");
const userModel = require("app/models/user");
class userController extends controller {
    async updateProfile(req, res, next) {
        const id = req.user._id;
        const user = await userModel.findById(id);
        if (user) {
            let data = {}
            this.fetchDataFromBody(req.body, data);
            Object.keys(data).forEach(key => {
                if (["password", "username", "email"].includes(key)) {
                    delete data[key]
                } else {
                    user[key] = data[key]
                    console.log(key);
                }
            });
            // console.log(user);
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
    async find(req, res, next) {

    }
}
module.exports = new userController();