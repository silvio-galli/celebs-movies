
$(document).ready( function() {
  let phrases = $(".catch-phrase");
  if ( phrases.length !== 0 ) {
    shortenText(phrases);
  }

  let plots = $(".plot");
  if ( plots.length !== 0 ) {
    shortenText(plots);
  }

  $("#addSelect").on("click", function(e) {
    e.preventDefault();
    let newSelect = $("#cast-1").clone();
    let num = $(".cast").length;
    newSelect.attr("id", "cast" + (num + 1) )
    console.log( newSelect );
    $("#cast").append(newSelect);
  })
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
function shortenText(strings) {
  let shortest = 10000;
  strings.map( function() {
    let string = $(this).text().trim();
    if (string.length < shortest)
      shortest = string.length
  });
  return strings.map( function() {
    let string = $(this).text().trim();
    let newString = string.length > shortest ? string.slice(0, shortest - 4) + "..." : string;
    return $(this).text( newString );
  })
}