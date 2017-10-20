'use strict';

var ARRAY_MODULE = (function() {

  Array.prototype.sortProductsBy = function(criteria, crescent) {
    let array = this;
    switch (criteria) {
      case "name":
          array.sort(function(product1, product2) {
            if(product1.name.toLowerCase() < product2.name.toLowerCase()) {
              return -1;
            } else {
              return 1;
            }
          })
        break;

      case "price":
        array.sort(function(product1, product2) {
          return product1.price - product2.price;
        });
        break;

      default:
        break;
    }
    if(!crescent) {
      array.reverse();
    }
    return array;
  }

  Array.prototype.filterProductsBy = function(category) {
    let array = this.filter(function(product) {
      if(product.category === category) {
        return product;
      }
    });
    return array;
  }
  
})();
