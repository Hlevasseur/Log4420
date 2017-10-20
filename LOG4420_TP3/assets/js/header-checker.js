'use strict';

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

$(document).ready(function() {
  checkCartBadge();
});
