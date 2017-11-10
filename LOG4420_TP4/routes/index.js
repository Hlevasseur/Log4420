var express = require("express");
var router = express.Router();

router.get("/", function(req, res) {
  res.render("index", { page: "index" , title: "Online Shop - Accueil"});
});

module.exports = router;
