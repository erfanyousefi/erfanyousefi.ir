const controller = require("app/http/controller/controller")
const userModel = require("app/models/user");
class auth extends controller {
    async autoLogin(req, res, next) {

        const token = this.fetchBearer(req);
        if (token) {
            const user = await userModel.findOne({ token });
            if (user) {
                req.user = user;
                req.isAuthenticated = () => {
                    return true
                }
            } else {
                req.user = null;
                req.isAuthenticated = () => {
                    return false
                }
            }
        } else {
            req.user = null;
            req.isAuthenticated = () => {
                return false
            }
        }
        next()
    }
    notLogin(req, res, next) {
        if (req.isAuthenticated()) {
            next();
        } else {
            return res.json({
                status: false,
                access: false,
                logined: false,
                message: "شما باید ابتدا وارد حساب کاربری خود شوید"
            })
        }
    }
    isLogin(req, res, next) {
        if (req.isAuthenticated()) {
            return res.json({
                status: false,
                access: false,
                logined: true
            })
        } else {
            next();
        }
    }
}
module.exports = new auth();