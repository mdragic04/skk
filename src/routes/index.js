const router = require("express").Router();

const loginRouter = require("./login-router");
const registrationRouter = require("./registration-router");
const ticketsRouter = require("./tickets-router");

router.use("/login", loginRouter);

router.use("/registration", registrationRouter);

router.use("/tickets", ticketsRouter);

module.exports = router;
