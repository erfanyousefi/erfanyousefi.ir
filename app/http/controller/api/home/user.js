const controller = require("app/http/controller/controller")
const userModel = require("app/models/user")
class user extends controller {
    async findUserWithToken(req, res, next) {
        let token = req.body.token;
        if (token) {
            let user = await userModel.findOne({ token });
            if (user) {
                return res.json({
                    status: true,
                    user,
                })
            } else {
                return res.json({
                    status: false,
                    user: null
                })
            }
        } else {
            return res.json({
                status: false,
                user: null
            })
        }
    }
}
module.exports = new user();