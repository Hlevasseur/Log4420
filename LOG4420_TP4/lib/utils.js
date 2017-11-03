'use strict';

module.exports = (function() {

  Array.prototype.sortProductsBy = function(criteria, crescent) {
    var array = this;
    switch (criteria) {
      case "alpha":
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
})();
