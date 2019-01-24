var post_url = window.location.href;

$(document).ready(function() {
  $("ul#mentions-list").empty();
  $.getJSON("https://webmention.io/api/mentions?jsonp=?", {
    target: post_url
  }, function(data) {
    var social_media_likes = "";
    var social_media_repost = "";
    var social_media_post = "";
    if (data.links.length !== 0) {
      $("#post-mentions").show();
    }
    $.each(data.links, function(i, v) {
      var activity_type = data.links[i].activity.type;

      if (data.links[i].data.author && data.links[i].data.author.name) {
        var men_content = "";
        if (activity_type && activity_type == "like") {
          if (!social_media_likes) {
            social_media_likes = "<li class=\"mention-social\"> Liked by: ";
          }
          social_media_likes = social_media_likes +
            "<a href=\"" + data.links[i].data.url + "\">" +
            "<img src=\"" + data.links[i].data.author.photo + "\" width=\"40\" />" + "</a> ";
        } else if (activity_type && activity_type == "repost") {
          if (!social_media_repost) {
            social_media_repost = "<li class=\"mention-social\"> ";
          }
          social_media_repost = social_media_repost +
            "<a href=\"" + data.links[i].data.url + "\">" +
            data.links[i].data.author.name + "</a>, ";
        } else if (activity_type && activity_type == "link") {
          if (!social_media_post) {
            social_media_post = "<li class=\"mention-social\"> ";
          }
          social_media_post = social_media_post +
            "<a href=\"" + data.links[i].data.url + "\">" +
            data.links[i].data.author.name + "</a>, ";
        } else if (activity_type && activity_type == "reply") {
          let mention_date = new Date(data.links[i].verified_date);
          if (data.links[i].data.content) {
            men_content = data.links[i].data.content;
          }
          $("ul#mentions-list").prepend("<li class=\"mention p-comment h-cite\">" +
            "<div class=\"mention-author u-author\">" +
            "<img class=\"u-photo\" src=\"" + data.links[i].data.author.photo + "\" class=\"u-photo\"" +
            "title=\"" + data.links[i].data.author.name + "\" width=\"40\" >" +
            "<a class=\"p-name u-url\" href=\"" + data.links[i].data.author.url + "\" >" +
            data.links[i].data.author.name + "</a> replied:</div>" +
            "<div class=\"mention-text\">" + men_content + "</div>" +
            "<a href=\"" + data.links[i].data.url + "\">" +
            "<time>" + mention_date.getUTCDate() + "/" + (mention_date.getUTCMonth() + 1) +
            "/" + mention_date.getUTCFullYear() +
            "</time></a>" +
            "</li>");
        }
      }
    });
    if (social_media_post) {
      social_media_post = social_media_post.substr(0, social_media_post.length - 2);
      social_media_post = social_media_post + " <span class=\"commented\">linked to this.</span></li>";
      $("ul#mentions-list").prepend(social_media_post);
    }
    if (social_media_repost) {
      social_media_repost = social_media_repost.substr(0, social_media_repost.length - 2);
      social_media_repost = social_media_repost + " <span class=\"commented\">reposted this.</span></li>";
      $("ul#mentions-list").prepend(social_media_repost);
    }
    if (social_media_likes) {
      social_media_likes = social_media_likes.substr(0, social_media_likes.length - 2);
      // social_media_likes = "<span class=\"commented\">Liked by: </span> " + social_media_likes + "</li>";
      $("ul#mentions-list").prepend(social_media_likes);
    }
  });
});




const parallax = document.getElementById("parallax-div");

window.addEventListener("scroll", function() {
  let offset = window.pageYOffset;
  parallax.style.backgroundPositionY = offset * 0.7 + "px";
})




$(function () {
  oldWord = 0;
  newWord = 0;
  wordsArray = ["husband", "father", "believer", "educator", "teacher", "nerd", "geek", "scholar", "linguist", "learner", "polyglot", "techie", "writer", "adventurer", "traveler", "friend", "brother", "creator", "coder"];
  setInterval(function () {
    while (newWord == oldWord){
      newWord = Math.floor(Math.random() * 19);
    }
    oldWord = newWord;
    $("#changingWord").fadeOut(400, function () {
      $(this).text(wordsArray[newWord % wordsArray.length]).fadeIn(400);
    });
  }, 2000);
});
