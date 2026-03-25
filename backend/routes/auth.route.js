const router = require("express").Router();
const controller = require("../controllers/auth.controller");
const { registerValidator, loginValidator } = require("../validators/auth.validator");
const validate = require("../middlewares/validate.middleware");
const { verifyToken } = require("../middlewares/auth.middleware");
const { allowRoles } = require("../middlewares/rbac.middleware");

router.post("/register", registerValidator, validate, controller.register); //done
router.post("/login", allowRoles("reader", "author", "editor", "admin"), loginValidator, validate, controller.login); //done
router.post("/refresh-token", allowRoles("reader", "author", "editor", "admin"), controller.refreshToken); //done
router.post("/logout", allowRoles("reader", "author", "editor", "admin"), controller.logout); //done
router.post("/forgot-password", controller.forgotPassword); // chưa test
router.post("/reset-password", controller.resetPassword); // chưa test

module.exports = router;