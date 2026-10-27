const express = require("express");
const controller = require("../controllers/hitos");

const router = express.Router();

router.get("/", controller.list);
router.get("/:identifier", controller.get);
router.post("/", controller.create);
router.patch("/:identifier", controller.update);
router.delete("/:identifier", controller.remove);

module.exports = router;
