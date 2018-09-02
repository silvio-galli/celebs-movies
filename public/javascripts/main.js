
$(document).ready( function() {
  let phrases = $(".catch-phrase");
  if ( phrases.length !== 0 ) {
    shortenPhrases(phrases);
  }
})


// on Signup and Login
// implement client-side validation 
// $('.alert').toggle();
//   var username = document.querySelector('input[name=username]');
//   var password = document.querySelector('input[name=password]');
//   var check = document.querySelector('input[name=check-password');

//   let passwordValue = "";

//   var alertDiv = $('.alert');
//   console.log( alertDiv );
    
//   $('input[name="password"]').on("blur", function() {

//     if ( $(this).val().length < 6 ) {
//       $(this).addClass("is-invalid");
//       alertDiv.append("Minimum password length 6 characters").addClass('fade show').toggle(800);
//     } else if ( $(this).val().length > 12 ) {
//       $(this).addClass("is-invalid");
//       alertDiv.addClass('show').append("Maximum password length 12 characters");
//       $(this).focus();
//     }
// })


// GET /celebrities
// cut catch phrase to the length of the shortest one
// to keep the celebrities grid consistent
function shortenPhrases(phrases) {
  let shortest = 5000;
  phrases.filter( function() {
    let phrase = $(this).text().trim();
    if (phrase.length < shortest)
      shortest = phrase.length
  });
  return phrases.map( function() {
    let phrase = $(this).text().trim();
    let newText = phrase.length > shortest ? phrase.slice(0, shortest - 4) + "..." : phrase;
    return $(this).text( newText );
  })  
}