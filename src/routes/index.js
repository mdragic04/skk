const router = require("express").Router();

const registrationRouter = require("./registration-router");

/*const loginRouter = require("./login-router");
const ticketsRouter = require("./tickets-router");
const usersRouter = require("./users-router");

router.use("/login", loginRouter);

router.use("/tickets", ticketsRouter);

router.use("/users", usersRouter);*/

router.use("/registration", registrationRouter);

module.exports = router;
