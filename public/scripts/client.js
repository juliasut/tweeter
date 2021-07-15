/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = (tweet) => {

  const $tweet = $(`<article class="tweet">
  <header>
    <div>
      <img src="https://i.imgur.com/nlhLi3I.png">
      <span>Katy Perry</span>
    </div>
    <span class="user-id">@userId</span>
  </header>

  <p>This is the latest tweet showing up.</p>
  <hr>
  <footer>
    <span>created 10 days ago</span>
    <span>
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
    </span>
  </footer>
 </article>`);

 return $tweet;
};