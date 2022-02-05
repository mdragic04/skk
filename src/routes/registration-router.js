const router = require("express").Router();

const { registrationController } = require("../controllers");

router.post("/", registrationController.registration);

module.exports = router;
