
$(document).ready(function() {
  
  const $tweetText = $('#tweet-text');
  
  // assign eventListener -> tweetText is reffered to as 'this' in the function
  $tweetText.on('input', function() {
    
    const tweetCharRemaining = 140 - $(this).val().length; 
    const $counter = $(this).siblings('div').children('.counter');

    $counter.html(tweetCharRemaining);
    
    // if message length is invalid -> counter turns red
    tweetCharRemaining < 0 ? $counter.addClass('invalid') : $counter.removeClass('invalid')
  });
});