

function updateDisplayCart(){
    CART.getCart(function(shoppingItems) {
      var sum=0;
      if(shoppingItems.length==0){
          $('article').html("<h1>Panier</h1><p>Aucun produit dans le panier.</p>") ;
      } else {
        shoppingItems.forEach(function(product) {
          sum+= product.price*product.quantity;
        });
        $('.shopping-cart-total strong').html(sum.toFixed(2).toCurrencyString()+"&thinsp;$");
      }
    });
}

$(document).ready(function() {

  CART.getCart(function(shopingItems) {
    var sum=0;
    if(shopingItems.length==0){
        $('article').html("<h1>Panier</h1><p>Aucun produit dans le panier.</p>") ;
    }else{
      console.log(shopingItems);
      shopingItems.sortProductsBy("name", true).forEach(function(product){
          if(product.quantity==1){
              disabled="disabled";
          }else{
              disabled="";
          }
          $(".shopping-cart-table tbody").append("'<tr data-id='"+product.id+"'>'"+
                "<td class='first-column'><button class='shopping-cart-button remove-item-button'>x</button></td>"+
                "<td><a href='/produit?id="+product.id+"'>"+product.name+"</a></td>"+
                "<td>"+product.price.toCurrencyString()+"&thinsp;$</td>"+
                "<td><button class='shopping-cart-button remove-quantity-button' "+disabled+">-</button><span class='quantity'>"+product.quantity+"</span><button class='shopping-cart-button add-quantity-button'>+</button></td>"+
                "<td class='last-column price total-amount'>"+(product.price*product.quantity).toFixed(2).toCurrencyString()+"&thinsp;$</td>"+
              "</tr>"
          );
        sum+=product.price*product.quantity;
      });
      $('.shopping-cart-total strong').append(sum.toFixed(2).toCurrencyString()+"&thinsp;$")  ;
    }


    $('.remove-item-button').click(function(){
        if(confirm("Voulez-vous supprimerle produit du panier ?")){
            var id = $(this).parent().parent().data("id");
            var elem = this;
            CART.removeProductFromCart(id, function(success){
              if(!success) {
                showError();
              } else {
                $(elem).parent().parent().remove();
                checkCartBadge();
                updateDisplayCart();
              }
            });
        }
    });


    $('.add-quantity-button').click(function(){
        var id = $(this).parent().parent().data("id");
        var elem = this;
        CART.addOneQuantityToCart(id, function(product) {
          if(!product) {
            // Means error happened
            showError();
          } else {
            checkCartBadge();
            updateDisplayCart();
            qty = product.quantity;
            price = product.price;
            $(elem).parent().find(".remove-quantity-button").prop('disabled',false);
            $(elem).parent().find(".quantity").text(qty);
            $(elem).parent().parent().find(".total-amount").text((qty*price).toFixed(2).toCurrencyString()+" $");
          }
        });
    });

    $('.remove-quantity-button').click(function(){
        var id = $(this).parent().parent().data("id");
        var elem = this;
        CART.removeOneQuantityToCart(id, function(product) {
          if(!product) { showError(); }
          else {
            checkCartBadge();
            updateDisplayCart();
            qty = product.quantity;
            price = product.price;
            $(elem).parent().find(".quantity").text(qty);
            if(qty==1){
                $(elem).prop('disabled', true);
            }
            $(elem).parent().parent().find(".total-amount").text((qty*price).toFixed(2).toCurrencyString()+" $");
          }
        });
    });

    $('#remove-all-items-button').click(function(){
        if(confirm("Voulez-vous supprimer tous les produits du panier ?")){
            CART.flushCart(function(success){
              if(!success){ showError(); }
              else {
                checkCartBadge();
                updateDisplayCart();
              }
            });
        }
    });


  });


});
