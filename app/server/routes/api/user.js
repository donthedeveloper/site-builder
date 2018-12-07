const express = require("express");

const router = express.Router();

// routes go here

router.post("/", (req, res) => {
  res.json("It's working");
  console.log(req.body);
});

module.exports = router;
