'use strict';

function checkCartBadge() {
  CART.getProductsCount(function(count) {
    if(count > 0) {
      $(".shopping-cart > .count")
        .show()
        .text(count);
    } else {
      $('.shopping-cart > .count').hide();
    }
  });
}

$(document).ready(function() {
  checkCartBadge();
});
