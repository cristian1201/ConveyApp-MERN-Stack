const express = require("express");
const router = express.Router();
const orders = require("./data/orders.json");
const shipments = require("./data/shipments.json");

router.get("/", (req, res) => {
  res.send(orders);
});

router.get("/:orderNumber", (req, res) => {
    const orderNumber = req.params.orderNumber;
    const order = orders.filter(function(item) {
      return item.orderNumber == orderNumber;
    });
    if(order.length == 0) return res.status(400).send("Invalid order ID.");
    const filtered_shipments = shipments.filter(function(item){
      return item.orderNumber == order[0].orderNumber;
    })
    res.send(filtered_shipments);
});

module.exports = router;
