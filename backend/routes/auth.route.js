const router = require("express").Router();
const controller = require("../controllers/auth.controller");

router.post("/register", controller.register); //done
router.post("/login", controller.login); //done
router.post("/refresh-token", controller.refreshToken); //done
router.post("/logout", controller.logout); //done
router.post("/forgot-password", controller.forgotPassword);
router.post("/reset-password", controller.resetPassword);

module.exports = router;