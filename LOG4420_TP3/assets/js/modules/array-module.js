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

  Array.prototype.filterProductsByCategory = function(category) {
    let array = this.filter(function(product) {
      if(product.category === category) {
        return product;
      }
    });
    return array;
  }

  Array.prototype.filterProductById = function(id) {
    let array = this.filter(function(product) {
      if(product.id === id) {
        return product;
      }
    });
    console.log(array);
    return array.length > 0 && array[0];
  }

})();
