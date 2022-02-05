const router = require("express").Router();

const loginRouter = require("./login-router");
const registrationRouter = require("./registration-router");

/*const ticketsRouter = require("./tickets-router");
const usersRouter = require("./users-router");

router.use("/tickets", ticketsRouter);

router.use("/users", usersRouter);*/

router.use("/login", loginRouter);
router.use("/registration", registrationRouter);

module.exports = router;
