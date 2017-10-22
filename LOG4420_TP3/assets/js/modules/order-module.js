'use strict';

var ORDER = (function(){
  var self = {};

  function newOrder(ID,FIRSTNAME,LASTNAME) {
     return {
       id:ID,
       firstname:FIRSTNAME,
       lastname:LASTNAME
     };
  }
  
  self.saveOrder = function(order) {
    localStorage.setItem("order", JSON.stringify(order));
  }

  self.getOrder = function() {
    var order = localStorage.getItem("order");
    return order && JSON.parse(order);
  }

  self.AddOrder = function(firstname,lastname){
    var order = self.getOrder();
    var neworder = newOrder();
    if(order !=null){
      neworder.id = order.id +1;
    }else{
      neworder.id = 1;
    }
    neworder.firstname=firstname;
    neworder.lastname=lastname;
    self.saveOrder(neworder);
  }

  return self;
})();
