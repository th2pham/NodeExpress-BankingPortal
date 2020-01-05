const express = require("express");
const router = express.Router();

const { accounts, writeJSON } = require("../data");

router.get("/transfer", (req, res) => {
  res.render("transfer");
});

router.post("/transfer", (req, res) => {
  const data = req.body;
  accounts[data.from].balance -= Number(data.amount);
  accounts[data.to].balance += parseInt(data.amount, 10); //Number doesn't work, trouble shoot later

  writeJSON();

  res.render("transfer", { message: "Transfer Completed" });
});

router.get("/payment", (req, res) => {
  res.render("payment", { account: accounts.credit });
});

router.post("/payment", (req, res) => {
  const data = req.body;
  accounts["credit"].balance -= parseInt(data.amount, 10);
  accounts["credit"].available += parseInt(data.amount, 10);

  writeJSON();

  res.render("payment", {
    message: "Payment Successful",
    account: accounts.credit
  });
});

module.exports = router;