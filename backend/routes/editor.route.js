const router = require("express").Router();
const admincontroller = require("../controllers/admin.controller");
const controller = require("../controllers/editor.controller");
const { verifyToken } = require("../middlewares/auth.middleware");
const { allowRoles } = require("../middlewares/rbac.middleware");

router.get("/", verifyToken, allowRoles("editor"), controller.getPostWithReviewStatus); // done

router.put("/publish/:postid", verifyToken, allowRoles("editor"), controller.publishPost); // done
router.put("/reject/:postid", verifyToken, allowRoles("editor"), controller.rejectPost);

module.exports = router;