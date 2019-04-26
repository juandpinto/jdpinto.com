$(".micropost-all").each(function() {
  var thisArticle = this;
  var post_url = $(".micropost-date", thisArticle).attr('href');
  // console.log(post_url);
// });



var replies = 0;
// var post_url = window.location.href;
// post_url = "https://juanpinto.me/" + post_url.slice(22);

$(document).ready(function() {
  $("ul#mentions-list", thisArticle).empty();
  $.getJSON("https://webmention.io/api/mentions?jsonp=?&sort-by=published&per-page=500", {
    target: post_url
  }, function(data) {
    var social_media_likes = "";
    var social_media_repost = "";
    var social_media_post = "";
    // if (data.links.length !== 0) {
    //   $("#post-mentions").show();
    //   $("<style>.micropost {border-radius : 10px 10px 0px 0px}</style>" ).appendTo( "head" )
    // }
    $.each(data.links, function(i, v) {
      var activity_type = data.links[i].activity.type;

      if (data.links[i].data.author && data.links[i].data.author.name) {
        var men_content = "";
        if (activity_type && activity_type == "like") {
          // if (!social_media_likes) {
          //   social_media_likes = "<li class=\"mention-social\"> Liked by: ";
          // }
          // social_media_likes = social_media_likes +
          //   "<a href=\"" + data.links[i].data.url + "\">" +
          //   "<img src=\"" + data.links[i].data.author.photo + "\" width=\"40\" />" + "</a> ";
        } else if (activity_type && activity_type == "repost") {
          // if (!social_media_repost) {
          //   social_media_repost = "<li class=\"mention-social\"> ";
          // }
          // social_media_repost = social_media_repost +
          //   "<a href=\"" + data.links[i].data.url + "\">" +
          //   data.links[i].data.author.name + "</a>, ";
        } else if (activity_type && activity_type == "link") {
          // if (!social_media_post) {
          //   social_media_post = "<li class=\"mention-social\"> ";
          // }
          // social_media_post = social_media_post +
          //   "<a href=\"" + data.links[i].data.url + "\">" +
          //   data.links[i].data.author.name + "</a>, ";
        } else if (activity_type && activity_type == "reply") {
          // let mention_date = new Date(data.links[i].data.published);
          if (data.links[i].data.content) {
            men_content = data.links[i].data.content;
          }
          if (replies == 0) {
            replies = 1;
          }
          $("ul#mentions-list", thisArticle).prepend("<li class=\"mention p-comment h-cite\">" +
            "<div class=\"mention-author u-author\">" +
            "<img class=\"u-photo\" src=\"" + data.links[i].data.author.photo + "\" class=\"u-photo\"" +
            "title=\"" + data.links[i].data.author.name + "\" width=\"40\" >" +
            "<a class=\"p-name u-url\" href=\"" + data.links[i].data.author.url + "\" >" +
            data.links[i].data.author.name + "</a> " +
            "<a class=\"author-url\" href=\"" + data.links[i].data.author.url + "\" >" +
            data.links[i].data.author.url + "</a></div>" +
            "<div class=\"mention-text\">" + men_content + "</div>" +
            "<a class=\"comment-time\" href=\"" + data.links[i].data.url + "\">" +
            "<time>" + data.links[i].data.published + "</time></a>" +
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

    if (replies == 1) {
      $("#post-mentions", thisArticle).show();
      $(".micropost", thisArticle).attr("style", "border-radius:10px 10px 0px 0px");
      // $("<style>.micropost {border-radius : 10px 10px 0px 0px}</style>" ).appendTo( "head" )
    }
  });
});




});
