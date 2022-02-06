const router = require("express").Router();

const {
  ticketsController: { getTickets },
} = require("../controllers");

router.get("/", getTickets);

module.exports = router;
