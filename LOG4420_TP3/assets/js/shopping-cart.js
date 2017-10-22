function updateDisplayCart(){
    var shopingItems = CART.getCart();
    var sum=0;
    if(shopingItems.products.length==0){
        $('article').html("<h1>Panier</h1><p>Aucun produit dans le panier</p>") ;
    }else{
        shopingItems.products.sortProductsBy("name",true).forEach(function(product){
            sum+= product.price*product.quantity;
            $('.shopping-cart-total strong').html(sum.toFixed(2)+"&thinsp;$")  ;
        });
    }
}


$(document).ready(function() {
  var shopingItems = CART.getCart();
  var sum=0;
  if(shopingItems.products==0){
      $('article').html("<h1>Panier</h1><p>Aucun produit dans le panier</p>") ;
  }else{
    shopingItems.products.sortProductsBy("name",true).forEach(function(product){
        if(product.quantity==1){
            disabled="disabled";
        }else{
            disabled="";
        }
      $(".shopping-cart-table tbody").append("'<tr data-id='"+product.id+"'>'"+
            "<td class='first-column'><button class='shopping-cart-button remove-item-button'>x</button></td>"+
            "<td><a href='./product.html'>"+product.name+"</a></td>"+
            "<td class='price'>"+product.price+"&thinsp;$</td>"+
            "<td><button class='shopping-cart-button remove-quantity-button' "+disabled+">-</button><span class='quantity'>"+product.quantity+"</span><button class='shopping-cart-button add-quantity-button'>+</button></td>"+
            "<td class='last-column total-amount'>"+(product.price*product.quantity).toFixed(2)+"&thinsp;$</td>"+
          "</tr>"
      );
    sum+=product.price*product.quantity;
    });
    $('.shopping-cart-total strong').append(sum.toFixed(2)+"&thinsp;$")  ;
  }
  

  
    $('.remove-item-button').click(function(){
        if(confirm("Voulez-vous supprimerle produit du panier ?")){
            var id = $(this).parent().parent().data("id");
            CART.removeProductFromCart(id);
            $(this).parent().parent().remove();
            checkCartBadge();
            updateDisplayCart();
        }
    });
    
    
    $('.add-quantity-button').click(function(){
        var id = $(this).parent().parent().data("id");
        CART.addOneQuantityToCart(id);
        checkCartBadge();
        updateDisplayCart();
        qty = parseInt($(this).parent().find(".quantity").text())+1;
        price = parseFloat($(this).parent().parent().find(".price").text().slice(0,$(this).parent().parent().find(".price").text().length -1));
        $(this).parent().find(".remove-quantity-button").prop('disabled',false);
        $(this).parent().find(".quantity").text(qty);
        $(this).parent().parent().find(".total-amount").text((qty*price).toFixed(2)+" $");
        
        
    });
    
    $('.remove-quantity-button').click(function(){
        var id = $(this).parent().parent().data("id");
        CART.removeOneQuantityToCart(id);
        checkCartBadge();
        updateDisplayCart();
        qty = parseInt($(this).parent().find(".quantity").text())-1;
        price = parseFloat($(this).parent().parent().find(".price").text().slice(0,$(this).parent().parent().find(".price").text().length -1));
        $(this).parent().find(".quantity").text(qty);
        if(qty==1){
            $(this).prop('disabled', true);
        }
        $(this).parent().parent().find(".total-amount").text((qty*price).toFixed(2)+" $");
    });
    
    $('#remove-all-items-button').click(function(){
        if(confirm("Voulez-vous supprimer tous les produits du panier ?")){
            CART.flushCart();
            checkCartBadge();
            updateDisplayCart();
        }
    });

});



