
$(document).ready(function() {
  
  const $tweetText = $('#tweet-text');
  
  // assign eventListener -> tweetText is reffered to as 'this' in the function
  $tweetText.on('input', function() {
    
    // console.log($(this).siblings('div').children('.counter').val())
    const tweetCharRemaining = 140 - $(this).val().length; 
    const $counter = $(this).siblings('div').children('.counter');

    $counter.html(tweetCharRemaining);
    
    // if message length is invalid -> counter turns red
    tweetCharRemaining < 0 ? $counter.addClass('invalid') : $counter.removeClass('invalid')
    
    // error message when submit length 0 or > 140
  });


  // $input.val('').focus() - to clear input field and put cursor in the field
});