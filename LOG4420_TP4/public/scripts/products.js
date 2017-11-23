'use strict';

function updateProductsView(products) {
  $('.nb-products').text(products.length.toString() + " produits");
  $('#products-list').empty();
  products.forEach(function(product){
    $('#products-list')
      .append(
      "<a class='product-card bordered' href='/produit?id=" + product.id + "' title='En savoir plus...'>" +
        "<h2>" + product.name + "</h2>" +
        "<img alt=" + product.name + " src=/img/" + product.image + ">" +
        "<p><small>Prix</small> " + product.price.toCurrencyString() + "&thinsp;$</p>" +
      "</a>"
    )
  });
}

function applyCriteriaAndCategory(products, criteria, crescent, category) {

  var filteredProducts = products;
  if(category !== "all") {
    filteredProducts = filteredProducts.filterProductsByCategory(category);
  }
  let sortedProducts = filteredProducts.sortProductsBy(criteria, crescent);
  updateProductsView(sortedProducts);
}

function getProductsAndUpdateView(category, criteria) {
  PRODUCTS.getProducts(category, criteria, function(products){
    updateProductsView(products);
  });
}

$(document).ready(function () {

  // Useful var
  var criteria = "price-asc";
  var category = "";

  getProductsAndUpdateView(category, criteria);

  // EventListener to Categories Buttons
  $('#product-categories > button').click(function(event){
    $('#product-categories > button').removeClass('selected');
    $(this).addClass('selected')
    category = $(this)[0].name;
    getProductsAndUpdateView(category, criteria);
  });

  // EventListener to Criteria Buttons
  $('#product-criteria > button').click(function(event){
    $('#product-criteria > button').removeClass('selected');
    $(this).addClass('selected')
    criteria = $(this)[0].name;
    getProductsAndUpdateView(category, criteria);
  });

});
