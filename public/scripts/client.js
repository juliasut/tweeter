/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// use timeago.format(new Date()) to set the time programatically;

// function to create new DOM node $tweet for every tweet post (from initial-tweets.json):
// {
//   "user": {
//     "name": "Newton",
//     "avatars": "https://i.imgur.com/73hZDYK.png",
//       "handle": "@SirIsaac"
//     },
//   "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//   "created_at": 1461116232227
// }

$(document).ready(function () {
  

const createTweetElement = (tweet) => {
  //HTML for new node:
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


const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = (tweets) => {
  for (const tweet of tweets) {
    $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet); 
  }
}

renderTweets(data);

$('form').on('submit', function(event) {
  // stops HTML from running post req and reloading the whole page
  event.preventDefault();

  // formats data for the server as a query string 
  const urlEncodedData = $(this).serialize();

})
});