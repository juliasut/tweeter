/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// use timeago.format(new Date()) to set the time programatically;

$(document).ready(function () {
  

// AJAX to POST tweets to the server from initial-tweets.js
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
  <p>${tweet.content.text}</p>
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



// attaches new tweet on top of the feed
const renderTweets = (tweets) => {
  for (const tweet of tweets) {
    $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet); 
  }
}


// AJAX to fetch (GET) data from the server and receive JSON with array of tweets
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

// event handler for the new tweet form submission
$('form').on('submit', function(event) {
  // stops HTML from running post request and reloading the whole page
  event.preventDefault();
  // formats data for the server in the format of query string 
  const urlEncodedData = $(this).serialize();

  // validate input present and within 140 characters
  let charCount = $('#tweet-text').val().length;
  if (!charCount) return alert('Please do tweet!');
  if (charCount > 140) return alert('Please tweet within 140 characters!')


})

});