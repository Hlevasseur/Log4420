var express = require("express");
var router = express.Router();

router.get("/", function(req, res) {
  res.render("index", { page: "index" , title: "Online Shop - Accueil"});
});

router.get("/products", function(req, res) {
  res.render("products", { page: "products" , title: "Online Shop - Produits"});
});

router.get("/product", function(req, res) {
  res.render("product", { page: "product" , title: "Online Shop - Produit"});
});

router.get("/shopping-cart", function(req, res) {
  res.render("shopping-cart", { page: "shopping-cart" , title: "Online Shop - Shopping Cart"});
});

router.get("/contact", function(req, res) {
  res.render("contact", { page: "contact" , title: "Online Shop - Contact"});
});

router.get("/confirmation", function(req, res) {
  res.render("confirmation", { page: "confirmation" , title: "Online Shop - Confirmation"});
});

router.get("/order", function(req, res) {
  res.render("order", { page: "order" , title: "Online Shop - Commande"});
});

module.exports = router;
