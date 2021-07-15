
// assign eventListener -> tweetText is reffered to as 'this' in the function
$(document).ready(function() {
  
  $('#tweet-text').on('input', onInput);
  
});

// Count chars for new tweet and turn counter red if over the limit
const onInput = function() {
  const tweetCharRemaining = 140 - $(this).val().length; 
  const $counter = $(this).siblings('div').children('.counter');
  $counter.html(tweetCharRemaining);
  // if message length is invalid -> counter turns red
  tweetCharRemaining < 0 ? $counter.addClass('invalid') : $counter.removeClass('invalid')
};