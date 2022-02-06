const router = require("express").Router();

const {
  ticketsController: { getTickets, getPurchasedTickets, purchaseTicket, cancelTicket },
} = require("../controllers");

const {
  utilityServices: { tokenChecker },
} = require("../services");

router.get("/", getTickets);
router.get("/purchased", tokenChecker, getPurchasedTickets);
router.post("/:ticketId/purchase", tokenChecker, purchaseTicket);
router.post("/:ticketId/cancel", tokenChecker, cancelTicket);

module.exports = router;
