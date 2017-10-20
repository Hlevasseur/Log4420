'use strict';

function updateView(product) {
  $('#product-name').text(product.name);
  $('#product-image')
    .attr('src', '/assets/img/' + product.image)
    .attr('alt', product.name);
  $('#product-desc').append(product.description);
  product.features.forEach(function(feature){
    $('#product-features').append('<li>'+feature+'</li>');
  });
  $('#product-price').append('Prix: <strong>' + product.price + '&thinsp;$</strong>');
}

function displayNotification() {
  $('#dialog').fadeIn();
  setTimeout("$('#dialog').fadeOut()", 5000);
}

$(document).ready(function() {
  // Hide dialog
  $('#dialog').hide();

  let id = parseInt(URL.urlParam('id'));
  var product = {};

  PRODUCTS.getProduct(id, function(data) {
    if(!data) {
      $('main > article')
        .empty()
        .append('<h1>Page non trouvée !</h1>');
    } else {
      product = data;
      updateView(product);
    }
  });

  $('#add-to-cart-form button').click(function(event){
    event.preventDefault();
    let qty = $('#product-quantity').val();
    CART.addProductToCart(product, qty);
    displayNotification();
    checkCartBadge();
  });

});
