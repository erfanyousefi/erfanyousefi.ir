const { Router } = require("express");
const router = Router();
const panelRoutes = require("app/router/api/panel/index")
const authRoutes = require("app/router/api/auth/auth");
const auth = require("../../http/middleware/auth");

router.use("/auth", auth.isLogin, authRoutes);
router.use('/panel', auth.notLogin, panelRoutes)
module.exports = router;