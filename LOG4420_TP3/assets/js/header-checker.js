'use strict';

function checkCartBadge() {
  $('.shopping-cart > .count').hide();
  var count = CART.getProductsCount();
  if(count > 0) {
    $(".shopping-cart > .count")
      .show()
      .text(count);
  }

}

$(document).ready(function() {
  checkCartBadge();
});
