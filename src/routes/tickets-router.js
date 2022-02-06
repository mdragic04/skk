const router = require("express").Router();

const {
  ticketsController: { getTickets, purchaseTicket },
} = require("../controllers");

const {
  utilityServices: { tokenChecker },
} = require("../services");

router.get("/", getTickets);
router.post("/:ticketId/purchase", tokenChecker, purchaseTicket);

module.exports = router;
