//Adding the character counter.
$(document).ready(function() {
  console.log("ready");
  $("#tweet-text").keyup( function() {
    console.log(this.value.length);
    let x= 140 - this.value.length;
    $(".counter").text(x);
    if (x < 0) {
      //the counter will turn to red when negative.
      $(".counter").text(x).css("color", 'red');
    } else {
      //the counter will get back to normal color when positive.
      $(".counter").text(x).css("color", 'black');
    }    
  })
});
