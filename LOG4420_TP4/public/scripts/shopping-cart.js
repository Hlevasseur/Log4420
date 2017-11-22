

function updateDisplayCart(){
    CART.getCart(function(shoppingItems) {
      var sum=0;
      if(shopingItems.length==0){
          $('article').html("<h1>Panier</h1><p>Aucun produit dans le panier.</p>") ;
      }else{
        sum+= product.price*product.quantity;
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
      shopingItems.forEach(function(product){
          if(product.quantity==1){
              disabled="disabled";
          }else{
              disabled="";
          }
          $(".shopping-cart-table tbody").append("'<tr data-id='"+product.id+"'>'"+
                "<td class='first-column'><button class='shopping-cart-button remove-item-button'>x</button></td>"+
                "<td><a href='/product?id="+product.id+"'>"+product.name+"</a></td>"+
                "<td>"+product.price.toCurrencyString()+"&thinsp;$</td>"+
                "<td><button class='shopping-cart-button remove-quantity-button' "+disabled+">-</button><span class='quantity'>"+product.quantity+"</span><button class='shopping-cart-button add-quantity-button'>+</button></td>"+
                "<td class='last-column price total-amount'>"+(product.price*product.quantity).toFixed(2).toCurrencyString()+"&thinsp;$</td>"+
              "</tr>"
          );
        sum+=product.price*product.quantity;
      });
      $('.shopping-cart-total strong').append(sum.toFixed(2).toCurrencyString()+"&thinsp;$")  ;
    }
  });



    $('.remove-item-button').click(function(){
        if(confirm("Voulez-vous supprimerle produit du panier ?")){
            var id = $(this).parent().parent().data("id");
            CART.removeProductFromCart(id, function(success){
              if(!sucess) {
                showError();
              } else {
                $(this).parent().parent().remove();
                checkCartBadge();
                updateDisplayCart();
              }
            });
        }
    });


    $('.add-quantity-button').click(function(){
        var id = $(this).parent().parent().data("id");
        CART.addOneQuantityToCart(id, function(product) {
          if(!product) {
            // Means error happened
            showError();
          } else {
            checkCartBadge();
            updateDisplayCart();
            qty = product.quantity;
            price = product.price;
            $(this).parent().find(".remove-quantity-button").prop('disabled',false);
            $(this).parent().find(".quantity").text(qty);
            $(this).parent().parent().find(".total-amount").text((qty*price).toFixed(2).toCurrencyString()+" $");
          }
        });
    });

    $('.remove-quantity-button').click(function(){
        var id = $(this).parent().parent().data("id");
        CART.removeOneQuantityToCart(id, function(product) {
          if(!product) { showError(); }
          else {
            checkCartBadge();
            updateDisplayCart();
            qty = product.quantity;
            price = product.price;
            $(this).parent().find(".quantity").text(qty);
            if(qty==1){
                $(this).prop('disabled', true);
            }
            $(this).parent().parent().find(".total-amount").text((qty*price).toFixed(2).toCurrencyString()+" $");
          }
        });
    });

    $('#remove-all-items-button').click(function(){
        if(confirm("Voulez-vous supprimer tous les produits du panier ?")){
            CART.flushCart();
            checkCartBadge();
            updateDisplayCart();
        }
    });

});
