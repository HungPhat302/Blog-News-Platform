const router = require("express").Router();
const controller = require("../controllers/auth.controller");
const { registerValidator, loginValidator } = require("../validators/auth.validator");
const validate = require("../middlewares/validate.middleware")

router.post("/register", registerValidator, validate, controller.register); //done
router.post("/login", loginValidator, validate, controller.login); //done
router.post("/refresh-token", controller.refreshToken); //done
router.post("/logout", controller.logout); //done
router.post("/forgot-password", controller.forgotPassword); // chưa test
router.post("/reset-password", controller.resetPassword); // chưa test

module.exports = router;