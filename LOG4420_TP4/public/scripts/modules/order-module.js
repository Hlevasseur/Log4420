'use strict';

var ORDER = (function(){
  let endpoint = '/api/orders/';
  var self = {};

  function newOrder(ID,FIRSTNAME,LASTNAME, EMAIL, PHONE, PRODUCTS) {
     return {
       id:ID,
       firstName:FIRSTNAME,
       lastName:LASTNAME,
       email: EMAIL,
       phone: PHONE,
       products: PRODUCTS
     };
  }

  self.saveOrder = function(order) {
    localStorage.setItem("order", JSON.stringify(order));
  }

  self.getOrder = function() {
    var order = localStorage.getItem("order");
    return order && JSON.parse(order);
  }

  self.AddOrder = function(firstname,lastname, email, phone, products, callback){
    var order = self.getOrder();
    var neworder = newOrder(null, firstname, lastname, email, phone, products);
    if(order !=null){
      neworder.id = order.id +1;
    }else{
      neworder.id = 1;
    }
    console.log(neworder);
    $.ajax({url: endpoint, type: 'POST', contentType: 'application/json', data: JSON.stringify(neworder)})
      .done(function(response) {
        self.saveOrder(neworder);
        callback(true);
      })
      .catch(function(error){
        callback(false);
      });

  }

  return self;
})();
