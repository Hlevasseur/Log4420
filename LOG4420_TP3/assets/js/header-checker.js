'use strict';

function checkCartBadge() {
  $('#products-count').hide();
  var count = CART.getProductsCount();
  if(count > 0) {
    $("#products-count")
      .show()
      .text(count);
  }

}

$(document).ready(function() {
  checkCartBadge();
});
