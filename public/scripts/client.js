// Test / driver code (temporary). Eventually will get this from the server.
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
    $(() => $('.container').append(createTweetElement(tweet))); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
  }
}

const createTweetElement = (obj) => {
  const time = timeago.format(obj.created_at, new Date());
  console.log(obj);
  const $tweet = 
  `<article>
    <header class="tweetHeader">
      <i class="far fa-user"></i>
      ${obj.user.name}
    </header>
    <span>
      ${obj.content.text}
    </span>
    <footer class="tweetFooter">
      <p>${time}</p>
      <p>
      <i class="fas fa-flag"></i>
      <i class="fas fa-spinner"></i>
      <i class="fas fa-heart"></i>
      </p>
    </footer> 
  </article>
  `;
  return $tweet;
}
$(() => {
  $("#addTweet").on("submit", (evt) => {
    evt.preventDefault();
    const val = $(evt.target).serialize();
    console.log("evt-->",val)
    $.post("/tweets", val).then((data) => {
      console.log(data);
      $.get("/tweets", val).then((data) => {
        console.log(data);
        renderTweets(data);
      })
      ;
    });
  });
});


// const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
// $(document).ready()
// renderTweets(data);