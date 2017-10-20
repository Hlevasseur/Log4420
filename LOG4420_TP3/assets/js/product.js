'use strict';

$(document).ready(function() {
  let id = parseInt(URL.urlParam('id'));

  PRODUCTS.getProduct(id, function(product) {
    if(!product) {
      $('main > article')
        .empty()
        .append('<h1>Page non trouvée !</h1>');
    } else {

    }
  });

});
