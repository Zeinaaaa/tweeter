// Test / driver code (temporary). Eventually will get this from the server.
// const tweetData = {
//   "user": {
//     "name": "Newton",
//     "avatars": "https://i.imgur.com/73hZDYK.png",
//       "handle": "@SirIsaac"
//     },
//   "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//   "created_at": 1461116232227
// };

// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]
const toTop = document.querySelector(".to-top");

window.addEventListener("click", () => {
  if (window.pageYOffset > 100) {
    toTop.classList.add("active");
  } else {
    toTop.classList.remove("active");
  }
})
const renderTweets = (tweets) => {
  // $(".container").empty();
  for (const tweet of tweets) {
    $(() => $('#tweetList').prepend(createTweetElement(tweet))); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
  }
};

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


const createTweetElement = (obj) => {
  const time = timeago.format(obj.created_at, new Date());
  const $tweet = 
  `<article>
    <header class="tweetHeader">
      <div class="headerRight">
        <i class="far fa-user"></i>
        ${obj.user.name}
      </div>
      <div class="headerLift">
        ${obj.user.handle}
      </div>
    </header>
    <span>
      ${escape(obj.content.text)}
    </span>
    <footer class="tweetFooter">
      <p>${time}</p>
      <p>
      <i class="fas fa-flag"></i>
      <i class="fa-solid fa-arrows-rotate"></i>
      <i class="fas fa-heart"></i>
      </p>
    </footer> 
  </article>
  `;
  return $tweet;
}




$(() => {
  const $tweetText = $("#tweet-text"); 
  $(".errorMessage").hide();
  $("#addTweet").on("submit", (evt) => {
    evt.preventDefault();
    
    let val = $(evt.target).serialize();
    console.log("val:", val);
    
    if (evt.target[0].value.length === 0) {
      console.log("length", evt.target[0].value.length)
      $('.error').text(
        `You need to add a text to submit a tweet.`
        ); 
        $(".errorMessage").slideDown("slow");

        console.log(evt.target[0].value)
      } else if ($tweetText.val().length > 140) {
        $('.error').text(
          `Your text should be less than 140 characters.`
          ); 
          $(".errorMessage").slideDown("slow");
          $("#tweet-text").val("");
      } else {
        $.post("/tweets", val).then(() => {
          $("#tweet-text").empty();
          const loadtweets = $.get("/tweets", val).then((data) => {
            renderTweets(data);
          });
          loadtweets;
          $("#tweet-text").val("");
          $(".errorMessage").empty();
        })
      }
      // $("#tweet-text").empty();
      
  });
});




// const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
// $(document).ready()
// renderTweets(data);