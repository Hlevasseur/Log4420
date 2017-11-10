'use strict';

function checkCartBadge() {
  var count = CART.getProductsCount();
  if(count > 0) {
    $(".shopping-cart > .count")
      .show()
      .text(count);
  } else {
    $('.shopping-cart > .count').hide();
  }

}

$(document).ready(function() {
  checkCartBadge();
});
