'use strict';

function getCart() {
  var cart = localStorage.getItem("cart");
  return cart && JSON.parse(cart);
}

function checkCartBadge() {
  $('.shopping-cart > .count').hide();
  if(getCart()) {
    let cart = getCart();
    var count = 0;
    cart.products.forEach(function(product){
      count += parseInt(product.quantity);
    });
    if(count > 0) {
      $(".shopping-cart > .count")
        .show()
        .text(count);
    }
  }
}

$(document).ready(function() {
  checkCartBadge();
});
