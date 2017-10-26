'use strict';

function updateProductsView(products) {
  $('.nb-products').text(products.length.toString() + " produits");
  $('#products-list').empty();
  products.forEach(function(product){
    $('#products-list')
      .append(
      "<a class='product-card bordered' href='./product.html?id=" + product.id + "' title='En savoir plus...'>" +
        "<h2>" + product.name + "</h2>" +
        "<img alt=" + product.name + " src=/assets/img/" + product.image + ">" +
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

$(document).ready(function () {


  PRODUCTS.getProducts(function(products) {

    // Useful var
    var criteria = "price";
    var crescent = true;
    var category = "all";

    // Primary View
    applyCriteriaAndCategory(products, criteria, crescent, category);


    // EventListener to Categories Buttons
    $('#product-categories > button').click(function(event){
      $('#product-categories > button').removeClass('selected');
      $(this).addClass('selected')
      category = $(this)[0].name;
      applyCriteriaAndCategory(products, criteria, crescent, category);
    });

    // EventListener to Criteria Buttons
    $('#product-criteria > button').click(function(event){
      $('#product-criteria > button').removeClass('selected');
      $(this).addClass('selected')
      switch ($(this)[0].name) {
        case "price-cr":
          criteria = "price";
          crescent = true;
          break;

        case "price-dcr":
          criteria = "price";
          crescent = false;
          break;

        case "name-cr":
          criteria = "name";
          crescent = true;
          break;

        case "name-dcr":
          criteria = "name";
          crescent = false;
          break;

        default:
          break;
      }
      applyCriteriaAndCategory(products, criteria, crescent, category);
    });

  });



});
