'use strict';

function saveCart(cart) {
  localStorage.setItem(key, JSON.stringify(cart));
}

function getCart() {
  var value = localStorage.getItem("cart");
  return value && JSON.parse(cart);
}

function checkCartBadge() {
  $('.shopping-cart > .count').hide();
  if(getCart()) {
    let cart = getCart();
    let count = cart.products.length;
    if(count > 0) {
      $(".shopping-cart > .count")
        .show()
        .text(count);
    }
  }
}

$(document).ready(function () {

  $.getJSON('/data/products.json', function(products) {
    products.sort(function(product1, product2) {
      return product1.price - product2.price;
    });
    $('.nb-products').text(products.length.toString() + " produits");
    products.forEach(function(product){
      $('#products-list').append(
        "<a class='product-card bordered' href='./product.html?id=" + product.id + "' title='En savoir plus...'>" +
          "<h2>" + product.name + "</h2>" +
          "<img alt=" + product.name + " src=/assets/img/" + product.image + ">" +
          "<p><small>Prix</small> " + product.price + "&thinsp;$</p>" +
        "</a>"
      )
    });
  });

  checkCartBadge();

});
