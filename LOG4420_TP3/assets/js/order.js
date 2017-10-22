$(function() {
  
   jQuery.validator.addMethod("datecreditCardExpiry", function(value, element) {
    return this.optional(element) || /^(0[1-9]|1[0-2])\/[0-9]{2}\b/.test( value );
  }, "La date d’expiration de votre carte de crédit est invalide.");
  
  // Initialize form validation on the registration form.
  // It has the name attribute "registration"
  $("#order-form").validate({
    // Specify validation rules
    rules: {
      // The key name on the left side is the name attribute
      // of an input field. Validation rules are defined
      // on the right side
      firstname:{
        required:true,
        minlength:2  
      },
      lastname: {
        required:true,
        minlength:2
      },
      email: {
        required: true,
        email: true
      },
      phone: {
        required: true,
        phoneUS: true
      },
      creditCardExpiry:{
        required:true,
        datecreditCardExpiry:true
      },
      creditCard:{
        required:true,
        creditcard:true
      }
    },
    // Specify validation error messages
    messages: {
      firstname:{
        required:"Ce champ est obligatoire"
      },
      lastname:{
        required:"Ce champ est obligatoire"
      },
      phone: {
        required: "Ce champ est obligatoire",
        phoneUS: "Utilisez un format américain"
      },
      email:{
        required:"Ce champ est obligatoire",
        email:"Le format d'email est invalide"
      },
      creditCardExpiry:{
        required:"Ce champ est obligatoire",
      },
      creditCard:{
        required:"Ce champ est obligatoire",
        creditcard:"Le format de carte de crédit est invalide"
      }
    },
    // Make sure the form is submitted to the destination defined
    // in the "action" attribute of the form when valid
    submitHandler: function(form) {
      ORDER.AddOrder($('#first-name').val(),$('#last-name').val());
      CART.flushCart();    
      form.submit();
    }
  });
  
});




