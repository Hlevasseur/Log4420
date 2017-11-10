'use strict';

var URL = (function(){
  var self = {};

  self.urlParam = function(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
  	return results[1] || 0;
  }

  return self;
})();
