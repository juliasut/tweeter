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

  const $tweet = $(`
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


const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}

const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('#tweets-container').prepend($tweet); 
});