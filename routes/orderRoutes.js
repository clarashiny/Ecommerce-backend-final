const express = require("express");
const router = express.Router();
const Order = require("../models/OrderModel");

// CREATE ORDER
router.post("/create", async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.json(order);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ORDERS
router.get("/get", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

module.exports = router;