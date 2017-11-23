var express = require("express");
var router = express.Router();

router.get("/", function(req, res) {
  res.render("index", { page: "index" , title: "Online Shop - Accueil"});
});

router.get("/accueil", function(req, res) {
  res.render("index", { page: "index" , title: "Online Shop - Accueil"});
});

router.get("/produits", function(req, res) {
  res.render("products", { page: "products" , title: "Online Shop - Produits"});
});

router.get("/produit", function(req, res) {
  res.render("product", { page: "product" , title: "Online Shop - Produit"});
});

router.get("/panier", function(req, res) {
  res.render("shopping-cart", { page: "shopping-cart" , title: "Online Shop - Shopping Cart"});
});

router.get("/contact", function(req, res) {
  res.render("contact", { page: "contact" , title: "Online Shop - Contact"});
});

router.post("/confirmation", function(req, res) {
  res.render("confirmation", { page: "confirmation" , title: "Online Shop - Confirmation"});
});

router.get("/commande", function(req, res) {
  res.render("order", { page: "order" , title: "Online Shop - Commande"});
});

module.exports = router;
