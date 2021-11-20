// a function to loob through the data;
const renderTweets = (tweets) => {
  for (const tweet of tweets) {
    $(() => $('#tweetList').prepend(createTweetElement(tweet))); 
    // to add it to the page so we can make sure it's got all the right elements, classes, etc.
  }
};


const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//showing the new tweets in their designated place
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
  `
  return $tweet;
};

//a ready jquery function to make sure the html is loaded first before the js execution.
$(() => {
  $(".errorMessage").hide();
  $("#addTweet").on("submit", (evt) => {
    evt.preventDefault();//to prevent auto submittion
    
    let val = $(evt.target).serialize();
    //error message if no input in the text box.
    if (evt.target[0].value.length === 0) {
      $('.error').text(
        `You need to add a text to submit a tweet.`
        ); 
        $(".errorMessage").slideDown("slow");//adding the slide down effect
    //error message if characters count is more than 140;
    } else if (evt.target[0].value.length > 140) {
     $('.error').text(
      `Your text should be less than 140 characters.`
       ); 
       $(".errorMessage").slideDown("slow");
       $("#tweet-text").val("");//clearing the input box;
    } else {
      $.post("/tweets", val).then(() => {
        $("#tweet-text").empty();
        const loadtweets = $.get("/tweets", val).then((data) => {
          renderTweets(data);
          loadtweets;
          $("#tweet-text").val("");
          $(".errorMessage").empty();//remove the error message after fixing the tweet.
        });
      })
    }
      
  });
});