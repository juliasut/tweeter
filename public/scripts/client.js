/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Use timeago.format(new Date()) to set the time programatically;

$(document).ready(function () {
  $('#error-length-null').hide();
  $('#error-length-exceed').hide();
  
  // Prevent vulnarability to XSS (cross site scripting) when tweet element is created using a string literal
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Create dynamic tweet: AJAX to POST tweets to the server from initial-tweets.js
  const createTweetElement = (tweet) => {
    //HTML for new DOM node:
    let $tweet = $(`
    <article class="tweet">
    <header>
      <div>
        <img src="${tweet.user.avatars}">
        <span>${tweet.user.name}</span>
      </div>
      <span class="user-id">${tweet.user.handle}</span>
    </header>
    <p>${escape(tweet.content.text)}</p>
    <hr>
    <footer>
      <span>${timeago.format(tweet.created_at)}</span>
      <span>
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </span>
    </footer>
  </article>`);
  return $tweet;
  };


  // Attach new tweet on top of the tweet-container
  const renderTweets = (tweets) => {
    // Empty the feed first the load one with a new tweet - avoid repetition of an old feed
    $('#tweets-container').empty();

    for (const tweet of tweets) {
      $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet); 
    }
  }


  const loadTweets = () => {
    $.get('/tweets')
      .then((tweets) => {
        renderTweets(tweets);
        $('textarea').focus();
      });
  };
  loadTweets();


  // Handle event for the new tweet form submission
  $('form').on('submit', function(event) {

    // Stop HTML from running post request and reloading the whole page
    event.preventDefault();
    
    // Validate input to be present and within 140 characters
    if ($('textarea').val().length === 0) return $('#error-length-null').show().slideUp(2500);
    if ($('textarea').val().length > 10) return $('#error-length-exceed').show().slideUp(2500);
    
    // Format data for the server into a query string 
    const serializedData = $(this).serialize();

    // Post a new tweet to the feed without refreshing the page
    $.post('/tweets', serializedData)
      .then(() => {
        loadTweets();  
        // Clear the input field
        $('textarea').val('');
        $('output').val(140);        

      });
    
  });

  // Toggle input form
  $('.fa-angle-double-down').on('click', () => {
    $('form').slideToggle('slow');
    $('textarea').focus();
  });

}); 