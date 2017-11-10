'use strict';

var LOCAL_STORAGE = (function(){
  var self= {};

  self.getObject = function(key) {
    var value = localStorage.getItem(key);
    return value && JSON.parse(value);
  }

  self.setObject = function(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  self.removeObject = function(key) {
    localStorage.removeItem(key);
  }

  return self;
})();
