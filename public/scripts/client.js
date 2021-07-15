/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Use timeago.format(new Date()) to set the time programatically;

$(document).ready(function () {
  
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
      <span>${timeago.format(tweet.created_at)}  </span>
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
    for (const tweet of tweets) {
      $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet); 
    }
  }


  // Load tweets to the page: AJAX to fetch (GET) data from the server and receive JSON with array of tweets
  const loadTweets = function() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: (tweets) => {
        renderTweets(tweets);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  loadTweets();


  // Handle event for the new tweet form submission
  $('form').on('submit', function(event) {

    // Stop HTML from running post request and reloading the whole page
    event.preventDefault();

    // Format data for the server into a query string 
    const urlEncodedData = $(this).serialize();

    // Validate input to be present and within 140 characters
    if ($('textarea').val().length === 0) return alert('Please do tweet!');
    if ($('textarea').val().length > 140) return alert('Please tweet within 140 characters!')

    // Post a new tweet to the feed without refreshing the page
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: urlEncodedData,
      success: (data) => {
        loadTweets(data);  
        // Clear the input field
        $('textarea').val('');
        $('output').val(140);
      },
      error: (err) => {
        console.error(err);
      }

    });

  });

}); 